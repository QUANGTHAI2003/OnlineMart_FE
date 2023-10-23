import {
  ControlOutlined,
  DashboardOutlined,
  LaptopOutlined,
  SendOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UsergroupAddOutlined,
  StockOutlined,
  AreaChartOutlined,
} from "@ant-design/icons";
import { ISidebarMenu } from "@app/interfaces/routes.interface";

export const adminShopRoutes: ISidebarMenu[] = [
  {
    title: "admin_shop.sidebar.dashboard",
    key: "dashboard",
    url: "/admin/shop",
    permission: "all",
    icon: <DashboardOutlined />,
  },
  {
    title: "admin_shop.sidebar.orders",
    key: "orders",
    url: "/admin/shop/orders",
    permission: ["View orders", "View bill"],
    icon: <ShoppingCartOutlined />,
    children: [
      {
        title: "admin_shop.sidebar.order_list",
        key: "order_list",
        permission: "View orders",
        url: "/admin/shop/orders",
      },
      {
        title: "admin_shop.sidebar.order_bill",
        key: "order_bill",
        permission: "View bill",
        url: "/admin/shop/orders/bill",
      },
    ],
  },
  {
    title: "admin_shop.sidebar.ships",
    key: "ships",
    url: "/admin/shop/ships",
    permission: ["View shipping"],
    icon: <SendOutlined />,
    children: [
      {
        title: "admin_shop.sidebar.overview",
        key: "overview",
        permission: "View shipping",
        url: "/admin/shop/ships",
      },
    ],
  },
  {
    title: "admin_shop.sidebar.products",
    key: "products",
    url: "/admin/shop/products",
    permission: ["View products", "Create product", "View reviews"],
    icon: <LaptopOutlined />,
    children: [
      {
        title: "admin_shop.sidebar.product_list",
        key: "product_list",
        permission: "View products",
        url: "/admin/shop/products",
      },
      {
        title: "admin_shop.sidebar.product_create",
        key: "product_create",
        permission: "Create product",
        url: "/admin/shop/products/create",
      },
      {
        title: "admin_shop.sidebar.product_review",
        key: "product_review",
        permission: "View reviews",
        url: "/admin/shop/products/review",
      },
      {
        title: "admin_shop.sidebar.product_categories",
        key: "product_categories",
        permission: "View products",
        url: "/admin/shop/categories",
      },
      {
        title: "admin_shop.sidebar.suppliers",
        key: "suppliers",
        permission: "View suppliers",
        url: "/admin/shop/suppliers",
      },
    ],
  },
  {
    title: "admin_shop.sidebar.management",
    key: "manage",
    url: "/admin/shop/manage",
    permission: ["View inventory"],
    icon: <ControlOutlined />,
    children: [
      {
        title: "admin_shop.sidebar.product_inventory",
        key: "product_inventory",
        permission: "View inventory",
        url: "/admin/shop/products/inventory",
      },
    ],
  },
  {
    title: "admin_shop.sidebar.info_seller",
    key: "info_seller",
    url: "/admin/shop/info-seller",
    permission: "Info seller",
    icon: <ShopOutlined />,
  },
  {
    title: "admin_shop.sidebar.manage_seller",
    key: "manage_seller",
    url: "/admin/shop/manage-seller",
    permission: "Authorizations",
    icon: <UsergroupAddOutlined />,
    children: [
      {
        title: "admin_shop.sidebar.manage_role",
        key: "manage_role",
        permission: "Authorizations",
        url: "/admin/shop/manage-seller/role",
      },
    ],
  },
  {
    title: "admin_shop.sidebar.report",
    key: "reports",
    url: "/admin/shop/reports",
    permission: ["View reports"],
    icon: <StockOutlined />,
    children: [
      {
        title: "admin_shop.sidebar.profit",
        key: "profit",
        permission: "View reports",
        url: "/admin/shop/reports/profit",
      },
      {
        title: "admin_shop.sidebar.sales",
        key: "sales",
        permission: "View reports",
        url: "/admin/shop/reports/sales",
      },
    ],
  },
  {
    title: "admin_shop.sidebar.dev_center",
    key: "development_center",
    url: "/admin/shop/dev_center",
    icon: <AreaChartOutlined />,
    children: [
      {
        title: "admin_shop.sidebar.biz_efficiency",
        key: "biz_efficiency",
        url: "/admin/shop/dev_center/biz_efficiency",
      },
      {
        title: "admin_shop.sidebar.traffic_website",
        key: "traffic_website",
        url: "/admin/shop/dev_center/traffic_website",
      },
    ],
  },
];
