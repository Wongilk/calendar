import { MdOutlineAccessTime } from "react-icons/md";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { getMonthDayWeekday } from "../../../utils/date";
import { useState } from "react";
import { formatTime, generateTimeOptions } from "../../../utils/time";
import DatePicker from "./DatePicker";
import TimeDropdown from "./TimeDropdown";

interface TimeSelectionProps {
  startDate: Date;
  endDate: Date;
  startTime: Date;
  endTime: Date;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  setStartTime: (date: Date) => void;
  setEndTime: (date: Date) => void;
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

  const handleDateSelect = (date: Date) => {
    if (activePicker === "startDate") setStartDate(date);
    else if (activePicker === "endDate") setEndDate(date);

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
        <div
          className={`absolute z-10 mt-2 bg-white shadow-lg ${
            pickerKey === "startDate" || pickerKey === "endDate"
              ? "w-60"
              : "w-52"
          } `}
        >
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
          <span className="pb-0.5 hover:border-b">{formatTime(startTime)}</span>
          <span>-</span>
          <span className="pb-0.5 hover:border-b">{formatTime(endTime)}</span>
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
          <DatePicker onSelect={handleDateSelect} />
        </PickerButton>

        <PickerButton value={formatTime(startTime)} pickerKey="startTime">
          <TimeDropdown
            options={generateTimeOptions(startTime, true, false)}
            isSameDay={endDate.getDate() === startDate.getDate()}
            onChange={setStartTime}
            isOpen
            onClose={() => setActivePicker(null)}
          />
        </PickerButton>

        <span>-</span>

        <PickerButton value={formatTime(endTime)} pickerKey="endTime">
          {startDate.getDate() === endDate.getDate() ? (
            <TimeDropdown
              options={generateTimeOptions(startTime, false, true)}
              isSameDay={true}
              onChange={setEndTime}
              isOpen
              onClose={() => setActivePicker(null)}
            />
          ) : (
            <TimeDropdown
              options={generateTimeOptions(endTime, true, false)}
              isSameDay={false}
              onChange={setEndTime}
              isOpen
              onClose={() => setActivePicker(null)}
            />
          )}
        </PickerButton>

        {
          <PickerButton
            value={getMonthDayWeekday(new Date(endDate))}
            pickerKey="endDate"
          >
            <DatePicker onSelect={handleDateSelect} />
          </PickerButton>
        }
      </div>
    </div>
  );
};
export default TimeSelection;
