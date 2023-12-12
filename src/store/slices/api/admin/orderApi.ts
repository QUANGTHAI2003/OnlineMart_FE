import { IOrder } from "@app/types/order.types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryCustom from "../../baseQueryCustom";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: baseQueryCustom,
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    getOrderQueryRoot: builder.query<IOrder[], void>({
      query: () => {
        return {
          url: `order`,
          method: "GET",
        };
      },
      transformResponse: (response: { data: IOrder[] }) => {
        return response.data;
      },
      providesTags: (result): any => {
        if (result) {
          const final = [...result.map(({ id }) => ({ type: "Order", id })), { type: "Order", id: "LIST" }];
          return final;
        }
        return [{ type: "Order" as const, id: "LIST" }];
      },
    }),
    // lay chi tiet 1 don hang
    getOrderOnly: builder.query<IOrder, number>({
      query: (id) => {
        return {
          url: `order/${id}`,
        };
      },
      transformResponse: (response: { data: IOrder }) => {
        return response.data;
      },
    }),
  }),
});
export const { useGetOrderQueryRootQuery, useGetOrderOnlyQuery } = orderApi;
