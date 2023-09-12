import { Form, Input } from "antd";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import * as S from "../Login.style";

type FormValues = {
  fullname: string;
  email: string;
  phone: number;
  password: string;
  cf_password: string;
};
export default function SignUp() {
  const { t } = useTranslation();
  const { handleSubmit } = useForm<FormValues>();
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <S.SignUpForm className="mt-4">
      <Form onFinish={onSubmit} autoComplete="off">
        <Form.Item
          name="fullname"
          rules={[
            {
              required: true,
              message: `${t("user.account.sign_up.validate.required")} ${t("user.account.sign_up.full_name")}`,
            },
            {
              pattern: /^[a-zA-Z\s]*$/,
              message: t("user.account.sign_up.validate.text"),
            },
          ]}
        >
          <Input placeholder={t("user.account.sign_up.full_name")} />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: `${t("user.account.sign_up.validate.required")} Email` },
            {
              type: "email",
              message: t("user.account.sign_up.validate.email"),
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: `${t("user.account.sign_up.validate.required")} ${t("user.account.sign_up.phone")}`,
            },
            { min: 9, message: t("user.account.sign_up.validate.min_phone") },
            { max: 11, message: t("user.account.sign_up.validate.max_phone") },
            {
              pattern: /^[0-9]+$/,
              message: t("user.account.sign_up.validate.number"),
            },
          ]}
        >
          <Input placeholder={t("user.account.sign_up.phone")} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: `${t("user.account.sign_up.validate.required")} ${t("user.account.sign_up.password")}`,
            },
          ]}
          hasFeedback
        >
          <S.InputPassword placeholder={t("user.account.sign_up.password")} />
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
        >
          <S.InputPassword className="mb-3" placeholder={t("user.account.sign_up.cf_password")} />
        </Form.Item>
        <div className="flex h-10 items-center justify-between">
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(alert(t("user.account.sign_up.validate.terms"))),
              },
            ]}
          >
            <S.StyledCheckbox className="pt-3 ">
              <span>{t("user.account.sign_up.agree")}</span>
              &nbsp;
              <span className="text-blue-500">{t("user.account.sign_up.rules")}</span>
              &nbsp; Online Mart
            </S.StyledCheckbox>
          </Form.Item>
        </div>
        <Form.Item>
          <button type="submit">{t("user.account.sign_up.Sign_up")}</button>
        </Form.Item>
        <div className="text-center text-gray-500">ONLINE MART &copy; 2018 - 2022. All Rights Reserved</div>
      </Form>
    </S.SignUpForm>
  );
}
