import { LaptopOutlined, NotificationOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";

const CategorySidebar = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const items2: MenuProps["items"] = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `Category Sidebar ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `Category_${subKey}`,
        };
      }),
    };
  });
  return (
    <Sider style={{ background: colorBgContainer }} width={230}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%" }}
        items={items2}
      />
    </Sider>
  );
};

export default CategorySidebar;
