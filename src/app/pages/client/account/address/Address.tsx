import { PlusIcon } from "@app/app/assets/icons";
import { useGetAddressRootQuery } from "@app/store/slices/api/user/addressApi";
import { useAppSelector } from "@app/store/store";
import { IAddress } from "@app/types/address.types";
import { Button, Modal } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import AddressItem from "./AddressItem";
import CreateAddress from "./CreateAddress";

const Address = () => {
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useAppSelector((state) => state.userState.user);
  const { data } = useGetAddressRootQuery(user?.id);

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
        {data?.map((item: IAddress) => {
          return (
            <AddressItem
              key={item.id}
              id={item.id}
              name={item.name}
              phone={item.phone}
              city={item.city}
              district={item.district}
              ward={item.ward}
              is_default={item.is_default}
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
        <CreateAddress setIsModalOpen={setIsModalOpen} />
      </Modal>
    </div>
  );
};

export default Address;
