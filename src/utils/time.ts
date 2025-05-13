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
  console.log(options);
  return options;
};
