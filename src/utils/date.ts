export const getYearMonth = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1);
  return `${year}년 ${month}월`;
};

export const getMonthDayWeekday = (): string => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekdayIndex = date.getDay();
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const weekday = dayNames[weekdayIndex];
  return `${month}월 ${day}일 (${weekday}요일)`;
};
