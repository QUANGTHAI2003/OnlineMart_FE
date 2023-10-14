import { ExclamationCircleFilled } from "@ant-design/icons";
import { CheckIcon } from "@app/app/assets/icons";
import { useDeleteAddressMutation } from "@app/store/slices/api/user/addressApi";
import { notifyError, notifySuccess } from "@app/utils/helper";
import { Button, Modal } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "./Address.styles";
import EditAddress from "./EditAddress";

const AddressItem = ({ id, name, phone, city, district, ward, is_default }: any) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddressId, setEdtingAddressId] = useState<number | null>(null);
  const showModal = () => {
    console.log(Object.values({ id }).toString());
    setIsModalOpen(true);
  };

  const handleEditAddress = (id: number) => {
    setEdtingAddressId(id);
    showModal();
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { confirm } = Modal;

  const [deleteAddress] = useDeleteAddressMutation();
  const handleDeleteAddress = async (id: number) => {
    try {
      await deleteAddress(id).unwrap();
      notifySuccess("Successfully", "Delete address successfully");
    } catch (err) {
      notifyError("Error", "Delete address failed");
    }
  };
  const showConfirm = (id: any) => {
    confirm({
      title: t("user.address.confirm_delete"),
      icon: <ExclamationCircleFilled />,
      onOk() {
        handleDeleteAddress(id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <S.Layout>
      <div className="flex flex-col gap-y-3">
        <div className="md:text-sm sm:text-xs">
          <span className="uppercase">{name}</span>
          {is_default === "1" && (
            <span>
              <CheckIcon />
              <span className="text-[#26bc4e] text-xs ml-1">{t("user.address.default_address")}</span>
            </span>
          )}
        </div>
        <div className="md:text-sm sm:text-xs">
          <span className="text-[#787878]">{t("user.address.address")}</span>
          {ward}
          ,&nbsp;
          {district}
          ,&nbsp;
          {city}
        </div>
        <div className="md:text-sm sm:text-xs">
          <span className="text-[#787878]">{t("user.address.phone")}</span>
          {phone}
        </div>
      </div>
      <div className="flex justify-end items-start">
        <Button onClick={() => handleEditAddress(id)} className="text-blue-600 border-0 ">
          {t("user.address.action_edit")}
        </Button>
        {is_default === "0" && (
          <Button className="text-red-600 border-0 " onClick={() => showConfirm(id)}>
            {t("user.address.action_delete")}
          </Button>
        )}
      </div>
      <Modal
        className="w-[650px]"
        centered
        title={t("user.address.edit_address")}
        open={isModalOpen && editingAddressId === id}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <EditAddress id={id} onCancel={handleCancel} setIsModalOpen={setIsModalOpen} />
      </Modal>
    </S.Layout>
  );
};

export default AddressItem;
