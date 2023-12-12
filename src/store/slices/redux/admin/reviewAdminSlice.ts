import { RootState } from "@app/store/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type initalStateType = {
  searchValue: string | null;
  selectSearchType: string;
  categoryValue: any[];
  brandValue: any[];
  filterOptions: any[];
  mediaFilter: boolean;
  hasRepliedFilter: null | boolean;
  filteredValue: {
    searchValueFilter: string;
    brandFilter: number[];
    startDateFilter: string | null;
    endDateFilter: string | null;
  };
};

const initialState: initalStateType = {
  searchValue: "",
  selectSearchType: "product_name",
  categoryValue: [],
  brandValue: [],
  filterOptions: [],
  mediaFilter: false,
  hasRepliedFilter: null,
  filteredValue: {
    searchValueFilter: "",
    brandFilter: [],
    startDateFilter: null,
    endDateFilter: null,
  },
};

const reviewAdminSlice = createSlice({
  name: "review",
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
    setMediaIncluded: (state, action: PayloadAction<boolean>) => {
      state.mediaFilter = action.payload;
    },
    setHasRepliedIncluded: (state, action: PayloadAction<boolean | null>) => {
      state.hasRepliedFilter = action.payload;
    },
    setStartDate: (state, action: PayloadAction<string>) => {
      state.filteredValue.startDateFilter = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.filteredValue.endDateFilter = action.payload;
    },
    setFilterOptions: (state: RootState, action: PayloadAction<any>) => {
      state.filterOptions = action.payload;
    },
    deleteFilteredValue: (state: RootState) => {
      state.filteredValue = initialState.filteredValue;
      state.searchValue = initialState.searchValue;
    },
    deleteOneFilteredValue: (state: RootState, action: PayloadAction<string>) => {
      if (action.payload === "searchValueFilter") {
        state.filteredValue.searchValueFilter = "";
      } else if (action.payload === "endDateFilter") {
        state.filteredValue.startDateFilter = null;
        state.filteredValue.endDateFilter = null;
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
  setMediaIncluded,
  setHasRepliedIncluded,
  setStartDate,
  setEndDate,
  setFilterOptions,
  deleteFilteredValue,
  deleteOneFilteredValue,
} = reviewAdminSlice.actions;

export default reviewAdminSlice.reducer;
