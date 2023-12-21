import { useGetOrderOnlyQuery } from "@app/store/slices/api/user/orderApi";
import { baseImageUrl, formatCurrency } from "@app/utils/helper";
import { Table } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import ModalCancelOrder from "./components/ModalCancelOrder";
import ModalReviewProduct from "./components/ModalReviewProduct";
import * as S from "./ListOrder.style";

const OrderDetailPage = () => {
  const { id } = useParams();
  const { data: dataOrder, isLoading } = useGetOrderOnlyQuery(parseInt(id as string));
  const { t } = useTranslation();
  const columns: any = [
    {
      title: t("user.orders.order_details.product"),
      dataIndex: "order_item",
      key: "product",
      render: (_: any, record: any) => {
        return (
          <div key={uuidv4()} className="flex flex-row items-center">
            <div className="col-span-1 w-full max-w-[100px]">
              <img
                src={`${baseImageUrl}/${record?.product?.product_image}`}
                alt={record?.product?.product_name}
                className="mr-2"
              />
            </div>
            <div className="ml-5 grid gap-3">
              <div className="row-span-1">
                <span className="font-bold line-clamp-1">{record?.product?.product_name}</span>
              </div>
              <div className="row-span-1">
                {t("user.orders.order_details.provided")}
                <span className="text-blue-500 p-2">{record?.shop_name}</span>
              </div>
              <div className="row-span-1">
                <span>
                  SKU: &nbsp;
                  {record?.product?.product_sku}
                </span>
              </div>
              <div className="row-span-1 flex items-center">
                {dataOrder?.status === "delivered" ? (
                  <ModalReviewProduct
                    product_id={record.product?.product_id}
                    product_name={record.product?.product_name}
                    product_image={record.product?.product_image}
                    order_id={dataOrder?.id}
                  />
                ) : null}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: t("user.orders.order_details.price"),
      dataIndex: "price",
      key: "price",
      render: (_: any, record: any) => {
        return <span key={uuidv4()}>{formatCurrency(record?.product?.product_price)}</span>;
      },
    },
    {
      title: t("user.orders.order_details.quantity"),
      dataIndex: "quantity",
      key: "quantity",
      className: "text-center",
      render: (_: any, record: any) => {
        return (
          <span key={uuidv4()}>
            {`
            x${record?.product?.product_quantity}
            `}
          </span>
        );
      },
    },
  ];
  const footer = () => (
    <div className="text-right sub-total px-12">
      <div className="flex justify-end">
        <span className="pr-4">{t("user.orders.order_details.transport_fee")}</span>
        <span className="price-footer">{`${formatCurrency(dataOrder?.shipping_fee)}`}</span>
      </div>
      <div className="flex justify-end">
        <div className="pr-4">{t("user.orders.order_details.total")}</div>
        <span className="text-red-600 price-footer">{`${formatCurrency(dataOrder?.grand_total)}`}</span>
      </div>
      <div className="grid grid-cols-5 w-full  mt-5">
        <div className=" items-center pt-2  text-left col-start-1 col-end-3 space-x-10 mt-3">
          <Link to={"/account/orders"} className="link-agin text-blue-400">
            {t("user.orders.order_details.back_order")}
          </Link>
        </div>
        <div className="mt-3 flex-1 col-end-6 col-span-2 p">
          {dataOrder?.status === "awaiting" && <ModalCancelOrder order_id={id} />}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="sm:flex sm:justify-between">
        <div>
          <h1 className="text-lg pb-3">
            {` ${t("user.orders.order_details.order_detail")}
            #${dataOrder?.id} - 
            ${
              dataOrder?.status === "awaiting"
                ? t("admin_shop.orders.list.status.awaiting")
                : dataOrder?.status === "processing"
                  ? t("admin_shop.orders.list.status.processing")
                  : dataOrder?.status === "shipping"
                    ? t("admin_shop.orders.list.status.shipping")
                    : dataOrder?.status === "canceled"
                      ? t("admin_shop.orders.list.status.canceled")
                      : dataOrder?.status === "delivered"
                        ? t("admin_shop.orders.list.status.delivered")
                        : null
            }
              `}
          </h1>
        </div>
        <span className="flex justify-end">
          {t("user.orders.order_details.order_date")}
          {dayjs(dataOrder?.created_at).format("DD-MM-YYYY: HH:mm:ss")}
        </span>
      </div>
      <S.OrderDetails>
        <div className="grid grid-cols-1 infor-method sm:grid-cols-3 gap-4 mt-5">
          <div className="row-start-2 row-span-2">{t("user.orders.order_details.receive_address")}</div>
          <div className="row-start-2 row-span-2">{t("user.orders.order_details.delivery_method")}</div>
          <div className="row-start-2 row-span-2">{t("user.orders.order_details.payments")}</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
          <div className="bg-white rounded-xl p-4">
            <div className="font-bold">{dataOrder?.user?.full_name}</div>
            <p className="py-3">
              {t("user.orders.order_details.address")}
              {dataOrder?.street}
            </p>
            <p className="">
              {t("user.orders.order_details.phone")}
              {dataOrder?.user?.phone}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4">
            <div>
              <p className="py-2 ">{`${t("user.orders.order_details.delivery_method")}${dataOrder?.shipping_unit}`}</p>
              <p className="py-2">
                {t("user.orders.order_details.transport_fee")}
                {formatCurrency(dataOrder?.shipping_fee)}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4">
            <span>{dataOrder?.payment_method?.method_name}</span>
          </div>
        </div>
        <div className="mt-4 table-responsive">
          <div className="table-scroll-instructions">{t("user.orders.order_details.table_scrool")}</div>
          <Table
            rowKey={uuidv4()}
            loading={isLoading}
            scroll={{ x: 320 }}
            dataSource={dataOrder?.order_item}
            columns={columns}
            footer={footer}
            pagination={false}
          />
        </div>
      </S.OrderDetails>
    </>
  );
};

export default OrderDetailPage;
