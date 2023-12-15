import { useGetCategoryListWithChildrenQuery } from "@app/store/slices/api/categoryApi";
import { useGetSupplierForSelectQuery } from "@app/store/slices/api/supplierApi";
import { useAppSelector } from "@app/store/store";
import { Col, Form, Input, Row, Select } from "antd";
import countryList from "country-list";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "../ProductEdit.styles";

import { SelectCategory } from ".";

const ProductGeneral = ({ errorForm }: any) => {
  const { t } = useTranslation();

  const shopId = useAppSelector((state) => state.userState.user)?.shop?.id;

  const { data: categoriesList } = useGetCategoryListWithChildrenQuery(shopId);
  const { data: supplier } = useGetSupplierForSelectQuery(shopId);

  const [countName, setCountName] = useState<number>(0);

  const onNameChange = (value: string) => {
    handleCountLength(value);
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
        validateStatus={errorForm?.name && "error"}
        help={errorForm?.name && errorForm?.name[0]}
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
        name="category_id"
        colon={false}
        rules={[
          {
            validator: (_, value) => {
              if (!value || value?.length === 0) {
                return Promise.reject(new Error(t("admin_shop.product.create.basic.rules.category_required")));
              }
              return Promise.resolve();
            },
          },
        ]}
        validateStatus={errorForm?.category_id && "error"}
        help={errorForm?.category_id && errorForm?.category_id[0]}
      >
        <SelectCategory optionsSelect={categoriesList} />
      </Form.Item>
      <Row gutter={16}>
        <Col xs={24} lg={12}>
          <Form.Item
            hasFeedback
            label={t("admin_shop.product.create.basic.label.brand")}
            name="supplier_id"
            colon={false}
            rules={[{ required: true, message: t("admin_shop.product.create.basic.rules.brand_required") }]}
            validateStatus={errorForm?.supplier_id && "error"}
            help={errorForm?.supplier_id && errorForm?.supplier_id[0]}
          >
            <Select showSearch placeholder="Vui lòng chọn thương hiệu" filterOption={filterOption} options={supplier} />
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Item
            hasFeedback
            label={t("admin_shop.product.create.basic.label.origin")}
            name="origin"
            colon={false}
            rules={[{ required: true, message: t("admin_shop.product.create.basic.rules.origin_required") }]}
            validateStatus={errorForm?.origin && "error"}
            help={errorForm?.origin && errorForm?.origin[0]}
          >
            <Select
              showSearch
              placeholder={t("admin_shop.product.create.basic.placeholder.origin")}
              optionFilterProp="children"
              filterOption={filterOption}
              options={countryList.getData().map((country) => ({ label: country.name, value: country.code }))}
            />
          </Form.Item>
        </Col>
      </Row>
    </S.ProductSectionWrapper>
  );
};

export default ProductGeneral;
