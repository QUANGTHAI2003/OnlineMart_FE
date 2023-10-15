import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  price: null,
};

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState: initialState,
  reducers: {
    setPrice: (state, action) => {
      state.price = action.payload;
    },
  },
});

export const { setPrice } = productDetailSlice.actions;

export default productDetailSlice.reducer;
