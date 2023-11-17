const breadcrumbNameMap: Record<string, string> = {
  "": "admin_shop.sidebar.dashboard",
  "/products": "admin_shop.sidebar.product_list",
  "/products/create": "admin_shop.sidebar.product_create",
  "/products/edit": "admin_shop.sidebar.product_edit",
  "/products/review": "admin_shop.sidebar.product_review",
  "/products/inventory": "admin_shop.sidebar.product_inventory",
  "/products/print_qrcode": "admin_shop.sidebar.print_qrcode",
  "/info-seller": "admin_shop.sidebar.info_seller",
  "/categories": "admin_shop.sidebar.product_categories",
  "/suppliers": "admin_shop.sidebar.suppliers",
  "/manage-seller": "admin_shop.sidebar.manage_seller",
  "/manage-seller/role": "admin_shop.sidebar.manage_role",
  "/settings": "admin_shop.sidebar.settings",
  "/settings/logs": "admin_shop.settings.logs.title",
  "/orders": "admin_shop.sidebar.orders",
  "/ships": "admin_shop.sidebar.ships",
  "/reports": "admin_shop.sidebar.report",
  "/reports/profit": "admin_shop.sidebar.profit",
  "/reports/sales": "admin_shop.sidebar.sales",
  "/evoucher": "admin_shop.sidebar.evouncher",
  "/dev_center": "admin_shop.sidebar.dev_center",
  "/dev_center/biz_efficiency": "admin_shop.sidebar.biz_efficiency",
  "/dev_center/traffic_website": "admin_shop.sidebar.traffic_website",
  "/dev_center/operational_efficiency": "admin_shop.sidebar.operational_efficiency",
};

const updatedBreadcrumbNameMap: Record<string, string> = {
  ...breadcrumbNameMap,
  ...Object.fromEntries(Object.entries(breadcrumbNameMap).map(([key, value]) => [`/admin/shop${key}`, value])),
};

export default updatedBreadcrumbNameMap;
