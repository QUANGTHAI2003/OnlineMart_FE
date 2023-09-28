import { PlusOutlined } from "@ant-design/icons";
import { AdminBreadcrumb } from "@app/app/components/common/Breadcrumb/Breadcrumb";
import { useDebounce } from "@app/hooks";
import { Button, Col, Row, Space, Typography } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { FilterComponent, TabComponent, TableComponent } from "./components";

const searchType = (t: any) => {
  return [
    { value: "id", label: t("admin_shop.orders.list.filter.type.id") },
    { value: "sku", label: t("admin_shop.orders.list.filter.type.sku") },
    { value: "infor_user", label: t("admin_shop.orders.list.filter.type.infor_user") },
  ];
};

const Order = () => {
  const { t } = useTranslation();

  const [searchValue, setSearchValue] = useState<string>("");
  const [selectSearchType, setSelectSearchType] = useState<string>(searchType(t)[0].value);
  const debouncedSearchValue = useDebounce(searchValue, 300);

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
      <TabComponent />
      <FilterComponent
        setSearchValue={setSearchValue}
        setSelectSearchType={setSelectSearchType}
        searchTypeData={searchType(t)}
      />
      <TableComponent searchValue={debouncedSearchValue} searchType={selectSearchType} />
    </main>
  );
};

export default Order;
