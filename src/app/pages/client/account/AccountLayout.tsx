import AccountSidebar from "@app/app/components/layouts/client/Sidebar/AccountSidebar/AccountSidebar";
import { useResponsive } from "@app/hooks";
import { Layout } from "antd";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import * as S from "./AccountLayout.styles";

const AccountLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isTablet } = useResponsive();
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === "/account") {
      navigate("edit_profile");
    }
  }, [location.pathname, navigate]);

  const handleBack = () => {
    setShowSidebar(true);
    navigate("/account");
  };

  const handleSidebarToggle = () => {
    if (!isTablet) {
      setShowSidebar(!showSidebar);
    }
  };

  return (
    <S.AccountLayoutStyle className="container mx-auto">
      {showSidebar && <AccountSidebar onSidebar={handleSidebarToggle} />}
      {(!isTablet && showSidebar) || (
        <div className="flex flex-col w-full">
          <Layout.Content
            className="p-4 md:5 lg:6"
            style={{
              minHeight: 280,
              background: "#f5f5fa",
            }}
          >
            <>
              {!isTablet && (
                <button className="cursor-pointer" onClick={handleBack}>
                  Back
                </button>
              )}
              <Outlet />
            </>
          </Layout.Content>
        </div>
      )}
    </S.AccountLayoutStyle>
  );
};

export default AccountLayout;
