import { useTranslation } from "react-i18next";

import * as S from "../OrderDetail.styles";

const OrderInfo = () => {
  const { t } = useTranslation();

  return (
    <>
      <S.OrderDetailBox>
        <h6 className="font-semibold text-base pb-5">{t("admin_shop.orders.detail.order_info")}</h6>
        <S.OrderDetailInfo>
          <p>
            {t("admin_shop.orders.detail.sold_by")}
            <span>:</span>
          </p>
          <p className="pl-1">Trường dũng</p>
        </S.OrderDetailInfo>
        <S.OrderDetailInfo>
          <p>
            {t("admin_shop.orders.detail.delivery_appointment")}
            <span>:</span>
          </p>
          <p className="pl-1">---</p>
        </S.OrderDetailInfo>
        <S.OrderDetailInfo>
          <p>
            {t("admin_shop.orders.detail.sales_channel")}
            <span>:</span>
          </p>
          <p className="pl-1">ONLINE MART</p>
        </S.OrderDetailInfo>
        <S.OrderDetailInfo>
          <p>
            {t("admin_shop.orders.detail.date_of_sale")}
            <span>:</span>
          </p>
          <p className="pl-1">12/10/2023 13:12</p>
        </S.OrderDetailInfo>
        <S.OrderDetailInfo className="mb-0">
          <p>
            {t("admin_shop.orders.detail.path")}
            <span>:</span>
          </p>
          <p className="pl-1">---</p>
        </S.OrderDetailInfo>
      </S.OrderDetailBox>
      <S.OrderDetailBox>
        <h6 className="font-semibold text-base pb-5">{t("admin_shop.orders.detail.note")}</h6>
        <S.OrderDetailInfo>
          <p>{t("admin_shop.orders.detail.title_no_note")}</p>
        </S.OrderDetailInfo>
      </S.OrderDetailBox>
    </>
  );
};

export default OrderInfo;
