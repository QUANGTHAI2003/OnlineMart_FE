import { IProductData } from "@app/app/components/clients/OtherProduct/OtherProduct";
import { IProduct } from "@app/types/product.types";
import { IProductDetail } from "@app/types/product_detail.type";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryCustom from "../../baseQueryCustom";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: baseQueryCustom,
  keepUnusedDataFor: 1,
  endpoints: (builder) => ({
    getAllProduct: builder.query<IProduct[], void>({
      query: () => {
        return {
          url: `product/all`,
        };
      },
      transformResponse: (response: { data: IProduct[] }) => {
        return response.data;
      },
    }),
    // Get product in category page
    getProductDetail: builder.query<IProductDetail, number>({
      query: (id) => {
        return {
          url: `product/detail/${id}`,
        };
      },
      transformResponse: (response: { data: IProductDetail }) => {
        return response.data;
      },
    }),
    // Get related products
    getRelatedProducts: builder.query<IProductData[], number>({
      query: (id) => {
        return {
          url: `product/${id}/related`,
        };
      },
      transformResponse: (response: { data: IProductData[] }) => {
        return response.data;
      },
    }),
  }),
});

export const { useGetAllProductQuery, useGetProductDetailQuery, useGetRelatedProductsQuery } = productApi;
