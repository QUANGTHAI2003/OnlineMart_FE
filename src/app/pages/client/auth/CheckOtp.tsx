import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import OTPInput from "./components/OTPInput";
import * as S from "./Login.style";

const Otp: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(0);
  // const [isCorrectOTP, setIsCorrectOTP] = useState(false);
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [countdown]);

  const handleGenerateOTP = () => {
    if (otp) {
      return;
    }

    const newOtp = generateRandomOTP();
    console.log("OTP: ", newOtp); // Hiển thị số OTP trong console
    setOtp(newOtp);
    setCountdown(300); // 5 phút = 300 giây

    setTimeout(
      () => {
        setOtp("");
      },
      5 * 60 * 1000
    ); // 5 phút
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { t } = useTranslation();
  const generateRandomOTP = () => {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    return String(randomNumber);
  };

  const handleOTPChange = (otpValue: string) => {
    setOtp(otpValue);
  };

  const formatCountdown = (countdown: number) => {
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };
  // const handleVerifyOTP = () => { check otp
  //   if (otp == generateRandomOTP()) {
  //     setIsCorrectOTP(true);
  //     console.log("Đúng");
  //   } else {
  //     setIsCorrectOTP(false);
  //     console.log("sai");
  //   }
  // };
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
        {countdown > 0 && (
          <p>
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
              <button className="text-blue-500 border-none" onClick={handleGenerateOTP}>
                {t("user.account.otp.otp")}
              </button>
            </p>
          </>
        )}
        <div className="w-auto  mt-8">
          <Link to="/auth/changepass">
            <Button className="w-3/12 h-12 button-otp bg-blue-500 text-white rounded-3xl ">
              {t("user.account.otp.cf")}
            </Button>
          </Link>
        </div>
      </div>
      <span className="text-xs p-3 flex justify-center text-gray-500">
        ONLINE MART | &copy; 2018-2022. All Rights Reserved
      </span>
    </S.Otp>
  );
};

export default Otp;
