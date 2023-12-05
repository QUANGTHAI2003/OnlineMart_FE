import { IUser } from "@app/types/user.types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryCustom from "../../baseQueryCustom";

export const forgotPasswordApi = createApi({
  reducerPath: "forgotPasswordApi",
  baseQuery: baseQueryCustom,
  endpoints: (builder) => ({
    sendOTP: builder.mutation<IUser, any>({
      query(data: any) {
        return {
          url: "otp/generate",
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
    }),
    verifyOtp: builder.mutation<IUser, any>({
      query(data: any) {
        return {
          url: "otp/verify",
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
    }),
    resetPassword: builder.mutation<IUser, any>({
      query(data: any) {
        return {
          url: "reset-password",
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
    }),
    otpSendAt: builder.query<any, any>({
      query(data: any) {
        console.log(data);
        return {
          url: `otp/${data}/send-at`,
          method: "GET",
          credentials: "include",
        };
      },
      transformResponse: (response: any) => response.data,
    }),
  }),
});

export const { useSendOTPMutation, useVerifyOtpMutation, useResetPasswordMutation, useOtpSendAtQuery } =
  forgotPasswordApi;
