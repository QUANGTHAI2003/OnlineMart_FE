import { IActivity } from "@app/types/activity.types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryCustom from "../baseQueryCustom";

export const activityApi = createApi({
  reducerPath: "activityApi",
  baseQuery: baseQueryCustom,
  tagTypes: ["ActivityLog"],
  endpoints: (builder) => ({
    //  Get all activities for page logs
    getActivityLog: builder.query<IActivity, void>({
      query: () => "activities-log",
      transformResponse: (response: { data: IActivity }) => {
        return response.data;
      },
    }),
  }),
});

export const { useGetActivityLogQuery } = activityApi;