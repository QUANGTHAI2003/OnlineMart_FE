import { CheckCircleTwoTone } from "@ant-design/icons";
import { formatCurrency } from "@app/utils/helper";
import { useTranslation } from "react-i18next";

import * as S from "../OrderDetail.styles";

const OrderFullPayment = (data: any) => {
  const { t } = useTranslation();
  return (
    <S.OrderDetailBox>
      <h6 className="title_pay">
        <CheckCircleTwoTone className="mr-3" twoToneColor="#52c41a" />
        {t("admin_shop.orders.detail.paid_in_full")}
      </h6>
      <div className="pay_price mb-4">
        <p>
          {`${t("admin_shop.orders.detail.guests_must_pay")}:`}
          <span className="font-semibold">
            &nbsp;
            {formatCurrency(data?.data?.grand_total)}
          </span>
        </p>
        <p>
          {`${t("admin_shop.orders.detail.paid")}:`}
          <span className="font-semibold">
            &nbsp;
            {formatCurrency(data?.data?.grand_total)}
          </span>
        </p>
        <p>
          {`${t("admin_shop.orders.detail.still_to_pay")}:`}
          <span className="text-red-600 font-semibold">
            &nbsp;
            {formatCurrency(0)}
          </span>
        </p>
      </div>
      <div className="ml-4 mb-2 flex flex-col">
        <S.OrderEditorSeller>
          <p>{t("admin_shop.orders.detail.payer")}</p>
          <span className="pl-2">{data?.data?.full_name}</span>
        </S.OrderEditorSeller>
      </div>
    </S.OrderDetailBox>
  );
};

export default OrderFullPayment;
