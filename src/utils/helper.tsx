import { getLang } from "./localstorage";

export const formatCurrency = (price: number, locale = "vi-VN", currency = "VND"): string => {
  return price.toLocaleString(locale, {
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
