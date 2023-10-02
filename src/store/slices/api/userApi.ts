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
          credentials: "include",
        };
      },
      providesTags(result) {
        return result ? [{ type: "User", id: result.id }] : [];
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
    // Update user
    updateUser: builder.mutation<IUser, Partial<IUser>>({
      query(data: Partial<IUser>) {
        return {
          url: `user/${data.id}`,
          method: "PATCH",
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
          method: "POST",
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

export const { useGetMeQuery, useUpdateUserMutation, useDeleteUserAvatarMutation } = userApi;
