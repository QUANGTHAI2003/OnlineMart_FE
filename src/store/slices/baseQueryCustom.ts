import { getCookie } from "@app/utils/helper";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";

import { logOut } from "./authSlice";

const baseUrlApi = `${import.meta.env.VITE_API_BASE_URL as string}/api/`;
// Create a new mutexp
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrlApi,
  prepareHeaders: (headers) => {
    const token = getCookie("access_token");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
  timeout: 10000,
});

const baseQueryCustom: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if ((result?.error as any)?.message === "You are not admin") {
    window.location.href = "/auth";
  }

  if ((result?.error as any)?.originalStatus === 403) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult = await baseQuery(
          {
            url: "auth/refresh",
            method: "POST",
            credentials: "include",
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          // Retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logOut());
          window.location.href = "/auth";
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  // if (result?.error?.status === 401) {
  //   const isAdmin = window.location.pathname.includes("admin/shop");

  //   api.dispatch(logOut());
  //   if (isAdmin) {
  //     window.location.href = "/admin/shop/auth/switch";
  //   } else {
  //     window.location.href = "/auth";
  //   }
  // }

  return result;
};

export default baseQueryCustom;
