import { IReview } from "@app/types/customer_review.types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryCustom from "../../baseQueryCustom";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: baseQueryCustom,
  tagTypes: ["Review", "Like"],
  endpoints: (builder) => ({
    // Lấy tất cả review theo product_id
    getReviewByProduct: builder.query<any, number>({
      query: (productId) => `customer_reviews?product_id=${productId}`,
      transformResponse: (response: { data: any }) => {
        return response.data;
      },
      providesTags: (): any => [{ type: "Review", id: "LIST" }],
    }),

    // Lấy ra tất cả hình ảnh trong tất cả bình luận của một sản phẩm
    getAllImages: builder.query<any, number>({
      query: (productId) => `customer_reviews/${productId}/all-images`,
      transformResponse: (response: { data: any }) => {
        return response.data;
      },
      providesTags: (_, __, productId): any => [{ type: "Review", id: productId }],
    }),

    // Lấy ra số lượt đánh giá
    getReviewCount: builder.query<any, number>({
      query: (productId) => `customer_reviews/${productId}/ratings`,
      transformResponse: (response: { data: any }) => {
        return response.data;
      },
      providesTags: (_, __, productId): any => [{ type: "Review", id: productId }],
    }),

    // Bình luận dựa trên một đánh giá đã tồn tại
    addComment: builder.mutation<IReview, { content: string; reviewId: number; productId: number }>({
      query: ({ content, reviewId, productId }) => ({
        url: `customer_reviews/${reviewId}/${productId}/comment`,
        method: "POST",
        body: { content }, // Khi nào trong backend có dùng request thì ở đây sẽ dùng body
      }),
      transformResponse: (response: { data: IReview }) => {
        return response.data;
      },
      invalidatesTags: (): any => [{ type: "Review", id: "LIST" }],
    }),

    // Lấy danh sách lượt like của một sản phẩm
    getLikes: builder.query<any, number>({
      query: (productId) => `customer_reviews/${productId}/likes`,
      transformResponse: (response: { data: any }) => {
        return response.data;
      },
      providesTags: (): any => [{ type: "Like", id: "LIST" }],
    }),

    // Cập nhật lượt thích của một review (+1 like)
    updateLike: builder.mutation<IReview, any>({
      query: ({ userId, productId, reviewId, like_count }) => {
        console.log({ userId }, { productId }, { reviewId }, { like_count });

        return {
          url: `customer_reviews/${userId}/${productId}/${reviewId}/like`,
          method: "PATCH",
          body: { like_count },
        };
      },
      transformResponse: (response: { data: IReview }) => {
        return response.data;
      },
      invalidatesTags: (): any => [{ type: "Like", id: "LIST" }],
    }),
  }),
});

export const {
  useGetReviewByProductQuery,
  useGetAllImagesQuery,
  useGetReviewCountQuery,
  useAddCommentMutation,
  useGetLikesQuery,
  useUpdateLikeMutation,
} = reviewApi;
