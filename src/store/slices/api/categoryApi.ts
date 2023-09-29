import { ICategory } from "@app/types/categories.types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryCustom from "../baseQueryCustom";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: baseQueryCustom,
  endpoints: (builder) => ({
    // Get category in home page
    getCategoryRoot: builder.query<ICategory[], void>({
      query: () => "categories/root",
      transformResponse: (response: { data: ICategory[] }) => {
        return response.data;
      },
    }),
  }),
});

export const { useGetCategoryRootQuery } = categoryApi;
