import { getAccessToken } from "@app/utils/localstorage";
import React from "react";
import { Navigate } from "react-router-dom";

interface IRequireAuthProps {
  children: React.ReactNode;
  type: "client" | "adminShop" | "superAdmin";
}

const RequireAuth: React.FC<IRequireAuthProps> = ({ children, type }) => {
  // remove 1 when have api
  const token = getAccessToken();

  const checkType = {
    client: "/login",
    adminShop: "/admin/shop/login",
    superAdmin: "/admin/super/login",
  }[type];

  return token ? (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{children}</>
  ) : (
    <Navigate to={checkType} replace={true} />
  );
};

export default RequireAuth;
