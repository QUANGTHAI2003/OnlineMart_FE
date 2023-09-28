import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";

import { logOut } from "./authSlice";

const baseUrlApi = `${import.meta.env.VITE_API_BASE_URL as string}/api/`;
// Create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrlApi,
});

const baseQueryCustom: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if ((result?.error as any)?.originalStatus === 403 || (result?.error as any)?.originalStatus === 500) {
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

  return result;
};

export default baseQueryCustom;
