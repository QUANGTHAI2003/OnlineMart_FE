import { useLoginMutation, useRegisterMutation } from "@app/store/slices/api/authApi";
import { setCredentials } from "@app/store/slices/authSlice";
import { useAppDispatch } from "@app/store/store";
import { isEntityError, notifyError, notifySuccess } from "@app/utils/helper";
import { Button, Checkbox, Form, Input } from "antd";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import * as S from "../Login.style";

type FormValues = {
  fullname: string;
  email: string;
  phone: number;
  password: string;
  confirm?: string;
};

type ErrorMessage = {
  [key: number]: string;
};

export default function SignUp() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [register, registerResult] = useRegisterMutation();
  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useAppDispatch();

  const handleSubmit = async (data: FormValues) => {
    const full_name = data.fullname;
    const email = data.email;
    const password = data.password;
    const confirm_password = data.confirm;

    try {
      await register({ full_name, email, password, confirm_password }).unwrap();
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...userData, email }));

      notifySuccess("Successfully", "Register successfully");

      isLoading || navigate("/");
    } catch (err: any) {
      const status = err.status || 500;
      const errorMessages: ErrorMessage = {
        400: "Bad Request",
        401: "Unauthorized",
        500: "Internal Server Error",
      };

      const errorMessage = errorMessages[status];

      notifyError("Register failed", errorMessage);
    }
  };

  const errorForm: any = useMemo(() => {
    const errorResult = registerResult.error;

    if (isEntityError(errorResult)) {
      return errorResult.data.errors;
    }

    return null;
  }, [registerResult.error]);

  return (
    <S.SignUpForm className="mt-4">
      <Form onFinish={handleSubmit} autoComplete="off">
        <Form.Item
          name="full_name"
          hasFeedback
          rules={[
            {
              required: true,
              message: `${t("user.account.sign_up.validate.required")} ${t("user.account.sign_up.full_name")}`,
            },
            {
              min: 3,
              message: t("user.account.sign_up.validate.min_name"),
            },
            {
              max: 255,
              message: t("user.account.sign_up.validate.max_name"),
            },
            {
              pattern: /^[a-zA-Z\s]+$/,
              message: t("user.account.sign_up.validate.text"),
            },
          ]}
          validateStatus={errorForm?.full_name ? "error" : "success"}
          help={errorForm?.full_name?.[0]}
        >
          <Input size="large" placeholder={t("user.account.sign_up.full_name")} />
        </Form.Item>
        <Form.Item
          name="email"
          hasFeedback
          rules={[
            { required: true, message: `${t("user.account.sign_up.validate.required")} Email` },
            {
              type: "email",
              message: t("user.account.sign_up.validate.email"),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("email") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(t("user.account.sign_up.validate.not_match")));
              },
            }),
          ]}
          validateStatus={errorForm?.email ? "error" : "success"}
          help={errorForm?.email?.[0]}
        >
          <Input size="large" placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: `${t("user.account.sign_up.validate.required")} ${t("user.account.sign_up.password")}`,
            },
            {
              min: 6,
              message: t("user.account.sign_up.validate.min_password"),
            },
          ]}
          hasFeedback
          validateStatus={errorForm?.password ? "error" : "success"}
          help={errorForm?.password?.[0]}
        >
          <Input.Password size="large" placeholder={t("user.account.sign_up.password")} />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: `${t("user.account.sign_up.validate.required")} ${t("user.account.sign_up.cf_password")}`,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(t("user.account.sign_up.validate.not_match")));
              },
            }),
          ]}
          validateStatus={errorForm?.confirm_password ? "error" : "success"}
          help={errorForm?.confirm_password?.[0]}
        >
          <Input.Password size="large" className="mb-3" placeholder={t("user.account.sign_up.cf_password")} />
        </Form.Item>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error(t("user.account.sign_up.validate.terms"))),
            },
          ]}
        >
          <Checkbox className="">
            <span>{t("user.account.sign_up.agree")}</span>
            &nbsp;
            <span className="text-blue-500">{t("user.account.sign_up.rules")}</span>
            &nbsp; Online Mart
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button loading={isLoading} size="large" block htmlType="submit" type="primary">
            {t("user.account.sign_up.Sign_up")}
          </Button>
        </Form.Item>
        <div className="text-center text-gray-500">ONLINE MART &copy; 2018 - 2022. All Rights Reserved</div>
      </Form>
    </S.SignUpForm>
  );
}
