import { RootState } from "@app/store/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type initalStateType = {
  shopId: number | null;
};

const initialState: initalStateType = {
  shopId: null,
};

const managerShopSlice = createSlice({
  name: "managerShop",
  initialState: initialState,
  reducers: {
    setShopId: (state: RootState, action: PayloadAction<any>) => {
      state.shopId = action.payload;
    },
    setShopIdReset: (state: RootState) => {
      state.shopId = null;
    },
  },
});

export const { setShopId } = managerShopSlice.actions;

export default managerShopSlice.reducer;
