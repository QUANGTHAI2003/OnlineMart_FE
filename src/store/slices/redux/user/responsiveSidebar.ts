import { RootState } from "@app/store/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  showSidebar: true,
};

const responsiveSidebar = createSlice({
  name: "responsiveSidebar",
  initialState: initialState,
  reducers: {
    setShowSidebar: (state: RootState, action: PayloadAction<boolean>) => {
      state.showSidebar = action.payload;
    },
  },
});

export const { setShowSidebar } = responsiveSidebar.actions;

export default responsiveSidebar.reducer;
