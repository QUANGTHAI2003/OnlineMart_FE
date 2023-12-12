import { useTranslation } from "react-i18next";

import * as S from "../OrderDetail.styles";

const OrderInfo = () => {
  const { t } = useTranslation();

  return (
    <S.OrderDetailBox>
      <h6 className="font-semibold text-base pb-5">{t("admin_shop.orders.detail.note")}</h6>
      <S.OrderDetailInfo>
        <p>{t("admin_shop.orders.detail.title_no_note")}</p>
      </S.OrderDetailInfo>
    </S.OrderDetailBox>
  );
};

export default OrderInfo;
