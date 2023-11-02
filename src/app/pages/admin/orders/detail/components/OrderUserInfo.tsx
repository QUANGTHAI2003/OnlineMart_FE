import { formatCurrency } from "@app/utils/helper";
import { Input } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import * as S from "../OrderDetail.styles";

const OrderUserInfo = () => {
  const { t } = useTranslation();
  return (
    <S.OrderDetailBox>
      <div className="flex justify-between">
        <div className="info_user">
          <div className="name_user">
            <h6 className="font-semibold text-base">{t("admin_shop.orders.detail.customer_info")}</h6>
            <div className="flex items-center">
              <Link target="_blank" className="inline-flex mt-2" to="#/">
                <h6 className="text-base font-bold">Anh Thương</h6>
                <h6 className="text-base font-semibold text-black ">{` - 0981175868`}</h6>
              </Link>
            </div>
          </div>
          <div className="flex flex-col">
            <h6 className="font-medium text-sm mb-2">{t("admin_shop.orders.detail.address")}</h6>
            <p className="text-slate-500">{t("admin_shop.orders.detail.no_address")}</p>
          </div>
        </div>
        <div className="info_order w-1/2">
          <div className="p-3 border-dashed border rounded-xl w-full">
            <div className="flex items-center justify-between mb-3">
              <p>Nợ phải thu</p>
              <span className="text-blue-600">{formatCurrency(240000)}</span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <p>Tổng chi tiêu (3 đơn)</p>
              <span className="text-red-600">{formatCurrency(0)}</span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <p>Trả hàng (0 sản phẩm)</p>
              <span className="text-red-600">{formatCurrency(0)}</span>
            </div>
            <div className="flex items-center justify-between">
              <p>Giao hàng thất bại (0 đơn)</p>
              <span className="text-red-600">{formatCurrency(0)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-5">
        <div className="flex flex-col">
          <h6 className="font-medium text-sm mb-2">{t("admin_shop.orders.detail.receipt")}</h6>
          <p className="text-slate-500">{t("admin_shop.orders.detail.no_receipt")}</p>
        </div>
        <div className="flex flex-col w-1/2">
          <h6 className="font-medium text-sm mb-2">{t("admin_shop.orders.detail.contact")}</h6>
          <p className="text-slate-500">{t("admin_shop.orders.detail.no_contact")}</p>
          <Input placeholder="Email" size="large" disabled className="mt-5" />
        </div>
      </div>
    </S.OrderDetailBox>
  );
};

export default OrderUserInfo;
