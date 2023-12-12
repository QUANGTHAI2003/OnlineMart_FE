import { useGetOrderOnlyQuery } from "@app/store/slices/api/admin/orderApi";
import { formatCurrency } from "@app/utils/helper";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import * as S from "../OrderDetail.styles";

const ComponentDetailPrintPDF = ({ innerRef }: any) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { data: orderData } = useGetOrderOnlyQuery(Number(id));
  const total = (orderData?.grand_total ?? 0) + 22000;
  const productCount = orderData?.order_item?.length;
  return (
    <S.OrderDetailExport ref={innerRef}>
      <div className="header font-sans">
        <div className="mx-20  flex justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">{orderData?.user?.full_name}</h3>
            <h4 className="text-xl font-semibold mb-2">{orderData?.city}</h4>
            <p className="font-semibold text-xl">{orderData?.user?.phone}</p>
          </div>
          <div className="text-right text-xl">
            <p>
              {t("user.orders.order.print.id")}
              <span className="font-semibold">{`OM-${orderData?.id}`}</span>
            </p>
            <p>
              {t("user.orders.order.print.created_at")}
              <span className="font-semibold">{dayjs(orderData?.created_at).format("DD-MM-YYYY: HH:mm:ss")}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="pt-8 mx-5 font-sans">
        <h2 className="font-semibold text-2xl text-center">{t("user.orders.order.print.bill")}</h2>
        <div className="flex items-center justify-between my-6">
          <p>
            {t("user.orders.order.print.bill_to")}
            <span className="font-semibold">{orderData?.user?.full_name}</span>
          </p>
          <p>
            {t("user.orders.order.print.delivery_to")}
            <span className="font-semibold">{`${orderData?.street}, ${orderData?.district}, ${orderData?.city}`}</span>
          </p>
          <div className="text-right">
            <p>
              {t("user.orders.order.print.phone")}
              <span className="font-semibold">{orderData?.user?.phone}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="mx-6">
        <table className="font-sans">
          <thead>
            <tr>
              <th className="p-5">{t("user.orders.order.print.id_product")}</th>
              <th className="p-5">{t("user.orders.order.print.name_product")}</th>
              <th className="p-5">{t("user.orders.order.print.price")}</th>
              <th className="p-5">{t("user.orders.order.print.quantity")}</th>
              <th className="p-5">{t("user.orders.order.print.sale_price")}</th>
              <th className="p-5">{t("user.orders.order.print.total")}</th>
            </tr>
          </thead>
          <tbody>
            {orderData?.order_item?.map((item: any) => {
              const totalprice = item.product?.product_price * item.product?.product_quantity;
              const totalpriceSale = item.product?.product_sale * item.product?.product_quantity;

              return (
                <tr key={uuidv4()}>
                  <td className="p-4">{item.product?.id}</td>
                  <td className="p-4">{item.product?.product_name}</td>
                  <td className="p-4">{formatCurrency(item.product?.product_price)}</td>
                  <td className="p-4">{item.product?.product_quantity}</td>
                  <td className="p-4">{formatCurrency(item.product?.product_sale)}</td>
                  <td className="p-4">
                    {item.product?.product_sale ? formatCurrency(totalpriceSale) : formatCurrency(totalprice)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="w-2/4 float-right font-sans mx-6">
        <S.TotalPrice>
          <div>{t("user.orders.order.print.total_product")}</div>
          <p>{productCount}</p>
        </S.TotalPrice>
        <S.TotalPrice>
          <div>{t("user.orders.order.print.grand_total")}</div>
          <p>{formatCurrency(orderData?.grand_total)}</p>
        </S.TotalPrice>
        <S.TotalPrice>
          <div>{t("user.orders.order.print.shipping_fee")}</div>
          <p>{formatCurrency(22000)}</p>
        </S.TotalPrice>
        <div className="flex items-center justify-between">
          <div className="font-semibold">{t("user.orders.order.print.custom_pay")}</div>
          <p>{formatCurrency(total)}</p>
        </div>
      </div>
    </S.OrderDetailExport>
  );
};

export default ComponentDetailPrintPDF;
