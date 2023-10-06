import SelectAddress from "@app/app/components/clients/SelectAddress/SelectAddress";
import SelectOrCreate from "@app/app/components/common/Select/SelectOrCreate";
import { Button, Col, Form, Input, Select } from "antd";
import { useTranslation } from "react-i18next";

import * as S from "./Supplier.styles";

const EditSupplier = () => {
  const { t } = useTranslation();
  const { Option } = Select;

  const selectBefore = (
    <Select defaultValue="http://">
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
    </Select>
  );
  const selectAfter = (
    <Select defaultValue=".com">
      <Option value=".com">.com</Option>
      <Option value=".vn">.vn</Option>
      <Option value=".org">.org</Option>
    </Select>
  );
  const handleGetAddress = (address: string) => {
    console.log(address);
  };

  const validateMessages = {
    required: "${label} " + t("admin_shop.suppliers.err_null"),
    types: {
      email: "${label} " + t("admin_shop.suppliers.err_pattern"),
    },
    pattern: {
      mismatch: "${label} " + t("admin_shop.suppliers.err_pattern"),
    },
  };

  return (
    <div>
      <Form
        className="md:text-sm sm:text-xs"
        autoComplete="off"
        onFinish={(values) => {
          console.log({ values });
        }}
        onFinishFailed={(error) => {
          console.log({ error });
        }}
        validateMessages={validateMessages}
      >
        <S.Field gutter={16} justify="space-between">
          <Col span="12">
            <S.Field justify="space-between">
              <Col span="24">
                <S.FormField
                  name="name"
                  hasFeedback
                  label={t("admin_shop.suppliers.label_name")}
                  rules={[
                    {
                      required: true,
                    },
                    { whitespace: true },
                    { min: 6 },
                  ]}
                >
                  <Input />
                </S.FormField>
              </Col>
              <Col span="24">
                <S.FormField
                  name="tag"
                  hasFeedback
                  label={t("admin_shop.suppliers.label_tag")}
                  rules={[
                    {
                      required: true,
                    },
                    { min: 3 },
                  ]}
                >
                  <SelectOrCreate placeholder="" />
                </S.FormField>
              </Col>
            </S.Field>
            <S.Field gutter={16} justify="space-between">
              <Col span="12">
                <S.FormField
                  name="code"
                  hasFeedback
                  label={t("admin_shop.suppliers.label_supplier_code")}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </S.FormField>
              </Col>
              <Col span="12">
                <S.FormField
                  name="phone"
                  hasFeedback
                  label={t("admin_shop.suppliers.label_phone")}
                  rules={[
                    {
                      required: true,
                    },
                    {
                      pattern: /(0[3|5|7|8|9])+([0-9]{8})\b/g,
                    },
                  ]}
                >
                  <Input />
                </S.FormField>
              </Col>
            </S.Field>
          </Col>
          <Col span="12">
            <S.Field gutter={16} justify="space-between">
              <Col span="12">
                <S.FormField
                  name="email"
                  hasFeedback
                  label={t("admin_shop.suppliers.label_email")}
                  rules={[
                    {
                      required: true,
                    },
                    {
                      type: "email",
                    },
                  ]}
                >
                  <Input type="email" />
                </S.FormField>
                <S.Field>
                  <S.FormField
                    name="address"
                    label={t("admin_shop.suppliers.label_address")}
                    className="w-full"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                      },
                      { whitespace: true },
                      { min: 6 },
                    ]}
                  >
                    <Input />
                  </S.FormField>
                </S.Field>
                <S.Field>
                  <S.FormField
                    name="website"
                    hasFeedback
                    label={t("admin_shop.suppliers.label_website")}
                    className="w-full"
                    rules={[
                      {
                        required: false,
                      },
                      {
                        pattern:
                          /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
                      },
                    ]}
                  >
                    <Input addonBefore={selectBefore} addonAfter={selectAfter} />
                  </S.FormField>
                </S.Field>
              </Col>
              <S.AddressField span="12">
                <SelectAddress onAddressChange={handleGetAddress} />
              </S.AddressField>
            </S.Field>
          </Col>
        </S.Field>
        <S.Field justify="end">
          <Button type="primary" htmlType="submit">
            {t("admin_shop.suppliers.btn_update")}
          </Button>
        </S.Field>
      </Form>
    </div>
  );
};

export default EditSupplier;
