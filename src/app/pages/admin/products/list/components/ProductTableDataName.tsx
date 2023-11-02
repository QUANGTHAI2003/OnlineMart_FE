import { EyeInvisibleOutlined } from "@ant-design/icons";
import { Image, Tag, Tooltip, Typography } from "antd";
import { TFunction } from "i18next";
import React from "react";

import * as S from "../Product.styles";

interface IProductTableDataNameProps {
  data: any;
  trans: TFunction<"translation", undefined>;
}

const { Paragraph } = Typography;

export const getStatusTagColor = (status: any, t: TFunction<"translation", undefined>) => {
  switch (status) {
    case "selling":
      return ["green", t("admin_shop.product.list.status.selling")];
    case "draft":
      return ["blue", t("admin_shop.product.list.status.draft")];
    case "waiting-for-approve":
      return ["gold", t("admin_shop.product.list.status.waiting_for_approve")];
    case "off":
      return ["red", t("admin_shop.product.list.status.off")];
    case "out-of-stock":
      return ["purple", t("admin_shop.product.list.status.out_of_stock")];
    default:
      return [];
  }
};

const baseImage = import.meta.env.VITE_BASE_IMAGE_URL;

const ProductTableDataName: React.FC<IProductTableDataNameProps> = ({ data, trans }) => {
  const [statusColor, statusText] = getStatusTagColor(data?.status, trans);

  return (
    <S.TableCellProductStyle className="product-cell flex items-start flex-nowrap">
      <div className="thumbnail">
        {(data?.status === "off" || data?.status === "draft") && (
          <div className="off-product">
            <EyeInvisibleOutlined />
          </div>
        )}
        <Image width="100%" preview={false} src={`${baseImage}/${data?.thumbnail_url}`} />
        {data?.type === "configurable" && <div className="variant">{`${data.num_of_variants} lựa chọn`}</div>}
      </div>
      <div className="content">
        <Tag color={statusColor}>{statusText}</Tag>
        <Tooltip title={data.name} className="name">
          <h5 className="line-clamp-2">{data.name}</h5>
        </Tooltip>
        <Paragraph copyable={{ text: data?.sku }}>{`PSKU: ${data?.sku}`}</Paragraph>
      </div>
    </S.TableCellProductStyle>
  );
};

export default ProductTableDataName;
