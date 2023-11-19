import { RootState } from "@app/store/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type initalStateType = {
  searchValue: string | null;
  selectSearchType: string;
  dateValue: any[];
  filteredValue: {
    searchValueFilter: string;
    categoryFilter: number[];
    brandFilter: number[];
    delivery_om: boolean;
    delivery_ghtk: boolean;
    dateFilter: string | null;
  };
  errorForm: any;
};

const initialState: initalStateType = {
  searchValue: "",
  selectSearchType: "id",
  dateValue: [],
  filteredValue: {
    searchValueFilter: "",
    categoryFilter: [],
    brandFilter: [],
    delivery_om: false,
    delivery_ghtk: false,
    dateFilter: "",
  },
  errorForm: [],
};

const orderAdminSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    setSearchValue: (state: RootState, action: PayloadAction<any>) => {
      state.searchValue = action.payload;
      state.filteredValue.searchValueFilter = action.payload;
    },
    setSelectSearchType: (state: RootState, action: PayloadAction<any>) => {
      state.selectSearchType = action.payload;
    },
    setOrderIdValue: (state: RootState, action: PayloadAction<any>) => {
      state.orderIdValue = action.payload;
      state.filteredValue.orderIdFilter = action.payload;
    },
    setDeliveryOm: (state: RootState, action: PayloadAction<boolean>) => {
      state.filteredValue.delivery_om = action.payload;
    },
    setDeliveryGHTK: (state: RootState, action: PayloadAction<boolean>) => {
      state.filteredValue.delivery_ghtk = action.payload;
    },
    setDate: (state: RootState, action: PayloadAction<any>) => {
      state.filteredValue.dateFilter = action.payload;
    },
    deleteFilteredValue: (state: RootState) => {
      state.filteredValue = initialState.filteredValue;
    },
    deleteOneFilteredValue: (state: RootState, action: PayloadAction<string>) => {
      if (action.payload === "searchValueFilter") {
        state.filteredValue.searchValueFilter = "";
      } else {
        state.filteredValue[action.payload] = [];
      }
    },

    setFormError: (state: RootState, action: PayloadAction<any>) => {
      state.errorForm = action.payload;
    },
  },
});

export const {
  setSearchValue,
  setSelectSearchType,
  setDeliveryOm,
  setDeliveryGHTK,
  setDate,
  deleteFilteredValue,
  deleteOneFilteredValue,
  setFormError,
} = orderAdminSlice.actions;

export default orderAdminSlice.reducer;
