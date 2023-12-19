import { IUser } from "@app/types/user.types";
import { createApi } from "@reduxjs/toolkit/query/react";

import { setCredentials } from "../authSlice";
import baseQueryCustom from "../baseQueryCustom";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryCustom,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    // Get user logged in
    getMe: builder.query<IUser, null>({
      query() {
        return {
          url: "users/me",
        };
      },
      providesTags(result) {
        return result ? [{ type: "User", id: result.id }] : [];
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("🚀 ~ data: ", data);
          dispatch(setCredentials(data));
        } catch (error) {
          console.log("error... ", error);
        }
      },
    }),
    // Update user
    updateUser: builder.mutation<IUser, any>({
      query(data) {
        return {
          url: `user/${data.id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: (result, _, body) => [
        {
          type: "User",
          id: result ? result.id : body.id,
        },
      ],
    }),
    // Update avatar user
    updateUserAvatar: builder.mutation<IUser, any>({
      query({ data, id }) {
        return {
          url: `user/avatar/${id}`,
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
      invalidatesTags: (result, _, body) => [
        {
          type: "User",
          id: result ? result.id : body.id,
        },
      ],
    }),
    // Delete a user avatar
    deleteUserAvatar: builder.mutation<any, number>({
      query(id) {
        return {
          url: `user/delete-avatar/${id}`,
          method: "PUT",
          credentials: "include",
        };
      },
      invalidatesTags: (result, _, id) => [
        {
          type: "User",
          id: result ? result.id : id,
        },
      ],
    }),
  }),
});

export const { useGetMeQuery, useUpdateUserMutation, useUpdateUserAvatarMutation, useDeleteUserAvatarMutation } =
  userApi;
