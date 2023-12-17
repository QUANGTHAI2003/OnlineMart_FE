import { IShop } from "@app/types/shop.types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryCustom from "../baseQueryCustom";

export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: baseQueryCustom,
  tagTypes: ["Shop"],
  endpoints: (builder) => ({
    //  Get information shop
    getShop: builder.query<IShop, string | undefined>({
      query: (slug) => {
        return {
          url: `shops/${slug}`,
        };
      },
      transformResponse: (response: { data: IShop }) => {
        return response.data;
      },
    }),
    getShopList: builder.query<any, void>({
      query: () => ({
        url: `shops`,
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (response: { data: any }) => {
        return response.data;
      },
    }),
  }),
});

export const { useGetShopQuery, useGetShopListQuery } = shopApi;
