import iconSearch from "@app/app/assets/images/icon-search.png";
import { setSearchValue } from "@app/store/slices/redux/admin/orderAdminSlice";
import { useAppDispatch, useAppSelector } from "@app/store/store";
import { Button, Input } from "antd";
import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
export const SearchBar = () => {
  const searchValue = useAppSelector((state) => state.orderAdmin.searchValue);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const handleSearch = (value: string) => {
    dispatch(setSearchValue(value));
  };
  return (
    <div className="w-full h-9 my-3  flex items-center rounded-lg relative bg-white">
      <img className="w-[20px] h-[20px] max-w-full ml-[18px]" src={iconSearch} alt="icon-search" />

      <Input
        size="large"
        value={searchValue}
        placeholder={t("user.orders.order.find_order")}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
        className="border-0 px-2 font-normal leading-[150%] border-tl-[8px] border-bl-[8px] flex-1 outline-none focus:ring-0 focus:ring-offset-0"
      />
      <Button className="border-0 border-transparent w-[130px] h-[38px] p-1 bg-transparent text-[#0a68ff] font-normal text-sm leading-[150%] outline-none flex items-center justify-center relative hover:bg-[#0a68ff33] rounded-br-lg rounded-none rounded-tr-lg before:content-[''] before:block before:absolute before:left-0 before:top-[8px]">
        {t("user.orders.order.find_orders")}
      </Button>
    </div>
  );
};
export default SearchBar;
