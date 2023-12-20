import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  fee: {},
};

const apiGHNSlice = createSlice({
  name: "shippingFee",
  initialState: initialState,
  reducers: {
    setShippingFee: (state, action) => {
      state.fee = action.payload;
    },
  },
});

export const { setShippingFee } = apiGHNSlice.actions;

export default apiGHNSlice.reducer;
