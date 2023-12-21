import { PlusOutlined } from "@ant-design/icons";
import { AdminBreadcrumb } from "@app/app/components/common/Breadcrumb/Breadcrumb";
import { Can, PermissionsSwitch } from "@app/app/components/common/Permissions";
import { Button, Card, Col, Row, Space, Typography } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { CreateEvoucher, FormEVouncher, TableComponent } from "./components";
import * as S from "./Evouncher.style";

const Evouncher = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { t } = useTranslation();
  return (
    <main>
      <AdminBreadcrumb className="bg-white px-6" />
      <section className="header px-6 bg-white">
        <Row justify="space-between">
          <Col md={16}>
            <Typography.Title className="py-4" level={3}>
              {t("admin_shop.sidebar.evouncher")}
            </Typography.Title>
          </Col>
          <Col md={8} className="mt-5">
            <Row justify="end">
              <Space>
                <PermissionsSwitch>
                  <Can permissions={["Create voucher"]}>
                    <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
                      {t("admin_shop.product.evouncher.add_vouncher")}
                    </Button>
                  </Can>
                  <Can>
                    <Button disabled type="primary" onClick={showModal} icon={<PlusOutlined />}>
                      {t("admin_shop.product.evouncher.add_vouncher")}
                    </Button>
                  </Can>
                </PermissionsSwitch>
                <S.ModalForm
                  centered
                  className="min-w-[800px]"
                  title={t("admin_shop.product.evouncher.add_vouncher")}
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  footer={[]}
                >
                  <CreateEvoucher onCancel={handleCancel} />
                </S.ModalForm>
              </Space>
            </Row>
          </Col>
        </Row>
      </section>
      <Card className="m-6">
        <FormEVouncher />
      </Card>
      <TableComponent />
    </main>
  );
};

export default Evouncher;
