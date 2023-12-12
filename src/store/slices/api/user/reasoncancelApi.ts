import { IReasonCancel } from "@app/types/reason_cancel.types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryCustom from "../../baseQueryCustom";

export const reasonCancelApi = createApi({
  reducerPath: "reasonCancelApi",
  baseQuery: baseQueryCustom,
  tagTypes: ["ReasonCancel"],
  endpoints: (builder) => ({
    getReasonCancelForShop: builder.query<IReasonCancel[], number>({
      query: (shopId) => {
        return {
          url: `/reason-cancel/shop/${shopId}`,
        };
      },
      transformResponse: (response: { data: IReasonCancel[] }) => {
        return response.data;
      },
    }),
  }),
});
export const { useGetReasonCancelForShopQuery } = reasonCancelApi;
