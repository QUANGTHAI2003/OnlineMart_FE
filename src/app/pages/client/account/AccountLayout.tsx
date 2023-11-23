import AccountSidebar from "@app/app/components/layouts/client/Sidebar/AccountSidebar/AccountSidebar";
import { useResponsive } from "@app/hooks";
import { setShowSidebar } from "@app/store/slices/redux/user/responsiveSidebar";
import { useAppDispatch, useAppSelector } from "@app/store/store";
import { Layout } from "antd";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import * as S from "./AccountLayout.styles";

const AccountLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isTablet } = useResponsive();
  const dispatch = useAppDispatch();

  const isShowSidebar = useAppSelector((state) => state.showSidebar.showSidebar);

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === "/account") {
      navigate("edit_profile");
    }
  }, [location.pathname, navigate]);

  const handleSidebarToggle = () => {
    if (!isTablet) {
      dispatch(setShowSidebar(!isShowSidebar));
    }
  };

  useEffect(() => {
    // Check window width on mount
    const handleWindowResize = () => {
      if (window.innerWidth > 992) {
        dispatch(setShowSidebar(true));
      } else {
        dispatch(setShowSidebar(false));
      }
    };

    // Set initial sidebar state based on window width
    handleWindowResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleWindowResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [dispatch]);

  return (
    <S.AccountLayoutStyle className="container mx-auto gap-4">
      {isShowSidebar && <AccountSidebar onSidebar={handleSidebarToggle} />}
      {(!isTablet && isShowSidebar) || (
        <div className="flex flex-col w-full">
          <Layout.Content className="p-4 md:5 lg:6">
            <Outlet />
          </Layout.Content>
        </div>
      )}
    </S.AccountLayoutStyle>
  );
};

export default AccountLayout;
