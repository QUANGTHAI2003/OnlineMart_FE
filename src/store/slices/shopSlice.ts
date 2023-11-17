import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  information: null,
};

const shopSlice = createSlice({
  name: "shopInformation",
  initialState: initialState,
  reducers: {
    setInformation: (state, action) => {
      state.information = action.payload;
    },
  },
});

export const { setInformation } = shopSlice.actions;

export default shopSlice.reducer;
