import { IProductCategory } from "@app/types/products_category.types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryCustom from "../baseQueryCustom";

export const productCategoryApi = createApi({
  reducerPath: "productCategoryApi",
  baseQuery: baseQueryCustom,
  endpoints: (builder) => ({
    // Get product in category page
    getProductCategory: builder.query<IProductCategory, any>({
      query: ({ id, page }) => {
        return {
          url: `product/category/${id}?page=${page}`,
        };
      },
      transformResponse: (response: { data: IProductCategory }) => {
        return response.data;
      },
    }),
  }),
});

export const { useGetProductCategoryQuery } = productCategoryApi;
