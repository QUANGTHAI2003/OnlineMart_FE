import { RootState } from "@app/store/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  isShowNotification: false,
  notificationCount: 0,
};

const showNotificationSlice = createSlice({
  name: "showNotification",
  initialState: initialState,
  reducers: {
    setNotification: (state: RootState, action: PayloadAction<any>) => {
      state.isShowNotification = action.payload;
    },
    setNotificationCount: (state: RootState, action: PayloadAction<any>) => {
      state.notificationCount = action.payload;
    },
  },
});

export const { setNotification, setNotificationCount } = showNotificationSlice.actions;

export default showNotificationSlice.reducer;
