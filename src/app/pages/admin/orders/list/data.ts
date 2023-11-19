export const OrderListTab = (t: any) => {
  return [
    {
      id: 1,
      name: t("admin_shop.orders.list.status.all"),
      tab: "all",
    },
    {
      id: 2,
      name: t("admin_shop.orders.list.status.awaiting"),
      tab: "awaiting",
    },
    {
      id: 3,
      name: t("admin_shop.orders.list.status.processing"),
      tab: "processing",
    },
    {
      id: 4,
      name: t("admin_shop.orders.list.status.shipping"),
      tab: "shipping",
    },
    {
      id: 5,
      name: t("admin_shop.orders.list.status.delivered"),
      tab: "delivered",
    },
    {
      id: 6,
      name: t("admin_shop.orders.list.status.canceled"),
      tab: "canceled",
    },
  ];
};
