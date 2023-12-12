import { IOrder, IOrderDetail } from "@app/types/order.types";
import { IReasonCancel } from "@app/types/reason_cancel.types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryCustom from "../../baseQueryCustom";

export const orderUserApi = createApi({
  reducerPath: "orderUserApi",
  baseQuery: baseQueryCustom,
  tagTypes: ["OrderUser"],
  endpoints: (builder) => ({
    getOrderQueryRoot: builder.query<IOrder[], void>({
      query: (id) => {
        return {
          url: `user/order/get/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: { data: IOrder[] }) => {
        return response.data;
      },
      providesTags: (result): any => {
        if (result) {
          const final = [...result.map(({ id }) => ({ type: "OrderUser", id })), { type: "Order", id: "LIST" }];
          return final;
        }
        return [{ type: "OrderUser" as const, id: "LIST" }];
      },
    }),
    // lay chi tiet 1 don hang
    getOrderOnly: builder.query<IOrderDetail, number>({
      query: (id) => {
        return {
          url: `user/order/${id}`,
        };
      },
      transformResponse: (response: { data: IOrderDetail }) => {
        return response.data;
      },
    }),
    //  thêm lý do hủy đơn
    addReasonCancelForOrder: builder.mutation<IReasonCancel, any>({
      query(data) {
        return {
          url: `user/order/reason-cancel`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [{ type: "OrderUser", id: "LIST" }],
    }),
  }),
});
export const { useGetOrderQueryRootQuery, useGetOrderOnlyQuery, useAddReasonCancelForOrderMutation } = orderUserApi;
