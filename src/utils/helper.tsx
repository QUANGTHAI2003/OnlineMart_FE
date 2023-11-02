import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import dayjs from "dayjs";

import { getLang } from "./localstorage";
import { notificationController } from "./notification";

export const formatCurrency = (price?: number, locale = "vi-VN", currency = "VND"): string => {
  const formattedPrice = price ?? 0;
  return formattedPrice.toLocaleString(locale, {
    style: "currency",
    currency,
  });
};

export const formatVNCurrency = (number: number) => {
  const suffixes: string[] = ["", "K", " triệu"];
  let suffixIndex = 0;

  while (number >= 1000 && suffixIndex < suffixes.length - 1) {
    // eslint-disable-next-line no-param-reassign
    number = number / 1000;
    suffixIndex++;
  }

  return number.toFixed(0) + suffixes[suffixIndex];
};

export const getCookie = (cookieName: string) => {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === cookieName) {
      return decodeURIComponent(value);
    }
  }
  return null; // Cookie not found
};

export const formatDate = (dateString: string) => {
  const locale = getLang();

  const formatString = locale === "vi" ? "DD-MM-YYYY" : "YYYY-MM-DD";
  const formattedDate = dayjs(dayjs(dateString).format(formatString), formatString);
  return formattedDate;
};

export const formatDateTime = (dateStr: any) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return new Date(dateStr).toLocaleDateString(undefined, options);
};

export const formatPercent = (value?: number) => {
  return `-${value}%`;
};

export const formatTimeAgo = (timestamp: number) => {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const secondsElapsed = currentTimestamp - timestamp;
  const language: string = getLang();

  const minute = 60;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  const year = 365 * day;

  type Translations = {
    [key: string]: {
      second: string;
      seconds: string;
      minute: string;
      minutes: string;
      hour: string;
      hours: string;
      day: string;
      days: string;
      month: string;
      months: string;
      year: string;
      years: string;
      ago: string;
    };
  };

  const translations: Translations = {
    en: {
      second: "second",
      seconds: "seconds",
      minute: "minute",
      minutes: "minutes",
      hour: "hour",
      hours: "hours",
      day: "day",
      days: "days",
      month: "month",
      months: "months",
      year: "year",
      years: "years",
      ago: "ago",
    },
    vi: {
      second: "giây",
      seconds: "giây",
      minute: "phút",
      minutes: "phút",
      hour: "giờ",
      hours: "giờ",
      day: "ngày",
      days: "ngày",
      month: "tháng",
      months: "tháng",
      year: "năm",
      years: "năm",
      ago: "trước",
    },
  };

  const t = translations[language] || translations.en;

  if (secondsElapsed < minute) {
    return `${secondsElapsed} ${t.seconds} ${t.ago}`;
  } else if (secondsElapsed < hour) {
    const minutes = Math.floor(secondsElapsed / minute);
    return `${minutes} ${t.minutes} ${t.ago}`;
  } else if (secondsElapsed < day) {
    const hours = Math.floor(secondsElapsed / hour);
    return `${hours} ${t.hours} ${t.ago}`;
  } else if (secondsElapsed < month) {
    const days = Math.floor(secondsElapsed / day);
    return `${days} ${t.days} ${t.ago}`;
  } else if (secondsElapsed < year) {
    const months = Math.floor(secondsElapsed / month);
    return `${months} ${t.months} ${t.ago}`;
  }
  const years = Math.floor(secondsElapsed / year);
  return `${years} ${t.years} ${t.ago}`;
};

export const formatNumber = (number: number): string => {
  return number.toLocaleString("en-US");
};

export const formatShortenNumber = (number: number) => {
  const language: string = getLang();
  type Translations = {
    [key: string]: {
      prefix: string;
    };
  };

  const translations: Translations = {
    en: {
      prefix: " million+",
    },
    vi: {
      prefix: "tr+",
    },
  };

  const t = translations[language] || translations.en;
  const suffixes: string[] = ["", "k+", `${t.prefix}`];
  let suffixIndex = 0;

  while (number >= 1000 && suffixIndex < suffixes.length - 1) {
    // eslint-disable-next-line no-param-reassign
    number = Math.floor(number / 100) / 10;
    suffixIndex++;
  }
  return number + suffixes[suffixIndex];
};

export const formatPercentage = (value: number) => {
  return `${value}%`;
};

export const removeDiacritics = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const notifySuccess = (message: string, description?: string) => {
  notificationController.success({
    message,
    description,
  });
};

export const notifyError = (message: string, description?: string) => {
  notificationController.error({
    message,
    description,
  });
};

export const notifyWarning = (message: string, description?: string) => {
  notificationController.warning({
    message,
    description,
  });
};

export const notifyInfo = (message: string, description?: string) => {
  notificationController.info({
    message,
    description,
  });
};

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === "object" && error != null && "status" in error;
}

interface IEntityError {
  status: 422;
  data: {
    errors: {
      [key: string]: string[];
    };
  };
}

export function isErrorWithMessage(error: unknown): error is { message: string } {
  return typeof error === "object" && error != null && "message" in error && typeof (error as any).message === "string";
}

export function isEntityError(error: unknown): error is IEntityError {
  return (
    isFetchBaseQueryError(error) &&
    error.status === 422 &&
    typeof error.data === "object" &&
    error.data !== null &&
    !(error.data instanceof Array)
  );
}
type ErrorMessage = {
  [key: number]: string;
};

export const handleApiError = (err: any, titleMessage = "Error occurred"): void => {
  const errorStatus = err.status || 500;

  const errorMessages: ErrorMessage = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    429: "Too Many Requests",
    500: "Internal Server Error",
  };

  const errorMessage = errorMessages[errorStatus] || "Unknown Error";

  switch (errorStatus) {
    case 400:
      notifyError(errorMessage, "The request is invalid. Please check your input.");
      break;
    case 401:
      notifyError(errorMessage, "Authentication failed. Please check your credentials.");
      break;
    case 403:
      notifyError(errorMessage, "Access to this resource is forbidden.");
      break;
    case 404:
      notifyError(errorMessage, "The requested resource was not found.");
      break;
    case 429:
      notifyError(errorMessage, "Too many requests. Please try again later.");
      break;
    case 500:
      notifyError(errorMessage, "Internal server error. Please try again later.");
      break;
    default:
      notifyError(titleMessage, errorMessage);
  }
};
