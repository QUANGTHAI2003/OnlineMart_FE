import ImgEmail from "@app/app/assets/images/email.png";
import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const EditEmail = () => {
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

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  type FieldType = {
    email?: string;
  };
  return (
    <div className="flex flex-col">
      <Button type="primary" ghost onClick={showModal}>
        {t("user.account_user_page.update")}
      </Button>
      <Modal
        title={t("user.account_user.account_information.edit_profile.title_email")}
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
              autoComplete="off"
              layout="vertical"
              className="w-full p-[16px] border border-[#ebebf0] border-solid rounded-[4px]"
            >
              <Form.Item<FieldType>
                name="email"
                rules={[
                  { required: true, message: t("user.account_user_page.valid.email_required") },
                  { whitespace: true },
                  { type: "email" },
                ]}
                hasFeedback
                className="flex flex-col mb-[34px]"
                label={t("user.account_user.account_information.edit_profile.label_email")}
              >
                <div className="flex flex-col flex-grow-[1] flex-shrink-[1] relative">
                  <div className="w-full">
                    <img
                      src={ImgEmail}
                      className="w-[24px] object-cover translate-y-[-50%] top-[50%] absolute left-[10px] z-[1]"
                      alt={t("user.account_user.account_information.edit_profile.placeholder_email")}
                    />
                    <Input
                      id="edit_email"
                      placeholder={t("user.account_user.account_information.edit_profile.placeholder_email")}
                      className="py-[10px] pl-[40px] h-[36px] pr-[12px]"
                    />
                  </div>
                </div>
              </Form.Item>
              <Form.Item>
                <Button
                  className="w-full h-[40px] mt-3"
                  type="primary"
                  htmlType="submit"
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

export default EditEmail;
