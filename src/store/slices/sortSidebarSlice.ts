import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  category: null,
  price: null,
  shop: null,
  supplier: null,
};

const sortSidebarSlice = createSlice({
  name: "sortSidebar",
  initialState: initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setShop: (state, action) => {
      state.shop = action.payload;
    },
    setSupplier: (state, action) => {
      state.supplier = action.payload;
    },
  },
});

export const { setCategory, setPrice, setShop, setSupplier } = sortSidebarSlice.actions;

export default sortSidebarSlice.reducer;
