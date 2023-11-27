import { RootState } from "@app/store/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type initalStateType = {
  searchValue: string | null;
  selectSearchType: string;
  authorValue: any[];
  actionValue: any[];
  filteredValue: {
    searchValueFilter: string;
    authorFilter: number[];
    actionFilter: string[];
    startDateFilter: string | null;
    endDateFilter: string | null;
  };
};

const initialState: initalStateType = {
  searchValue: "",
  selectSearchType: "author",
  authorValue: [],
  actionValue: [],
  filteredValue: {
    searchValueFilter: "",
    authorFilter: [],
    actionFilter: [],
    startDateFilter: null,
    endDateFilter: null,
  },
};

const activityAdminSlice = createSlice({
  name: "activity",
  initialState: initialState,
  reducers: {
    setSearchValue: (state: RootState, action: PayloadAction<any>) => {
      state.searchValue = action.payload;
      state.filteredValue.searchValueFilter = action.payload;
    },
    setSelectSearchType: (state: RootState, action: PayloadAction<any>) => {
      state.selectSearchType = action.payload;
    },
    setAuthorValue: (state: RootState, action: PayloadAction<any>) => {
      state.authorValue = action.payload;
      state.filteredValue.authorFilter = action.payload;
    },
    setActionValue: (state: RootState, action: PayloadAction<any>) => {
      state.actionValue = action.payload;
      state.filteredValue.actionFilter = action.payload;
    },
    setStartDate: (state: RootState, action: PayloadAction<string>) => {
      state.filteredValue.startDateFilter = action.payload;
    },
    setEndDate: (state: RootState, action: PayloadAction<string>) => {
      state.filteredValue.endDateFilter = action.payload;
    },
    deleteFilteredValue: (state: RootState) => {
      state.filteredValue = initialState.filteredValue;
    },
    deleteOneFilteredValue: (state: RootState, action: PayloadAction<string>) => {
      if (action.payload === "searchValueFilter") {
        state.filteredValue.searchValueFilter = "";
      } else if (action.payload === "authorFilter") {
        state.filteredValue.authorFilter = [];
      } else if (action.payload === "actionFilter") {
        state.filteredValue.actionFilter = [];
      } else if (action.payload === "endDateFilter") {
        state.filteredValue.startDateFilter = null;
        state.filteredValue.endDateFilter = null;
      } else {
        state.filteredValue[action.payload] = [];
      }
    },
  },
});

export const {
  setSearchValue,
  setSelectSearchType,
  setAuthorValue,
  setActionValue,
  deleteFilteredValue,
  deleteOneFilteredValue,
  setStartDate,
  setEndDate,
} = activityAdminSlice.actions;

export default activityAdminSlice.reducer;
