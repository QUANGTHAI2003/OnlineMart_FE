import UserHeader from "@app/app/components/layouts/client/Header/UserHeader";
import AccountSidebar from "@app/app/components/layouts/client/Sidebar/AccountSidebar/AccountSidebar";
import CategorySidebar from "@app/app/components/layouts/client/Sidebar/CategorySidebar/CategorySidebar";
import SortProductSidebar from "@app/app/components/layouts/client/Sidebar/SortProductSidebar/SortProductSidebar";
import { Layout } from "antd";
import { Outlet, useLocation } from "react-router-dom";

const UserMainLayout = (): JSX.Element => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const location = useLocation();
  const homePage = location.pathname === "/";
  const categoryPage = location.pathname === "/category";
  const accountPage = location.pathname === "/account";
  const maxWidth = homePage ? "1440px" : "1280px";

  return (
    <Layout className="layout">
      <UserHeader />
      <Layout className="container mx-auto" style={{ maxWidth }}>
        {homePage ? (
          <CategorySidebar />
        ) : categoryPage ? (
          <SortProductSidebar />
        ) : accountPage ? (
          <AccountSidebar />
        ) : null}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Layout.Content
            style={{
              padding: 24,
              minHeight: 280,
              background: "#fff",
            }}
          >
            <Outlet />
          </Layout.Content>
          {homePage && (
            <Layout.Footer style={{ textAlign: "center" }}>Ant Design ©2023 Created by Ant UED</Layout.Footer>
          )}
        </div>
      </Layout>
      {homePage || <Layout.Footer style={{ textAlign: "center" }}>Ant Design ©2023 Created by Ant UED</Layout.Footer>}
    </Layout>
  );
};

export default UserMainLayout;
