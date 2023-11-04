const breadcrumbNameMapSuperAdmin: Record<string, string> = {
  "/review": "admin_super.sidebar.shop_list",
};

const updatedBreadcrumbNameMapSuperAdmin: Record<string, string> = {
  ...breadcrumbNameMapSuperAdmin,
  ...Object.fromEntries(
    Object.entries(breadcrumbNameMapSuperAdmin).map(([key, value]) => [`/admin/super${key}`, value])
  ),
};

export default updatedBreadcrumbNameMapSuperAdmin;
