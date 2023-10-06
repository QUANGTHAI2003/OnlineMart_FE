const breadcrumbNameMap: Record<string, string> = {
  "/products": "admin_shop.sidebar.product_list",
  "/products/create": "admin_shop.sidebar.product_create",
  "/products/review": "admin_shop.sidebar.product_review",
  "/products/inventory": "admin_shop.sidebar.product_inventory",
  "/info-seller": "admin_shop.sidebar.info_seller",
  "/categories": "admin_shop.sidebar.product_categories",
  "/suppliers": "admin_shop.sidebar.suppliers",
  "/manage-seller/role": "admin_shop.sidebar.manage_role",
  "/orders": "admin_shop.sidebar.orders",
};

const updatedBreadcrumbNameMap: Record<string, string> = {
  ...breadcrumbNameMap,
  ...Object.fromEntries(Object.entries(breadcrumbNameMap).map(([key, value]) => [`/admin/shop${key}`, value])),
};

export default updatedBreadcrumbNameMap;
