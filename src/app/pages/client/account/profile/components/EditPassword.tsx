import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Form, Input, Modal, Space } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
type FieldType = {
  password_old?: string;
  password_new?: string;
  password_new_confirm?: string;
};

const EditPassword = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setConfirmLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="flex flex-col">
      <Button type="primary" ghost onClick={showModal}>
        {t("user.account_user_page.update")}
      </Button>
      <Modal
        title={t("user.account_user.account_information.edit_profile.title_password")}
        footer={null}
        centered
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className="flex-grow-[1] flex-shrink-[1]">
          <div className="flex justify-center bg-white py-[20px] px-[20px]">
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={(values) => {
                console.log({ values });
              }}
              onFinishFailed={onFinishFailed}
              layout="vertical"
              autoComplete="off"
              className="w-full p-[16px] border border-[#ebebf0] border-solid rounded-[4px]"
            >
              <Form.Item<FieldType>
                name="password_old"
                rules={[
                  { required: true, message: t("user.account_user_page.valid.password_old_required") },
                  { min: 3 },
                ]}
                hasFeedback
                className="flex flex-col mb-3"
                label={t("user.account_user.account_information.edit_profile.current_password")}
              >
                <div className="flex flex-col flex-grow-[1] flex-shrink-[1] relative">
                  <div className="w-full">
                    <Space className="w-[100%]" direction="vertical">
                      <Input.Password
                        name="password_old"
                        id="password_old"
                        className="py-[10px] h-[36px] pr-[12px]"
                        placeholder={t(
                          "user.account_user.account_information.edit_profile.placeholder_current_password"
                        )}
                      />
                    </Space>
                  </div>
                </div>
              </Form.Item>
              <Form.Item<FieldType>
                name="password_new"
                rules={[
                  { required: true, message: t("user.account_user_page.valid.password_new_required") },
                  { min: 6 },
                ]}
                hasFeedback
                className="flex flex-col mb-3"
                label={t("user.account_user.account_information.edit_profile.new_password")}
              >
                <div className="flex flex-col flex-grow-[1] flex-shrink-[1] relative">
                  <div className="w-full">
                    <Space className="w-[100%]" direction="vertical">
                      <Input.Password
                        id="password_new"
                        className="py-[10px] h-[36px] pr-[12px]"
                        placeholder={t("user.account_user.account_information.edit_profile.placeholder_new_password")}
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                      />
                    </Space>
                  </div>
                </div>
              </Form.Item>
              <Form.Item<FieldType>
                name="password_new_confirm"
                dependencies={["password_new"]}
                rules={[
                  { required: true, message: t("user.account_user_page.valid.password_new_confirm_required") },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password_new") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(t("user.account_user_page.valid.password_new_confirm_match"));
                    },
                  }),
                ]}
                hasFeedback
                label={t("user.account_user.account_information.edit_profile.enter_new_password")}
                className="flex flex-col"
              >
                <div className="flex flex-col flex-grow-[1] flex-shrink-[1] relative">
                  <div className="w-full">
                    <Space className="w-[100%]" direction="vertical">
                      <Input.Password
                        id="password_new_confirm"
                        className="py-[10px] h-[36px] pr-[12px]"
                        placeholder={t(
                          "user.account_user.account_information.edit_profile.placeholder_enter_new_password"
                        )}
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                      />
                    </Space>
                  </div>
                </div>
              </Form.Item>
              <Form.Item>
                <Button
                  htmlType="submit"
                  className="w-full h-[40px] mt-3"
                  type="primary"
                  loading={loading}
                  // onClick={handleOk}
                >
                  {t("user.account_user.account_information.edit_profile.button_change")}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EditPassword;
