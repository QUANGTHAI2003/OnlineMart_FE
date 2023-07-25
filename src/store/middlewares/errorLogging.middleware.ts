import { notificationController } from "@app/utils/notification";
import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit";

/**
 * Log a warning and show a toast!
 */
export const errorLoggingMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    notificationController.error({ message: action.payload });
  }

  return next(action);
};
