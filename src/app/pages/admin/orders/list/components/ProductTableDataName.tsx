import { formatCurrency } from "@app/utils/helper";
import { Image, Tooltip } from "antd";
import { TFunction } from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import * as S from "../Order.styles";
interface IProductTableDataNameProps {
  data: any;
  trans: TFunction<"translation", undefined>;
}

const ProductTableDataName: React.FC<IProductTableDataNameProps> = ({ data }) => {
  const { t } = useTranslation();
  return (
    <S.TableCellOrderStyle className="product-cell flex items-start flex-nowrap">
      <div className="thumbnail">
        <Image width={64} preview={false} src={`${data.thumbnail_url}`} />
      </div>
      <div className="content">
        <Tooltip title={data.name} className="name">
          <Link to="#">
            <h5 className="line-clamp-2">{data.product_name}</h5>
          </Link>
        </Tooltip>
        <span>
          <span className="text-gray-400 ">SKU: &nbsp;</span>
          {data.product_sku}
        </span>
        <p>
          <span className="text-gray-400 ">{`${t("admin_shop.orders.list.table.price")}`}</span>
          <span>{`${formatCurrency(data.price)} `}</span>
          <span className="text-orange-400">{data.operate_model}</span>
        </p>
      </div>
    </S.TableCellOrderStyle>
  );
};

export default ProductTableDataName;