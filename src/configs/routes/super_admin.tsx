import { DashboardOutlined, ShopOutlined } from "@ant-design/icons";
import { ISidebarMenu } from "@app/interfaces/routes.interface";

export const adminSuperRoutes: ISidebarMenu[] = [
  {
    title: "admin_super.sidebar.dashboard",
    key: "dashboard",
    url: "/admin/super",
    icon: <DashboardOutlined />,
  },
  {
    title: "admin_super.sidebar.review",
    key: "review",
    url: "/admin/super/review",
    icon: <ShopOutlined />,
    children: [
      {
        title: "admin_super.sidebar.shop_list",
        key: "shop_list",
        url: "/admin/super/review",
      },
    ],
  },
];
