import { AdminBreadcrumb } from "@app/app/components/common/Breadcrumb/Breadcrumb";
import * as S from "./ShipOverview.styles";
import { Select } from "antd";
import { Link } from "react-router-dom";
import { Fulfilled, Received, FulfillCanncelling, Packed, FulfillCanced, ShippingCancel } from "@app/app/assets/icons";
import ShipOverviewChart from "./ShipOverviewChart";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const option = (t: any) => {
  return [
    { value: "today", label: t("admin_shop.ship.selected.today") },
    { value: "yesterday", label: t("admin_shop.ship.selected.yesterday") },
    { value: "sevenDaysAgo", label: t("admin_shop.ship.selected.sevenDaysAgo") },
    { value: "thirtyDaysAgo", label: t("admin_shop.ship.selected.thirtyDaysAgo") },
    { value: "thisMonth", label: t("admin_shop.ship.selected.thisMonth") },
  ];
};

const ShipOverview = () => {
  const [selectedOption, setSelectedOption] = useState("sevenDaysAgo");

  const { t } = useTranslation();
  const handleOptionChange = (value: any) => {
    setSelectedOption(value);
    const selectedLabel = option(t).find((item) => item.value === value)?.label;
    setSelectedOption(selectedLabel || "");
  };
  return (
    <>
      <S.ShipOverviewHeader>
        <div className="flex flex-col">
          <AdminBreadcrumb className="mb-3" />
          <div className="title">{t("admin_shop.ship.overview")}</div>
        </div>
      </S.ShipOverviewHeader>
      <S.ShipOverviewContent>
        <div className="title-bar">{t("admin_shop.ship.delivery")}</div>
        <div className="bg-white">
          <div className="header">
            <div>
              <div className="title">{t("admin_shop.ship.title_status")}</div>
              <div className="description capitalize">{`${t("admin_shop.ship.data_aggregated")} ${selectedOption}`}</div>
            </div>
            <Select
              size="middle"
              placement="bottomRight"
              dropdownMatchSelectWidth={false}
              defaultValue={selectedOption}
              className="w-36"
              onChange={handleOptionChange}
              options={option(t)}
            />
          </div>
          <div className="body">
            <div className="flex flex-wrap">
              <S.ShipOverviewItem>
                <div className="item">
                  <FulfillCanncelling />
                  <div className="status">{t("admin_shop.ship.waiting_for")}</div>
                  <div className="count">
                    <Link to="/admin/orders" target="_blank">
                      {`0 ${t("admin_shop.ship.orders")}`}
                    </Link>
                  </div>
                </div>
              </S.ShipOverviewItem>
              <S.ShipOverviewItem>
                <div className="item">
                  <Packed />
                  <div className="status">{t("admin_shop.ship.processing")}</div>
                  <div className="count">
                    <Link to="/admin/orders" target="_blank">
                      {`0 ${t("admin_shop.ship.orders")}`}
                    </Link>
                  </div>
                </div>
              </S.ShipOverviewItem>
              <S.ShipOverviewItem>
                <div className="item">
                  <Fulfilled />
                  <div className="status">{t("admin_shop.ship.transit")}</div>
                  <div className="count">
                    <Link to="/admin/orders" target="_blink">
                      {`0 ${t("admin_shop.ship.orders")}`}
                    </Link>
                  </div>
                </div>
              </S.ShipOverviewItem>
              <S.ShipOverviewItem>
                <div className="item">
                  <Received />
                  <div className="status">{t("admin_shop.ship.delivered")}</div>
                  <div className="count">
                    <Link to="/admin/orders" target="_blink">
                      {`0 ${t("admin_shop.ship.orders")}`}
                    </Link>
                  </div>
                </div>
              </S.ShipOverviewItem>
              <S.ShipOverviewItem>
                <div className="item">
                  <ShippingCancel />
                  <div className="status">{t("admin_shop.ship.cancelled")}</div>
                  <div className="count">
                    <Link to="/admin/orders" target="_blink">
                      {`0 ${t("admin_shop.ship.orders")}`}
                    </Link>
                  </div>
                </div>
              </S.ShipOverviewItem>
              <S.ShipOverviewItem>
                <div className="item">
                  <FulfillCanced />
                  <div className="status">{t("admin_shop.ship.returned")}</div>
                  <div className="count">
                    <Link to="/admin/orders" target="_blink">
                      {`0 ${t("admin_shop.ship.orders")}`}
                    </Link>
                  </div>
                </div>
              </S.ShipOverviewItem>
            </div>
          </div>
        </div>
      </S.ShipOverviewContent>
      <S.ShipOverviewContent>
        <div className="title-bar">{t("admin_shop.ship.shipping_indicators")}</div>
        <div className="bg-white">
          <div className="header">
            <div className="title">{t("admin_shop.ship.tota_way")}</div>
          </div>
          <ShipOverviewChart />
        </div>
      </S.ShipOverviewContent>
    </>
  );
};

export default ShipOverview;
