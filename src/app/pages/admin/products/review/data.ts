export const RatingListTab = (t: any) => {
  return [
    {
      id: 1,
      name: t("admin_shop.product.review.site_header.all_tab"),
      tab: "all",
    },
    {
      id: 2,
      name: "1",
      tab: "1",
    },
    {
      id: 3,
      name: "2",
      tab: "2",
    },
    {
      id: 4,
      name: "3",
      tab: "3",
    },
    {
      id: 5,
      name: "4",
      tab: "4",
    },
    {
      id: 6,
      name: "5",
      tab: "5",
    },
  ];
};

export const RatingText = (t: any) => {
  const status: any = {
    "1": t("admin_shop.product.review.rating_text.abysmal"),
    "2": t("admin_shop.product.review.rating_text.bad"),
    "3": t("admin_shop.product.review.rating_text.normal"),
    "4": t("admin_shop.product.review.rating_text.exellent"),
    "5": t("admin_shop.product.review.rating_text.very_good"),
  };

  return { status };
};

export const searchType = (t: any) => {
  return [
    { value: "product_name", label: t("admin_shop.product.review.table_cpn.title") },
    { value: "user", label: t("admin_shop.product.review.table_cpn.reviewer") },
    { value: "product_sku", label: t("admin_shop.product.review.table_cpn.sku") },
    { value: "rating", label: t("admin_shop.product.review.table_cpn.rating") },
  ];
};
