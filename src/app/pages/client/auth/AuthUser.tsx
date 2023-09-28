/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-one-expression-per-line */
import { useSyncUrlWithTab } from "@app/hooks";
import { TabsProps } from "antd";
import { useTranslation } from "react-i18next";

import UnDraw from "../../../assets/images/undraw_design_thinking.svg";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import * as S from "./Login.style";

const AuthUser = () => {
  const { t } = useTranslation();

  const { tabFiltered, handleChangeTab } = useSyncUrlWithTab("login", "tab");

  const items: TabsProps["items"] = [
    {
      key: "signup",
      label: t("user.account.sign_up.Sign_up"),
      children: <SignUp />,
    },
    {
      key: "login",
      label: t("user.account.login.Login"),
      children: <Login />,
    },
  ];

  return (
    <S.Form>
      <div className="flex bg-white items-center max-width-form ">
        <S.ImageLoginUser>
          <img src={UnDraw} alt="Design Thinking" className="w-3/5" />
        </S.ImageLoginUser>

        <div className=" mt-4 user-form w-[460px] ">
          <div className="text-center text-base justify-center mb-4">
            <span>{t("user.account.welcome")}</span>
          </div>
          <S.CustomTabs defaultActiveKey="login" activeKey={tabFiltered} items={items} onChange={handleChangeTab} />
        </div>
      </div>
    </S.Form>
  );
};

export default AuthUser;
