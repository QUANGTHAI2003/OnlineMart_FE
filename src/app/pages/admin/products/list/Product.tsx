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
    { value: "name", label: t("admin_shop.product.list.filter.type.name") },
    { value: "category", label: t("admin_shop.product.list.filter.type.category") },
    { value: "brand", label: t("admin_shop.product.list.filter.type.brand") },
    { value: "price", label: t("admin_shop.product.list.filter.type.price") },
    { value: "sku", label: t("admin_shop.product.list.filter.type.sku") },
  ];
};

const Product = () => {
  const { t } = useTranslation();

  const [searchValue, setSearchValue] = useState<string>("");
  const [selectSearchType, setSelectSearchType] = useState<string>(searchType(t)[0].value);
  const debouncedSearchValue = useDebounce(searchValue, 300);

  return (
    <main>
      <AdminBreadcrumb />
      <section className="header mt-3">
        <Row justify="space-between">
          <Col md={16}>
            <Typography.Title level={3}>{t("admin_shop.sidebar.product_list")}</Typography.Title>
          </Col>
          <Col md={8}>
            <Row justify="end">
              <Space>
                <Link to="create">
                  <Button type="primary" icon={<PlusOutlined />}>
                    {t("admin_shop.product.list.add_product")}
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

export default Product;
