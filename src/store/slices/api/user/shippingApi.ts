import { getCookie } from "@app/utils/helper";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shippingApi = createApi({
  reducerPath: "shippingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dev-online-gateway.ghn.vn/shiip/public-api/v2",
    prepareHeaders: (headers) => {
      const token = getCookie("access_token");
      if (token) {
        headers.set("Token", "5470c5ae-98d2-11ee-8bfa-8a2dda8ec551");
        headers.set("ShopId", "190537");
        headers.set("Content-Type", "application/json");
      }

      return headers;
    },
    timeout: 10000,
  }),
  endpoints: (builder) => ({
    shippingFee: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `/shipping-order/create`,
          method: "POST",
          body: JSON.stringify(data),
        };
      },
    }),
    updateCodAmount: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `/shipping-order/update`,
          method: "POST",
          body: JSON.stringify(data),
        };
      },
    }),
  }),
});

export const { useShippingFeeMutation, useUpdateCodAmountMutation } = shippingApi;
