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
      query: (id) => {
        return {
          url: `shops/${id}`,
        };
      },
      transformResponse: (response: { data: IShop }) => {
        return response.data;
      },
    }),
  }),
});

export const { useGetShopQuery } = shopApi;
