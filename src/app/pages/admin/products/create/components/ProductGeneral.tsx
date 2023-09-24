import SelectOrCreate from "@app/app/components/common/Select/SelectOrCreate";
import { Col, Form, Input, Row, Select } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "../ProductCreate.styles";

import { SelectCategory } from ".";

const ProductGeneral = ({ form }: any) => {
  const { t } = useTranslation();

  const [countName, setCountName] = useState<number>(0);

  const onNameChange = (value: string) => {
    handleCountLength(value);
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const filterOption = (input: string, option?: { label: string; value: string }) => {
    if (option && option.label) {
      return option.label.toLowerCase().includes(input.toLowerCase());
    }
    return false;
  };

  const handleCountLength = (value: string) => {
    setCountName(value.length);
  };

  return (
    <S.ProductSectionWrapper>
      <div className="title">{t("admin_shop.product.create.important_info")}</div>
      <Form.Item
        hasFeedback
        label={t("admin_shop.product.create.basic.label.product_name")}
        name="name"
        colon={false}
        rules={[
          { required: true, message: t("admin_shop.product.create.basic.rules.product_name_required") },
          { min: 3, message: t("admin_shop.product.create.basic.rules.product_name_min") },
          { max: 255, message: t("admin_shop.product.create.basic.rules.product_name_max") },
        ]}
      >
        <Input
          type="text"
          onChange={(e) => onNameChange(e.target.value)}
          addonAfter={`${countName} | 255`}
          placeholder={t("admin_shop.product.create.basic.placeholder.product_name")}
        />
      </Form.Item>
      <Form.Item
        hasFeedback
        label={t("admin_shop.product.create.basic.label.category")}
        name="category"
        colon={false}
        rules={[
          {
            validator: (_, value) => {
              if (!value || value.selectedValue.length === 0) {
                return Promise.reject(new Error(t("admin_shop.product.create.basic.rules.category_required")));
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <SelectCategory />
      </Form.Item>
      <Row gutter={16}>
        <Col xs={24} lg={12}>
          <Form.Item
            hasFeedback
            label={t("admin_shop.product.create.basic.label.brand")}
            name="brand"
            colon={false}
            rules={[{ required: true, message: t("admin_shop.product.create.basic.rules.brand_required") }]}
          >
            <SelectOrCreate
              onSelected={(content: any) => form.setFieldsValue({ brand: content })}
              placeholder="Vui lòng chọn thương hiệu"
            />
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Item
            hasFeedback
            label={t("admin_shop.product.create.basic.label.origin")}
            name="origin"
            colon={false}
            rules={[{ required: true, message: t("admin_shop.product.create.basic.rules.origin_required") }]}
          >
            <Select
              showSearch
              placeholder={t("admin_shop.product.create.basic.placeholder.origin")}
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={filterOption}
              options={[
                {
                  value: "viet_nam",
                  label: "Việt Nam",
                },
                {
                  value: "usa",
                  label: "USA",
                },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>
    </S.ProductSectionWrapper>
  );
};

export default ProductGeneral;
