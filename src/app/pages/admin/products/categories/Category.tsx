import { PlusOutlined } from "@ant-design/icons";
import { AdminBreadcrumb } from "@app/app/components/common/Breadcrumb/Breadcrumb";
import { Button, Col, Row, Select, Space, Typography } from "antd";
import Input from "antd/es/input";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import * as S from "./Category.styles";
import CreateCategory from "./CreateCategory";
import TableComponent from "./TableComponent";

const options = [
  {
    value: "Đồ gia dụng",
    label: "Đồ gia dụng",
  },
  {
    value: "Điện tử",
    label: "Điện tử",
  },
];
const Category = () => {
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);

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
                    <CreateCategory />
                  </S.ModalForm>
                </Space>
              </Row>
            </Col>
          </Row>
          <S.SearchField>
            <Space.Compact size="large">
              <Select defaultValue="Tất cả" options={options} />
              <Input placeholder={t("admin_shop.categories.p_search")} />
            </Space.Compact>
          </S.SearchField>
        </section>
      </main>
      <div className="p-5 bg-[#f5f5f5]">
        <TableComponent />
      </div>
    </div>
  );
};

export default Category;
