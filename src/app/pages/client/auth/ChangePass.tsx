import { useResetPasswordMutation } from "@app/store/slices/api/auth/forgotPasswordApi";
import { handleApiError, isEntityError, notifySuccess } from "@app/utils/helper";
import { Button, Form, Input } from "antd";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import * as S from "./Login.style";

const ChangePasswordForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [resetPassword, { isLoading, error }] = useResetPasswordMutation();

  const currentVerifyEmail = localStorage.getItem("address_receiver") || "";
  const isVerified = localStorage.getItem("is_verified") || "";

  useEffect(() => {
    if (!currentVerifyEmail && !isVerified) {
      navigate("/auth/send-otp");
    }
  }, [currentVerifyEmail, isVerified, navigate]);

  const handleSubmit = async (fieldValues: any) => {
    try {
      const values = {
        address_receiver: currentVerifyEmail,
        password: fieldValues.password,
        confirm_password: fieldValues.confirm_password,
      };

      await resetPassword(values).unwrap();
      localStorage.removeItem("address_receiver");
      localStorage.removeItem("is_verified");

      notifySuccess("Successfully", "Change password successfully");

      setTimeout(() => {
        navigate("/auth?tab=login");
      }, 500);
    } catch (error) {
      handleApiError(error);
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
    <S.ChangePass>
      <Form onFinish={handleSubmit}>
        <div className="flex flex-col mt-36 items-center">
          <div className="w-1/4 change-form  p-4 rounded-lg  text-center">
            <h1 className="p-3">{t("user.account.change_pass.change")}</h1>
            <p>{t("user.account.change_pass.new_password")}</p>
            <p className="pb-5">{currentVerifyEmail}</p>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: t("user.account.change_pass.validate.required"),
                },
                {
                  min: 6,
                },
              ]}
              hasFeedback
              validateStatus={errorForm?.password && "error"}
              help={errorForm?.password && errorForm?.password[0]}
            >
              <Input.Password className="h-10" placeholder={t("user.account.change_pass.pass")} />
            </Form.Item>

            <Form.Item
              name="confirm_password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: t("user.account.change_pass.validate.required"),
                },
                {
                  min: 6,
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error(t("user.account.change_pass.validate.not_match")));
                  },
                }),
              ]}
              validateStatus={errorForm?.confirm_password && "error"}
              help={errorForm?.confirm_password && errorForm?.confirm_password[0]}
            >
              <Input.Password className="h-10" placeholder={t("user.account.change_pass.cf_pass")} />
            </Form.Item>
            <Button loading={isLoading} htmlType="submit" type="primary" className="w-full h-12 rounded-4xl">
              {t("user.account.change_pass.change")}
            </Button>
          </div>
          <span className="text-xs p-2 text-gray-500">ONLINE MART | &copy; 2023. All Rights Reserved</span>
        </div>
      </Form>
    </S.ChangePass>
  );
};

export default ChangePasswordForm;
