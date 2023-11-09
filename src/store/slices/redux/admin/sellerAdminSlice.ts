import { RootState } from "@app/store/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type initalStateType = {
  searchValue: string | null;
  selectSearchType: string;
  filteredValue: {
    searchValueFilter: string;
    statusType: string;
    permissionFilter: string[];
  };
};

const initialState: initalStateType = {
  searchValue: "",
  selectSearchType: "name",
  filteredValue: {
    searchValueFilter: "",
    statusType: "",
    permissionFilter: [],
  },
};

const sellerAdminSlice = createSlice({
  name: "seller",
  initialState: initialState,
  reducers: {
    setSearchValue: (state: RootState, action: PayloadAction<any>) => {
      state.searchValue = action.payload;
      state.filteredValue.searchValueFilter = action.payload;
    },
    setSelectSearchType: (state: RootState, action: PayloadAction<any>) => {
      state.selectSearchType = action.payload;
    },
    setStatusType: (state: RootState, action: PayloadAction<any>) => {
      state.filteredValue.statusType = action.payload;
    },
    setPermission: (state: RootState, action: PayloadAction<any>) => {
      state.filteredValue.permissionFilter = action.payload;
    },
    deleteFilteredValue: (state: RootState) => {
      state.filteredValue = initialState.filteredValue;
    },
    deleteOneFilteredValue: (state: RootState, action: PayloadAction<string>) => {
      if (action.payload === "searchValueFilter") {
        state.filteredValue.searchValueFilter = "";
      } else if (action.payload === "statusType") {
        state.filteredValue.statusType = "";
      } else if (action.payload === "permissionFilter") {
        state.filteredValue.permissionFilter = [];
      }
    },
  },
});

export const {
  setSearchValue,
  setSelectSearchType,
  setStatusType,
  setPermission,
  deleteFilteredValue,
  deleteOneFilteredValue,
} = sellerAdminSlice.actions;

export default sellerAdminSlice.reducer;
