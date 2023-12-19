import { IPrintQR } from "@app/types/printQR.types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryCustom from "../../baseQueryCustom";

export const printQRAdminApi = createApi({
  reducerPath: "printQRAdminApi",
  tagTypes: ["PrintQR"],
  baseQuery: baseQueryCustom,
  endpoints: (builder) => ({
    // Lấy ra danh sách các sản phẩm muốn in QR theo product_id trên url
    getProductPrintQR: builder.query<IPrintQR[], any>({
      query: ({ productId, variantValueId }) => {
        return {
          url: `print_qrcode`,
          params: {
            product_id: productId,
            variant_value_id: variantValueId,
          },
        };
      },
      transformResponse: (response: { data: IPrintQR[] }) => {
        return response.data;
      },
      providesTags: (result): any => {
        if (result) {
          return [...result.map(({ id }) => ({ type: "PrintQR", id })), { type: "PrintQR", id: "LIST" }];
        }

        return [{ type: "PrintQR" as const, id: "LIST" }];
      },
    }),

    // Lấy ra danh sách tất cả sản phẩm trong kho (chức năng tìm kiếm)
    getProductList: builder.query<IPrintQR[], void>({
      query: () => {
        return {
          url: `print_qrcode/products`,
        };
      },
      transformResponse: (response: { data: IPrintQR[] }) => {
        return response.data;
      },
      providesTags: (result): any => {
        if (result) {
          return [...result.map(({ id }) => ({ type: "PrintQR", id })), { type: "PrintQR", id: "LIST" }];
        }

        return [{ type: "PrintQR" as const, id: "LIST" }];
      },
    }),
  }),
});

export const { useGetProductPrintQRQuery, useGetProductListQuery } = printQRAdminApi;
