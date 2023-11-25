import { IBin } from "@app/types/bin.types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryCustom from "../../baseQueryCustom";

export const binAdminApi = createApi({
  reducerPath: "binAdminApi",
  tagTypes: ["Bin"],
  baseQuery: baseQueryCustom,
  endpoints: (builder) => ({
    // Lấy danh sách sản phẩm bị xóa mềm
    getBin: builder.query<IBin[], void>({
      query: () => {
        return {
          url: `bin/products`,
        };
      },
      transformResponse: (response: { data: IBin[] }) => {
        return response.data;
      },
      providesTags: (result): any => {
        if (result) {
          return [...result.map(({ id }) => ({ type: "Bin", id })), { type: "Bin", id: "LIST" }];
        }

        return [{ type: "Bin" as const, id: "LIST" }];
      },
    }),

    // Khôi phục một sản phẩm
    updateRestoreProduct: builder.mutation<IBin, number>({
      query: (data) => {
        return {
          url: `bin/products/${data}`,
          method: "PATCH",
          credentials: "include",
        };
      },
      invalidatesTags: [{ type: "Bin", id: "LIST" }],
    }),

    // Khôi phục nhiều sản phẩm
    updateStoreMultiple: builder.mutation<any, any>({
      query: ({ productId }) => {
        return {
          url: `bin/${productId}/restore`,
          method: "PATCH",
          credentials: "include",
        };
      },
      invalidatesTags: [{ type: "Bin", id: "LIST" }],
    }),

    // Xóa 1 sản phẩm
    deleteProduct: builder.mutation<any, any>({
      query: (productId) => {
        return {
          url: `bin/products/${productId}`,
          method: "DELETE",
          credentials: "include",
        };
      },
      invalidatesTags: [{ type: "Bin", id: "LIST" }],
    }),

    // Xóa nhiều sản phẩm
    deleteMultipleProduct: builder.mutation<any, any[]>({
      query: (productId) => {
        return {
          url: `bin/${productId}/delete`,
          method: "DELETE",
          credentials: "include",
        };
      },
      invalidatesTags: [{ type: "Bin", id: "LIST" }],
    }),
  }),
});

export const {
  useGetBinQuery,
  useUpdateRestoreProductMutation,
  useUpdateStoreMultipleMutation,
  useDeleteProductMutation,
  useDeleteMultipleProductMutation,
} = binAdminApi;
