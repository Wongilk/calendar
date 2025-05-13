import { HiMenuAlt4 } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import TimeSelection from "./TimeSelection";
import React, { useEffect, useState } from "react";
import Tabs, { type Tab } from "../../tabs/Tabs";
import { useAppSelector } from "../../../hooks/useAppSelector";
import {
  combineDateAndTime,
  getCurrentAndNextTimes,
} from "../../../utils/date";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import {
  addEvent,
  type DayEvent,
} from "../../../features/calendar/calendarSlice";
import { v4 as uuidv4 } from "uuid";

interface EventFormModalProps {
  onClose: () => void;
}

const EventFormModal = ({ onClose }: EventFormModalProps) => {
  const dispatch = useAppDispatch();
  const selectedDate = useAppSelector((state) => state.calendar.selectedDate);

  const [isEndBeforeStart, setIsEndBeforeStart] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [startTime, setStartTime] = useState<string>(
    getCurrentAndNextTimes()[0]
  );
  const [endTime, setEndTime] = useState<string>(getCurrentAndNextTimes()[1]);
  const [startDate, setStartDate] = useState<string>(selectedDate);

  const nextDayISO = new Date(selectedDate);
  nextDayISO.setDate(new Date(selectedDate).getDate() + 1);
  const [endDate, setEndDate] = useState<string>(nextDayISO.toISOString());

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    const start = combineDateAndTime(new Date(startDate), startTime);
    const end = combineDateAndTime(new Date(endDate), endTime);

    if (end < start) setIsEndBeforeStart(true);
    else setIsEndBeforeStart(false);
  }, [startDate, startTime, endDate, endTime]);

  const tabs: Tab[] = [
    {
      label: "이벤트",
      content: (
        <TimeSelection
          startDate={startDate}
          endDate={endDate}
          startTime={startTime}
          endTime={endTime}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
          isEndBeforeStart={isEndBeforeStart}
        />
      ),
    },
    {
      label: "할 일",
      content: <></>,
    },
    {
      label: "약속 일정",
      content: <></>,
    },
  ];

  const addEventHandler = () => {
    const payload: DayEvent = {
      id: uuidv4(),
      title: title === "" ? "(제목 없음)" : title,
      startDate: combineDateAndTime(new Date(startDate), startTime),
      endDate: combineDateAndTime(new Date(endDate), endTime),
    };
    dispatch(addEvent(payload));
    onClose();
  };

  return (
    <div className="min-h-[35rem] bg-slate-200/60 flex flex-col rounded-4xl shadow-lg relative px-5">
      <div className="flex justify-between items-center mt-3">
        <HiMenuAlt4
          size={32}
          className="cursor-pointer hover:bg-light-gray rounded-full p-2"
        />
        <IoCloseSharp
          size={40}
          className="cursor-pointer hover:bg-light-gray rounded-full p-2"
          onClick={onClose}
        />
      </div>

      <div className="pl-11 mt-3">
        <input
          placeholder="제목 추가"
          className="w-full h-8 outline-none peer"
          value={title}
          onChange={onChangeTitle}
        />
        <div className="border-b border-black scale-y-[0.2]  peer-focus:border-blue-800 peer-focus:scale-y-200" />
      </div>

      <div className="my-3">
        <Tabs tabs={tabs} tabsClassname="ml-11" />
      </div>

      <div className="absolute bottom-4 right-6 space-x-3">
        <button className="rounded-full w-30 h-10 text-blue-600 font-semibold cursor-pointer hover:bg-slate-300">
          옵션 더보기
        </button>
        <button
          className={`rounded-full w-20 h-10 text-white font-semibold hover:brightness-90 ${
            isEndBeforeStart
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 cursor-pointer"
          }`}
          onClick={addEventHandler}
          disabled={isEndBeforeStart}
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default EventFormModal;
