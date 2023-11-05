import { IVoucher } from "@app/types/voucher.types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryCustom from "../../baseQueryCustom";

export const voucherApi = createApi({
  reducerPath: "voucherApi",
  baseQuery: baseQueryCustom,
  tagTypes: ["Voucher"],
  endpoints: (builder) => ({
    getVoucherRoot: builder.query<IVoucher[], any>({
      query: (shop_id) => {
        return {
          url: `voucher/shop/${shop_id}`,
          method: "GET",
        };
      },
      transformResponse: (response: { data: IVoucher[] }) => {
        return response.data;
      },
      providesTags: (result): any => {
        if (result) {
          const final = [...result.map(({ id }) => ({ type: "Voucher", id })), { type: "Voucher", id: "LIST" }];
          return final;
        }
        return [{ type: "Voucher" as const, id: "LIST" }];
      },
    }),
    // xoa voucher
    deleteVoucher: builder.mutation<any, number>({
      query(id) {
        return {
          url: `voucher/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (): any => [{ type: "Voucher", id: "LIST" }],
    }),
    // them voucher
    createVoucher: builder.mutation<IVoucher, any>({
      query(data) {
        return {
          url: "voucher",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: (): any => [{ type: "Voucher", id: "LIST" }],
    }),
    // lay chi tiet voucher
    getVoucherOnly: builder.query<IVoucher, number>({
      query: (id) => `voucher/${id}`,
      transformResponse: (response: { data: IVoucher }) => {
        return response.data;
      },
    }),
    // sua voucher
    updateVoucher: builder.mutation<IVoucher, Partial<IVoucher>>({
      query(data: Partial<IVoucher>) {
        return {
          url: `voucher/${data.id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: (): any => [{ type: "Voucher", id: "LIST" }],
    }),
    // Xóa nhiều voucher.
    deleteMultiVoucher: builder.mutation<IVoucher[], any>({
      query: ({ voucherId, shopId }) => ({
        url: `voucher/${voucherId}/shop/${shopId}`,
        method: "DELETE",
      }),
      transformResponse: (response: { data: IVoucher[] }) => {
        return response.data;
      },
      invalidatesTags: (): any => [{ type: "Voucher", id: "LIST" }],
    }),
  }),
});

export const {
  useGetVoucherRootQuery,
  useCreateVoucherMutation,
  useDeleteVoucherMutation,
  useGetVoucherOnlyQuery,
  useUpdateVoucherMutation,
  useDeleteMultiVoucherMutation,
} = voucherApi;
