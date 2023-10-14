import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, Dropdown, Typography } from "antd";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { OrderStatusData } from "../data";
import * as S from "../SalesReport.styles";
const { Title, Link } = Typography;

const OrderStatus = () => {
  const { t } = useTranslation();

  const items: MenuItemType[] = [
    {
      label: t("admin_shop.reports.sales.common.7days"),
      key: "7days",
    },
    {
      label: t("admin_shop.reports.sales.common.1month"),
      key: "1month",
    },
    {
      label: t("admin_shop.reports.sales.common.1quarter"),
      key: "1quarter",
    },
    {
      label: t("admin_shop.reports.sales.common.1year"),
      key: "1year",
    },
  ];

  const handleMenuClick = (e: any) => {
    const item = items.find((item) => item.key === e.key);
    if (item) {
      setSelectedOption(item.label || t("admin_shop.reports.sales.order_status_data.not_options_yet"));
    } else {
      setSelectedOption(t("admin_shop.reports.sales.order_status_data.not_options_yet"));
    }
  };

  const [selectedOption, setSelectedOption] = useState(items[0].label);

  return (
    <S.OrderStatus>
      {OrderStatusData(t).map((item: any) => (
        <div className="status_item" key={item.id}>
          <div className="icon">
            <div className="meta_title">
              <p>{item.meta_title}</p>
              <p>{`( ${item.unit} )`}</p>
            </div>
            <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={["click"]} className="options_sort">
              <Link onClick={(e) => e.preventDefault()}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </Link>
            </Dropdown>
          </div>

          <Divider className="mb-3 mt-1.5" />

          <div className="content">
            <div className="flex flex-col items-center gap-1">
              <Title level={5} className="m-0">
                {item.title}
              </Title>
              <p className="sort_content">{selectedOption}</p>
            </div>
            <div className="flex items-end gap-1">
              <Title level={2} className="price_content">
                {item.value}
              </Title>
            </div>
          </div>
        </div>
      ))}
    </S.OrderStatus>
  );
};

export default OrderStatus;
