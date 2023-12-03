import { IProductFlashSale } from "@app/types/product.types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryCustom from "../../baseQueryCustom";

export const productFlashsaleApi = createApi({
  reducerPath: "productFlashsaleApi",
  baseQuery: baseQueryCustom,
  keepUnusedDataFor: 1,
  endpoints: (builder) => ({
    getProductFlashsale: builder.query<IProductFlashSale[], void>({
      query: () => {
        return {
          url: `product/flash-sale`,
        };
      },
      transformResponse: (response: { data: IProductFlashSale[] }) => {
        return response.data;
      },
    }),
  }),
});

export const { useGetProductFlashsaleQuery } = productFlashsaleApi;
