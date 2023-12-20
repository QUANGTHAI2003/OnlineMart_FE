import { ICart, IRecentItem } from "@app/types/cart.types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryCustom from "../../baseQueryCustom";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: baseQueryCustom,
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    //  Get recently item cart
    getRecentItem: builder.query<IRecentItem[], number>({
      query: (userId) => {
        return {
          url: `recently-cart/${userId}`,
          method: "GET",
          credentials: "include",
        };
      },
      transformResponse: (response: { data: IRecentItem[] }) => {
        return response.data;
      },
      providesTags: (result): any => {
        if (result) {
          const final = [...result.map(({ id }: any) => ({ type: "Cart", id })), { type: "Cart", id: "LIST" }];
          return final;
        }
        return [{ type: "Cart" as const, id: "LIST" }];
      },
    }),
    // Get all item page cart
    getCart: builder.query<ICart[], number>({
      query: (userId) => {
        return {
          url: `cart/${userId}`,
          method: "GET",
          credentials: "include",
        };
      },
      transformResponse: (response: { data: ICart[] }) => {
        return response.data;
      },
      providesTags: (result): any => {
        if (result) {
          const final = [...result.map(({ id }: any) => ({ type: "Cart", id })), { type: "Cart", id: "LIST" }];
          return final;
        }
        return [{ type: "Cart" as const, id: "LIST" }];
      },
    }),
    // Get all item page checkout
    getCheckoutItem: builder.query<ICart[], number>({
      query: (userId) => {
        return {
          url: `checkout-item/${userId}`,
          method: "GET",
          credentials: "include",
        };
      },
      transformResponse: (response: { data: ICart[] }) => {
        return response.data;
      },
      providesTags: (result): any => {
        if (result) {
          const final = [...result.map(({ id }: any) => ({ type: "Cart", id })), { type: "Cart", id: "LIST" }];
          return final;
        }
        return [{ type: "Cart" as const, id: "LIST" }];
      },
    }),
    // Add to cartApi
    addToCart: builder.mutation({
      query: (data) => ({
        url: `/cart`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
    updateQuantity: builder.mutation({
      query: (data) => {
        return {
          url: `cart/${data?.id}`,
          method: "PATCH",
          body: data,
          credentials: "include",
        };
      },
      transformResponse: (response: { data: IRecentItem }) => {
        return response.data;
      },
      invalidatesTags: (): any => [{ type: "Cart", id: "LIST" }],
    }),
    // Update checkbox item
    updateCheckbox: builder.mutation({
      query: (itemId) => {
        return {
          url: `update-item/${itemId}`,
          method: "PATCH",
          credentials: "include",
        };
      },
      transformResponse: (response: { data: IRecentItem }) => {
        return response.data;
      },
      invalidatesTags: (): any => [{ type: "Cart", id: "LIST" }],
    }),
    // Update checkbox all item of shop
    updateCheckboxShop: builder.mutation({
      query: ({ shopId, state }) => {
        return {
          url: `update-shop/${shopId}/${state}`,
          method: "PATCH",
          credentials: "include",
        };
      },
      transformResponse: (response: { data: IRecentItem }) => {
        return response.data;
      },
      invalidatesTags: (): any => [{ type: "Cart", id: "LIST" }],
    }),
    // Update checkbox all item
    updateCheckboxAll: builder.mutation({
      query: ({ userId, state }) => {
        return {
          url: `update-all/${userId}/${state}`,
          method: "PATCH",
          credentials: "include",
        };
      },
      transformResponse: (response: { data: IRecentItem }) => {
        return response.data;
      },
      invalidatesTags: (): any => [{ type: "Cart", id: "LIST" }],
    }),
    // Delete item in cart
    deleteSingleItem: builder.mutation<any, number>({
      query(id) {
        return {
          url: `cart/remove/${id}`,
          method: "DELETE",
          credentials: "include",
        };
      },
      invalidatesTags: (): any => [{ type: "Cart", id: "LIST" }],
    }),
    // Clear all cart
    deleteAll: builder.mutation<any, number>({
      query(userId) {
        return {
          url: `cart/${userId}`,
          method: "DELETE",
          credentials: "include",
        };
      },
      invalidatesTags: (): any => [{ type: "Cart", id: "LIST" }],
    }),
    // Place an order
    preOrder: builder.mutation<any, any>({
      query(data) {
        return {
          url: `pre-order`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: (): any => [{ type: "Cart", id: "LIST" }],
    }),
  }),
});

export const {
  useGetRecentItemQuery,
  useGetCartQuery,
  useGetCheckoutItemQuery,
  useAddToCartMutation,
  useDeleteSingleItemMutation,
  useDeleteAllMutation,
  useUpdateQuantityMutation,
  useUpdateCheckboxMutation,
  useUpdateCheckboxShopMutation,
  useUpdateCheckboxAllMutation,
  usePreOrderMutation,
} = cartApi;
