export const formatCurrency = (price: number, locale = "vi-VN", currency = "VND"): string => {
  return price.toLocaleString(locale, {
    style: "currency",
    currency,
  });
};
