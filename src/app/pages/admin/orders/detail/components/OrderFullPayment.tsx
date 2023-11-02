import { CheckCircleTwoTone } from "@ant-design/icons";
import { formatCurrency } from "@app/utils/helper";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

import * as S from "../OrderDetail.styles";

const OrderFullPayment = () => {
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
          <span className="font-semibold">{formatCurrency(240000)}</span>
        </p>
        <p>
          {`${t("admin_shop.orders.detail.paid")}:`}
          <span className="font-semibold">{formatCurrency(240000)}</span>
        </p>
        <p>
          {`${t("admin_shop.orders.detail.still_to_pay")}:`}
          <span className="text-red-600 font-semibold">{formatCurrency(240000)}</span>
        </p>
      </div>
      <div className="py-4 px-3 flex items-center justify-between">
        <div className="flex items-center">
          <FontAwesomeIcon className="icon-circle" icon={faCircle} />
          <p>
            {`${t("admin_shop.orders.detail.cash")}:`}
            <span className="font-semibold">{formatCurrency(240000)}</span>
          </p>
        </div>
        <p>13/10/2023 13:12</p>
      </div>
      <div className="ml-4 mb-2 flex flex-col">
        <S.OrderEditorSeller>
          <p>{t("admin_shop.orders.detail.payer")}</p>
          <span className="pl-2">Trường dũng</span>
        </S.OrderEditorSeller>
        <S.OrderEditorSeller>
          <p>{t("admin_shop.orders.detail.note")}</p>
          <span className="pl-2">---</span>
        </S.OrderEditorSeller>
      </div>
    </S.OrderDetailBox>
  );
};

export default OrderFullPayment;
