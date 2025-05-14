import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface DayEvent {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
}

interface CalendarState {
  selectedDate: string;
  events: DayEvent[];
}
const initialState: CalendarState = {
  selectedDate: new Date().toISOString(),
  events: [],
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
    addEvent: (state, action: PayloadAction<DayEvent>) => {
      state.events.push(action.payload);
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter((e) => e.id !== action.payload);
    },
  },
});

export const { setSelectedDate, addEvent, deleteEvent } = calendarSlice.actions;
export default calendarSlice.reducer;
