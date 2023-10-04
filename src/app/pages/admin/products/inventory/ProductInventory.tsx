import { CaretDownOutlined, PrinterOutlined } from "@ant-design/icons";
import { AdminBreadcrumb } from "@app/app/components/common/Breadcrumb/Breadcrumb";
import { useDebounce } from "@app/hooks";
import type { MenuProps } from "antd";
import { Button, Col, Divider, Dropdown, Row, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { FilterComponent, TableComponent } from "./components";
import * as S from "./ProductInventory.styles";
import { BreadcrumbSkeleton, FilterSkeleton, SiteHeaderSkeleton, TableSkeleton } from "./skeletons";

const { Title } = Typography;

const searchType = (t: any) => {
  return [
    { value: "name", label: t("admin_shop.inventory.filter.name") },
    { value: "supplier", label: t("admin_shop.inventory.filter.supplier") },
  ];
};

const ProductInventory = () => {
  const { t } = useTranslation();

  const [loadingSkeleton, setLoadingSkeleton] = useState<boolean>(false);
  useEffect(() => {
    setLoadingSkeleton(true);
    setTimeout(() => {
      setLoadingSkeleton(false);
    }, 2000);
  }, []);

  const items: MenuProps["items"] = [
    {
      label: <Link to="/admin/shop/products/composites">Combo</Link>,
      key: "0",
    },
    {
      label: <Link to="/admin/shop/products/packsizes">{t("admin_shop.inventory.filter.converted_product")}</Link>,
      key: "1",
    },
  ];

  const [searchValue, setSearchValue] = useState<string>("");
  const [selectSearchType, setSelectSearchType] = useState<string>(searchType(t)[0].value);
  const debouncedSearchValue = useDebounce(searchValue, 300);

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
            <Col>
              <Space>
                <Link to="/admin/shop/products">
                  <Button type="primary">{t("admin_shop.inventory.site_header.product_list")}</Button>
                </Link>
              </Space>
            </Col>
          </Row>
        )}
      </S.SiteHeader>

      <div className="m-4">
        {loadingSkeleton ? (
          <FilterSkeleton count={1} />
        ) : (
          <div>
            <FilterComponent
              setSearchValue={setSearchValue}
              setSelectSearchType={setSelectSearchType}
              searchTypeData={searchType(t)}
            />
            <S.ToolBox>
              <Space className="box_item">
                <PrinterOutlined className="print_icon" />
                <Link to="/admin/shop/products/print_barcode" className="link">
                  {t("admin_shop.inventory.filter.print_barcode")}
                </Link>
              </Space>

              <Divider type="vertical" className="divider" />

              <Space className="box_item">
                <Link to="/admin/shop/category" className="link">
                  {t("admin_shop.inventory.filter.categories")}
                </Link>
              </Space>

              <Divider type="vertical" className="divider" />

              <Dropdown menu={{ items }} trigger={["click"]} className="other_manage box_item">
                <Space className="button">
                  {t("admin_shop.inventory.filter.other_manage")}
                  <CaretDownOutlined />
                </Space>
              </Dropdown>
            </S.ToolBox>
          </div>
        )}
      </div>

      <div className="m-4">
        {loadingSkeleton ? (
          <TableSkeleton count={1} />
        ) : (
          <TableComponent searchValue={debouncedSearchValue} searchType={selectSearchType} />
        )}
      </div>
    </>
  );
};
export default ProductInventory;
