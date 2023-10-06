import { PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Drawer, Form, Row, Select } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const FillerDrawer = React.memo(
  ({ statusTypeData, profileStatusTypeData, sellerTypeData, sellerAdminTypeData }: any) => {
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();
    const showDrawer = () => {
      setOpen(true);
    };
    const onClose = () => {
      setOpen(false);
    };
    return (
      <>
        <Button onClick={showDrawer}>
          {t("admin_shop.seller.filter.type.other")}
          <PlusOutlined />
        </Button>
        <Drawer
          title={t("admin_shop.seller.filter.type.other")}
          placement="right"
          footer={
            <div className="flex justify-end">
              <Button className="mr-2" onClick={onClose}>
                {t("admin_shop.seller.filter.filter")}
              </Button>
              <Button type="primary" onClick={onClose}>
                {t("admin_shop.seller.filter.apply")}
              </Button>
            </div>
          }
          onClose={onClose}
          open={open}
          closable={false}
        >
          <Form layout="vertical" autoComplete="off">
            <Form.Item
              name={t("admin_shop.seller.filter.type.condition")}
              label={t("admin_shop.seller.filter.type.condition")}
            >
              <Select
                className="w-full"
                placeholder={t("admin_shop.seller.filter.type.condition")}
                dropdownMatchSelectWidth={false}
                size="middle"
                options={statusTypeData}
              />
            </Form.Item>
            <Form.Item
              name={t("admin_shop.seller.filter.type.profile_status")}
              label={t("admin_shop.seller.filter.type.profile_status")}
            >
              <Select
                className="w-full"
                placeholder={t("admin_shop.seller.filter.type.profile_status")}
                dropdownMatchSelectWidth={false}
                size="middle"
                options={profileStatusTypeData}
              />
            </Form.Item>
            <Form.Item
              name={t("admin_shop.seller.filter.type.type_of")}
              label={t("admin_shop.seller.filter.type.type_of")}
            >
              <Select
                className="w-full"
                placeholder={t("admin_shop.seller.filter.type.type_of")}
                dropdownMatchSelectWidth={false}
                size="middle"
                options={sellerTypeData}
              />
            </Form.Item>
            <Form.Item
              name={t("admin_shop.seller.filter.type.sale_segment")}
              label={t("admin_shop.seller.filter.type.sale_segment")}
            >
              <Row>
                <Col span={12}>
                  <Checkbox value="1P">1P</Checkbox>
                </Col>
                <Col span={12}>
                  <Checkbox value="Strategic Partners">Strategic Partners</Checkbox>
                </Col>
                <Col span={12}>
                  <Checkbox value="Incubation">Incubation</Checkbox>
                </Col>
                <Col span={12}>
                  <Checkbox value="Long-tail">Long-tail</Checkbox>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item
              name={t("admin_shop.seller.filter.type.seller_admin")}
              label={t("admin_shop.seller.filter.type.seller_admin")}
            >
              <Select
                className="w-full"
                placeholder={t("admin_shop.seller.filter.type.seller_admin")}
                dropdownMatchSelectWidth={false}
                size="middle"
                options={sellerAdminTypeData}
              />
            </Form.Item>
          </Form>
        </Drawer>
      </>
    );
  }
);

export default FillerDrawer;
