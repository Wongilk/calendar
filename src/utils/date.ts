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

// export const getStartOfWeek = (date: Date = new Date()) => {
//   const day = date.getDay();
//   const diff = day === 0 ? -6 : 1 - day;
//   const monday = new Date(date);
//   monday.setDate(date.getDate() + diff);
//   monday.setHours(0, 0, 0, 0);
//   return monday;
// };
