import { ExclamationCircleFilled } from "@ant-design/icons";
import { CheckIcon } from "@app/app/assets/icons";
import { Button, Modal } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import EditAddress from "./EditAddress";
interface IAddressItem {
  id: number;
  name: string;
  address: string;
  phone: string;
  token: any;
}

const AddressItem = ({ name, address, phone, token }: IAddressItem) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { confirm } = Modal;

  const showConfirm = () => {
    confirm({
      title: t("user.address.confirm_delete"),
      icon: <ExclamationCircleFilled />,
      onOk() {
        console.log("ok");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <div className="bg-white flex justify-between p-5 mt-3">
      <div className="flex flex-col gap-y-3">
        <div>
          <span className="uppercase">{name}</span>
          {token && (
            <span>
              <CheckIcon />
              <span className="text-[#26bc4e] text-xs ml-1">{t("user.address.default_address")}</span>
            </span>
          )}
        </div>
        <div>
          <span className="text-[#787878] text-sm">{t("user.address.address")}</span>
          {address}
        </div>
        <div>
          <span className="text-[#787878] text-sm">{t("user.address.phone")}</span>
          {phone}
        </div>
      </div>
      <div className="flex justify-end items-start">
        <Button onClick={showModal} className="text-blue-600 border-0">
          {t("user.address.action_edit")}
        </Button>
        {!token && (
          <Button className="text-red-600 border-0" onClick={showConfirm}>
            {t("user.address.action_delete")}
          </Button>
        )}
      </div>
      <Modal
        className="w-[700px]"
        centered
        title={t("user.address.edit_address")}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <EditAddress />
      </Modal>
    </div>
  );
};

export default AddressItem;
