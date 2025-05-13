import { MdOutlineAccessTime } from "react-icons/md";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getMonthDayWeekday } from "../../utils/date";
import { useState } from "react";
import { generateTimeOptions, parseTimeTo24 } from "../../utils/time";
import DatePicker from "./DatePicker";
import TimeDropdown from "./TimeDropdown";

interface TimeSelectionProps {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  setStartDate: (end: string) => void;
  setEndDate: (end: string) => void;
  setStartTime: (end: string) => void;
  setEndTime: (end: string) => void;
  isEndBeforeStart: boolean;
}
type ActivePicker = "startDate" | "startTime" | "endTime" | "endDate" | null;

const TimeSelection = ({
  startDate,
  endDate,
  startTime,
  endTime,
  setStartDate,
  setEndDate,
  setStartTime,
  setEndTime,
  isEndBeforeStart,
}: TimeSelectionProps) => {
  const [changeMode, setChangeMode] = useState<boolean>(false);
  const selectedDate = useAppSelector((state) => state.calendar.selectedDate);
  const [activePicker, setActivePicker] = useState<ActivePicker>(null);

  const { hours: sh, minutes: sm } = parseTimeTo24(startTime);
  const { hours: eh, minutes: em } = parseTimeTo24(endTime);
  const isNextDay = sh * 60 + sm >= eh * 60 + em;

  const onSelectDateHandler = (date: Date) => {
    if (activePicker === "startDate") setStartDate(date.toISOString());
    else if (activePicker === "endDate") setEndDate(date.toISOString());
    setActivePicker(null);
  };

  const PickerButton = ({
    value,
    pickerKey,
    children,
  }: {
    value: string;
    pickerKey: ActivePicker;
    children?: React.ReactNode;
  }) => (
    <div className="relative">
      <div
        onClick={() =>
          setActivePicker(activePicker === pickerKey ? null : pickerKey)
        }
        className={`p-2 rounded-md text-sm hover:brightness-90 cursor-pointer ${
          isEndBeforeStart &&
          (pickerKey === "endTime" || pickerKey === "endDate")
            ? "bg-red-200"
            : "bg-gray-300 "
        }`}
      >
        {value}
      </div>
      {activePicker === pickerKey && (
        <div className="absolute z-10 mt-2 bg-white shadow-lg min-w-60">
          {children}
        </div>
      )}
    </div>
  );

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
          <div>
            <span className="text-[0.75rem]">시간대 · 반복안함</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex items-center">
      <MdOutlineAccessTime size={20} className="mr-5" />
      <div className="flex gap-1.5 items-center">
        <PickerButton
          value={getMonthDayWeekday(new Date(startDate))}
          pickerKey="startDate"
        >
          <DatePicker onSelect={onSelectDateHandler} />
        </PickerButton>

        <PickerButton value={startTime} pickerKey="startTime">
          <TimeDropdown
            options={generateTimeOptions(startTime)}
            onChange={setStartTime}
            isOpen
            onClose={() => setActivePicker(null)}
          />
        </PickerButton>

        <span>-</span>

        <PickerButton value={endTime} pickerKey="endTime">
          <TimeDropdown
            options={generateTimeOptions(endTime)}
            onChange={setEndTime}
            isOpen
            onClose={() => setActivePicker(null)}
          />
        </PickerButton>

        {isNextDay && (
          <PickerButton
            value={getMonthDayWeekday(new Date(endDate))}
            pickerKey="endDate"
          >
            <DatePicker onSelect={onSelectDateHandler} />
          </PickerButton>
        )}
      </div>
    </div>
  );
};
export default TimeSelection;
