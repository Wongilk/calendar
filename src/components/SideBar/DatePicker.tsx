import { type HTMLAttributes } from "react";

import { DayPicker } from "react-day-picker";
import { ko } from "react-day-picker/locale";
import "react-day-picker/style.css";
import { getYearMonth } from "../../utils/date";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setSelectedDate } from "../../features/calendar/calendarSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const DatePicker = () => {
  const dispatch = useAppDispatch();
  const selectedDate = useAppSelector((state) => state.calendar.selectedDate);

  const customCaptionLabel = (props: HTMLAttributes<HTMLSpanElement>) => {
    return (
      <span {...props} className={`text-sm ml-3 ${props.className}`}>
        {getYearMonth(selectedDate)}
      </span>
    );
  };

  const customNextButton = (props: HTMLAttributes<HTMLButtonElement>) => {
    return (
      <button {...props}>
        <MdKeyboardArrowRight />
      </button>
    );
  };

  const customPrevButton = (props: HTMLAttributes<HTMLButtonElement>) => {
    return (
      <button {...props}>
        <MdKeyboardArrowLeft />
      </button>
    );
  };

  const onSelectHandler = (date: Date | undefined) => {
    dispatch(setSelectedDate(date));
  };

  return (
    <DayPicker
      classNames={{
        month_grid: "border-separate border-spacing-2",
        weekday: "w-6 h-6 text-[0.75rem] font-medium",
        day: "w-6 h-6 text-[0.75rem]",
        day_button:
          "w-full h-full hover:bg-light-gray rounded-full cursor-pointer",
        today: "w-6 h-6 rounded-full bg-blue-500 text-white",
        selected: "w-6 h-6 rounded-full bg-sky-200",
      }}
      animate
      locale={ko}
      mode="single"
      weekStartsOn={1}
      selected={selectedDate}
      onSelect={onSelectHandler}
      showOutsideDays
      components={{
        NextMonthButton: customNextButton,
        PreviousMonthButton: customPrevButton,
        CaptionLabel: customCaptionLabel,
      }}
    />
  );
};

export default DatePicker;
