import { IUser } from "@app/types/user.types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryCustom from "../baseQueryCustom";

import { userApi } from "./userApi";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryCustom,
  endpoints: (builder) => ({
    registerUser: builder.mutation<IUser, any>({
      query(data) {
        console.log({ data });
        return {
          url: "auth/register",
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getMe.initiate(null));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    loginUser: builder.mutation<IUser, any>({
      query(data) {
        return {
          url: "auth/login",
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getMe.initiate(null));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    logoutUser: builder.mutation<void, void>({
      query() {
        return {
          url: "auth/logout",
          method: "POST",
          credentials: "include",
        };
      },
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation, useLogoutUserMutation } = authApi;
