import { AdminBreadcrumb } from "@app/app/components/common/Breadcrumb/Breadcrumb";
import { useGetOrderOnlyQuery } from "@app/store/slices/api/admin/orderApi";
import { Button, Col, Row, Steps, Tag } from "antd";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import OrderDetailPrintPDF from "./components/OrderDetailPrintPDF";
import OrderFullPayment from "./components/OrderFullPayment";
import OrderInfo from "./components/OrderInfo";
import OrderUserInfo from "./components/OrderUserInfo";
import TableComponent from "./components/TableComponent";
import * as S from "./OrderDetail.styles";

const items = (t: any) => {
  return [
    {
      title: t("admin_shop.orders.list.status.awaiting"),
    },
    {
      title: t("admin_shop.orders.list.status.processing"),
    },
    {
      title: t("admin_shop.orders.list.status.shipping"),
    },
    {
      title: t("admin_shop.orders.list.status.delivered"),
    },
    {
      title: t("admin_shop.orders.list.status.canceled"),
    },
  ];
};

const getStatusTagColor = (status: any, t: any) => {
  switch (status) {
    case "awaiting":
      return ["purple", t("admin_shop.orders.list.status.awaiting")];
    case "processing":
      return ["blue", t("admin_shop.orders.list.status.processing")];
    case "shipping":
      return ["gold", t("admin_shop.orders.list.status.shipping")];
    case "canceled":
      return ["red", t("admin_shop.orders.list.status.canceled")];
    case "delivered":
      return ["green", t("admin_shop.orders.list.status.delivered")];
    default:
      return [];
  }
};

const OrderDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data: orderData } = useGetOrderOnlyQuery(Number(id));
  const [statusColor, statusText] = getStatusTagColor(
    orderData?.status === "awaiting"
      ? "awaiting"
      : orderData?.status === "processing"
      ? "processing"
      : orderData?.status === "shipping"
      ? "shipping"
      : orderData?.status === "canceled"
      ? "canceled"
      : "delivered",
    t
  );
  const currentStep = (() => {
    switch (orderData?.status) {
      case "awaiting":
        return 0;
      case "processing":
        return 1;
      case "shipping":
        return 2;
      case "delivered":
        return 3;
      case "canceled":
        return 4;
      default:
        return 0;
    }
  })();
  return (
    <>
      <S.OrderDetailHeader className="px-6">
        <AdminBreadcrumb />
        <div className="inline-flex">
          <div className="flex gap-3">
            <Button disabled={orderData?.status === "awaiting" ? false : true} block>
              {t("admin_shop.orders.detail.cancel_order")}
            </Button>
          </div>
        </div>
      </S.OrderDetailHeader>

      <div className="m-6">
        <Row className="mb-3">
          <Col span={12}>
            <div className="flex items-center justify-start">
              <h5 className="mr-6 text-xl font-medium">{orderData?.code}</h5>
              <Tag color={statusColor}>{statusText}</Tag>
            </div>
            <OrderDetailPrintPDF />
          </Col>
          <Col span={12}>
            <Steps current={currentStep} size="small" labelPlacement="vertical" items={items(t)} />
          </Col>
        </Row>
        <Row gutter={32} className="mb-4">
          <Col span={16}>
            <OrderUserInfo data={orderData} />
            <OrderFullPayment data={orderData} />
          </Col>
          <Col className="h-full pl-0" span={8}>
            <OrderInfo />
          </Col>
        </Row>
        <TableComponent data={orderData} />
      </div>
    </>
  );
};

export default OrderDetail;
