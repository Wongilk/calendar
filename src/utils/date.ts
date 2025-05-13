import { parseTimeTo24 } from "./time";

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

export const combineDateAndTime = (date: Date, timeStr: string): string => {
  const { hours, minutes } = parseTimeTo24(timeStr);
  const combined = new Date(date);
  combined.setHours(hours);
  combined.setMinutes(minutes);
  combined.setSeconds(0);
  combined.setMilliseconds(0);
  return combined.toISOString();
};

export const getStartOfWeek = (date: string): string => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - (day === 0 ? 6 : day - 1);
  const weekStart = new Date(d.setDate(diff));
  weekStart.setHours(0, 0, 0, 0);
  return weekStart.toISOString();
};

export const getCurrentAndNextTimes = (): [string, string] => {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  if (minutes >= 30) {
    hours += 1;
    minutes = 0;
  } else {
    minutes = 30;
  }

  const nextHours = hours + (minutes == 0 ? 0 : 1);
  const nextMinutes = (minutes + 30) % 60;

  const formatTime = (hours: number, minutes: number): string => {
    const period = hours < 12 ? "오전" : "오후";
    const hour12 = hours % 12 === 0 ? 12 : hours % 12;
    const hourStr = hour12 < 10 ? `0${hour12}` : `${hour12}`;
    const minuteStr = minutes === 0 ? "00" : `${minutes}`;
    return `${period} ${hourStr}:${minuteStr}`;
  };

  const startTime = formatTime(hours, minutes);
  const endTime = formatTime(nextHours, nextMinutes);

  return [startTime, endTime];
};
