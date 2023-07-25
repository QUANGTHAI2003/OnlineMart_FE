import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editing: false,
  permission: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    isEditing(state, action) {
      state.editing = action.payload;
    },
  },
});

export const { isEditing } = appSlice.actions;
export default appSlice.reducer;
