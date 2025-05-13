import { MdOutlineAccessTime } from "react-icons/md";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getMonthDayWeekday } from "../../utils/date";
import { useState } from "react";
import { generateTimeOptions } from "../../utils/time";
import Dropdown from "../dropdown/Dropdown";
import DatePicker from "./DatePicker";

interface TimeSelectionProps {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  setStartDate: (end: string) => void;
  setEndDate: (end: string) => void;
  setStartTime: (end: string) => void;
  setEndTime: (end: string) => void;
}

const TimeSelection = ({
  startDate,
  endDate,
  startTime,
  endTime,
  setStartDate,
  setEndDate,
  setStartTime,
  setEndTime,
}: TimeSelectionProps) => {
  const [changeMode, setChangeMode] = useState<boolean>(false);
  const selectedDate = useAppSelector((state) => state.calendar.selectedDate);
  const nextDay = new Date(selectedDate);
  nextDay.setDate(new Date(selectedDate).getDate() + 1);
  const [activePicker, setActivePicker] = useState<
    "startDate" | "startTime" | "endTime" | "endDate" | null
  >(null);

  if (!changeMode) {
    return (
      <div className="flex items-center">
        <MdOutlineAccessTime size={20} className="mr-5" />
        <div
          className="text-sm space-x-2 cursor-pointer rounded-md p-2 hover:bg-light-gray"
          onClick={() => setChangeMode(true)}
        >
          <span className="pb-0.5 hover:border-b">
            {getMonthDayWeekday(new Date(selectedDate))}
          </span>
          <span className="pb-0.5 hover:border-b">{startTime}</span>
          <span>-</span>
          <span className="pb-0.5 hover:border-b">{endTime}</span>
          <span className="pb-0.5 hover:border-b">
            {getMonthDayWeekday(nextDay)}
          </span>
          <div>
            <span className="text-[0.75rem]">시간대 · 반복안함</span>
          </div>
        </div>
      </div>
    );
  }

  const onSelectDateHandler = (date: Date) => {
    if (activePicker === "startDate") setStartDate(date.toISOString());
    else setEndDate(date.toISOString());
    setActivePicker(null);
  };

  return (
    <div className="relative flex items-center">
      <MdOutlineAccessTime size={20} className="mr-5" />
      <div className="flex gap-1.5 items-center">
        <div className="relative">
          <div
            onClick={() =>
              setActivePicker(activePicker === "startDate" ? null : "startDate")
            }
            className="bg-gray-300 p-2 rounded-md text-sm hover:brightness-90 cursor-pointer"
          >
            {getMonthDayWeekday(new Date(startDate))}
          </div>
          {activePicker === "startDate" && (
            <div className="absolute min-w-60 bg-white mt-2 shadow-lg">
              <DatePicker onSelect={onSelectDateHandler} />
            </div>
          )}
        </div>

        <div className="relative">
          <div
            onClick={() =>
              setActivePicker(activePicker === "startTime" ? null : "startTime")
            }
            className="bg-gray-300 p-2 rounded-md text-sm hover:brightness-90 cursor-pointer"
          >
            {startTime}
          </div>
          <div className="absolute">
            <Dropdown
              options={generateTimeOptions()}
              onChange={setStartTime}
              isOpen={activePicker === "startTime"}
              onClose={() => setActivePicker(null)}
            />
          </div>
        </div>

        <span>-</span>

        <div className="relative">
          <div
            onClick={() =>
              setActivePicker(activePicker === "endTime" ? null : "endTime")
            }
            className="bg-gray-300 p-2 rounded-md text-sm hover:brightness-90 cursor-pointer"
          >
            {endTime}
          </div>
          <div className="absolute">
            <Dropdown
              options={generateTimeOptions()}
              onChange={setEndTime}
              isOpen={activePicker === "endTime"}
              onClose={() => setActivePicker(null)}
            />
          </div>
        </div>

        <div className="relative">
          <div
            onClick={() =>
              setActivePicker(activePicker === "endDate" ? null : "endDate")
            }
            className="bg-gray-300 p-2 rounded-md text-sm hover:brightness-90 cursor-pointer"
          >
            {getMonthDayWeekday(new Date(endDate))}
          </div>
          {activePicker === "endDate" && (
            <div className="absolute min-w-60 bg-white mt-2 shadow-lg">
              <DatePicker onSelect={onSelectDateHandler} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default TimeSelection;
