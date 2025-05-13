export const generateTimeOptions = (): string[] => {
  const options: string[] = [];

  for (let hour = 0; hour < 24; hour++) {
    for (const minute of [0, 30]) {
      const convertedHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const hourStr =
        convertedHour < 10 ? `0${convertedHour}` : `${convertedHour}`;
      const minuteStr = minute == 0 ? "00" : "30";
      const isAm = hour < 12 ? "오전" : "오후";

      options.push(`${isAm} ${hourStr}:${minuteStr}`);
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
