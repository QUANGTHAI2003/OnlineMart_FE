import { RootState } from "@app/store/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type initalStateType = {
  searchValue: string | null;
  selectSearchType: string;
  categoryValue: any[];
  brandValue: any[];
  filteredValue: {
    searchValueFilter: string;
    categoryFilter: number[];
    brandFilter: number[];
    dateFilter: string | null;
  };
};

const initialState: initalStateType = {
  searchValue: "",
  selectSearchType: "name",
  categoryValue: [],
  brandValue: [],
  filteredValue: {
    searchValueFilter: "",
    categoryFilter: [],
    brandFilter: [],
    dateFilter: null,
  },
};

const inventoryAdminSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    setSearchValue: (state: RootState, action: PayloadAction<any>) => {
      state.searchValue = action.payload;
      state.filteredValue.searchValueFilter = action.payload;
    },
    setSelectSearchType: (state: RootState, action: PayloadAction<any>) => {
      state.selectSearchType = action.payload;
    },
    setBrandValue: (state: RootState, action: PayloadAction<any>) => {
      state.brandValue = action.payload;
      state.filteredValue.brandFilter = action.payload;
    },
    setCategoryValue: (state: RootState, action: PayloadAction<any>) => {
      state.categoryValue = action.payload;
      state.filteredValue.categoryFilter = action.payload;
    },
    setDateValue: (state: RootState, action: PayloadAction<any>) => {
      state.filteredValue.dateFilter = action.payload;
    },
    deleteFilteredValue: (state: RootState) => {
      state.filteredValue = initialState.filteredValue;
    },
    deleteOneFilteredValue: (state: RootState, action: PayloadAction<string>) => {
      if (action.payload === "searchValueFilter") {
        state.filteredValue.searchValueFilter = "";
      } else if (action.payload === "dateFilter") {
        state.filteredValue.dateFilter = null;
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
  setCategoryValue,
  setBrandValue,
  setDateValue,
  deleteFilteredValue,
  deleteOneFilteredValue,
  setFormError,
} = inventoryAdminSlice.actions;

export default inventoryAdminSlice.reducer;
