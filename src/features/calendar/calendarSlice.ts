import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getStartOfWeek } from "../../utils/date";

export interface DayEvent {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
}

interface WeekEvents {
  [weekStartDate: string]: DayEvent[];
}

interface CalendarState {
  selectedDate: string;
  weekEvents: WeekEvents;
}

const initialState: CalendarState = {
  selectedDate: new Date().toISOString(),
  weekEvents: {},
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
    addEvent: (state, action: PayloadAction<DayEvent>) => {
      const event = action.payload;
      const weekStart = getStartOfWeek(event.startDate);
      if (!state.weekEvents[weekStart]) {
        state.weekEvents[weekStart] = [];
      }
      state.weekEvents[weekStart].push(event);
    },
    deleteEvent: (
      state,
      action: PayloadAction<{ id: string; startDate: string }>
    ) => {
      const { id, startDate } = action.payload;
      const weekStart = getStartOfWeek(startDate);

      if (!state.weekEvents[weekStart]) return;

      state.weekEvents[weekStart] = state.weekEvents[weekStart].filter(
        (event) => event.id !== id
      );

      if (state.weekEvents[weekStart].length === 0) {
        delete state.weekEvents[weekStart];
      }
    },
  },
});

export const { setSelectedDate, addEvent, deleteEvent } = calendarSlice.actions;
export default calendarSlice.reducer;
