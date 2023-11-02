import { useSyncUrlWithTab } from "@app/hooks";
import type { TabsProps } from "antd";
import { Tabs } from "antd";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import { VoucherData, VoucherTab } from "./data";
import * as S from "./Discount.styles";
import DiscountItem from "./DiscountItem";
import EmptyDiscount from "./EmptyDiscount";

const Discount = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const itemData = VoucherTab(t).map((VoucherTabData: any) => ({
    key: VoucherTabData.tab,
    label: VoucherTabData.name,
  }));

  const items: TabsProps["items"] = itemData;
  const inititalTab = VoucherTab(t)[0].tab;
  const { tabFiltered, handleChangeTab } = useSyncUrlWithTab(inititalTab, "tab");

  const displayedVouchers = useMemo(() => {
    const queryParams = new URLSearchParams(location.search);
    const tabParam = queryParams.get("tab");

    const filteredVouchers =
      tabParam === "all"
        ? VoucherData
        : VoucherData.filter((voucher) => {
            return voucher.status === tabParam;
          });

    return filteredVouchers;
  }, [location.search]);

  return (
    <div className="bg-[#f5f5fa]">
      <span className="text-base font-normal">{t("user.voucher.name")}</span>
      <Tabs defaultActiveKey="1" items={items} activeKey={tabFiltered} onChange={handleChangeTab} />
      <S.DiscountTab>
        {displayedVouchers.length > 0 ? (
          displayedVouchers.map((item: any) => {
            return (
              <DiscountItem
                key={item.id}
                id={item.id}
                icon_url={item.icon_url}
                icon_name={item.icon_name}
                discount_amount={item.discount_amount}
                min_amount={item.min_amount}
                coupon_code={item.coupon_code}
                period={item.period}
              />
            );
          })
        ) : (
          <EmptyDiscount />
        )}
      </S.DiscountTab>
    </div>
  );
};

export default Discount;
