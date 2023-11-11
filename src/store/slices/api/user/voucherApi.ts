import { IUserVoucher } from "@app/types/voucher.types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryCustom from "../../baseQueryCustom";

export const voucherUserApi = createApi({
  reducerPath: "voucherUserApi",
  baseQuery: baseQueryCustom,
  endpoints: (builder) => ({
    getVoucherRoot: builder.query<IUserVoucher[], void>({
      query: () => {
        return {
          url: `voucher/user`,
        };
      },
      transformResponse: (response: { data: IUserVoucher[] }) => {
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
  }),
});

export const { useGetVoucherRootQuery } = voucherUserApi;
