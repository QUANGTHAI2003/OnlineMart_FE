import { UserOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import { TFunction } from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";

interface ISellerStatusTableDataProps {
  data: any;
  trans: TFunction<"translation", undefined>;
}

const getStatusTagColor: (status: number, t: TFunction<"translation", undefined>) => [string, string] = (status, t) => {
  switch (status) {
    case 0:
      return ["red", t("admin_shop.seller.table.tag_inactive")];
    case 1:
      return ["green", t("admin_shop.seller.table.tag_active")];
    default:
      return ["", ""];
  }
};
const SellerStatusTableData: React.FC<ISellerStatusTableDataProps> = ({ data, trans }) => {
  const { t } = useTranslation();
  const [statusColor, statusText] = getStatusTagColor(data.status, trans);
  return (
    <div>
      <Tag color={statusColor}>{statusText}</Tag>
      <dl>
        <dt className="text-editor">{`${t("admin_shop.seller.table.charge")}:`}</dt>
        <dd>{data.kam_email}</dd>
      </dl>
      <div className="leading-3">
        <Tag className="rounded-full" icon={<UserOutlined />}>
          Nhà bán cá nhân
        </Tag>
      </div>
    </div>
  );
};

export default SellerStatusTableData;
