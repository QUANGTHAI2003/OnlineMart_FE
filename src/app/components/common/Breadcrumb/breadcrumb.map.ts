const breadcrumbNameMap: Record<string, string> = {
  "/products": "admin_shop.sidebar.product_list",
  "/products/create": "admin_shop.sidebar.product_create",
  "/products/review": "admin_shop.sidebar.product_review",
  "/products/inventory": "admin_shop.sidebar.product_inventory",
  "/products/print_qrcode": "admin_shop.sidebar.print_qrcode",
  "/info-seller": "admin_shop.sidebar.info_seller",
  "/categories": "admin_shop.sidebar.product_categories",
  "/suppliers": "admin_shop.sidebar.suppliers",
  "/manage-seller": "admin_shop.sidebar.manage_seller",
  "/manage-seller/role": "admin_shop.sidebar.manage_role",
  "/orders": "admin_shop.sidebar.orders",
  "/ships": "admin_shop.sidebar.ships",
  "/reports": "admin_shop.sidebar.report",
  "/reports/profit": "admin_shop.sidebar.profit",
  "/reports/sales": "admin_shop.sidebar.sales",
  "/dev_center": "admin_shop.sidebar.dev_center",
  "/dev_center/biz_efficiency": "admin_shop.sidebar.biz_efficiency",
  "/dev_center/traffic_website": "admin_shop.sidebar.traffic_website",
};

const updatedBreadcrumbNameMap: Record<string, string> = {
  ...breadcrumbNameMap,
  ...Object.fromEntries(Object.entries(breadcrumbNameMap).map(([key, value]) => [`/admin/shop${key}`, value])),
};

export default updatedBreadcrumbNameMap;
