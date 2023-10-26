import { formatNumber } from "@app/utils/helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Select, Typography } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import * as S from "../Dashboard.styles";
import { OrderPendingOptions, OrdersPendingData } from "../data";

const { Title } = Typography;

const OrdersPending = () => {
  const { t } = useTranslation();

  const [selectedDualChart, setSelectedDualChart] = useState<string>(OrderPendingOptions(t)[0].label);

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
        {OrdersPendingData(t).map((item) => {
          return (
            <Link to={`order_pending?${item.link}`} target="_blank" key={item.id} className="order_pending_box">
              <div className="pending_box_item">
                <div className="icon_box">
                  <FontAwesomeIcon icon={item.icon} className="icon" />
                </div>
                <div className="title">{item.title}</div>
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
