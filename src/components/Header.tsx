import { IoApps, IoMenuOutline, IoSettingsOutline } from "react-icons/io5";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineCalendarMonth,
} from "react-icons/md";
import { SiGooglecalendar } from "react-icons/si";
import {
  IoIosSearch,
  IoMdArrowDropdown,
  IoMdCheckmarkCircleOutline,
} from "react-icons/io";
import { GoQuestion } from "react-icons/go";
import { FaRegCircleUser } from "react-icons/fa6";
import { getMonthDayWeekday, getYearMonth } from "../utils/date";

const Header = () => {
  return (
    <div className="h-16 w-full bg-extralight-gray p-2 flex justify-between">
      <div className="flex items-center gap-x-1">
        <div className="flex items-center gap-2 mr-11">
          <IoMenuOutline size={25} className="ml-4" />
          <SiGooglecalendar size={32} className="ml-3 mr-2" color="green" />
          <span className="text-xl">Calendar</span>
        </div>

        <button
          className="cursor-pointer w-20 h-10 border border-gray-600 rounded-full text-sm font-semibold hover:bg-light-gray mr-4"
          title={getMonthDayWeekday()}
        >
          오늘
        </button>

        <MdKeyboardArrowLeft
          size={32}
          title="지난주"
          className="cursor-pointer hover:bg-light-gray rounded-full p-1"
        />
        <MdKeyboardArrowRight
          size={32}
          title="다음주"
          className="cursor-pointer hover:bg-light-gray rounded-full p-1 mr-4"
        />
        <span className="text-xl">{getYearMonth()}</span>
      </div>

      <div className="flex items-center gap-2">
        <IoIosSearch
          size={35}
          className="cursor-pointer hover:bg-light-gray rounded-full p-2"
        />
        <GoQuestion
          size={35}
          className="cursor-pointer hover:bg-light-gray rounded-full p-2"
        />
        <IoSettingsOutline
          size={35}
          className="cursor-pointer hover:bg-light-gray rounded-full p-2"
        />

        <div className="w-20 h-10 border border-gray-600 rounded-full text-sm font-semibold cursor-pointer hover:bg-light-gray flex items-center justify-between px-5">
          주
          <IoMdArrowDropdown />
        </div>

        <div className="flex">
          <div className="w-14 h-10 border border-gray-600 rounded-l-full cursor-pointer hover:bg-light-gray flex items-center justify-center bg-sky-200">
            <MdOutlineCalendarMonth size={20} />
          </div>
          <div className="w-14 h-10 border border-gray-600 rounded-r-full border-l-0 cursor-pointer hover:bg-light-gray flex items-center justify-center">
            <IoMdCheckmarkCircleOutline size={20} />
          </div>
        </div>

        <IoApps
          size={35}
          className="cursor-pointer hover:bg-light-gray rounded-full p-2"
        />
        <FaRegCircleUser size={35} className="cursor-pointer p-1" />
      </div>
    </div>
  );
};

export default Header;
