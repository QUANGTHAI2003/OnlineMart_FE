import { useLoginMutation } from "@app/store/slices/api/authApi";
import { setCredentials } from "@app/store/slices/authSlice";
import { useAppDispatch } from "@app/store/store";
import { handleApiError, isEntityError, notifySuccess } from "@app/utils/helper";
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

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [login, { isLoading, error }] = useLoginMutation();

  const dispatch = useAppDispatch();

  const handleSubmit = async (data: FormValues) => {
    const email = data.email;
    const password = data.password;

    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...userData, email }));

      notifySuccess("Successfully", "Login successfully");

      isLoading || navigate("/");
    } catch (err: any) {
      handleApiError(err);
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
      <Form onFinish={handleSubmit} autoComplete="off">
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
          <Link to="/auth/send-otp">
            <span className="justify-end p-3 flex ">{t("user.account.login.forgot")}</span>
          </Link>
        </div>
        <Form.Item>
          <Button size="large" block htmlType="submit" type="primary" loading={isLoading}>
            {t("user.account.login.Login")}
          </Button>
        </Form.Item>
        <div className="text-center text-gray-500 text-sm">{t("user.account.login.or")}</div>
        <div className="text-center text-gray-500">ONLINE MART &copy; 2023. All Rights Reserved</div>
      </Form>
    </S.LoginForm>
  );
}
