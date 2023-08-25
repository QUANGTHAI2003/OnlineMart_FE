import CategorySidebar from "@app/app/components/layouts/client/Sidebar/CategorySidebar/CategorySidebar";
import SortProductSidebar from "@app/app/components/layouts/client/Sidebar/SortProductSidebar/SortProductSidebar";
import { useResponsive } from "@app/hooks";
import { Layout } from "antd";
import { Outlet, useLocation } from "react-router-dom";

import UserFooter from "./Footer/UserFooter";
import UserHeader from "./Header/UserHeader";

const UserMainLayout = (): JSX.Element => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const location = useLocation();
  const homePage = location.pathname === "/";
  const categoryPage = location.pathname === "/category";
  const maxWidth = homePage ? "1440px" : "1280px";

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { isTablet } = useResponsive();

  return (
    <Layout className="layout">
      <UserHeader />
      <Layout className="container mx-auto gap-6 mt-6" style={{ maxWidth }}>
        {isTablet && (homePage ? <CategorySidebar /> : categoryPage ? <SortProductSidebar /> : null)}
        <div className="flex flex-col overflow-hidden">
          <Layout.Content>
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
