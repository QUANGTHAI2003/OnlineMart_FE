import { useSendOTPMutation } from "@app/store/slices/api/auth/forgotPasswordApi";
import { handleApiError, isEntityError, notifySuccess } from "@app/utils/helper";
import { Button, Form, Input } from "antd";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import * as S from "./Login.style";

const Email = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [sendOTP, { isLoading, error }] = useSendOTPMutation();

  const handleSubmit = async (fieldValues: any) => {
    try {
      const values = {
        address_receiver: fieldValues.address_receiver,
      };

      await sendOTP(values).unwrap();
      navigate("/auth/verify-otp");

      notifySuccess("Email sent successfully");
      localStorage.setItem("address_receiver", values.address_receiver);
    } catch (err) {
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
    <S.ChangePass>
      <Form layout="vertical" onFinish={handleSubmit} className="flex flex-col mt-36 items-center">
        <div className="w-1/4 change-form  p-4 rounded-lg  text-center">
          <h1 className="p-3">{t("user.account.forgot.forgot_pass")}</h1>
          <Form.Item
            name="address_receiver"
            label={t("user.account.forgot.plz")}
            rules={[
              {
                required: true,
                message: t("user.account.forgot.plz"),
              },
            ]}
            validateStatus={errorForm?.address_receiver && "error"}
            help={errorForm?.address_receiver && errorForm?.address_receiver[0]}
          >
            <Input placeholder="Email" className="mb-4 rounded-xl h-10" />
          </Form.Item>
          <Button type="primary" loading={isLoading} htmlType="submit" className="w-full h-12 rounded-4xl">
            {t("user.account.forgot.cf")}
          </Button>
        </div>
        <span className="text-xs p-2  text-gray-500">ONLINE MART | &copy; 2023. All Rights Reserved</span>
      </Form>
    </S.ChangePass>
  );
};

export default Email;
