import { RootState } from "@app/store/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IDataCart {
  productName: string;
  productImage: string;
  regularPrice: number;
  salePrice: number;
  stock: number;
  cartQuantity?: number;
}

interface IProductDetailState {
  price: null | number;
  dataCart: IDataCart;
}

const initialState: IProductDetailState = {
  price: null,
  dataCart: {
    productName: "",
    productImage: "",
    regularPrice: 0,
    salePrice: 0,
    stock: 0,
    cartQuantity: 1,
  },
};

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState: initialState,
  reducers: {
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setDataCart: (state: RootState, action: PayloadAction<any>) => {
      state.dataCart = action.payload;
    },
  },
});

export const { setPrice, setDataCart } = productDetailSlice.actions;

export default productDetailSlice.reducer;
