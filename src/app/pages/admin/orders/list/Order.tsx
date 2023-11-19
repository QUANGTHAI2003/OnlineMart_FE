import { PlusOutlined } from "@ant-design/icons";
import { AdminBreadcrumb } from "@app/app/components/common/Breadcrumb/Breadcrumb";
import { useGetOrderQueryRootQuery } from "@app/store/slices/api/admin/orderApi";
import { Button, Col, Row, Space, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { FilterComponent, TabComponent, TableComponent } from "./components";

export const searchType = (t: any) => {
  return [
    { value: "id", label: t("admin_shop.orders.list.filter.type.id") },
    { value: "city", label: t("admin_shop.orders.list.filter.type.city") },
    { value: "full_name", label: t("admin_shop.orders.list.filter.type.name") },
  ];
};

const Order = () => {
  const { t } = useTranslation();
  const { data: orderList } = useGetOrderQueryRootQuery();

  return (
    <main>
      <AdminBreadcrumb className="bg-white px-6" />
      <section className="header px-6 bg-white">
        <Row justify="space-between">
          <Col md={16}>
            <Typography.Title level={3}>{t("admin_shop.sidebar.order_list")}</Typography.Title>
          </Col>
          <Col md={8}>
            <Row justify="end">
              <Space>
                <Link to="create">
                  <Button type="primary" icon={<PlusOutlined />}>
                    {t("admin_shop.orders.list.add_order")}
                  </Button>
                </Link>
              </Space>
            </Row>
          </Col>
        </Row>
      </section>
      <TabComponent orderList={orderList} />
      <FilterComponent />
      <TableComponent />
    </main>
  );
};

export default Order;
