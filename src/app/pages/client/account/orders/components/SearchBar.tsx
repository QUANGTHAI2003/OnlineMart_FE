/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-one-expression-per-line */
import iconSearch from "@app/app/assets/images/icon-search.png";
import { Button, Input } from "antd";
import { useTranslation } from "react-i18next";

export const SearchBar = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { t } = useTranslation();
  return (
    <div className="w-full h-9  flex items-center rounded-lg relative border-solid border border-[#DDDDE3] bg-white">
      <img className="w-[20px] h-[20px] max-w-full ml-[18px]" src={iconSearch} alt="icon-search" />

      <Input
        placeholder={t("user.orders.order.find_order")}
        className="border-0 px-2 font-normal leading-[150%] border-tl-[8px] border-bl-[8px] flex-1 outline-none focus:ring-0 focus:ring-offset-0"
      />
      <Button className="border-0 w-[130px] h-[38px] p-1 bg-transparent text-[#0a68ff] font-normal text-sm leading-[150%] outline-none flex items-center justify-center relative hover:bg-[#0a68ff33] rounded-br-lg rounded-none rounded-tr-lg before:content-[''] before:block before:absolute before:border before:border-solid before:border-[#dddde3] before:h-[24px] before:left-0 before:top-[8px]">
        {t("user.orders.order.find_orders")}
      </Button>
    </div>
  );
};
export default SearchBar;
