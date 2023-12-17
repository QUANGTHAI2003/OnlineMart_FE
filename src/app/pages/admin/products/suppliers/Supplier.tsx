import { PlusOutlined } from "@ant-design/icons";
import { AdminBreadcrumb } from "@app/app/components/common/Breadcrumb/Breadcrumb";
import { useDebounce } from "@app/hooks";
import { Button, Col, Row, Space, Typography } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { FilterComponent, TableComponent } from "./components";

const searchType = (t: any) => {
  return [
    { value: "code", label: t("admin_shop.suppliers.col_supplier_code") },
    { value: "name", label: t("admin_shop.suppliers.col_name") },
    { value: "phone", label: t("admin_shop.suppliers.col_phone") },
  ];
};
const Supplier = () => {
  const { t } = useTranslation();

  const [searchValue, setSearchValue] = useState<string>("");
  const [selectSearchType, setSelectSearchType] = useState<string>(searchType(t)[0].value);

  const debouncedSearchValue = useDebounce(searchValue, 300);

  return (
    <div>
      <main className="p-5 bg-white">
        <AdminBreadcrumb />
        <section className="header mt-3">
          <Row justify="space-between">
            <Col md={16}>
              <Typography.Title level={3}>{t("admin_shop.suppliers.name")}</Typography.Title>
            </Col>
            <Col md={8}>
              <Row justify="end">
                <Space>
                  <Link to="/admin/shop/suppliers/create">
                    <Button type="primary" icon={<PlusOutlined />}>
                      {t("admin_shop.suppliers.btn_add")}
                    </Button>
                  </Link>
                </Space>
              </Row>
            </Col>
          </Row>
          <FilterComponent
            setSearchValue={setSearchValue}
            setSelectSearchType={setSelectSearchType}
            searchTypeData={searchType(t)}
          />
        </section>
      </main>
      <div className="p-5 bg-[#f5f5f5]">
        <TableComponent searchValue={debouncedSearchValue} searchType={selectSearchType} />
      </div>
    </div>
  );
};

export default Supplier;
