import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface DayEvent {
  id: string;
  title: string;
  time: string;
}

interface WeekEvents {
  [weekStartDate: string]: DayEvent[];
}

interface CalendarState {
  selectedDate: Date | undefined;
  weekEvents: WeekEvents;
}

const initialState: CalendarState = {
  selectedDate: new Date(),
  weekEvents: {},
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<Date | undefined>) => {
      state.selectedDate = action.payload;
    },
  },
});

export const { setSelectedDate } = calendarSlice.actions;
export default calendarSlice.reducer;
