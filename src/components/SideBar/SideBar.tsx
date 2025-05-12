import DatePicker from "./DatePicker";
import { IoMdArrowDropdown } from "react-icons/io";
import { HiPlus } from "react-icons/hi";
import { useState } from "react";

const SideBar = () => {
  const [isDropDownVisible, setIsDropDownVisible] = useState<boolean>(false);

  const toggleBtn = () => {
    setIsDropDownVisible((prev) => !prev);
  };
  return (
    <aside className="max-w-60 ml-6 mt-4">
      <button
        className="flex items-center justify-between gap-2 rounded-2xl px-5 py-4 bg-white border border-gray-300 shadow-xl cursor-pointer hover:bg-light-gray transition relative"
        onClick={toggleBtn}
      >
        <HiPlus size={25} />
        <span className="text-sm font-semibold">만들기</span>
        <IoMdArrowDropdown />

        <div
          className={`flex flex-col absolute top-[110%] left-0 bg-slate-100 border border-gray-300 rounded-md z-10 text-gray-700 text-xs text-left font-semibold shadow-2xl transition-all duration-200 ease-in-out origin-top ${
            isDropDownVisible
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-90 pointer-events-none"
          }`}
        >
          <div className="mt-2 py-3 px-4 hover:bg-light-gray">이벤트</div>
          <div className="py-3 px-4 hover:bg-light-gray">할 일</div>
          <div className="mb-2 py-3 px-4 hover:bg-light-gray">약속 일정</div>
        </div>
      </button>

      <DatePicker className="w-full mt-6" />
    </aside>
  );
};

export default SideBar;
