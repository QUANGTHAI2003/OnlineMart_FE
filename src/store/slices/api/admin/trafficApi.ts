import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryCustom from "../../baseQueryCustom";

export const trafficAdminApi = createApi({
  reducerPath: "trafficAdminApi",
  tagTypes: ["Traffic"],
  baseQuery: baseQueryCustom,
  endpoints: (builder) => ({
    getTraffic: builder.query<any[], any>({
      query: (data) => {
        const params = Object.fromEntries(
          Object.entries(data).filter(([, value]) => value !== null && value !== undefined)
        );
        console.log("🚀 ~ file: trafficApi.ts:15 ~ params:", params);

        return {
          url: `dev/traffic`,
          params,
        };
      },
      transformResponse: (response: { data: any[] }) => {
        return response.data;
      },
      providesTags: (result): any => {
        if (result) {
          return [...result.map(({ id }) => ({ type: "Traffic", id })), { type: "Traffic", id: "LIST" }];
        }
        return [{ type: "Traffic" as const, id: "LIST" }];
      },
    }),
  }),
});

export const { useGetTrafficQuery } = trafficAdminApi;
