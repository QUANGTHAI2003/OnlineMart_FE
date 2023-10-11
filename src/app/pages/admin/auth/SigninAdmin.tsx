import LogoFacebook from "@app/app/assets/images/logo_facebook.png";
import LogoGoogle from "@app/app/assets/images/logo_google.jpg";
import { Button, Divider, Form, Input } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import * as S from "./SignupAdmin.styles";

const SigninAdmin = () => {
  const { t } = useTranslation();
  useEffect(() => {
    console.log("render");
  }, []);

  const validateMessages = {
    required: "${label} " + t("admin_shop.authentication.signin.err_null"),
    pattern: {
      mismatch: "${label} " + t("admin_shop.authentication.signin.err_phone"),
    },
    string: {
      min: "${label} " + t("admin_shop.authentication.signin.min_password", { min: "${min}" }),
    },
  };
  return (
    <S.Frame className="bg-gradient-to-b from-[#99dff9] to-[#ffffff]">
      <div className="min-w-[425px] p-5 bg-[#ffffff] rounded-lg">
        <div className="flex justify-start items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-lg overflow-hidden">
            <img src="https://source.unsplash.com/random" alt="logo" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-start gap-1">
            <p className="text-xl leading-6 font-light">{t("admin_shop.authentication.signin.name")}</p>
            <p className="text-sm leading-4">
              {t("admin_shop.authentication.signin.question")}
              &nbsp;
              <Link to="../admin/shop/auth/signup" className="text-[#1BA8FF]" style={{ textDecoration: "none" }}>
                {t("admin_shop.authentication.signup.name")}
              </Link>
            </p>
          </div>
        </div>
        <div className="w-full">
          <Form
            className="md:text-sm sm:text-xs"
            autoComplete="off"
            onFinish={(values) => {
              console.log({ values });
            }}
            onFinishFailed={(error) => {
              console.log({ error });
            }}
            validateMessages={validateMessages}
          >
            <S.FormItem
              name="phone"
              className="mb-5"
              label={t("admin_shop.authentication.signin.label_phone")}
              rules={[
                {
                  required: true,
                },
                { pattern: /(0[3|5|7|8|9])+([0-9]{8})\b/g },
              ]}
            >
              <Input placeholder={t("admin_shop.authentication.signin.p_phone")} />
            </S.FormItem>
            <S.FormItem
              name="password"
              className="mb-5"
              label={t("admin_shop.authentication.signin.label_password")}
              rules={[
                {
                  required: true,
                },
                { min: 6 },
              ]}
            >
              <Input.Password placeholder={t("admin_shop.authentication.signin.p_password")} />
            </S.FormItem>

            <div className="mb-4 text-[#787878] flex items-start text-sm">
              {t("admin_shop.authentication.signin.forgot")}
              &nbsp;
              <span>
                <Link to="" className="text-[#1BA8FF]" style={{ textDecoration: "none" }}>
                  {t("admin_shop.authentication.signin.link")}
                </Link>
              </span>
            </div>

            <Button block htmlType="submit" className="bg-[#fdd835]">
              {t("admin_shop.authentication.signin.submit")}
            </Button>

            <Divider plain className="text-[#787878]">
              {t("admin_shop.authentication.signin.other")}
            </Divider>

            <div className="flex justify-center items-center gap-16">
              <div className="flex items-start w-10 h-10 bg-slate-500 cursor-pointer">
                <img src={LogoFacebook} alt="Facebook" className="w-full h-full object-cover" />
              </div>
              <div className="flex items-start w-12 h-12 bg-slate-500 cursor-pointer">
                <img src={LogoGoogle} alt="Google" className="w-full h-full object-cover" />
              </div>
            </div>
          </Form>
        </div>
      </div>
    </S.Frame>
  );
};

export default SigninAdmin;
