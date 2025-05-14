import { type HTMLAttributes } from "react";

import { DayPicker } from "react-day-picker";
import { ko } from "react-day-picker/locale";
import "react-day-picker/style.css";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { setSelectedDate } from "../../../features/calendar/calendarSlice";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { getYearMonth } from "../../../utils/date";

interface DatePickerProps {
  onSelect?: (date: Date) => void;
}

const DatePicker = ({ onSelect }: DatePickerProps) => {
  const dispatch = useAppDispatch();
  const selectedDate = useAppSelector((state) => state.calendar.selectedDate);

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

  const onSelectHandler = (date: Date) => {
    if (onSelect) onSelect(date);
    else dispatch(setSelectedDate(date.toISOString()));
  };

  return (
    <DayPicker
      classNames={{
        caption_label: "text-sm ml-3 flex items-center",
        month_grid: "border-separate border-spacing-2",
        weekday: "w-6 h-6 text-[0.75rem] font-medium",
        day: "w-6 h-6 text-[0.75rem]",
        day_button:
          "w-full h-full hover:bg-light-gray rounded-full cursor-pointer",
        today: "w-6 h-6 rounded-full bg-blue-500 text-white",
        selected: "w-6 h-6 rounded-full bg-sky-200",
      }}
      formatters={{
        formatCaption: (date) => getYearMonth(date),
      }}
      animate
      required
      locale={ko}
      mode="single"
      weekStartsOn={1}
      selected={new Date(selectedDate)}
      month={new Date(selectedDate)}
      onSelect={onSelectHandler}
      showOutsideDays
      components={{
        NextMonthButton: customNextButton,
        PreviousMonthButton: customPrevButton,
      }}
    />
  );
};

export default DatePicker;
