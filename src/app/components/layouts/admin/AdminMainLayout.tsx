import MainHeader from "@app/app/components/layouts/admin/Header/AdminMainHeader";
import { useToggle } from "@app/hooks";
import { FloatButton, Layout } from "antd";
import { Outlet } from "react-router-dom";

import AdminMainSidebar from "./Sidebar/AdminMainSidebar";

const AdminMainLayout = () => {
  const [isCollapsed, toggleSidebar] = useToggle(false);

  return (
    <Layout>
      <AdminMainSidebar isCollapsed={isCollapsed} />
      <Layout>
        <MainHeader isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
        <Layout.Content>
          <Outlet />
        </Layout.Content>
      </Layout>
      <FloatButton.BackTop />
    </Layout>
  );
};

export default AdminMainLayout;
