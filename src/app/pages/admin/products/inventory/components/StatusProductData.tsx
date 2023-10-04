import { Tag } from "antd";
import { TFunction } from "i18next";
import React from "react";

interface IStatusProductDataProps {
  data: any;
  trans: TFunction<"translation", undefined>;
}

const getStatusTagColor = (status: any, t: TFunction<"translation", undefined>) => {
  switch (status) {
    case "in_process":
      return ["yellow", t("admin_shop.inventory.filter.in_process")];
    case "suspended":
      return ["red", t("admin_shop.inventory.filter.suspended")];
    default:
      return [];
  }
};

const StatusProductData: React.FC<IStatusProductDataProps> = ({ data, trans }) => {
  const [statusColor, statusText] = getStatusTagColor(data.status, trans);

  return (
    <div className="flex justify-center">
      <Tag color={statusColor} className="m-0 px-3 py-1 rounded-full">
        {statusText}
      </Tag>
    </div>
  );
};

export default StatusProductData;
