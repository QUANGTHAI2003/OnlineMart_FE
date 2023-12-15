import { IProduct } from "@app/types/product.types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryCustom from "../../baseQueryCustom";

export const productAdminApi = createApi({
  reducerPath: "productAdminApi",
  tagTypes: ["Product"],
  baseQuery: baseQueryCustom,
  endpoints: (builder) => ({
    // Lấy danh sách sản phẩm trang admin
    getProduct: builder.query<IProduct[], void>({
      query: () => {
        return {
          url: `product`,
          credentials: "include",
        };
      },
      transformResponse: (response: { data: IProduct[] }) => {
        return response.data;
      },
      providesTags: (result): any => {
        if (result) {
          return [...result.map(({ id }) => ({ type: "Product", id })), { type: "Product", id: "LIST" }];
        }

        return [{ type: "Product" as const, id: "LIST" }];
      },
    }),
    // Lấy sản phẩm chi tiết
    getProductDetail: builder.query<any, number>({
      query: (id) => {
        return {
          url: `product/${id}`,
          credentials: "include",
        };
      },
      transformResponse: (response: { data: any }) => {
        return response.data;
      },
    }),
    // Thêm sản phẩm trang admin
    addProduct: builder.mutation<IProduct, any>({
      query: (body) => {
        return {
          url: `product`,
          method: "POST",
          body,
          credentials: "include",
        };
      },
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    updateProduct: builder.mutation<IProduct, { body: any; id: number }>({
      query: (data) => {
        return {
          url: `product/${data.id}`,
          method: "POST",
          body: data.body,
          credentials: "include",
        };
      },
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    deleteProduct: builder.mutation<any, any>({
      query: (productId) => {
        return {
          url: `product/${productId}`,
          method: "DELETE",
          credentials: "include",
        };
      },
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    deleteMultipleProduct: builder.mutation<any, any>({
      query: (productId) => {
        return {
          url: `product/${productId}/delete-multiple`,
          method: "DELETE",
          credentials: "include",
        };
      },
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    updateStatusMultiple: builder.mutation<any, any>({
      query: ({ productId, status }) => {
        return {
          url: `product/${productId}/${status}/status`,
          method: "PATCH",
          credentials: "include",
        };
      },
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetProductDetailQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useDeleteMultipleProductMutation,
  useUpdateStatusMultipleMutation,
} = productAdminApi;
