interface TimeDropdownProps {
  isOpen: boolean;
  options: string[];
  onChange: (v: string) => void;
  onClose: () => void;
}

const TimeDropdown = ({
  isOpen,
  options,
  onChange,
  onClose,
}: TimeDropdownProps) => {
  const optionClickHandler = (value: string) => {
    onChange(value);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <ul className="z-10 w-52 mt-1 border-none rounded bg-white shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <li
              key={option}
              className="py-3 px-4 hover:bg-light-gray cursor-pointer text-sm"
              onClick={() => optionClickHandler(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default TimeDropdown;
