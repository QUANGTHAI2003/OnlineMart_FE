import { IWishlist } from "@app/types/wishlist.types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryCustom from "../../baseQueryCustom";

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  baseQuery: baseQueryCustom,
  tagTypes: ["Wishlist"],
  endpoints: (builder) => ({
    // lấy danh sách sản phẩm yêu thích theo user id
    getWishlistRoot: builder.query<IWishlist[], void>({
      query(id_user) {
        return {
          url: `wishlist/user/${id_user}`,
        };
      },
      transformResponse: (response: { data: IWishlist[] }) => {
        return response.data;
      },
      providesTags: (result): any => {
        if (result) {
          const final = [...result.map(({ id }) => ({ type: "Wishlist", id })), { type: "Wishlist", id: "LIST" }];
          return final;
        }

        return [{ type: "Wishlist" as const, id: "LIST" }];
      },
    }),
    deleteWishlist: builder.mutation<any, number>({
      query(id) {
        return {
          url: `wishlist/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (): any => [{ type: "Wishlist", id: "LIST" }],
    }),
  }),
});

export const { useGetWishlistRootQuery, useDeleteWishlistMutation } = wishlistApi;
