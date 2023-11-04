import MainHeader from "@app/app/components/layouts/super_admin/Header/AdminSuperMainHeader";
import { useToggle } from "@app/hooks";
import { Alert, FloatButton, Layout } from "antd";
import { Outlet } from "react-router-dom";

import AdminSuperMainSidebar from "./Sidebar/AdminSuperMainSidebar";

const AdminSuperMainLayout = () => {
  const [isCollapsed, toggleSidebar] = useToggle(false);

  return (
    <>
      <Alert message={<div>Super admin</div>} type="warning" style={{ textAlign: "center" }} />
      <Layout>
        <AdminSuperMainSidebar isCollapsed={isCollapsed} />
        <Layout>
          <MainHeader isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
          <Layout.Content>
            <Outlet />
          </Layout.Content>
        </Layout>
        <FloatButton.BackTop />
      </Layout>
    </>
  );
};

export default AdminSuperMainLayout;
