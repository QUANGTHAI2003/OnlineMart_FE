import CategorySidebar from "@app/app/components/layouts/client/Sidebar/CategorySidebar/CategorySidebar";
import SortProductSidebar from "@app/app/components/layouts/client/Sidebar/SortProductSidebar/SortProductSidebar";
import { Layout } from "antd";
import { Outlet, useLocation } from "react-router-dom";

import UserFooter from "./Footer/UserFooter";
import Header from "./Header/Header";

const UserMainLayout = (): JSX.Element => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const location = useLocation();
  const homePage = location.pathname === "/";
  const categoryPage = location.pathname === "/category";
  const maxWidth = homePage ? "1440px" : "1280px";

  return (
    <Layout className="layout">
      {/* <UserHeader /> */}
      <Header />
      <Layout className="container mx-auto" style={{ maxWidth }}>
        {homePage ? <CategorySidebar /> : categoryPage ? <SortProductSidebar /> : null}
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
              background: "#f5f5fa",
            }}
          >
            <Outlet />
          </Layout.Content>
          {homePage && <UserFooter />}
        </div>
      </Layout>
      {homePage || <UserFooter />}
    </Layout>
  );
};

export default UserMainLayout;
