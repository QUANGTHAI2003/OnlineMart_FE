import { IUser } from "@app/types/user.types";
import { createApi } from "@reduxjs/toolkit/query/react";

import { setCredentials } from "../authSlice";
import baseQueryCustom from "../baseQueryCustom";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryCustom,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getMe: builder.query<IUser, null>({
      query() {
        return {
          url: "users/me",
          credentials: "include",
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch (error) {
          console.log("error... ", error);
        }
      },
    }),
  }),
});
