import { LuPencil } from "react-icons/lu";
import {
  deleteEvent,
  type DayEvent,
} from "../../features/calendar/calendarSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiMail } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoCloseSharp, IoShareSocialOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa6";
import { BiCalendarEvent } from "react-icons/bi";
import { formatDateToKST, getStartOfWeek } from "../../utils/date";
import { useAppDispatch } from "../../hooks/useAppDispatch";

interface EventDeletionModalProps {
  event: DayEvent | null;
  onClose: () => void;
}

const EventDeletionModal = ({ event, onClose }: EventDeletionModalProps) => {
  const dispatch = useAppDispatch();

  if (!event) return <></>;
  const handleDeleteClick = () => {
    dispatch(
      deleteEvent({ id: event.id, startDate: getStartOfWeek(event.startDate) })
    );
    onClose();
  };
  return (
    <div className="min-h-20 bg-slate-200 rounded-4xl shadow-xl px-6 pt-3 pb-5">
      <div className="flex items-center justify-end gap-2">
        <LuPencil
          size={35}
          className="cursor-pointer hover:bg-gray-300 rounded-full p-2"
        />
        <RiDeleteBin6Line
          size={35}
          className="cursor-pointer hover:bg-gray-300 rounded-full p-2"
          onClick={handleDeleteClick}
        />
        <CiMail
          size={35}
          className="cursor-pointer hover:bg-gray-300 rounded-full p-2"
        />
        <BsThreeDotsVertical
          size={35}
          className="cursor-pointer hover:bg-gray-300 rounded-full p-2"
        />
        <IoCloseSharp
          size={35}
          className="cursor-pointer hover:bg-gray-300 rounded-full p-2"
          onClick={onClose}
        />
      </div>

      <div className="flex flex-col gap-3 mt-3">
        <div className="flex ">
          <div className="rounded w-4 h-4 bg-blue-200 mt-2"></div>
          <div className="flex flex-col ml-5">
            <span className="text-xl">{event.title}</span>
            <span className="text-sm text-gray-700 mt-1">
              {formatDateToKST(event.startDate)}~
              {formatDateToKST(event.endDate)}
            </span>
            <button className="text-blue-500 flex items-center rounded-full border-1 border-gray-500 px-5 py-2 w-fit text-sm font-semibold gap-3 mt-3">
              <IoShareSocialOutline size={20} /> 링크를 통해 초대
            </button>
          </div>
        </div>

        <div className="flex items-center text-sm">
          <div className="w-4">
            <FaRegBell />
          </div>
          <span className="ml-5">10분 전</span>
        </div>
        <div className="flex items-center text-sm">
          <div className="w-4">
            <BiCalendarEvent />
          </div>
          <span className="ml-5">김원길</span>
        </div>
      </div>
    </div>
  );
};

export default EventDeletionModal;
