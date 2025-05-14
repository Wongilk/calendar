import type { DayEvent } from "../features/calendar/calendarSlice";

export function splitEventByDay(event: DayEvent): DayEvent[] {
  const start = new Date(event.startDate);
  const end = new Date(event.endDate);
  const fragments: DayEvent[] = [];

  // 1) 다음 날로 넘어가는가?
  const sameDay = start.getDate() === end.getDate();

  if (sameDay) {
    fragments.push({ ...event });
    return fragments;
  }

  // 2) 당일 남은 부분
  const startDayLeft = new Date(start);
  startDayLeft.setHours(24, 0, 0, 0);
  fragments.push({
    ...event,
    startDate: start.toISOString(),
    endDate: startDayLeft.toISOString(),
  });

  // 3) 다음날 남은 부분
  const endDayStart = new Date(end);
  endDayStart.setHours(0, 0, 0, 0);
  fragments.push({
    ...event,
    startDate: endDayStart.toISOString(),
    endDate: end.toISOString(),
  });

  return fragments;
}
