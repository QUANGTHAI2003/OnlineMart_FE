import { ICategory } from "@app/types/categories.types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryCustom from "../baseQueryCustom";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: baseQueryCustom,
  tagTypes: ["Category"],
  keepUnusedDataFor: 0.00001,
  endpoints: (builder) => ({
    // Get category in home page
    getCategoryRoot: builder.query<ICategory[], void>({
      query: () => "categories/root",
      transformResponse: (response: { data: ICategory[] }) => {
        return response.data;
      },
    }),
    // Get category list in shop page
    getCategoryList: builder.query<ICategory[], number>({
      query: (id) => ({
        url: `categories/shop/${id}`,
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (response: { data: ICategory[] }) => {
        return response.data;
      },
      providesTags: (result): any => {
        if (result) {
          const final = [...result.map(({ id }) => ({ type: "Category", id })), { type: "Category", id: "LIST" }];
          return final;
        }

        return [{ type: "Category" as const, id: "LIST" }];
      },
    }),
    getCategoryForSort: builder.query<any, number>({
      query: (id) => ({
        url: `categories/shop/${id}/sort`,
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (response: { data: any }) => {
        return response.data;
      },
    }),
    // Get category list with children by shop
    getCategoryListWithChildren: builder.query<ICategory[], number>({
      query: (id) => ({
        url: `categories/shop/tree/${id}`,
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (response: { data: ICategory[] }) => {
        return response.data;
      },
      providesTags: (result): any => {
        if (result) {
          const final = [...result.map(({ id }) => ({ type: "Category", id })), { type: "Category", id: "LIST" }];
          return final;
        }

        return [{ type: "Category" as const, id: "LIST" }];
      },
    }),
    // Get category by id
    getCategoryById: builder.query<any, number>({
      query: (id) => `categories/${id}`,
      transformResponse: (response: { data: ICategory }) => {
        return response.data;
      },
      providesTags: (_, __, id): any => [{ type: "Category", id }],
    }),
    // Add a new category
    addCategory: builder.mutation<ICategory, any>({
      query: (body) => ({
        url: `categories`,
        method: "POST",
        body,
      }),
      transformResponse: (response: { data: ICategory }) => {
        return response.data;
      },
      invalidatesTags: (): any => [{ type: "Category", id: "LIST" }],
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            categoryApi.util.updateQueryData("getCategoryList", undefined as any, (draft) => {
              draft?.push(data);
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    // Update category
    updateCategory: builder.mutation<ICategory, any>({
      query: ({ body, id }) => ({
        url: `categories/${id}`,
        method: "PATCH",
        body,
      }),
      transformResponse: (response: { data: ICategory }) => {
        return response.data;
      },
    }),
    // Update status
    updateStatus: builder.mutation<ICategory, any>({
      query: ({ categoryId, shopId }) => ({
        url: `categories/${categoryId}/shop/${shopId}/status`,
        method: "PUT",
      }),
      transformResponse: (response: { data: ICategory }) => {
        return response.data;
      },
      invalidatesTags: (): any => [{ type: "Category", id: "LIST" }],
    }),
    // Update mass status
    updateMassStatus: builder.mutation<ICategory[], any>({
      query: ({ categoryId, shopId }) => ({
        url: `categories/${categoryId}/shop/${shopId}/mass-status`,
        method: "PUT",
      }),
      transformResponse: (response: { data: ICategory[] }) => {
        return response.data;
      },
      invalidatesTags: (): any => [{ type: "Category", id: "LIST" }],
    }),
    // Delete category
    deleteCategory: builder.mutation<ICategory, number>({
      query: (id) => ({
        url: `categories/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: { data: ICategory }) => {
        return response.data;
      },
      invalidatesTags: (result): any => [{ type: "Category", id: result?.id }],
    }),
    // Delete mass category
    deleteMassCategory: builder.mutation<ICategory[], any>({
      query: ({ categoryId, shopId }) => ({
        url: `categories/${categoryId}/shop/${shopId}/mass-delete`,
        method: "DELETE",
      }),
      transformResponse: (response: { data: ICategory[] }) => {
        return response.data;
      },
      invalidatesTags: (): any => [{ type: "Category", id: "LIST" }],
    }),
  }),
});

export const {
  useGetCategoryRootQuery,
  useGetCategoryListQuery,
  useGetCategoryListWithChildrenQuery,
  useGetCategoryByIdQuery,
  useGetCategoryForSortQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useUpdateStatusMutation,
  useUpdateMassStatusMutation,
  useDeleteCategoryMutation,
  useDeleteMassCategoryMutation,
} = categoryApi;
