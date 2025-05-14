export const getYearMonth = (date: Date = new Date()): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1);
  return `${year}년 ${month}월`;
};

export const getMonthDayWeekday = (date: Date = new Date()): string => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekdayIndex = date.getDay();
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const weekday = dayNames[weekdayIndex];
  return `${month}월 ${day}일 (${weekday}요일)`;
};

export const combineDateAndTime = (date: Date, time: Date): Date => {
  const combined = new Date(date);
  combined.setHours(time.getHours(), time.getMinutes(), 0, 0);
  return combined;
};

export const getStartOfWeek = (date: string): string => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - (day === 0 ? 6 : day - 1);
  const weekStart = new Date(d.setDate(diff));
  weekStart.setHours(0, 0, 0, 0);
  return weekStart.toISOString();
};

export const getLastOfWeek = (date: string): string => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() + (day === 0 ? 0 : 7 - day);
  const weekEnd = new Date(d.setDate(diff));
  weekEnd.setHours(23, 59, 59, 999);
  return weekEnd.toISOString();
};

export const getCurrentAndNextDates = (baseDate: Date): [Date, Date] => {
  const base = new Date(baseDate);
  const start = new Date(base);
  const end = new Date(base);

  const minutes = start.getMinutes();
  if (minutes >= 30) {
    start.setHours(start.getHours() + 1);
    start.setMinutes(0, 0, 0);
  } else {
    start.setMinutes(30, 0, 0);
  }

  end.setTime(start.getTime() + 30 * 60 * 1000);

  return [start, end];
};

export const getWeekDates = (dateStr: string): number[] => {
  const date = new Date(dateStr);

  const day = date.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;

  const monday = new Date(date);
  monday.setDate(date.getDate() + diffToMonday);

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.getDate();
  });

  return weekDates;
};

export const formatDateToKST = (isoString: string) => {
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const isAM = hours < 12;
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;

  return `${year}년 ${month}월 ${day}일, ${
    isAM ? "오전" : "오후"
  } ${hour12}:${minutes}`;
};
