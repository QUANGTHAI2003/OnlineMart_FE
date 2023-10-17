import { useLoginMutation, useRegisterMutation } from "@app/store/slices/api/authApi";
import { setCredentials } from "@app/store/slices/authSlice";
import { useAppDispatch } from "@app/store/store";
import { isEntityError, notifyError, notifySuccess } from "@app/utils/helper";
import { Button, Form, Input } from "antd";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import * as S from "./SignupAdmin.styles";

type FormValues = {
  full_name: string;
  email: string;
  password: string;
  confirm_password?: string;
  rememberMe: boolean;
  phone: string;
};

type ErrorMessage = {
  [key: number]: string;
};

const SignupAdmin = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [register, registerResult] = useRegisterMutation();
  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useAppDispatch();

  const handleSubmit = async (data: FormValues) => {
    const full_name = data.full_name;
    const email = data.email;
    const password = data.password;
    const confirm_password = data.confirm_password;
    const phone = data.phone;

    const values = {
      full_name,
      email,
      password,
      confirm_password,
      phone,
      type: "admin",
    };

    try {
      await register(values).unwrap();
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...userData, email }));

      notifySuccess("Successfully", "Register successfully");

      isLoading || navigate("/admin/shop");
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

  const validateMessages = {
    required: "${label} " + t("admin_shop.authentication.signup.err_null"),
    pattern: {
      mismatch: "${label} " + t("admin_shop.authentication.signup.err_pattern"),
    },
    types: {
      email: "${label} " + t("admin_shop.authentication.signup.err_pattern"),
    },
    string: {
      min: "${label} " + t("admin_shop.authentication.signup.min_required", { min: "${min}" }),
    },
  };
  return (
    <div className="flex flex-wrap bg-[#fff]">
      <S.Intro className="md:h-full sm:h-fit md:mb-0 md:bg-[#fff] md:p-11 sm:p-4 sm:bg-[#f5f5fa]">
        <h2 className="text-3xl mb-2">{t("admin_shop.authentication.signup.title")}</h2>
        <p className="mb-12 sm:mb-0">{t("admin_shop.authentication.signup.intro")}</p>
        <div className="w-full h-3/6 overflow-hidden rounded sm:hidden lg:block">
          <img className="w-full h-full object-cover rounded" src="https://source.unsplash.com/random" alt="img" />
        </div>
      </S.Intro>
      <S.FormRegister className="bg-[#f5f5fa] md:py-12 md:px-20 sm:py-8 sm:px-4">
        <h2 className="text-3xl mb-4 md:block sm:hidden">{t("admin_shop.authentication.signup.name")}</h2>
        <Form
          layout="vertical"
          className="md:text-sm sm:text-xs"
          autoComplete="off"
          onFinish={handleSubmit}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="email"
            hasFeedback
            className="mb-5"
            tooltip={t("admin_shop.authentication.signup.tooltip_email")}
            label={t("admin_shop.authentication.signup.label_email")}
            rules={[
              {
                required: true,
              },
              {
                type: "email",
              },
            ]}
          >
            <Input placeholder={t("admin_shop.authentication.signup.p_email")} />
          </Form.Item>
          <Form.Item
            hasFeedback
            name="full_name"
            className="mb-5"
            label={t("admin_shop.authentication.signup.label_fullname")}
            rules={[
              {
                required: true,
              },
              { min: 6 },
            ]}
            validateStatus={errorForm?.full_name && "error"}
            help={errorForm?.full_name && errorForm?.full_name[0]}
          >
            <Input placeholder={t("admin_shop.authentication.signup.p_fullname")} />
          </Form.Item>
          <Form.Item
            hasFeedback
            name="phone"
            className="mb-5"
            label={t("admin_shop.authentication.signup.label_phone")}
            rules={[
              {
                required: true,
              },
              {
                pattern: /(0[3|5|7|8|9])+([0-9]{8})\b/g,
              },
            ]}
            validateStatus={errorForm?.phone && "error"}
            help={errorForm?.phone && errorForm?.phone[0]}
          >
            <Input placeholder={t("admin_shop.authentication.signup.p_phone")} />
          </Form.Item>
          {/* Mật khẩu */}
          <Form.Item
            hasFeedback
            name="password"
            className="mb-5"
            label={t("admin_shop.authentication.signup.label_password")}
            rules={[
              {
                required: true,
              },
              { min: 6 },
            ]}
            validateStatus={errorForm?.password && "error"}
            help={errorForm?.password && errorForm?.password[0]}
          >
            <Input.Password placeholder={t("admin_shop.authentication.signup.p_password")} />
          </Form.Item>
          {/* Nhập lại */}
          <Form.Item
            name="confirm_password"
            hasFeedback
            className="mb-5"
            dependencies={["password"]}
            label={t("admin_shop.authentication.signup.label_repass")}
            rules={[
              {
                required: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(t("admin_shop.authentication.signup.err_repass")));
                },
              }),
            ]}
            validateStatus={errorForm?.confirm_password && "error"}
            help={errorForm?.confirm_password && errorForm?.confirm_password[0]}
          >
            <Input.Password />
          </Form.Item>
          <Button block type="primary" htmlType="submit">
            {t("admin_shop.authentication.signup.name")}
          </Button>
          <div className="text-center mt-5">
            <p className="text-sm leading-4">
              {t("admin_shop.authentication.signup.question")}
              &nbsp;
              <Link to="../admin/shop/auth/signin" className="text-[#1BA8FF]" style={{ textDecoration: "none" }}>
                {t("admin_shop.authentication.signin.name")}
              </Link>
            </p>
          </div>
        </Form>
      </S.FormRegister>
    </div>
  );
};

export default SignupAdmin;
