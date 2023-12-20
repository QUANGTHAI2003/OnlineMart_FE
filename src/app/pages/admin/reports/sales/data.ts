export const DualChartData = [
  {
    time: "2019-03",
    value: 2000,
  },
  {
    time: "2019-04",
    value: 900,
  },
  {
    time: "2019-05",
    value: 300,
  },
  {
    time: "2019-06",
    value: 450,
  },
  {
    time: "2019-07",
    value: 470,
  },
  {
    time: "2019-07",
    value: 470,
  },
];

export const PieChartData = (t: any) => [
  {
    type: t("admin_shop.reports.sales.piechart.awaiting"),
    value: 14,
  },
  {
    type: t("admin_shop.reports.sales.piechart.in_progress"),
    value: 32,
  },
  {
    type: t("admin_shop.reports.sales.piechart.to_receive"),
    value: 27,
  },
  {
    type: t("admin_shop.reports.sales.piechart.completed"),
    value: 24,
  },
  {
    type: t("admin_shop.reports.sales.piechart.canceled"),
    value: 3,
  },
];

export const DualChartOptions = (t: any) => [
  { value: "7days", label: t("admin_shop.reports.sales.common.7days") },
  { value: "1month", label: t("admin_shop.reports.sales.common.1month") },
  { value: "1quarter", label: t("admin_shop.reports.sales.common.1quarter") },
  { value: "1year", label: t("admin_shop.reports.sales.common.1year") },
];

export const PieChartOptions = (t: any) => [
  { value: "7days", label: t("admin_shop.reports.sales.common.7days") },
  { value: "1month", label: t("admin_shop.reports.sales.common.1month") },
  { value: "1quarter", label: t("admin_shop.reports.sales.common.1quarter") },
  { value: "1year", label: t("admin_shop.reports.sales.common.1year") },
];

export const OrderStatusData = (t: any) => {
  return [
    {
      id: 1,
      meta_title: t("admin_shop.reports.sales.piechart.return_refund"),
      title: t("admin_shop.reports.sales.order_status_data.return"),
      value: "-277,000",
      unit: "VNĐ",
    },
    {
      id: 2,
      meta_title: t("admin_shop.reports.sales.order_status_data.paid"),
      title: t("admin_shop.reports.sales.order_status_data.payment"),
      value: "1,915,000",
      unit: "VNĐ",
    },
    {
      id: 3,
      meta_title: t("admin_shop.reports.sales.order_status_data.qty_orders"),
      title: t("admin_shop.reports.sales.order_status_data.orders_uppercase"),
      value: "14",
      unit: t("admin_shop.reports.sales.order_status_data.orders_lowercase"),
    },
  ];
};
