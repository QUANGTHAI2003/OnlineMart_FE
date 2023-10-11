import { PlusOutlined } from "@ant-design/icons";
import { AdminBreadcrumb } from "@app/app/components/common/Breadcrumb/Breadcrumb";
import { useDebounce } from "@app/hooks";
import { useGetCategoryListWithChildrenQuery } from "@app/store/slices/api/categoryApi";
import { Button, Col, Row, Space, Typography } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "./Category.styles";
import { FilterComponent } from "./components";
import TableComponent from "./components/TableComponent";
import CreateCategory from "./CreateCategory";

const searchType = (t: any) => {
  return [
    { value: "name", label: "Tên danh mục" },
    { value: "category_children", label: "Danh mục cha" },
  ];
};
const Category = () => {
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectSearchType, setSelectSearchType] = useState<string>(searchType(t)[0].value);
  const debouncedSearchValue = useDebounce(searchValue, 300);

  const { data } = useGetCategoryListWithChildrenQuery(1);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <main className="p-5 bg-white">
        <AdminBreadcrumb />
        <section className="header mt-3">
          <Row justify="space-between">
            <Col md={16}>
              <Typography.Title level={3}>{t("admin_shop.categories.name")}</Typography.Title>
            </Col>
            <Col md={8}>
              <Row justify="end">
                <Space>
                  <Button onClick={showModal} type="primary" icon={<PlusOutlined />}>
                    Thêm mới
                  </Button>
                  <S.ModalForm
                    centered
                    className="min-w-[800px]"
                    title={t("admin_shop.categories.title")}
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[]}
                  >
                    <CreateCategory data={data} setIsModalOpen={setIsModalOpen} />
                  </S.ModalForm>
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
        <TableComponent dataCategory={data} searchValue={debouncedSearchValue} searchType={selectSearchType} />
      </div>
    </div>
  );
};

export default Category;
