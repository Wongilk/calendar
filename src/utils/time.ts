export const formatTime = (date: Date): string => {
  const h = date.getHours();
  const m = date.getMinutes();
  const isAm = h < 12 ? "오전" : "오후";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  const hh = hour12 < 10 ? `0${hour12}` : `${hour12}`;
  const mm = m < 10 ? `0${m}` : `${m}`;
  return `${isAm} ${hh}:${mm}`;
};

export const formatElapsed = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}분`;
  }
  const h = minutes / 60;
  const hStr = h % 1 === 0 ? `${h}` : `${h.toFixed(1)}`;
  return `${hStr}시간`;
};

export interface TimeOption {
  date: Date;
  elapsedMinutes?: number;
}

export const generateTimeOptions = (
  baseDate: Date,
  isStart = true,
  isSameDay = false
): TimeOption[] => {
  const options: TimeOption[] = [];
  const date = new Date(baseDate);
  let elapsedMinutes = 0;

  if (isStart) {
    date.setHours(0, 0, 0, 0);
    for (let i = 0; i < 96; i++) {
      options.push({ date: new Date(date) });
      date.setMinutes(date.getMinutes() + 15);
    }
  } else if (isSameDay) {
    for (let i = 0; i < 4; i++) {
      options.push({ date: new Date(date), elapsedMinutes });
      date.setMinutes(date.getMinutes() + 15);
      elapsedMinutes += 15;
    }
    for (let i = 0; i < 46; i++) {
      options.push({ date: new Date(date), elapsedMinutes });
      date.setMinutes(date.getMinutes() + 30);
      elapsedMinutes += 30;
    }
  } else {
    for (let i = 0; i < 48; i++) {
      options.push({ date: new Date(date) });
      date.setMinutes(date.getMinutes() + 30);
    }
  }
  return options;
};
