import {
  formatElapsed,
  formatTime,
  type TimeOption,
} from "../../../utils/time";

interface TimeDropdownProps {
  isOpen: boolean;
  isSameDay: boolean;
  options: TimeOption[];
  onChange: (v: Date) => void;
  onClose: () => void;
}

const TimeDropdown = ({
  isOpen,
  isSameDay,
  options,
  onChange,
  onClose,
}: TimeDropdownProps) => {
  const handleOptionClick = (value: Date) => {
    onChange(value);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <ul className="z-10 mt-1 border-none rounded bg-white shadow-lg max-h-60 overflow-y-auto">
          {options.map((option, idx) => (
            <li
              key={idx}
              className="py-3 px-4 hover:bg-light-gray cursor-pointer text-sm"
              onClick={() => handleOptionClick(option.date)}
            >
              {formatTime(option.date)}
              {isSameDay && option.elapsedMinutes != undefined && (
                <span>({formatElapsed(option.elapsedMinutes)})</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default TimeDropdown;
