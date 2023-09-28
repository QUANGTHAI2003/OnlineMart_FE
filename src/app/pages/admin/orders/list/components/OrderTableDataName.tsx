import { Tooltip } from "antd";
import { TFunction } from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";

import * as S from "../Order.styles";

interface IOrderTableDataNameProps {
  data: any;
  trans: TFunction<"translation", undefined>;
}

const OrderTableDataName: React.FC<IOrderTableDataNameProps> = ({ data }) => {
  const { t } = useTranslation();
  return (
    <S.TableCellOrderStyle className="product-cell flex items-start flex-nowrap">
      <div className="content">
        <Tooltip title={data.id} className="id">
          <div className="flex">
            <span className="pr-2">{t("admin_shop.orders.list.table.id_order")}</span>
            <h4 className=" pb-2 text-blue-500">{`${data.id}`}</h4>
          </div>
        </Tooltip>
        <span className="pb-2 ">{data.order_date}</span>
        <h6 className="pt-2 text-xs">{data.operate_model}</h6>
      </div>
    </S.TableCellOrderStyle>
  );
};

export default OrderTableDataName;
