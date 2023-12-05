import { useSendOTPMutation, useVerifyOtpMutation } from "@app/store/slices/api/auth/forgotPasswordApi";
import { handleApiError, notifySuccess } from "@app/utils/helper";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import OTPInput from "./components/OTPInput";
import * as S from "./Login.style";

const Otp: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(300);
  const [currentOtp, setCurrentOtp] = useState<string>("");

  const currentVerifyEmail = localStorage.getItem("address_receiver") || "";

  const [sendOTP] = useSendOTPMutation();
  const [verifyOtp, { isLoading, error }] = useVerifyOtpMutation();

  useEffect(() => {
    if (!currentVerifyEmail) {
      navigate("/auth/email");
    }
  }, [currentVerifyEmail, navigate]);

  const handleSubmit = async (otpValue: string) => {
    try {
      if (otpValue) {
        const values = {
          otp: otpValue,
        };

        await verifyOtp(values).unwrap();
        notifySuccess("Xác thực OTP thành công");

        localStorage.setItem("is_verified", "1");

        setTimeout(() => {
          navigate("/auth/changepass");
        }, 500);
      }
    } catch (err) {
      console.log({ error });
      handleApiError(err);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
      clearTimeout(timer);
    };
  }, [countdown]);

  const handleResendOTP = async () => {
    try {
      await sendOTP({ email: currentVerifyEmail }).unwrap();

      notifySuccess("Gửi OTP thành công");

      setCountdown(300);
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleOTPChange = (otpValue: string) => {
    setOtp(otpValue);
    setCurrentOtp(otpValue);
  };

  const formatCountdown = (countdown: number) => {
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <S.Otp>
      <div className="Otp">
        <span className="text-4xl font-bold">{t("user.account.otp.otp_auth")}</span>
        <p className="pt-4">{t("user.account.otp.send")}</p>
        <p>{t("user.account.otp.mail")}</p>

        <OTPInput
          length={6}
          className="otpContainer"
          inputClassName="otpInput"
          isNumberInput
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          onChangeOTP={handleOTPChange}
        />
        <p>{((error as any)?.data as any)?.message}</p>
        {countdown > 0 && (
          <p className="cursor-pointer">
            {t("user.account.otp.press_agin")}
            <span className="text-blue-500">{formatCountdown(countdown)}</span>
          </p>
        )}

        {!otp && countdown === 0 && (
          <>
            <p>{t("user.account.otp.no_mail")}</p>
            <p>
              {t("user.account.otp.plz")}
              &nbsp;
              <button className="text-blue-500 border-none" onClick={handleResendOTP}>
                {t("user.account.otp.otp")}
              </button>
            </p>
          </>
        )}
        <div className="w-auto mt-8">
          <Button
            loading={isLoading}
            onClick={() => handleSubmit(currentOtp)}
            className="w-3/12 h-12 button-otp bg-blue-500 text-white rounded-3xl "
          >
            {t("user.account.otp.cf")}
          </Button>
        </div>
      </div>
      <span className="text-xs p-3 flex justify-center text-gray-500">
        ONLINE MART | &copy; 2023. All Rights Reserved
      </span>
    </S.Otp>
  );
};

export default Otp;
