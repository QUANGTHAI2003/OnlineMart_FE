import AccountSidebar from "@app/app/components/layouts/client/Sidebar/AccountSidebar/AccountSidebar";
import { Layout } from "antd";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AccountLayout = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const navigate = useNavigate();

  // Redirect to the "edit" route if the current route is "/account"
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath === "/account") {
      navigate("edit_profile");
    }
  }, [navigate]);

  return (
    <Layout className="container mx-auto">
      <AccountSidebar />
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
      </div>
    </Layout>
  );
};

export default AccountLayout;
