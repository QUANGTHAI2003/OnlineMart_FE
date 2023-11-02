import IconMap from "@app/app/assets/images/icon-address.png";
import { Button, Radio, RadioChangeEvent, Space } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "./ModalSelect.style";
import SelectAddress from "./SelectAddress";

const dataAddress = [
  {
    id: 1,
    name: "Phường An Khê, Quận Thanh Khê, Đà Nẵng",
  },
  {
    id: 2,
    name: "Phường Tân Chính, Quận Thanh Khê, Đà Nẵng",
  },
  {
    id: 3,
    name: "Phường Lê Bình, Quận Cái Răng, Cần Thơ",
  },
];

const ModalSelect = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [address, setAddress] = useState<string>(dataAddress[0].name);
  const [showSelect, setShowSelect] = useState<boolean>(false);
  const [isSelectAll, setIsSelectAll] = useState<boolean>(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { t } = useTranslation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleGetAddressSelect = (newAddress: string, wardName: string) => {
    setValue(newAddress);
    if (wardName != "") {
      setIsSelectAll(true);
    }
  };

  const handleGetAddressRadio = (e: RadioChangeEvent) => {
    const radioValue = e.target?.value;
    if (radioValue === "other") {
      setShowSelect(true);
      setValue("");
    } else {
      setValue(radioValue);
      setShowSelect(false);
    }
  };

  const handleSetAddress = () => {
    setIsModalOpen(false);
    setAddress(value);
  };

  return (
    <>
      <S.ButtonStyle onClick={showModal} className="select-address-btn">
        <img src={IconMap} alt="Icon address" />
        <h4 className="title">{t("user.select_address.delivered_to")}</h4>
        <div className="address">{address}</div>
      </S.ButtonStyle>
      <S.ModalSelect
        title={t("user.select_address.delivered_address")}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        className="modalSelect"
        footer={[
          <Button key="back" onClick={handleSetAddress} disabled={isSelectAll ? false : true}>
            {t("user.select_address.delivered_to_address")}
          </Button>,
        ]}
      >
        <Space direction="vertical">
          <p className="description">{t("user.select_address.description")}</p>
          <Radio.Group onChange={handleGetAddressRadio} value={showSelect ? "other" : value}>
            {dataAddress.map((item) => {
              return (
                <Radio key={item.id} value={item.name}>
                  {item.name}
                </Radio>
              );
            })}
            <Radio value="other" checked={true}>
              {t("user.select_address.another_area")}
            </Radio>
          </Radio.Group>

          {showSelect && <SelectAddress onAddressChange={handleGetAddressSelect} />}
        </Space>
      </S.ModalSelect>
    </>
  );
};

export default ModalSelect;
