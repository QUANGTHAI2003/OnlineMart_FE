import { IReview } from "@app/types/review.types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryCustom from "../../baseQueryCustom";

export const reviewAdminApi = createApi({
  reducerPath: "reviewAdminApi",
  tagTypes: ["Review"],
  baseQuery: baseQueryCustom,
  endpoints: (builder) => ({
    getReview: builder.query<IReview[], void>({
      query: () => {
        return {
          url: `reviews`,
        };
      },
      transformResponse: (response: { data: IReview[] }) => {
        return response.data;
      },
      providesTags: (result): any => {
        if (result) {
          return [...result.map(({ id }) => ({ type: "Review", id })), { type: "Review", id: "LIST" }];
        }
        return [{ type: "Review" as const, id: "LIST" }];
      },
    }),
    replyReview: builder.mutation<IReview, any>({
      query: ({ reviewId, data }) => {
        console.log(data);
        return {
          url: `reviews/${reviewId}/reply`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [{ type: "Review", id: "LIST" }],
    }),
  }),
});

export const { useGetReviewQuery, useReplyReviewMutation } = reviewAdminApi;
