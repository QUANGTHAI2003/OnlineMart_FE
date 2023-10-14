import {
  DashboardOutlined,
  LaptopOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UsergroupAddOutlined,
  ControlOutlined,
  StockOutlined,
} from "@ant-design/icons";
import { ISidebarMenu } from "@app/interfaces/routes.interface";

export const adminShopRoutes: ISidebarMenu[] = [
  {
    title: "admin_shop.sidebar.dashboard",
    key: "dashboard",
    url: "/admin/shop",
    icon: <DashboardOutlined />,
  },
  {
    title: "admin_shop.sidebar.products",
    key: "products",
    url: "/admin/shop/products",
    icon: <LaptopOutlined />,
    children: [
      {
        title: "admin_shop.sidebar.product_list",
        key: "product_list",
        url: "/admin/shop/products",
      },
      {
        title: "admin_shop.sidebar.product_create",
        key: "product_create",
        url: "/admin/shop/products/create",
      },
      {
        title: "admin_shop.sidebar.product_review",
        key: "product_review",
        url: "/admin/shop/products/review",
      },
      {
        title: "admin_shop.sidebar.product_categories",
        key: "product_categories",
        url: "/admin/shop/categories",
      },
      {
        title: "admin_shop.sidebar.suppliers",
        key: "suppliers",
        url: "/admin/shop/suppliers",
      },
    ],
  },
  {
    title: "admin_shop.sidebar.management",
    key: "manage",
    url: "/admin/shop/manage",
    icon: <ControlOutlined />,
    children: [
      {
        title: "admin_shop.sidebar.product_inventory",
        key: "product_inventory",
        url: "/admin/shop/products/inventory",
      },
    ],
  },
  {
    title: "admin_shop.sidebar.orders",
    key: "orders",
    url: "/admin/shop/orders",
    icon: <ShoppingCartOutlined />,
    children: [
      {
        title: "admin_shop.sidebar.order_list",
        key: "order_list",
        url: "/admin/shop/orders",
      },
      {
        title: "admin_shop.sidebar.order_bill",
        key: "order_bill",
        url: "/admin/shop/orders/bill",
      },
    ],
  },
  {
    title: "admin_shop.sidebar.info_seller",
    key: "info_seller",
    url: "/admin/shop/info-seller",
    icon: <ShopOutlined />,
  },
  {
    title: "admin_shop.sidebar.manage_seller",
    key: "manage_seller",
    url: "/admin/shop/manage-seller",
    icon: <UsergroupAddOutlined />,
    children: [
      {
        title: "admin_shop.sidebar.manage_role",
        key: "manage_role",
        url: "/admin/shop/manage-seller/role",
      },
      {
        title: "admin_shop.sidebar.manage_permission",
        key: "manage_permission",
        url: "/admin/shop/manage-seller/permission",
      },
    ],
  },
  {
    title: "admin_shop.sidebar.report",
    key: "reports",
    url: "/admin/shop/reports",
    icon: <StockOutlined />,
    children: [
      {
        title: "admin_shop.sidebar.profit",
        key: "profit",
        url: "/admin/shop/reports/profit",
      },
      {
        title: "admin_shop.sidebar.sales",
        key: "sales",
        url: "/admin/shop/reports/sales",
      },
    ],
  },
];
