import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  cart: [],
};

const cartCheckoutSlice = createSlice({
  name: "cartCheckout",
  initialState: initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const { setCart } = cartCheckoutSlice.actions;

export default cartCheckoutSlice.reducer;
