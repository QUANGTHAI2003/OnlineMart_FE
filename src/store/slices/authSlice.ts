import { IUser } from "@app/types/user.types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

interface IAuthState {
  user: IUser | null;
  loading: boolean;
}

const initialState: IAuthState = {
  user: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredentials: (state: RootState, action: PayloadAction<any>) => {
      state.user = action.payload.data;
      state.loading = false;
    },
    logOut: (state: RootState) => {
      state.user = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
