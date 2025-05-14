import { createSelector } from "reselect";
import type { RootState } from "../store";
import { getStartOfWeek, getLastOfWeek } from "../utils/date";

export const selectAllEvents = (state: RootState) => state.calendar.events;

export const selectSelectedDate = (state: RootState) =>
  state.calendar.selectedDate;

export const selectEventsForWeek = createSelector(
  [selectAllEvents, selectSelectedDate],
  (events, selectedDate) => {
    const weekStart = new Date(getStartOfWeek(selectedDate));
    const weekEnd = new Date(getLastOfWeek(selectedDate));
    return events
      .map((ev) => {
        const s = new Date(ev.startDate);
        const e = new Date(ev.endDate);
        return {
          ...ev,
          startDate: s < weekStart ? weekStart.toISOString() : ev.startDate,
          endDate: e > weekEnd ? weekEnd.toISOString() : ev.endDate,
        };
      })
      .filter(
        (ev) =>
          new Date(ev.endDate) >= weekStart && new Date(ev.startDate) <= weekEnd
      );
  }
);
