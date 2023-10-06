import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import { SelectPostionRegisterEmployees, SelectRightRegisterEmployees } from "./data";

const { Option } = Select;
const RegisterEmployess = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setLoading(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  type FieldType = {
    name?: string;
    email?: string;
    phone?: number;
    password?: string;
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const validateMessages = {
    required: "${label} " + t("admin_shop.seller.register.form.validate_required"),
    types: {
      email: "${label} " + t("admin_shop.seller.register.form.validate_type"),
    },
    pattern: {
      mismatch: "${label} " + t("admin_shop.seller.register.form.validate_type"),
    },
    string: {
      min: "${label} " + t("admin_shop.seller.register.form.validate_min", { min: "${min}" }),
      max: "${label} " + t("admin_shop.seller.register.form.validate_max", { max: "${max}" }),
    },
  };
  const [selectedRightValue, setSelectedRightValue] = useState("");
  const [selectedPositionValue, setSelectedPositionValue] = useState("");

  const handleRightSelectChange = (value: any) => {
    setSelectedRightValue(value);
  };

  const handlePositionSelectChange = (value: any) => {
    setSelectedPositionValue(value);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        {t("admin_shop.seller.link_register")}
      </Button>
      <Modal
        title={t("admin_shop.seller.register.title")}
        open={open}
        width={700}
        centered
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        footer={null}
      >
        <div className="p-5">
          <Form
            name="register"
            onFinish={(values) => {
              console.log({ values });
            }}
            onFinishFailed={onFinishFailed}
            validateMessages={validateMessages}
            autoComplete="off"
            layout="vertical"
            className="w-full p-4 border border-[#ebebf0] border-solid rounded-md"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item<FieldType>
                  name={t("admin_shop.seller.register.form.name")}
                  label={t("admin_shop.seller.register.form.name")}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  hasFeedback
                >
                  <Input size="large" placeholder={t("admin_shop.seller.register.form.placeholder")} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item<FieldType>
                  name={t("admin_shop.seller.register.form.email")}
                  label={t("admin_shop.seller.register.form.email")}
                  rules={[{ required: true }, { type: "email" }]}
                  hasFeedback
                >
                  <Input size="large" placeholder={t("admin_shop.seller.register.form.placeholder")} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item<FieldType>
                  name="right"
                  label={t("admin_shop.seller.register.form.right")}
                  rules={[{ required: true }]}
                  hasFeedback
                >
                  <Select
                    size="large"
                    mode="multiple"
                    allowClear
                    placeholder={t("admin_shop.seller.register.form.placeholder_select")}
                    value={selectedRightValue}
                    onChange={handleRightSelectChange}
                    optionLabelProp="label"
                  >
                    {SelectRightRegisterEmployees?.map((item: any) => (
                      <Option value={item.value} key={uuidv4()} label={item.label} className="capitalize">
                        {item.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item<FieldType>
                  name="position"
                  label={t("admin_shop.seller.register.form.position")}
                  rules={[{ required: true }]}
                  hasFeedback
                >
                  <Select
                    size="large"
                    allowClear
                    mode="multiple"
                    placeholder={t("admin_shop.seller.register.form.placeholder_select")}
                    value={selectedPositionValue}
                    onChange={handlePositionSelectChange}
                    optionLabelProp="label"
                  >
                    {SelectPostionRegisterEmployees?.map((item: any) => (
                      <Option value={item.value} key={uuidv4()} label={item.label} className="capitalize">
                        {item.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item<FieldType>
                  name={t("admin_shop.seller.register.form.phone")}
                  label={t("admin_shop.seller.register.form.phone")}
                  rules={[
                    {
                      required: true,
                    },
                    {
                      pattern: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
                    },
                  ]}
                  hasFeedback
                >
                  <Input size="large" placeholder={t("admin_shop.seller.register.form.placeholder")} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item<FieldType>
                  name={t("admin_shop.seller.register.form.password")}
                  label={t("admin_shop.seller.register.form.password")}
                  rules={[
                    {
                      required: true,
                    },
                    { min: 6 },
                    { max: 16 },
                  ]}
                  hasFeedback
                >
                  <Input size="large" placeholder={t("admin_shop.seller.register.form.placeholder")} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item className="mt-3">
              <Button htmlType="submit" block size="large" type="primary" loading={loading}>
                {t("admin_shop.seller.register.form.btn_submit")}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default RegisterEmployess;
