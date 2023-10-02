import { userApi } from "@app/store/slices/api/userApi";
import CustomLoading from "@app/utils/Loading/CustomLoading";
import React from "react";
import { useCookies } from "react-cookie";
import { Navigate, useLocation } from "react-router-dom";

interface IRequireAuthProps {
  children: React.ReactNode;
  type: "client" | "adminShop" | "superAdmin";
  allowedRoles?: string[];
}

const RequireAuth: React.FC<IRequireAuthProps> = ({ children, type }) => {
  const [cookies] = useCookies(["logged_in"]);
  const location = useLocation();

  const { isLoading, isFetching } = userApi.endpoints.getMe.useQuery(null, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });

  const loading = isLoading || isFetching;

  const user = userApi.endpoints.getMe.useQueryState(null, {
    selectFromResult: (data) => {
      return data;
    },
  });

  if (loading) {
    return <CustomLoading />;
  }

  const checkType = {
    client: "/auth",
    adminShop: "/admin/shop/login",
    superAdmin: "/admin/super/login",
  }[type];

  return cookies.logged_in || user ? (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{children}</>
  ) : (
    <Navigate to={checkType} state={{ form: location }} replace />
  );
};

export default RequireAuth;
