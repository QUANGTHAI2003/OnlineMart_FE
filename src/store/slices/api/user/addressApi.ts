import { IAddress } from "@app/types/address.types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryCustom from "../../baseQueryCustom";

export const addressApi = createApi({
  reducerPath: "addressApi",
  baseQuery: baseQueryCustom,
  tagTypes: ["Address"],
  endpoints: (builder) => ({
    getAddressRoot: builder.query<IAddress[], void>({
      query(id) {
        return {
          url: `address/user/${id}`,
        };
      },
      transformResponse: (response: { data: IAddress[] }) => {
        return response.data;
      },
      providesTags: (result): any => {
        if (result) {
          const final = [...result.map(({ id }) => ({ type: "Address", id })), { type: "Address", id: "LIST" }];
          return final;
        }

        return [{ type: "Address" as const, id: "LIST" }];
      },
    }),
    getOneAddress: builder.query<IAddress, number>({
      query: (id) => `address/${id}`,
      transformResponse: (response: { data: IAddress }) => {
        return response.data;
      },
    }),
    createAddress: builder.mutation<IAddress[], any>({
      query(data) {
        return {
          url: "address",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: (): any => [{ type: "Address", id: "LIST" }],
    }),
    updateAddress: builder.mutation<IAddress[], any>({
      query(data: Partial<IAddress>) {
        return {
          url: `address/${data.id}`,
          method: "PATCH",
          body: data,
        };
      },
      transformResponse: (response: { data: IAddress[] }) => {
        return response.data;
      },
      invalidatesTags: (): any => [{ type: "Address", id: "LIST" }],
    }),
    deleteAddress: builder.mutation<IAddress[], any>({
      query(id) {
        return {
          url: `address/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (): any => [{ type: "Address", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAddressRootQuery,
  useGetOneAddressQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = addressApi;
