import { createApi } from "@reduxjs/toolkit/dist/query/react";

import baseQueryCustom from "../../baseQueryCustom";

export const checkoutApi = createApi({
  reducerPath: "checkoutApi",
  baseQuery: baseQueryCustom,
  tagTypes: ["Checkout"],
  endpoints: (builder) => ({
    // Generate link payment with VNPay
    createOrder: builder.mutation<any, any>({
      query(data) {
        return {
          url: `checkout`,
          method: "POST",
          body: data,
        };
      },
    }),
    // Update status payment in orders
    updateStatusPayment: builder.mutation<any, any>({
      query(data) {
        return {
          url: `status-payment/${data.order_code}/${data.status_code}`,
          method: "PATCH",
        };
      },
    }),
  }),
});

export const { useCreateOrderMutation, useUpdateStatusPaymentMutation } = checkoutApi;
