import type { DayEvent } from "../features/calendar/calendarSlice";

export function splitEventByDay(event: DayEvent): DayEvent[] {
  const start = new Date(event.startDate);
  const end = new Date(event.endDate);
  const fragments: DayEvent[] = [];

  const startOfNextDay = new Date(start);
  startOfNextDay.setHours(24, 0, 0, 0);

  fragments.push({
    ...event,
    startDate: start.toISOString(),
    endDate:
      end.getDate() !== start.getDate()
        ? startOfNextDay.toISOString()
        : end.toISOString(),
  });

  if (end.getTime() > startOfNextDay.getTime()) {
    const endFragmentStart = startOfNextDay;

    fragments.push({
      ...event,
      startDate: endFragmentStart.toISOString(),
      endDate: end.toISOString(),
    });
  }

  return fragments;
}
