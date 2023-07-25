import MainHeader from "@app/app/components/layouts/admin/AdminMainHeader";
import { useToggle } from "@app/hooks";
import { Alert, FloatButton, Layout } from "antd";
import { Outlet } from "react-router-dom";

import MainSidebar from "./AdminMainSidebar";

const AdminMainLayout = () => {
  // const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // const toggleSidebar = () => {
  //   setSidebarCollapsed(!sidebarCollapsed);
  // };

  const [isCollapsed, toggleSidebar] = useToggle(false);

  return (
    <>
      <Alert message={<div>hello</div>} type="warning" style={{ textAlign: "center" }} />
      <Layout>
        <MainSidebar isCollapsed={isCollapsed} />
        <Layout>
          <MainHeader isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
          <Layout.Content
            style={{
              padding: 24,
              minHeight: 280,
              background: "#fff",
            }}
          >
            <Outlet />
          </Layout.Content>
          <Layout.Footer style={{ textAlign: "center" }}>Ant Design ©2023 Created by Ant UED</Layout.Footer>
        </Layout>
        <FloatButton.BackTop />
      </Layout>
    </>
  );
};

export default AdminMainLayout;
