import { type HTMLAttributes } from "react";

import { DayPicker } from "react-day-picker";
import { ko } from "react-day-picker/locale";
import "react-day-picker/style.css";
import { getYearMonth } from "../utils/date";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { setSelectedDate } from "../features/calendar/calendarSlice";
import { useAppSelector } from "../hooks/useAppSelector";

const DatePicker = () => {
  const dispatch = useAppDispatch();
  const selectedDate = useAppSelector((state) => state.calendar.selectedDate);

  const customCaptionLabel = (props: HTMLAttributes<HTMLSpanElement>) => {
    return <span {...props}>{getYearMonth(selectedDate)}</span>;
  };

  const onSelectHandler = (date: Date | undefined) => {
    dispatch(setSelectedDate(date));
  };

  return (
    <DayPicker
      animate
      locale={ko}
      mode="single"
      weekStartsOn={1}
      selected={selectedDate}
      onSelect={onSelectHandler}
      showOutsideDays
      components={{ CaptionLabel: customCaptionLabel }}
    />
  );
};

export default DatePicker;
