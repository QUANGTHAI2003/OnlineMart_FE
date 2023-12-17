import { IManagerShop } from "@app/types/shop.types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryCustom from "../../baseQueryCustom";

export const managerShopApi = createApi({
  reducerPath: "managerShopApi",
  baseQuery: baseQueryCustom,
  tagTypes: ["ManagerShop"],
  endpoints: (builder) => ({
    getListManagerShop: builder.query<IManagerShop[], void>({
      query: () => ({
        url: `superadmin/list-shop`,
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (response: { data: IManagerShop[] }) => {
        return response.data;
      },
      providesTags(result) {
        return result ? [{ type: "ManagerShop", id: "LIST" }] : [];
      },
    }),
    accpectShop: builder.mutation<any, any>({
      query: (shopId) => ({
        url: `superadmin/change-accpect/${shopId}`,
        method: "PUT",
      }),
      invalidatesTags: (): any => [{ type: "ManagerShop", id: "LIST" }],
    }),
    reasonAccpectShop: builder.mutation<any, any>({
      query: ({ shopId, data }) => {
        return {
          url: `superadmin/reason-accpect/${shopId}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: (): any => [{ type: "ManagerShop", id: "LIST" }],
    }),
  }),
});

export const { useGetListManagerShopQuery, useAccpectShopMutation, useReasonAccpectShopMutation } = managerShopApi;
