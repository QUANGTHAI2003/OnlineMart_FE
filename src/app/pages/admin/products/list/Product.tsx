import { PlusOutlined } from "@ant-design/icons";
import { AdminBreadcrumb } from "@app/app/components/common/Breadcrumb/Breadcrumb";
import { Can, PermissionsSwitch } from "@app/app/components/common/Permissions";
import { useGetProductQuery } from "@app/store/slices/api/admin/productApi";
import { Button, Col, Row, Space, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { FilterComponent, TabComponent, TableComponent } from "./components";

export const searchType = (t: any) => {
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
  const { data: productList, isFetching } = useGetProductQuery();

  // productList?.forEach(async (product: any) => {
  //   const embedding = await getEmbeddingsForProduct(product.name);

  //   await dataIndex.upsert([
  //     {
  //       id: product.id,
  //       values: embedding,
  //     },
  //   ]);
  // });

  return (
    <main>
      <AdminBreadcrumb className="bg-white px-6" />
      <section className="header px-6 bg-white">
        <Row justify="space-between">
          <Col md={16}>
            <Typography.Title level={3}>{t("admin_shop.sidebar.product_list")}</Typography.Title>
          </Col>
          <Col md={8}>
            <Row justify="end">
              <PermissionsSwitch>
                <Can permissions={["Create product"]}>
                  <Space>
                    <Link to="create">
                      <Button type="primary" icon={<PlusOutlined />}>
                        {t("admin_shop.product.list.add_product")}
                      </Button>
                    </Link>
                  </Space>
                </Can>
                <Can>
                  <Space>
                    <Button disabled type="primary" icon={<PlusOutlined />}>
                      {t("admin_shop.product.list.add_product")}
                    </Button>
                  </Space>
                </Can>
              </PermissionsSwitch>
            </Row>
          </Col>
        </Row>
      </section>
      <TabComponent productList={productList} />
      <FilterComponent searchTypeData={searchType(t)} />
      <TableComponent productList={productList} isFetching={isFetching} />
    </main>
  );
};

export default Product;
