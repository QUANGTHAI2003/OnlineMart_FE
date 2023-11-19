import { PrinterOutlined } from "@ant-design/icons";
import { AdminBreadcrumb } from "@app/app/components/common/Breadcrumb/Breadcrumb";
import { Can, PermissionsSwitch } from "@app/app/components/common/Permissions";
import { useGetInventoryQuery } from "@app/store/slices/api/admin/inventoryApi";
import { Button, Col, Divider, Row, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { FilterComponent, TableComponent } from "./components";
import * as S from "./ProductInventory.styles";
import { BreadcrumbSkeleton, FilterSkeleton, SiteHeaderSkeleton } from "./skeletons";

const { Title } = Typography;

export const searchType = (t: any) => {
  return [
    { value: "name", label: t("admin_shop.inventory.filter.name") },
    { value: "supplier_name", label: t("admin_shop.inventory.filter.supplier") },
  ];
};

const ProductInventory = () => {
  const { t } = useTranslation();
  const { data: productList, isFetching } = useGetInventoryQuery();

  const [loadingSkeleton, setLoadingSkeleton] = useState<boolean>(false);
  useEffect(() => {
    setLoadingSkeleton(true);
    setTimeout(() => {
      setLoadingSkeleton(false);
    }, 1000);
  }, []);

  return (
    <>
      <S.SiteHeader>
        {loadingSkeleton ? <BreadcrumbSkeleton count={1} /> : <AdminBreadcrumb />}

        {loadingSkeleton ? (
          <SiteHeaderSkeleton count={1} />
        ) : (
          <Row justify="space-between">
            <Col>
              <Title level={4} className="m-0">
                {t("admin_shop.inventory.site_header.inventory_manage")}
              </Title>
            </Col>

            <PermissionsSwitch>
              <Can permissions={["View products"]}>
                <Col>
                  <Space>
                    <Link to="/admin/shop/products">
                      <Button type="primary">{t("admin_shop.inventory.site_header.product_list")}</Button>
                    </Link>
                  </Space>
                </Col>
              </Can>
            </PermissionsSwitch>
          </Row>
        )}
      </S.SiteHeader>

      <div className="m-4">
        {loadingSkeleton ? (
          <FilterSkeleton count={1} />
        ) : (
          <div>
            <FilterComponent searchTypeData={searchType(t)} />
            <S.ToolBox>
              <PermissionsSwitch>
                <Can permissions={["Print QR"]}>
                  <Space className="box_item">
                    <PrinterOutlined className="print_icon" />
                    <Link to="/admin/shop/products/print_qrcode" className="link">
                      {t("admin_shop.inventory.filter.print_qrcode")}
                    </Link>
                  </Space>
                </Can>
              </PermissionsSwitch>

              <Divider type="vertical" className="divider" />

              <PermissionsSwitch>
                <Can permissions={["View categories"]}>
                  <Space className="box_item">
                    <Link to="/admin/shop/categories" className="link">
                      {t("admin_shop.inventory.filter.categories")}
                    </Link>
                  </Space>
                </Can>
              </PermissionsSwitch>
            </S.ToolBox>
          </div>
        )}
      </div>

      <div className="m-4">
        <TableComponent productList={productList} isFetching={isFetching} />
      </div>
    </>
  );
};
export default ProductInventory;
