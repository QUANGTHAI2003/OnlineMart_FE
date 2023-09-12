import { Button, Form, Input } from "antd";
import { useTranslation } from "react-i18next";

import * as S from "./Login.style";

const ChangePasswordForm = () => {
  const { t } = useTranslation();
  return (
    <S.ChangePass>
      <Form>
        <div className="flex flex-col mt-36 items-center">
          <div className="w-1/4 change-form  p-4 rounded-lg  text-center">
            <h1 className="p-3">{t("user.account.change_pass.change")}</h1>
            <p>{t("user.account.change_pass.new_password")}</p>
            <p className="pb-5">ty88611@gmail.com</p>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: t("user.account.change_pass.validate.required"),
                },
              ]}
              hasFeedback
            >
              <Input.Password className="h-10" placeholder={t("user.account.change_pass.pass")} />
            </Form.Item>

            <Form.Item
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: t("user.account.change_pass.validate.required"),
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
            >
              <Input.Password className="h-10" placeholder={t("user.account.change_pass.cf_pass")} />
            </Form.Item>
            <Button type="primary" className="w-full h-12 rounded-4xl">
              {t("user.account.change_pass.change")}
            </Button>
          </div>
          <span className="text-xs p-2  text-gray-500">ONLINE MART | &copy; 2018-2022. All Rights Reserved</span>
        </div>
      </Form>
    </S.ChangePass>
  );
};

export default ChangePasswordForm;
