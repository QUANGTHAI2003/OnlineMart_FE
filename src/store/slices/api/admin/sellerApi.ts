import { ISeller } from "@app/types/seller.type";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryCustom from "../../baseQueryCustom";

export const sellerApi = createApi({
  reducerPath: "sellerApi",
  baseQuery: baseQueryCustom,
  tagTypes: ["Seller"],
  endpoints: (builder) => ({
    // Lấy danh sách nhà bán
    getAllSeller: builder.query<ISeller[], void>({
      query: () => ({
        url: `/seller`,
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (res: { data: ISeller[] }) => {
        return res.data;
      },
      providesTags: (result): any => {
        if (result) {
          const final = [
            ...result.map(({ id }) => ({ type: "Seller" as const, id })),
            { type: "Seller" as const, id: "LIST" },
          ];
          return final;
        }

        return [{ type: "Seller" as const, id: "LIST" }];
      },
    }),

    // Thêm nhân viên trong nhà bán
    addSeller: builder.mutation<ISeller[], any>({
      query: (body) => ({
        url: `/seller`,
        method: "POST",
        credentials: "include",
        body,
      }),
      invalidatesTags: [{ type: "Seller", id: "LIST" }],
    }),

    // Cập nhật thông tin nhân viên trong nhà bán
    updateSeller: builder.mutation<ISeller[], any>({
      query: ({ id, body }) => ({
        url: `/seller/${id}`,
        method: "PUT",
        credentials: "include",
        body,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "Seller", id }],
    }),

    // Xóa nhân viên trong nhà bán
    deleteSeller: builder.mutation<ISeller, number>({
      query: (id) => ({
        url: `/seller/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: (_, __, id) => [{ type: "Seller", id }],
    }),
  }),
});

export const { useGetAllSellerQuery, useAddSellerMutation, useUpdateSellerMutation, useDeleteSellerMutation } =
  sellerApi;
