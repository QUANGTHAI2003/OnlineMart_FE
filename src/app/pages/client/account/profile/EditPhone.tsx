import ImgPhone from "@app/app/assets/images/phone.png";
import { Button, Input, Modal } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const EditPhone = () => {
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
      <Button onClick={showModal}>Edit Phone</Button>
      <Modal
        title={t("user.account_user.account_information.edit_profile.title_phone")}
        footer={null}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className="flex-grow-[1] flex-shrink-[1]">
          <div className="flex justify-center bg-white py-[20px] px-[20px]">
            <form action="" method="" className="w-full p-[16px] border border-[#ebebf0] border-solid rounded-[4px]">
              <div className="flex flex-col mb-[34px]">
                <label htmlFor="edit_phone" className="mb-[4px] text-[14px] text-[#38383d]">
                  {t("user.account_user.account_information.edit_profile.label_phone")}
                </label>
                <div className="flex flex-col flex-grow-[1] flex-shrink-[1] relative">
                  <div className="w-full">
                    <img
                      src={ImgPhone}
                      className="w-[24px] object-cover translate-y-[-50%] top-[50%] absolute left-[10px] z-[1]"
                      alt={t("user.account_user.account_information.edit_profile.placeholder_phone")}
                    />
                    <Input
                      id="edit_phone"
                      placeholder={t("user.account_user.account_information.edit_profile.placeholder_phone")}
                      className="py-[10px] pl-[40px] h-[36px] pr-[12px]"
                    />
                  </div>
                  <div className="text-[11px] text-[#38383d] absolute top-[100%]">
                    {t("user.account_user.account_information.edit_profile.description_phone")}
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

export default EditPhone;
