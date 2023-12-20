import CategorySidebar from "@app/app/components/layouts/client/Sidebar/CategorySidebar/CategorySidebar";
import SortProductSidebar from "@app/app/components/layouts/client/Sidebar/SortProductSidebar/SortProductSidebar";
import { useResponsive } from "@app/hooks";
import { Layout } from "antd";
import { useEffect } from "react";
import ReactGA from "react-ga";
import { Outlet, useLocation } from "react-router-dom";

import UserFooter from "./Footer/UserFooter";
import Navigation from "./Header/Navigation";
import UserHeader from "./Header/UserHeader";

const UserMainLayout = (): JSX.Element => {
  const location = useLocation();
  const homePage = location.pathname === "/";
  const categoryPage = location.pathname.startsWith("/category/");
  const maxWidth = homePage ? "1440px" : "1280px";

  const { isTablet, isDesktop } = useResponsive();

  ReactGA.initialize("G-EQQ0LD4QKD");

  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);

  return (
    <Layout className="layout">
      <UserHeader />
      <Layout className="container mx-auto gap-6 mt-6" style={{ maxWidth }}>
        {isTablet && (homePage ? <CategorySidebar /> : categoryPage ? <SortProductSidebar /> : null)}
        <div className="flex flex-col overflow-hidden w-full">
          <Layout.Content>
            <Outlet />
          </Layout.Content>
          {homePage && <UserFooter />}
        </div>
      </Layout>
      {!isTablet && homePage && <Navigation />}
      {!isDesktop && <UserFooter />}
    </Layout>
  );
};

export default UserMainLayout;
