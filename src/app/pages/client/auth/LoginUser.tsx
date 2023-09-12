/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-one-expression-per-line */
import { TabsProps } from "antd";
import { useTranslation } from "react-i18next";

import UnDraw from "../../../assets/images/undraw_design_thinking.svg";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import * as S from "./Login.style";

const LoginUser = () => {
  const { t } = useTranslation();

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: t("user.account.sign_up.Sign_up"),
      children: <SignUp />,
    },
    {
      key: "2",
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
          <S.CustomTabs defaultActiveKey="2" items={items} onChange={onChange}></S.CustomTabs>
        </div>
      </div>
    </S.Form>
  );
};

export default LoginUser;
