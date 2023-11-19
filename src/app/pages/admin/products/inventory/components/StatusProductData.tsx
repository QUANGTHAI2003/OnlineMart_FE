import { Tag } from "antd";
import { TFunction } from "i18next";
import React from "react";

import { getStatusTagColor } from "../../list/components/ProductTableDataName";

interface IStatusProductDataProps {
  data: any;
  trans: TFunction<"translation", undefined>;
}

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
