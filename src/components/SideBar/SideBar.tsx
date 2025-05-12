import DatePicker from "./DatePicker";
import { IoMdArrowDropdown } from "react-icons/io";
import { HiPlus } from "react-icons/hi";

const SideBar = () => {
  return (
    <aside className="max-w-60 ml-6 mt-4">
      <button className="flex items-center justify-between gap-2 rounded-2xl px-5 py-4 bg-white border border-gray-300 shadow-md cursor-pointer hover:bg-light-gray transition">
        <HiPlus size={25} />
        <span className="text-sm font-semibold">만들기</span>
        <IoMdArrowDropdown />
      </button>

      <DatePicker className="w-full mt-6" />
    </aside>
  );
};

export default SideBar;
