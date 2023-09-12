import { PlusIcon } from "@app/app/assets/icons";
import { Button, Modal } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import AddressItem from "./AddressItem";
import CreateAddress from "./CreateAddress";
const AddressData = [
  {
    id: 1,
    name: "Phạm Khánh An",
    address: "Số 79A, Võ Văn Kiệt, Phường Long Hòa, Quận Bình Thuỷ, Cần Thơ",
    phone: "0379797979",
    token: true,
  },
  {
    id: 2,
    name: "Phạm Khánh",
    address: "Nguyễn Văn Cừ, An Khánh, Ninh Kiều, Cần Thơ",
    phone: "0123456789",
    token: false,
  },
  {
    id: 3,
    name: "Khánh An",
    address: "Lê Bình, Cái Răng, Cần Thơ",
    phone: "0393939399",
    token: false,
  },
];
const Address = () => {
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

  return (
    <div>
      <h2 className="text-xl font-normal my-2">{t("user.address.name")}</h2>
      <div className="bg-transparent">
        <Button
          onClick={showModal}
          className="bg-white text-base p-5 border-dashed border-1 h-auto w-full cursor-pointer border-[#eeeef1]"
        >
          <div className="flex justify-center items-center gap-x-4">
            <PlusIcon />
            <span className="text-[#0b74e5]">{t("user.address.add_address")}</span>
          </div>
        </Button>
        {AddressData.map((item) => {
          return (
            <AddressItem
              key={item.id}
              id={item.id}
              name={item.name}
              address={item.address}
              phone={item.phone}
              token={item.token}
            />
          );
        })}
      </div>
      <Modal
        className="w-[650px]"
        centered
        title={t("user.address.add_address")}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <CreateAddress />
      </Modal>
    </div>
  );
};

export default Address;
