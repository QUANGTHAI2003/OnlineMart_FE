import { IPermission, IRole } from "@app/types/roles.type";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryCustom from "../../baseQueryCustom";

export const roleApi = createApi({
  reducerPath: "roleApi",
  baseQuery: baseQueryCustom,
  tagTypes: ["Role"],
  endpoints: (builder) => ({
    // Lấy danh sách vai trò
    getAllRole: builder.query<IRole[], void>({
      query: () => ({
        url: `/roles`,
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (res: any) => {
        return res.data;
      },
      providesTags: (result): any => {
        if (result) {
          const final = [...result.map(({ id }) => ({ type: "Role", id })), { type: "Role", id: "LIST" }];
          return final;
        }

        return [{ type: "Role" as const, id: "LIST" }];
      },
    }),
    getAllPermissions: builder.query<IPermission[], void>({
      query: () => ({
        url: `/permissions`,
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (res: any) => {
        return res.data;
      },
    }),
    // Thêm vai trò mới
    addRole: builder.mutation({
      query: (body) => ({
        url: `/roles`,
        method: "POST",
        body,
        credentials: "include",
      }),
      invalidatesTags: [{ type: "Role", id: "LIST" }],
    }),
    // Cập nhật vai trò
    updateRole: builder.mutation({
      query: (data) => ({
        url: `/roles/${data?.id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: (result) => [{ type: "Role", id: result.id }],
    }),
    // Xóa vai trò
    deleteRole: builder.mutation({
      query: ({ id }) => ({
        url: `/roles/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: (result) => [{ type: "Role", id: result.id }],
    }),
  }),
});

export const {
  useGetAllRoleQuery,
  useGetAllPermissionsQuery,
  useAddRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = roleApi;
