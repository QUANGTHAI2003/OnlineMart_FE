import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import * as S from "../OrderDetail.styles";

const OrderUserInfo = (data: any) => {
  const { t } = useTranslation();
  return (
    <S.OrderDetailBox>
      <div className="flex justify-between">
        <div className="info_user">
          <div className="name_user">
            <h6 className="font-semibold text-base">{t("admin_shop.orders.detail.customer_info")}</h6>
            <div className="flex items-center">
              <Link target="_blank" className="inline-flex mt-2" to="#/">
                <h6 className="text-base font-bold">{data?.data?.full_name}</h6>
                <h6 className={`text-base font-semibold text-black ${data?.data?.phone ? "" : "hidden"}`}>
                  {` - ${data?.data?.phone}`}
                </h6>
              </Link>
            </div>
          </div>
          <div className="flex flex-col">
            <h6 className="font-medium text-sm mb-2">{t("admin_shop.orders.detail.address")}</h6>
            <p className="text-slate-500">{`${data?.data?.street} - ${data?.data?.district} - ${data?.data?.city}`}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-5">
        <div className="flex flex-col">
          <h6 className="font-medium text-sm mb-2">{t("admin_shop.orders.detail.receipt")}</h6>
          <p className="text-slate-500">{t("admin_shop.orders.detail.no_receipt")}</p>
        </div>
      </div>
    </S.OrderDetailBox>
  );
};

export default OrderUserInfo;
