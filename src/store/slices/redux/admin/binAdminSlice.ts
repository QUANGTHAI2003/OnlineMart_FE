import { RootState } from "@app/store/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type initalStateType = {
  searchValue: string | null;
  selectSearchType: string;
  filteredValue: {
    searchValueFilter: string;
  };
};

const initialState: initalStateType = {
  searchValue: "",
  selectSearchType: "name",
  filteredValue: {
    searchValueFilter: "",
  },
};

const binAdminSlice = createSlice({
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
  },
});

export const { setSearchValue, setSelectSearchType, deleteFilteredValue, deleteOneFilteredValue } =
  binAdminSlice.actions;

export default binAdminSlice.reducer;
