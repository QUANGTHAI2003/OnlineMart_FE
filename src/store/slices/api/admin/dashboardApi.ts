import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryCustom from "../../baseQueryCustom";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: baseQueryCustom,
  tagTypes: ["Dashboard"],
  endpoints: (builder) => ({
    // Get top 5 products by revenue
    getTopProducts: builder.query<any, any>({
      query: (time) => `top-product/${time}`,
      transformResponse: (response: { data: any }) => {
        return response.data;
      },
    }),
    getOrderStatus: builder.query<any, any>({
      query: (time) => `get-order-status/${time}`,
      transformResponse: (response: { data: any }) => {
        return response.data;
      },
    }),
    getRevenue: builder.query<any, any>({
      query: (time) => `get-revenue/${time}`,
      transformResponse: (response: { data: any }) => {
        return response.data;
      },
    }),
    getInformationShipping: builder.query<any, any>({
      query: (time) => `get-order-shipping/${time}`,
      transformResponse: (response: { data: any }) => {
        return response.data;
      },
    }),
    getOrdersPending: builder.query<any, any>({
      query: (time) => `get-orders-pending/${time}`,
      transformResponse: (response: { data: any }) => {
        return response.data;
      },
    }),
    getBusinessResult: builder.query<any, any>({
      query: (time) => `get-business-result/${time}`,
      transformResponse: (response: { data: any }) => {
        return response.data;
      },
    }),
  }),
});

export const {
  useGetTopProductsQuery,
  useGetOrderStatusQuery,
  useGetRevenueQuery,
  useGetInformationShippingQuery,
  useGetOrdersPendingQuery,
  useGetBusinessResultQuery,
} = dashboardApi;
