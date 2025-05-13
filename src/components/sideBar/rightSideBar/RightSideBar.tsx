import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoIosArrowBack, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { MdLightbulbOutline, MdOutlinePersonOutline } from "react-icons/md";

const RightSideBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {isOpen && (
        <div className="flex flex-col gap-8 min-w-14 items-center mt-5">
          <MdLightbulbOutline
            size={30}
            fill="#c5b90f"
            className="cursor-pointer hover:bg-light-gray rounded-full p-1"
          />
          <IoMdCheckmarkCircleOutline
            size={30}
            fill="#6276bf"
            className="cursor-pointer hover:bg-light-gray rounded-full p-1"
          />
          <MdOutlinePersonOutline
            size={30}
            fill="#6276bf"
            className="cursor-pointer hover:bg-light-gray rounded-full p-1"
          />
          <IoLocationOutline
            size={30}
            color="#48da4f"
            className="cursor-pointer hover:bg-light-gray rounded-full p-1"
          />

          <div className="border-b border-gray-400 scale-x-[0.3] w-10" />

          <FaPlus
            size={30}
            className="cursor-pointer hover:bg-light-gray rounded-full p-1"
          />
        </div>
      )}
    </>
  );
};

export default RightSideBar;
