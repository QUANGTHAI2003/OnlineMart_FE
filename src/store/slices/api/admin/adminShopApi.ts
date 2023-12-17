import { IShopInformation } from "@app/types/shop.types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryCustom from "../../baseQueryCustom";

export const adminShopApi = createApi({
  reducerPath: "adminShopApi",
  baseQuery: baseQueryCustom,
  tagTypes: ["Shop"],
  endpoints: (builder) => ({
    //  Get information shop
    getInfoShopRoot: builder.query<IShopInformation, number>({
      query: (shopId) => {
        return {
          url: `shop-profile/${shopId}`,
          method: "GET",
        };
      },
      transformResponse: (response: { data: IShopInformation }) => {
        return response.data;
      },
      providesTags(result) {
        return result ? [{ type: "Shop", id: "LIST" }] : [];
      },
    }),
    // update status shop
    updateStatus: builder.mutation<IShopInformation, number>({
      query: (shopId) => ({
        url: `shop/change-status/${shopId}`,
        method: "PUT",
      }),
      invalidatesTags: (): any => [{ type: "Shop", id: "LIST" }],
    }),
    // update booth shop
    updateBooth: builder.mutation<any, any>({
      query: ({ shopId, data }) => {
        return {
          url: `shop/update-booth/${shopId}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: (): any => [{ type: "Shop", id: "LIST" }],
    }),
    // create bank shop
    createBank: builder.mutation<number, any>({
      query: ({ shopId, data }) => {
        return {
          url: `shop/update-bank/${shopId}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: (): any => [{ type: "Shop", id: "LIST" }],
    }),
    // create document shop
    updateDocument: builder.mutation<number, any>({
      query: ({ shopId, data }) => {
        return {
          url: `shop/update-document/${shopId}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: (): any => [{ type: "Shop", id: "LIST" }],
    }),
    updateFrontSideShop: builder.mutation<any, any>({
      query: ({ data, shopId }) => ({
        url: `shop/front-side/${shopId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (): any => [{ type: "Shop", id: "LIST" }],
    }),
  }),
});

export const {
  useGetInfoShopRootQuery,
  useUpdateStatusMutation,
  useUpdateBoothMutation,
  useCreateBankMutation,
  useUpdateDocumentMutation,
  useUpdateFrontSideShopMutation,
} = adminShopApi;
