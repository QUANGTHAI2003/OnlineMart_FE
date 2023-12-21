import { IUserFolow } from "@app/types/userfolow.types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryCustom from "../../baseQueryCustom";

export const userFolowApi = createApi({
  reducerPath: "userFolowApi",
  baseQuery: baseQueryCustom,
  tagTypes: ["userFolow"],
  endpoints: (builder) => ({
    getUserFolow: builder.query<IUserFolow[], any>({
      query: ({ user_id, shop_id }) => {
        return {
          url: `/users/folow/${user_id}/${shop_id}`,
          method: "GET",
        };
      },
      transformResponse: (response: { data: IUserFolow[] }) => {
        return response.data;
      },
      providesTags: (result): any => {
        if (result) {
          const final = [...result.map(({ id }) => ({ type: "userFolow", id })), { type: "userFolow", id: "LIST" }];
          return final;
        }
        return [{ type: "userFolow" as const, id: "LIST" }];
      },
    }),
    // huy follow
    deleteFolow: builder.mutation<IUserFolow[], any>({
      query: ({ user_id, shop_id }) => {
        return {
          url: `users/folow/${user_id}/${shop_id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (): any => [{ type: "Voucher", id: "LIST" }],
    }),
    // them follow
    folowShop: builder.mutation<IUserFolow, any>({
      query(data) {
        return {
          url: "users/folow",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: (): any => [{ type: "userFolow", id: "LIST" }],
    }),
  }),
});

export const { useGetUserFolowQuery, useFolowShopMutation, useDeleteFolowMutation } = userFolowApi;
