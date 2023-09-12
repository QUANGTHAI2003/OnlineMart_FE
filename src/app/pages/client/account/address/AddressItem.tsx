import { ExclamationCircleFilled } from "@ant-design/icons";
import { CheckIcon } from "@app/app/assets/icons";
import { Button, Modal } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "./Address.styles";
import EditAddress from "./EditAddress";
interface IAddressItem {
  id: number;
  name: string;
  address: string;
  phone: string;
  token: any;
}

const AddressItem = ({ id, name, address, phone, token }: IAddressItem) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    console.log(Object.values({ id }).toString());
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
    console.log(Object.values({ id }).toString());
  };

  return (
    <S.Layout>
      <div className="flex flex-col gap-y-3">
        <div className="md:text-sm sm:text-xs">
          <span className="uppercase">{name}</span>
          {token && (
            <span>
              <CheckIcon />
              <span className="text-[#26bc4e] text-xs ml-1">{t("user.address.default_address")}</span>
            </span>
          )}
        </div>
        <div className="md:text-sm sm:text-xs">
          <span className="text-[#787878]">{t("user.address.address")}</span>
          {address}
        </div>
        <div className="md:text-sm sm:text-xs">
          <span className="text-[#787878]">{t("user.address.phone")}</span>
          {phone}
        </div>
      </div>
      <div className="flex justify-end items-start">
        <Button onClick={showModal} className="text-blue-600 border-0 ">
          {t("user.address.action_edit")}
        </Button>
        {!token && (
          <Button className="text-red-600 border-0 " onClick={showConfirm}>
            {t("user.address.action_delete")}
          </Button>
        )}
      </div>
      <Modal
        className="w-[650px]"
        centered
        title={t("user.address.edit_address")}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <EditAddress />
      </Modal>
    </S.Layout>
  );
};

export default AddressItem;
