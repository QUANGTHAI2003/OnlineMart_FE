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

  return number?.toFixed(0) + suffixes[suffixIndex];
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

export const formatDate = (dateString: string | null) => {
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

export const formatDuration = (duration: number, isFuture = false) => {
  const language: string = getLang();

  const seconds = Math.floor(duration % 60);
  const minutes = Math.floor((duration / 60) % 60);
  const hours = Math.floor((duration / (60 * 60)) % 24);
  const days = Math.floor((duration / (60 * 60 * 24)) % 30);
  const months = Math.floor((duration / (60 * 60 * 24 * 30)) % 12);
  const years = Math.floor(duration / (60 * 60 * 24 * 365));

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
      in: string;
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
      in: "from now",
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
      in: "sau",
    },
  };

  const t = translations[language] || translations.en;
  const timeAgo = isFuture ? t.in : t.ago;

  if (years > 0) return `${years} ${years > 1 ? t.years : t.year} ${timeAgo}`;
  if (months > 0) return `${months} ${months > 1 ? t.months : t.month} ${timeAgo}`;
  if (days > 0) return `${days} ${days > 1 ? t.days : t.day} ${timeAgo}`;
  if (hours > 0) return `${hours} ${hours > 1 ? t.hours : t.hour} ${timeAgo}`;
  if (minutes > 0) return `${minutes} ${minutes > 1 ? t.minutes : t.minute} ${timeAgo}`;
  return `${seconds} ${seconds > 1 ? t.seconds : t.second} ${timeAgo}`;
};

export const calculateTimes = (deleted_at: string) => {
  const deletedDate = dayjs(deleted_at);
  const now = dayjs();

  const elapsedSeconds = now.diff(deletedDate, "second");
  const remainingSeconds = 30 * 24 * 60 * 60 - elapsedSeconds;

  return {
    deleted_at: deletedDate.format("YYYY-MM-DD\nHH:mm:ss"),
    time_elapsed: formatDuration(elapsedSeconds),
    time_remaining: formatDuration(remainingSeconds, true),
  };
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

export const formatPercentage = (value: number, roundedNum?: number) => {
  return `${value.toFixed(roundedNum || 2)}%`;
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

export const handleApiError = (err: any): void => {
  const errorStatus = err.status || 500;
  const language: string = getLang();

  type Translations = {
    [key: string]: {
      error_400: string;
      error_401: string;
      error_403: string;
      error_404: string;
      error_422: string;
      error_429: string;
      error_500: string;
      message_400: string;
      message_401: string;
      message_403: string;
      message_404: string;
      message_422: string;
      message_429: string;
      message_500: string;
      unknown: string;
    };
  };

  const translations: Translations = {
    en: {
      error_400: "Bad Request",
      error_401: "Unauthorized",
      error_403: "Forbidden",
      error_404: "Not Found",
      error_422: "Validation Error",
      error_429: "Too Many Requests",
      error_500: "Internal Server Error",
      message_400: "The request is invalid. Please check your input.",
      message_401: "Authentication failed. Please check your credentials.",
      message_403: "Access to this resource is forbidden.",
      message_404: "The requested resource was not found.",
      message_422: "Validation failed. Please check your input.",
      message_429: "Too many requests. Please try again later.",
      message_500: "Internal server error. Please try again later.",
      unknown: "Unknown Error",
    },
    vi: {
      error_400: "Lỗi yêu cầu",
      error_401: "Lỗi xác thực",
      error_403: "Lỗi truy cập",
      error_404: "Không tìm thấy",
      error_422: "Lỗi xác thực",
      error_429: "Quá nhiều yêu cầu",
      error_500: "Lỗi máy chủ",
      message_400: "Yêu cầu không hợp lệ. Vui lòng kiểm tra lại thông tin.",
      message_401: "Xác thực thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.",
      message_403: "Truy cập bị từ chối.",
      message_404: "Không tìm thấy tài nguyên.",
      message_422: "Xác thực thất bại. Vui lòng kiểm tra lại thông tin.",
      message_429: "Quá nhiều yêu cầu. Vui lòng thử lại sau.",
      message_500: "Lỗi máy chủ. Vui lòng thử lại sau.",
      unknown: "Lỗi không xác định",
    },
  };

  const t = translations[language] || translations.en;

  const errorMessages: ErrorMessage = {
    400: t.error_400,
    401: t.error_401,
    403: t.error_403,
    404: t.error_404,
    422: t.error_422,
    429: t.error_429,
    500: t.error_500,
  };

  const errorMessage = errorMessages[errorStatus] || t.unknown;

  switch (errorStatus) {
    case 400:
      notifyError(t.message_400);
      break;
    case 401:
      notifyError(t.message_401);
      break;
    case 403:
      notifyError(t.message_403);
      break;
    case 404:
      notifyError(t.message_404);
      break;
    case 422:
      notifyError(t.message_422);
      break;
    case 429:
      notifyError(t.message_429);
      break;
    case 500:
      notifyError(t.message_500);
      break;
    default:
      notifyError(errorMessage);
      break;
  }
};

export const baseImageUrl = import.meta.env.VITE_BASE_IMAGE_URL as string;

export const baseImageKitUrl = import.meta.env.VITE_BASE_IMAGE_KIT_URL as string;
