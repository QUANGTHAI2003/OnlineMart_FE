export const OrderDataTab = (t: any) => {
  return [
    {
      id: 1,
      label: t("admin_shop.orders.list.status.all"),
      tab: "all",
    },
    {
      id: 2,
      label: t("admin_shop.orders.list.status.awaiting"),
      tab: "awaiting",
    },
    {
      id: 3,
      label: t("admin_shop.orders.list.status.processing"),
      tab: "processing",
    },
    {
      id: 4,
      label: t("admin_shop.orders.list.status.shipping"),
      tab: "shipping",
    },
    {
      id: 5,
      label: t("admin_shop.orders.list.status.delivered"),
      tab: "delivered",
    },
    {
      id: 6,
      label: t("admin_shop.orders.list.status.canceled"),
      tab: "canceled",
    },
  ];
};
