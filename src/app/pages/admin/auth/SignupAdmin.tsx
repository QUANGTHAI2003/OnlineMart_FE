import { InfoCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import * as S from "./SignupAdmin.styles";

const DataIndustry = [
  {
    id: 1,
    name: "Bách hóa Online",
  },
  {
    id: 2,
    name: "Balo và Vali",
  },
  {
    id: 3,
    name: "Điện gia dụng",
  },
  {
    id: 4,
    name: "Điện thoại - Máy tính bảng",
  },
  {
    id: 5,
    name: "Đồ chơi",
  },
  {
    id: 6,
    name: "Đồng hồ và Trang sức",
  },
  {
    id: 7,
    name: "Thời trang",
  },
];
const SignupAdmin = () => {
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
    <div className="flex flex-wrap bg-[#fff]">
      <S.Intro className="md:h-full sm:h-fit md:mb-0 md:bg-[#fff] md:p-11 sm:p-4 sm:bg-[#f5f5fa]">
        <h2 className="text-3xl mb-2">{t("admin_shop.authentication.signup.title")}</h2>
        <p className="mb-12">{t("admin_shop.authentication.signup.intro")}</p>
        <div className="w-full h-3/6 overflow-hidden rounded">
          <img className="w-full h-full object-cover rounded" src="https://source.unsplash.com/random" alt="img" />
        </div>
      </S.Intro>
      <S.FormRegister className="bg-[#f5f5fa] md:py-12 md:px-20 sm:py-8 sm:px-4">
        <h2 className="text-3xl mb-4 md:block sm:hidden">{t("admin_shop.authentication.signup.name")}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center gap-4 mb-3">
            {/* Email */}
            <S.FormField>
              <div className="flex justify-start items-center gap-1">
                <S.Label htmlFor="email">{t("admin_shop.authentication.signup.label_email")}</S.Label>
                <Tooltip title={t("admin_shop.authentication.signup.tooltip_email")}>
                  <InfoCircleOutlined />
                </Tooltip>
              </div>
              <S.Input
                id="email"
                {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
                aria-invalid={errors.email ? "true" : "false"}
                placeholder={t("admin_shop.authentication.signup.p_email")}
              />
              {errors.email?.type === "required" && (
                <span className="text-sm text-red-500" role="alert">
                  {t("admin_shop.authentication.signup.null_email")}
                </span>
              )}
              {errors.email?.type === "pattern" && (
                <span className="text-sm text-red-500" role="alert">
                  {t("admin_shop.authentication.signup.err_email")}
                </span>
              )}
            </S.FormField>
            {/* Họ tên */}
            <S.FormField>
              <div className="flex justify-start items-center gap-1">
                <S.Label htmlFor="fullname">{t("admin_shop.authentication.signup.label_fullname")}</S.Label>
              </div>
              <S.Input
                id="fullname"
                {...register("fullname", { required: true })}
                aria-invalid={errors.fullname ? "true" : "false"}
                placeholder={t("admin_shop.authentication.signup.p_fullname")}
              />
              {errors.fullname?.type === "required" && (
                <span className="text-sm text-red-500" role="alert">
                  {t("admin_shop.authentication.signup.err_fullname")}
                </span>
              )}
            </S.FormField>
            {/* Số điện thoại  */}
            <S.FormField>
              <div className="flex justify-start items-center gap-1">
                <S.Label htmlFor="phone">{t("admin_shop.authentication.signup.label_phone")}</S.Label>
              </div>
              <S.Input
                type="tel"
                id="phone"
                {...register("phone", { required: true, pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g })}
                aria-invalid={errors.phone ? "true" : "false"}
                placeholder={t("admin_shop.authentication.signup.p_phone")}
              />
              {errors.phone?.type === "required" && (
                <span className="text-sm text-red-500" role="alert">
                  {t("admin_shop.authentication.signin.null_phone")}
                </span>
              )}
              {errors.phone?.type === "pattern" && (
                <span className="text-sm text-red-500" role="alert">
                  {t("admin_shop.authentication.signup.err_phone")}
                </span>
              )}
            </S.FormField>
            {/* Ngành hàng */}
            <S.FormField>
              <div className="flex justify-start items-center gap-1">
                <S.Label htmlFor="industry">{t("admin_shop.authentication.signup.label_industry")}</S.Label>
                <Tooltip title={t("admin_shop.authentication.signup.tooltip_industry")}>
                  <InfoCircleOutlined />
                </Tooltip>
              </div>
              <S.Select
                id="industry"
                {...register("industry", { required: true })}
                aria-invalid={errors.industry ? "true" : "false"}
              >
                <option value=""></option>
                {DataIndustry.map((item) => {
                  return (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  );
                })}
              </S.Select>
              {errors.industry?.type === "required" && (
                <span className="text-sm text-red-500" role="alert">
                  {t("admin_shop.authentication.signup.err_industry")}
                </span>
              )}
            </S.FormField>
            {/* Mật khẩu */}
            <S.FormField>
              <div className="flex justify-start items-center gap-1">
                <S.Label htmlFor="password">{t("admin_shop.authentication.signup.label_password")}</S.Label>
              </div>
              <S.Input
                id="password"
                {...register("password", { required: true })}
                aria-invalid={errors.password ? "true" : "false"}
                placeholder={t("admin_shop.authentication.signup.p_password")}
              />
              {errors.password?.type === "required" && (
                <span className="text-sm text-red-500" role="alert">
                  {t("admin_shop.authentication.signin.null_password")}
                </span>
              )}
            </S.FormField>
            {/* Xác nhận mật khẩu */}
            <S.FormField>
              <div className="flex justify-start items-center gap-1">
                <S.Label htmlFor="repass">{t("admin_shop.authentication.signup.label_repass")}</S.Label>
              </div>
              <S.Input
                id="repass"
                {...register("repass", { required: true })}
                aria-invalid={errors.repass ? "true" : "false"}
              />
              {errors.repass?.type === "required" && (
                <span className="text-sm text-red-500" role="alert">
                  {t("admin_shop.authentication.signup.err_repass")}
                </span>
              )}
            </S.FormField>
            <S.Confirm type="submit" value={t("admin_shop.authentication.signup.name")} />
            <div className="text-center">
              <p className="text-sm leading-4">
                {t("admin_shop.authentication.signup.question")}
                &nbsp;
                <Link to="../admin/shop/auth/signin" className="text-[#1BA8FF]" style={{ textDecoration: "none" }}>
                  {t("admin_shop.authentication.signin.name")}
                </Link>
              </p>
            </div>
          </div>
        </form>
      </S.FormRegister>
    </div>
  );
};

export default SignupAdmin;
