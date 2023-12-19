import { IUser } from "@app/types/user.types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

interface IAuthState {
  user: IUser | null;
  access_token: string | null;
  loading: boolean;
}

const initialState: IAuthState = {
  user: null,
  access_token: null,
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
    setAccessToken: (state: RootState, action: PayloadAction<any>) => {
      state.access_token = action.payload;
    },
    logOut: (state: RootState) => {
      state.user = null;
    },
  },
});

export const { setCredentials, logOut, setAccessToken } = authSlice.actions;

export default authSlice.reducer;
