import { RootState } from "@app/store/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IDataCart {
  productName: string;
  productVariantValue?: string;
  productImage: string;
  regularPrice: number;
  salePrice: number;
  stock: number;
  cartQuantity?: number;
}

interface IProductDetailState {
  price: null | number;
  dataCart: IDataCart;
  rating: number;
  reviewCount: number;
}

const initialState: IProductDetailState = {
  price: null,
  dataCart: {
    productName: "",
    productVariantValue: "",
    productImage: "",
    regularPrice: 0,
    salePrice: 0,
    stock: 0,
    cartQuantity: 1,
  },
  rating: 0,
  reviewCount: 0,
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
    setRating: (state: RootState, action: PayloadAction<any>) => {
      state.rating = action.payload;
    },
    setReview: (state: RootState, action: PayloadAction<any>) => {
      state.reviewCount = action.payload;
    },
  },
});

export const { setPrice, setDataCart, setRating, setReview } = productDetailSlice.actions;

export default productDetailSlice.reducer;
