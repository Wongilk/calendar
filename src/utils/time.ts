export const generateTimeOptions = (
  startTime: string | null = null
): string[] => {
  const options: string[] = [];
  let startHours = 0;
  let startMinutes = 0;

  if (startTime) {
    const [period, time] = startTime.split(" ");
    const [hours, minutes] = time.split(":").map(Number);
    startHours = period === "오전" ? hours : hours + 12;
    startMinutes = minutes;
  }

  const total = 48;

  for (let i = 0; i < total; i++) {
    const actualHour = startHours % 24;
    const isAm = actualHour < 12 ? "오전" : "오후";
    const convertedHour =
      actualHour === 0 ? 12 : actualHour > 12 ? actualHour - 12 : actualHour;
    const hourStr =
      convertedHour < 10 ? `0${convertedHour}` : `${convertedHour}`;
    const minuteStr = startMinutes === 0 ? "00" : "30";

    options.push(`${isAm} ${hourStr}:${minuteStr}`);
    if (startMinutes === 0) {
      startMinutes = 30;
    } else {
      startMinutes = 0;
      startHours += 1;
    }
  }

  return options;
};

export const parseTimeTo24 = (
  timeStr: string
): { hours: number; minutes: number } => {
  const [isAm, hourAndMinute] = timeStr.split(" ");
  let [hours, minutes] = hourAndMinute.split(":").map(Number);

  if (isAm === "오후" && hours !== 12) hours += 12;
  if (isAm === "오전" && hours === 12) hours = 0;

  return { hours, minutes };
};
