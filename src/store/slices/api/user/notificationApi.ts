import { INotification } from "@app/types/notifications.types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryCustom from "../../baseQueryCustom";

export const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery: baseQueryCustom,
  tagTypes: ["Notification"],
  keepUnusedDataFor: 1,
  endpoints: (builder) => ({
    getNotificationRoot: builder.query<INotification[], void>({
      query: () => "notifications/root",
      transformResponse: (response: { data: INotification[] }) => {
        return response.data;
      },
    }),

    // Get notifications with user_id
    getNotificationsByUser: builder.query<any, number>({
      query: (userId) => `notification/${userId}`,
      transformResponse: (response: { data: any }) => {
        return response.data;
      },
      providesTags: (_, __, userId): any => [{ type: "Notification", id: userId }],
    }),

    // Add a new notification
    addNotification: builder.mutation<INotification, any>({
      query: (body) => ({
        url: `notifications`,
        method: "POST",
        body,
      }),
      transformResponse: (response: { data: INotification }) => {
        return response.data;
      },
      invalidatesTags: (): any => [{ type: "Notification", id: "LIST" }],
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            notificationApi.util.updateQueryData("getNotificationsByUser", undefined as any, (draft) => {
              draft?.push(data);
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    // Update status 1 notification
    updateStatusNotification: builder.mutation<INotification, any>({
      query: ({ notificationId, status }) => ({
        url: `notifications/${notificationId}`,
        method: "PATCH",
        body: { status },
      }),
      transformResponse: (response: { data: INotification }) => {
        return response.data;
      },
      invalidatesTags: (): any => [{ type: "Notification", id: "LIST" }],
    }),

    // Update status mass notification
    updateMassStatusNotification: builder.mutation<INotification[], any>({
      query: ({ status, type }) => ({
        url: `notifications/${type}/mass-status`,
        method: "PUT",
        body: { type, status },
      }),
      transformResponse: (response: { data: INotification[] }) => {
        return response.data;
      },
      invalidatesTags: (): any => [{ type: "Notification", id: "LIST" }],
    }),

    // Delete 1 notification
    deleteNotification: builder.mutation<INotification, number>({
      query: (notificationId) => ({
        url: `notifications/${notificationId}`,
        method: "DELETE",
      }),
      transformResponse: (response: { data: INotification }) => {
        return response.data;
      },
      invalidatesTags: (result): any => [{ type: "Notification", id: result?.id }],
    }),

    // Delete mass notification
    deleteMassNotification: builder.mutation<INotification[], any>({
      query: ({ type }) => ({
        url: `notifications/${type}/mass-delete`,
        method: "DELETE",
      }),
      transformResponse: (response: { data: INotification[] }) => {
        return response.data;
      },
      invalidatesTags: (): any => [{ type: "Notification", id: "LIST" }],
    }),
  }),
});

export const {
  useGetNotificationsByUserQuery,
  useAddNotificationMutation,
  useUpdateStatusNotificationMutation,
  useUpdateMassStatusNotificationMutation,
  useDeleteNotificationMutation,
  useDeleteMassNotificationMutation,
} = notificationApi;
