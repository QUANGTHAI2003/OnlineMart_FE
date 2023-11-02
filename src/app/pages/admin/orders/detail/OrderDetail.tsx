import { AdminBreadcrumb } from "@app/app/components/common/Breadcrumb/Breadcrumb";
import { Button, Col, Row, Steps, Tag } from "antd";
import { useTranslation } from "react-i18next";

import OrderDetailPrintPDF from "./components/OrderDetailPrintPDF";
import OrderFullPayment from "./components/OrderFullPayment";
import OrderInfo from "./components/OrderInfo";
import OrderUserInfo from "./components/OrderUserInfo";
import TableComponent from "./components/TableComponent";
import * as S from "./OrderDetail.styles";

const items = (t: any) => {
  return [
    {
      title: t("admin_shop.orders.detail.pending"),
    },
    {
      title: t("admin_shop.orders.detail.refuse"),
    },
    {
      title: t("admin_shop.orders.detail.refund"),
    },
    {
      title: t("admin_shop.orders.detail.complete"),
    },
  ];
};
const OrderDetail = () => {
  const { t } = useTranslation();
  return (
    <>
      <S.OrderDetailHeader className="px-6">
        <AdminBreadcrumb />
        <div className="inline-flex">
          <div className="flex gap-3">
            <Button disabled block>
              {t("admin_shop.orders.detail.cancel_order")}
            </Button>
            <Button type="primary" ghost>
              {t("admin_shop.orders.detail.edit_order")}
            </Button>
            <Button type="primary">{t("admin_shop.orders.detail.exchange")}</Button>
          </div>
        </div>
      </S.OrderDetailHeader>

      <div className="m-6">
        <Row className="mb-3">
          <Col span="12">
            <div className="flex items-center justify-start">
              <h5 className="mr-6 text-xl font-medium">SAM00016</h5>
              <Tag color="geekblue">Đang giao dịch</Tag>
            </div>
            <OrderDetailPrintPDF />
          </Col>
          <Col span="12">
            <Steps current={1} size="small" labelPlacement="vertical" items={items(t)} />
          </Col>
        </Row>
        <Row gutter={32} className="mb-4">
          <Col span="16">
            <OrderUserInfo />
            <OrderFullPayment />
          </Col>
          <Col className="h-full pl-0" span="8">
            <OrderInfo />
          </Col>
        </Row>
        <TableComponent />
      </div>
    </>
  );
};

export default OrderDetail;
