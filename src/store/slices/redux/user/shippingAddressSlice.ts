import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  address: {},
  method: null,
};

const shippingAddressSlice = createSlice({
  name: "shippingAddress",
  initialState: initialState,
  reducers: {
    setShippingAddress: (state, action) => {
      state.address = action.payload;
    },
    setPaymentMethod: (state, action) => {
      state.method = action.payload;
    },
  },
});

export const { setShippingAddress, setPaymentMethod } = shippingAddressSlice.actions;

export default shippingAddressSlice.reducer;
