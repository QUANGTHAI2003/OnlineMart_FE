import { IInventory } from "@app/types/inventory.types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryCustom from "../../baseQueryCustom";

export const inventoryAdminApi = createApi({
  reducerPath: "inventoryAdminApi",
  tagTypes: ["Inventory"],
  baseQuery: baseQueryCustom,
  endpoints: (builder) => ({
    // Lấy danh sách sản phẩm tồn kho trang admin
    getInventory: builder.query<IInventory[], void>({
      query: () => {
        return {
          url: `inventory`,
        };
      },
      transformResponse: (response: { data: IInventory[] }) => {
        return response.data;
      },
      providesTags: (result): any => {
        if (result) {
          return [...result.map(({ id }) => ({ type: "Inventory", id })), { type: "Inventory", id: "LIST" }];
        }

        return [{ type: "Inventory" as const, id: "LIST" }];
      },
    }),

    // Lấy thông tin chi tiết 1 sản phẩm
    getProductDetail: builder.query<any, number>({
      query: (id) => {
        return {
          url: `inventory/${id}`,
        };
      },
      transformResponse: (response: { data: any }) => {
        return response.data;
      },
    }),

    // Xóa 1 sản phẩm
    // deleteProduct: builder.mutation<any, any>({
    //   query: (id) => {
    //     return {
    //       url: `inventory/${id}`,
    //       method: "DELETE",
    //     };
    //   },
    //   invalidatesTags: [{ type: "Inventory", id: "LIST" }],
    // }),

    // Xóa nhiều sản phẩm
    // deleteMultipleProduct: builder.mutation<any, any>({
    //   query: (productId) => {
    //     return {
    //       url: `inventory/delete/${productId}`,
    //       method: "DELETE",
    //     };
    //   },
    //   invalidatesTags: [{ type: "Inventory", id: "LIST" }],
    // }),
  }),
});

export const {
  useGetInventoryQuery,
  useGetProductDetailQuery,
  // useDeleteProductMutation,
  // useDeleteMultipleProductMutation,
} = inventoryAdminApi;
