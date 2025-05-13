const days = ["월", "화", "수", "목", "금", "토", "일"];

const hours = Array.from({ length: 23 }, (_, i) => i + 1);

const formatHour = (hour: number) => {
  const period = hour < 12 ? "오전" : "오후";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${period} ${hour12}시`;
};

const WeeklyCalendar = () => {
  return (
    <div className="w-full bg-white rounded-4xl overflow-y-auto h-[calc(100vh-5rem)] text-gray-700">
      <div className="grid grid-cols-7 text-center pl-24 sticky top-0 z-10 bg-white">
        {days.map((day, index) => (
          <div className="flex flex-col justify-center gap-2 relative p-3">
            <span className="text-[0.75rem]">{day}</span>
            <span className="text-2xl">{index}</span>
            <div className="absolute left-0 bottom-0 border-l border-gray-600 scale-x-[0.3] h-4" />
          </div>
        ))}
        <span className="absolute bottom-0 left-7 text-[0.75rem] font-semibold">
          GMT +09
        </span>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
      </div>

      <div className="flex">
        <div className="w-24">
          {hours.map((hour) => (
            <div className="h-12 relative">
              <span className="w-full absolute -bottom-3 left-1/2 -translate-x-1/2 text-[0.7rem] text-center font-semibold">
                {formatHour(hour)}
              </span>
            </div>
          ))}
          <div className="w-24 h-12" />
        </div>

        <div className="w-full">
          <div className="h-full grid grid-cols-7 text-center relative">
            {days.map((_, i) => (
              <div className="relative h-full" key={i}>
                <div className="absolute left-0 bottom-0 border-l border-gray-400 scale-x-[0.3] h-full" />
              </div>
            ))}

            {hours.map((_, i) => (
              <div
                key={i}
                className="absolute left-0 w-full border-t border-gray-400 scale-y-[0.3]"
                style={{ top: `${(i + 1) * 3}rem` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyCalendar;
