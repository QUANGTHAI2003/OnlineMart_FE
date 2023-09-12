import { Form, Input } from "antd";
// import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import * as S from "../Login.style";

type FormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export default function Login() {
  const { t } = useTranslation();

  const { handleSubmit } = useForm<FormValues>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);

    console.log("Remember me:", data.rememberMe);
  });
  const onChange = (e: any) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <S.LoginForm className="mt-4">
      <Form onFinish={onSubmit} autoComplete="off">
        <Form.Item
          name="email"
          rules={[
            { required: true, message: `${t("user.account.login.required")} Email` },
            {
              type: "email",
              message: t("user.account.sign_up.validate.email"),
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          className="mb-3"
          rules={[
            { required: true, message: `${t("user.account.login.required")} ${t("user.account.login.password")}` },
          ]}
        >
          <S.InputPassword className="password-input " placeholder={t("user.account.login.password")} />
        </Form.Item>
        <div className="flex h-10 items-center justify-between">
          <S.StyledCheckbox onChange={onChange}>{t("user.account.login.remember_me")}</S.StyledCheckbox>
          <Link to="/auth/email">
            <span className="justify-end p-3 flex ">{t("user.account.login.forgot")}</span>
          </Link>
        </div>
        <Form.Item>
          <button type="submit">{t("user.account.login.Login")}</button>
        </Form.Item>
        <div className="text-center text-gray-500 text-sm">{t("user.account.login.or")}</div>
        <div className="text-center text-gray-500">ONLINE MART &copy; 2018 - 2022. All Rights Reserved</div>
      </Form>
    </S.LoginForm>
  );
}
