import { useMemo, useState } from "react";
import type { DayEvent } from "../../features/calendar/calendarSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  formatDateToKST,
  getStartOfWeek,
  getWeekDates,
} from "../../utils/date";
import { splitEventByDay } from "../../utils/events";
import Modal from "../modal/Modal";
import EventDeletionModal from "./EventDeletionModal";

const days = ["월", "화", "수", "목", "금", "토", "일"];

const hours = Array.from({ length: 23 }, (_, i) => i + 1);
const MS_PER_DAY = 24 * 60 * 60 * 1000;

const formatHour = (hour: number) => {
  const period = hour < 12 ? "오전" : "오후";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${period} ${hour12}시`;
};

const WeeklyCalendar = () => {
  const selectedDate = useAppSelector((state) => state.calendar.selectedDate);
  const weekEventsMap = useAppSelector((state) => state.calendar.weekEvents);
  const weekEvents = useMemo(
    () => weekEventsMap[getStartOfWeek(selectedDate)] || [],
    [weekEventsMap, selectedDate]
  );
  const weekDates = getWeekDates(selectedDate);
  const [selectedEvent, setSelectedEvent] = useState<DayEvent | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const handleEventClick = (event: DayEvent) => {
    setSelectedEvent(event);
    setIsDeleteModalOpen(true);
  };

  const shortEvents = weekEvents.filter((event) => {
    const start = new Date(event.startDate).getTime();
    const end = new Date(event.endDate).getTime();
    return end - start <= MS_PER_DAY;
  });

  const longEvents = weekEvents.filter((event) => {
    const start = new Date(event.startDate).getTime();
    const end = new Date(event.endDate).getTime();
    return end - start > MS_PER_DAY;
  });

  const renderShortEvents = shortEvents.map((event: DayEvent) => {
    const frags = splitEventByDay(event);

    return frags.map((frag, idx) => {
      const start = new Date(frag.startDate);
      const end = new Date(frag.endDate);
      const dayIdx = (start.getDay() + 6) % 7;
      const startHourV = start.getHours() + start.getMinutes() / 60;

      const isEndOfDay =
        end.getHours() === 0 &&
        end.getMinutes() === 0 &&
        end.getSeconds() === 0 &&
        end.getMilliseconds() === 0;

      const endHourV = isEndOfDay ? 24 : end.getHours() + end.getMinutes() / 60;
      const height = (endHourV - startHourV) * 3;
      return (
        <div
          key={`${frag.id}-${idx}`}
          className="absolute bg-blue-200 rounded p-1 text-xs text-center cursor-pointer"
          style={{
            left: `${(dayIdx * (100 / 7)).toFixed(5)}%`,
            top: `${startHourV * 3}rem`,
            width: `${(100 / 7).toFixed(5)}%`,
            height: `${height}rem`,
          }}
          onClick={() => handleEventClick(event)}
        >
          <div
            className={`text-white text-left ${height > 3 ? "" : "flex gap-1"}`}
          >
            <span>{frag.title}</span>
            <div>
              {formatDateToKST(frag.startDate).split(",")[1]} ~
              {height > 3 && formatDateToKST(frag.endDate).split(",")[1]}
            </div>
          </div>
        </div>
      );
    });
  });

  return (
    <div className="w-full bg-white rounded-4xl overflow-y-auto h-[calc(100vh-5rem)] text-gray-700">
      <div className="grid grid-cols-7 text-center pl-24 sticky top-0 z-10 bg-white">
        {days.map((day, idx) => (
          <div
            key={day}
            className="flex flex-col justify-center gap-2 relative p-3"
          >
            <span className="text-[0.75rem]">{day}</span>
            <span className="text-2xl">{weekDates[idx]}</span>
            <div className="absolute left-0 bottom-0 border-l border-gray-600 scale-x-[0.3] h-4" />
          </div>
        ))}
        <span className="absolute bottom-0 left-7 text-[0.75rem] font-semibold">
          GMT +09
        </span>

        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
      </div>

      <div className="flex">
        <div className="w-24">
          {hours.map((hour) => (
            <div key={hour} className="h-12 relative">
              <span className="w-full absolute -bottom-2 left-1/2 -translate-x-1/2 text-[0.7rem] text-center font-semibold">
                {formatHour(hour)}
              </span>
            </div>
          ))}
          <div className="w-24 h-12" />
        </div>

        <div
          className="w-full grid grid-cols-7 relative"
          style={{
            gridTemplateRows: `repeat(${hours.length + 1}, ${3}rem)`,
          }}
        >
          {hours.map((_, rowIdx) => (
            <div
              key={rowIdx}
              className="absolute -left-2 w-full border-b border-gray-200"
              style={{ top: `${(rowIdx + 1) * 3}rem` }}
            />
          ))}
          {days.map((_, colIdx) => (
            <div
              key={colIdx}
              className="absolute top-0 h-full border-l border-gray-200"
              style={{ left: `${(colIdx * (100 / 7)).toFixed(5)}%` }}
            />
          ))}
          {renderShortEvents}
        </div>
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <EventDeletionModal
          event={selectedEvent}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default WeeklyCalendar;
