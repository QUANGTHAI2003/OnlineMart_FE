import LogoFacebook from "@app/app/assets/images/logo_facebook.png";
import LogoGoogle from "@app/app/assets/images/logo_google.jpg";
import { Divider } from "antd";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import * as S from "./SignupAdmin.styles";

const SigninAdmin = () => {
  const { t } = useTranslation();
  useEffect(() => {
    console.log("render");
  }, []);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data: any) => console.log(data);
  return (
    <S.Frame className="bg-gradient-to-b from-[#99dff9] to-[#ffffff]">
      <div className="min-w-[440px] p-5 bg-[#ffffff] rounded-lg">
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-start gap-4 mb-3">
              <S.FormField className="flex flex-col items-start gap-1">
                <S.FormInput
                  {...register("phone", { required: true, pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g })}
                  aria-invalid={errors.phone ? "true" : "false"}
                  placeholder={t("admin_shop.authentication.signin.p_phone")}
                />
                {errors.phone?.type === "required" && (
                  <span className="text-xs text-red-500" role="alert">
                    {t("admin_shop.authentication.signin.null_phone")}
                  </span>
                )}
                {errors.phone?.type === "pattern" && (
                  <span className="text-xs text-red-500" role="alert">
                    {t("admin_shop.authentication.signin.err_phone")}
                  </span>
                )}
              </S.FormField>
              <S.FormField className="flex flex-col items-start gap-1">
                <S.FormInput
                  {...register("password", { required: "Mật khẩu không được để trống" })}
                  aria-invalid={errors.password ? "true" : "false"}
                  placeholder={t("admin_shop.authentication.signin.p_password")}
                />
                {errors.password?.type === "required" && (
                  <span className="text-xs text-red-500" role="alert">
                    {t("admin_shop.authentication.signin.null_password")}
                  </span>
                )}
              </S.FormField>
            </div>
            <div className="mb-3 text-[#787878] flex items-start text-sm">
              {t("admin_shop.authentication.signin.forgot")}
              &nbsp;
              <span>
                <Link to="" className="text-[#1BA8FF]" style={{ textDecoration: "none" }}>
                  {t("admin_shop.authentication.signin.link")}
                </Link>
              </span>
            </div>
            <div className="mb-3">
              <input
                type="submit"
                value={t("admin_shop.authentication.signin.submit")}
                className="py-3 pl-1 w-full bg-[#fdd835] border-0 ring-0 cursor-pointer rounded"
              />
            </div>
            <div className="mb-3">
              <Divider plain className="text-[#787878]">
                {t("admin_shop.authentication.signin.other")}
              </Divider>
            </div>
            <div className="flex justify-center items-center gap-16">
              <div className="flex items-start w-10 h-10 bg-slate-500 cursor-pointer">
                <img src={LogoFacebook} alt="Facebook" className="w-full h-full object-cover" />
              </div>
              <div className="flex items-start w-12 h-12 bg-slate-500 cursor-pointer">
                <img src={LogoGoogle} alt="Google" className="w-full h-full object-cover" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </S.Frame>
  );
};

export default SigninAdmin;
