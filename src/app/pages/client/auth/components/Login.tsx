import { useLoginUserMutation } from "@app/store/slices/api/authApi";
import { setCredentials } from "@app/store/slices/authSlice";
import { useAppDispatch } from "@app/store/store";
import { isEntityError, notifyError, notifySuccess } from "@app/utils/helper";
import { Button, Checkbox, Form, Input } from "antd";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import * as S from "../Login.style";

type FormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

type ErrorMessage = {
  [key: number]: string;
};

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [loginUser, { isLoading, error }] = useLoginUserMutation();

  const dispatch = useAppDispatch();

  const handleSubmit = async (data: FormValues) => {
    const email = data.email;
    const password = data.password;

    try {
      const userData = await loginUser({ email, password }).unwrap();
      dispatch(setCredentials({ ...userData, email }));

      notifySuccess("Successfully", "Login successfully");

      isLoading || navigate("/");
    } catch (err: any) {
      const errorStatus = err.status || 500;

      const errorMessages: ErrorMessage = {
        400: "Bad Request",
        401: "Email or password is incorrect",
        403: "Invalid",
        500: "Internal Server Error",
      };

      const errorMessage = errorMessages[errorStatus] || "Unknown Error";

      notifyError("Login failed", errorMessage);
    }
  };

  const errorForm: any = useMemo(() => {
    const errorResult = error;

    if (isEntityError(errorResult)) {
      return errorResult.data.errors;
    }

    return null;
  }, [error]);

  return (
    <S.LoginForm className="mt-4">
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: `${t("user.account.login.required")} Email` },
            {
              type: "email",
              message: t("user.account.sign_up.validate.email"),
            },
          ]}
          hasFeedback
          validateStatus={errorForm?.email && "error"}
          help={errorForm?.email && errorForm?.email[0]}
        >
          <Input placeholder="Email" size="large" />
        </Form.Item>
        <Form.Item
          name="password"
          className="mb-3"
          rules={[
            { required: true, message: `${t("user.account.login.required")} ${t("user.account.login.password")}` },
          ]}
          hasFeedback
          validateStatus={errorForm?.password && "error"}
          help={errorForm?.password && errorForm?.password[0]}
        >
          <Input.Password size="large" placeholder={t("user.account.login.password")} />
        </Form.Item>
        <div className="flex h-10 items-center justify-between">
          <Checkbox>{t("user.account.login.remember_me")}</Checkbox>
          <Link to="/auth/email">
            <span className="justify-end p-3 flex ">{t("user.account.login.forgot")}</span>
          </Link>
        </div>
        <Form.Item>
          <Button size="large" block htmlType="submit" type="primary" loading={isLoading}>
            {t("user.account.login.Login")}
          </Button>
        </Form.Item>
        <div className="text-center text-gray-500 text-sm">{t("user.account.login.or")}</div>
        <div className="text-center text-gray-500">ONLINE MART &copy; 2018 - 2022. All Rights Reserved</div>
      </Form>
    </S.LoginForm>
  );
}
