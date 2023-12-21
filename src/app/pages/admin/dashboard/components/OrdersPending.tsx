import { useGetOrdersPendingQuery } from "@app/store/slices/api/admin/dashboardApi";
import { formatNumber } from "@app/utils/helper";
import {
  faBoxOpen,
  faFileCircleCheck,
  faHandHoldingDollar,
  faSackXmark,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Select, Typography } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import * as S from "../Dashboard.styles";
import { OrderPendingOptions } from "../data";

const { Title } = Typography;

const OrdersPending = () => {
  const { t } = useTranslation();

  const [selectedDualChart, setSelectedDualChart] = useState<string>(OrderPendingOptions(t)[0].label);
  const selectedOption = OrderPendingOptions(t).find((option: any) => option.label === selectedDualChart);
  let queryParameter = "";

  queryParameter = selectedOption?.value as string;

  const { data: orders } = useGetOrdersPendingQuery(queryParameter);

  const renderIcon = (icon: any) => {
    switch (icon) {
      case "faFileCircleCheck":
        return <FontAwesomeIcon icon={faFileCircleCheck} className="icon" />;
      case "faBoxOpen":
        return <FontAwesomeIcon icon={faBoxOpen} className="icon" />;
      case "faTruck":
        return <FontAwesomeIcon icon={faTruck} className="icon" />;
      case "faHandHoldingDollar":
        return <FontAwesomeIcon icon={faHandHoldingDollar} className="icon" />;
      case "faSackXmark":
        return <FontAwesomeIcon icon={faSackXmark} className="icon" />;
      default:
        return null;
    }
  };

  return (
    <S.OrdersPending>
      <div className="site_header">
        <div className="right_header">
          <Title level={4} className="m-0">
            {t("admin_shop.dashboard.pending_orders")}
          </Title>
          <div className="options_value">{selectedDualChart}</div>
        </div>
        <div className="content_select">
          <Select
            defaultValue={OrderPendingOptions(t)[0].value}
            options={OrderPendingOptions(t)}
            onChange={(value) => {
              const option = OrderPendingOptions(t).find((option) => option.value === value);
              if (option) {
                setSelectedDualChart(option.label);
              }
            }}
          />
        </div>
      </div>

      <div className="content">
        {orders &&
          orders.map((item: any) => {
            return (
              <Link to={`order_pending?${item.link}`} target="_blank" key={item.id} className="order_pending_box">
                <div className="pending_box_item">
                  <div className="icon_box">{renderIcon(item.icon)}</div>
                  <div className="title">{t(`${item.title}`)}</div>
                  <div className="value">{formatNumber(item.value)}</div>
                </div>
              </Link>
            );
          })}
      </div>
    </S.OrdersPending>
  );
};

export default OrdersPending;
