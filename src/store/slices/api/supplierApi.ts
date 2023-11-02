import { ISupplier } from "@app/types/suppliers.types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryCustom from "../baseQueryCustom";

export const supplierApi = createApi({
  reducerPath: "supplierApi",
  baseQuery: baseQueryCustom,
  tagTypes: ["Supplier"],
  endpoints: (builder) => ({
    // Lấy danh sách suppliers theo shop
    getSupplierList: builder.query<ISupplier[], any>({
      query: ({ shop_id }) => {
        return {
          url: `suppliers/shop/${shop_id}`,
        };
      },
      transformResponse: (response: { data: ISupplier[] }) => {
        return response.data;
      },
      providesTags: (result): any => {
        if (result) {
          const final = [...result.map(({ id }) => ({ type: "Supplier", id })), { type: "Supplier", id: "LIST" }];
          return final;
        }
        return [{ type: "Supplier" as const, id: "LIST" }];
      },
    }),
    // Lấy chi tiết một supplier
    getSupplierOnly: builder.query<ISupplier, number>({
      query: (id) => `suppliers/${id}`,
      transformResponse: (response: { data: ISupplier }) => {
        return response.data;
      },
    }),
    getSupplierForSort: builder.query<any, any>({
      query: (shopId) => {
        return {
          url: `suppliers/shop/${shopId}/sort`,
        };
      },
      transformResponse: (response: { data: any }) => {
        return response.data;
      },
    }),
    getSupplierForSelect: builder.query<any, any>({
      query: (shopId) => {
        return {
          url: `suppliers/shop/${shopId}/select`,
        };
      },
      transformResponse: (response: { data: any }) => {
        return response.data;
      },
    }),
    // Thêm một supplier
    createSupplier: builder.mutation<ISupplier, any>({
      query(data) {
        return {
          url: "suppliers",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: (): any => [{ type: "Supplier", id: "LIST" }],
    }),
    // Cập nhật supplier.
    updateSupplier: builder.mutation<ISupplier, Partial<ISupplier>>({
      query(data: Partial<ISupplier>) {
        return {
          url: `suppliers/${data.id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: (): any => [{ type: "Supplier", id: "LIST" }],
    }),
    // Xóa một supplier.
    deleteSupplier: builder.mutation<any, number>({
      query(id) {
        return {
          url: `suppliers/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (): any => [{ type: "Supplier", id: "LIST" }],
    }),
    // Xóa nhiều supplier.
    deleteMultiSupplier: builder.mutation<ISupplier[], any>({
      query: ({ suppliersId, shopId }) => ({
        url: `suppliers/${suppliersId}/shop/${shopId}`,
        method: "DELETE",
      }),
      transformResponse: (response: { data: ISupplier[] }) => {
        return response.data;
      },
      invalidatesTags: (): any => [{ type: "Supplier", id: "LIST" }],
    }),
  }),
});

export const {
  useGetSupplierListQuery,
  useCreateSupplierMutation,
  useUpdateSupplierMutation,
  useGetSupplierOnlyQuery,
  useGetSupplierForSortQuery,
  useGetSupplierForSelectQuery,
  useDeleteSupplierMutation,
  useDeleteMultiSupplierMutation,
} = supplierApi;
