import { Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { Link } from "react-router-dom";

const header = [
  {
    key: "tran-chu",
    label: "Trang chủ",
    title: "Trang chủ",
    url: "/",
  },
  {
    key: "dan-muc",
    label: "Danh mục",
    title: "Danh mục",
    url: "/category",
  },
  {
    key: "san-pham",
    label: "Sản phẩm",
    title: "Sản phẩm",
    url: "/product",
  },
  {
    key: "tai-khoan",
    label: "Tài khoản",
    title: "Tài khoản",
    url: "/account",
  },
  {
    key: "admin",
    label: "Admin",
    title: "Admin",
    url: "/admin/shop",
  },
];

const UserHeader = () => {
  return (
    <Header style={{ display: "flex", alignItems: "center" }}>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["4"]}
        style={{ width: "100%" }}
        items={header.map((item) => {
          return {
            key: item.key,
            title: item.title,
            label: <Link to={item.url}>{item.label}</Link>,
          };
        })}
      />
    </Header>
  );
};

export default UserHeader;
