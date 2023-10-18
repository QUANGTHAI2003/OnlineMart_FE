import CustomLoading from "@app/utils/Loading/CustomLoading";
import React from "react";
import { useCookies } from "react-cookie";

import { userApi } from "../slices/api/userApi";

type IAuthMiddleware = {
  children: React.ReactElement;
};

const AuthMiddleware: React.FC<IAuthMiddleware> = ({ children }) => {
  const [cookies] = useCookies(["logged_in"]);

  const { isLoading } = userApi.endpoints.getMe.useQuery(null, {
    skip: !cookies.logged_in,
  });

  if (isLoading) {
    return <CustomLoading />;
  }

  return children;
};

export default AuthMiddleware;
