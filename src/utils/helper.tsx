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
