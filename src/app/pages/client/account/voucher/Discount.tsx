// import { useSyncUrlWithTab } from "@app/hooks";
// import { useGetVoucherRootQuery } from "@app/store/slices/api/admin/voucherApi";
import { useGetVoucherRootQuery } from "@app/store/slices/api/user/voucherApi";
import { useAppSelector } from "@app/store/store";
// import type { TabsProps } from "antd";
// import { Tabs } from "antd";
// import { useMemo } from "react";
import { IVoucher } from "@app/types/voucher.types";
import { useTranslation } from "react-i18next";
// import { useLocation } from "react-router-dom";

// import { VoucherTab } from "./data";
import * as S from "./Discount.styles";
import DiscountItem from "./DiscountItem";
// import EmptyDiscount from "./EmptyDiscount";

const Discount = () => {
  const { t } = useTranslation();
  const id = useAppSelector((state) => state.userState.user)?.shop?.id;
  const { data: voucherUserData } = useGetVoucherRootQuery(id);

  // console.log(data);
  // const location = useLocation();
  // const itemData = VoucherTab(t).map((VoucherTabData: any) => ({
  //   key: VoucherTabData.tab,
  //   label: VoucherTabData.name,
  // }));

  // const items: TabsProps["items"] = itemData;
  // const inititalTab = VoucherTab(t)[0].tab;
  // const { tabFiltered, handleChangeTab } = useSyncUrlWithTab(inititalTab, "tab");

  // const displayedVouchers = useMemo(() => {
  //   const queryParams = new URLSearchParams(location.search);
  //   const tabParam = queryParams.get("tab");

  //   const filteredVouchers =
  //     tabParam === "all"
  //       ? VoucherData
  //       : VoucherData.filter((voucher) => {
  //           return voucher.status === tabParam;
  //         });

  //   return filteredVouchers;
  // }, [location.search]);

  return (
    <div className="bg-[#f5f5fa]">
      <span className="text-base font-normal">{t("user.voucher.name")}</span>
      {/* <Tabs defaultActiveKey="1" items={items} /> */}
      <S.DiscountTab>
        {/* {voucherUserData?.map((item: {voucher: IUserVoucher}:any) => { */}
        {voucherUserData?.map((item: IVoucher) => {
          return (
            <DiscountItem
              key={item.id}
              id={item.id}
              discount={item.discount}
              min_discount_amount={item?.min_discount_amount}
              max_discount_amount={item?.max_discount_amount}
              code={item?.code}
              expired_date={item?.expired_date}
            />
          );
        })}
      </S.DiscountTab>
    </div>
  );
};

export default Discount;
