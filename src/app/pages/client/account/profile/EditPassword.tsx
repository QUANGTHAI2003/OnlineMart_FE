import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input, Space, Modal } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const EditPassword = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <Button onClick={showModal}>Edit Password</Button>
      <Modal
        title={t("user.account_user.account_information.edit_profile.title_password")}
        footer={null}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className="flex-grow-[1] flex-shrink-[1]">
          <div className="flex justify-center bg-white py-[20px] px-[20px]">
            <form action="" method="" className="w-full p-[16px] border border-[#ebebf0] border-solid rounded-[4px]">
              <div className="flex flex-col mb-3">
                <label htmlFor="password_old" className="mb-[4px] text-[14px] text-[#38383d]">
                  {t("user.account_user.account_information.edit_profile.current_password")}
                </label>
                <div className="flex flex-col flex-grow-[1] flex-shrink-[1] relative">
                  <div className="w-full">
                    <Space className="w-[100%]" direction="vertical">
                      <Input.Password
                        id="password_old"
                        className="py-[10px] h-[36px] pr-[12px]"
                        placeholder={t(
                          "user.account_user.account_information.edit_profile.placeholder_current_password"
                        )}
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                      />
                    </Space>
                  </div>
                </div>
              </div>
              <div className="flex flex-col mb-3">
                <label htmlFor="password_new" className="mb-[4px] text-[14px] text-[#38383d]">
                  {t("user.account_user.account_information.edit_profile.new_password")}
                </label>
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
              </div>
              <div className="flex flex-col">
                <label htmlFor="password_new_confirm" className="mb-[4px] text-[14px] text-[#38383d]">
                  {t("user.account_user.account_information.edit_profile.enter_new_password")}
                </label>
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
              </div>
              <Button key="submit" className="w-full h-[40px] mt-3" type="primary" loading={loading} onClick={handleOk}>
                {t("user.account_user.account_information.edit_profile.button_change")}
              </Button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EditPassword;
