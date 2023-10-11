import { Button, Form, Input, Select } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import * as S from "./SignupAdmin.styles";

const DataIndustry = [
  {
    id: 1,
    value: "Bách hóa Online",
    label: "Bách hóa Online",
  },
  {
    id: 2,
    value: "Balo và Vali",
    label: "Balo và Vali",
  },
  {
    id: 3,
    value: "Điện gia dụng",
    label: "Điện gia dụng",
  },
  {
    id: 4,
    value: "Điện thoại - Máy tính bảng",
    label: "Điện thoại - Máy tính bảng",
  },
  {
    id: 5,
    value: "Đồ chơi",
    label: "Đồ chơi",
  },
  {
    id: 6,
    value: "Đồng hồ và Trang sức",
    label: "Đồng hồ và Trang sức",
  },
  {
    id: 7,
    value: "Thời trang",
    label: "Thời trang",
  },
];
const SignupAdmin = () => {
  const { t } = useTranslation();
  useEffect(() => {
    console.log("render");
  }, []);
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
          onFinish={(values) => {
            console.log({ values });
          }}
          onFinishFailed={(error) => {
            console.log({ error });
          }}
          validateMessages={validateMessages}
        >
          {/* Email */}
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
          {/* Họ và tên */}
          <Form.Item
            hasFeedback
            name="fullname"
            className="mb-5"
            label={t("admin_shop.authentication.signup.label_fullname")}
            rules={[
              {
                required: true,
              },
              { min: 6 },
            ]}
          >
            <Input placeholder={t("admin_shop.authentication.signup.p_fullname")} />
          </Form.Item>
          {/* SĐT */}
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
          >
            <Input placeholder={t("admin_shop.authentication.signup.p_phone")} />
          </Form.Item>
          {/* Ngành hàng */}
          <Form.Item
            name="industry"
            hasFeedback
            className="mb-5"
            tooltip={t("admin_shop.authentication.signup.tooltip_industry")}
            label={t("admin_shop.authentication.signup.label_industry")}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select defaultValue="" options={DataIndustry} />
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
          >
            <Input.Password placeholder={t("admin_shop.authentication.signup.p_password")} />
          </Form.Item>
          {/* Nhập lại */}
          <Form.Item
            name="repass"
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
