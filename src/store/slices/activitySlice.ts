import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  activities: null,
};

const activitySlice = createSlice({
  name: "activitiesLogs",
  initialState: initialState,
  reducers: {
    setActivity: (state, action) => {
      state.activities = action.payload;
    },
  },
});

export const { setActivity } = activitySlice.actions;

export default activitySlice.reducer;
