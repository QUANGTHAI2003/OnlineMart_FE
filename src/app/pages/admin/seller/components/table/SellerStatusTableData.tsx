import { Tag } from "antd";
import { TFunction } from "i18next";
import React from "react";

interface ISellerStatusTableDataProps {
  data: any;
  trans: TFunction<"translation", undefined>;
}

const getStatusTagColor: (status: string, t: TFunction<"translation", undefined>) => [string, string] = (status, t) => {
  switch (status) {
    case "inactive":
      return ["red", t("admin_shop.seller.table.tag_inactive")];
    case "active":
      return ["green", t("admin_shop.seller.table.tag_active")];
    default:
      return ["", ""];
  }
};
const SellerStatusTableData: React.FC<ISellerStatusTableDataProps> = ({ data, trans }) => {
  // const { t } = useTranslation();
  const [statusColor, statusText] = getStatusTagColor(data.status, trans);

  return (
    <div>
      <Tag color={statusColor}>{statusText}</Tag>
      {/* <dl>
        <dt className="text-editor">{`${t("admin_shop.seller.table.charge")}:`}</dt>
        <dd>{data.kam_email}</dd>
      </dl> */}
      {/* <div className="leading-3">
        <Tag className="rounded-full" icon={<UserOutlined />}>
          Nhà bán cá nhân
        </Tag>
      </div> */}
    </div>
  );
};

export default SellerStatusTableData;
