import SelectAddress from "@app/app/components/clients/SelectAddress/SelectAddress";
import { Input, Button } from "antd";
import { useTranslation } from "react-i18next";

import * as S from "./Address.styles";
const { TextArea } = Input;

const handleGetAddress = (address: string) => {
  console.log(address);
};

const EditAddress = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { t } = useTranslation();

  return (
    <S.AddressStyle>
      <div className="min-w-min bg-white">
        <form className="w-[650px]" action="Edit" method="post">
          <div className="w-[650px] flex items-center align-middle justify-between mt-4">
            <label htmlFor="username">{t("user.address.fullname")}</label>
            <div className="w-[490px]">
              <Input className="text-sm px-3 text-gray-700 w-full" placeholder={t("user.address.p_fullname")} />
            </div>
          </div>
          <div className="w-[650px] flex items-center align-middle justify-between mt-4">
            <label htmlFor="phone">{t("user.address.phone")}</label>
            <div className="w-[490px]">
              <Input className="text-sm px-3 text-gray-700 w-full" placeholder={t("user.address.p_phone")} />
            </div>
          </div>
          <div className="w-[650px] flex items-center align-middle justify-between">
            <SelectAddress onAddressChange={handleGetAddress} />
          </div>
          <div className="w-[650px] flex items-center align-middle justify-between mt-4">
            <label htmlFor="address">{t("user.address.address")}</label>
            <div className="w-[490px]">
              <TextArea
                className="text-sm px-3 text-gray-700 w-full"
                rows={2}
                placeholder={t("user.address.p_address")}
              />
            </div>
          </div>
          <div className="w-[650px] flex items-center align-middle justify-between mt-4">
            <div></div>
            <div className="w-[490px]">
              <Button className="bg-[#fdd835] text-center text-sm py-2 px-12 text-[#4a4a4a] h-auto">
                {t("user.address.action_update")}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </S.AddressStyle>
  );
};

export default EditAddress;
