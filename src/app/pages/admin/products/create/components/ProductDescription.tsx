import RichText from "@app/app/components/common/Form/RichText";
import SelectOrCreate from "@app/app/components/common/Select/SelectOrCreate";
import { Col, Form, Input, Row } from "antd";
import { useTranslation } from "react-i18next";

import * as S from "../ProductCreate.styles";

const ProductDescription = ({ form }: any) => {
  const { t } = useTranslation();

  return (
    <>
      <S.ProductSectionWrapper>
        <div className="title">{t("admin_shop.product.create.important_info")}</div>
        <Form.Item
          label={t("admin_shop.product.create.description.label.product_desc")}
          name="description"
          rules={[
            {
              required: true,
              message: t("admin_shop.product.create.description.rules.product_desc_required"),
            },
          ]}
        >
          <RichText onChange={(content: any) => form.setFieldsValue({ description: content })} />
        </Form.Item>
      </S.ProductSectionWrapper>
      <S.ProductSectionWrapper>
        <div className="title">SEO</div>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="meta_title" label={t("admin_shop.categories.meta_title")} rules={[{ min: 6 }]}>
              <Input showCount />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="meta_keywords" label={t("admin_shop.categories.meta_keyword")}>
              <SelectOrCreate
                isMultiple
                onSelected={(value: any) => {
                  form.setFieldsValue({ meta_keywords: value });
                }}
                placeholder={t("admin_shop.categories.meta_keyword")}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name="meta_description" label={t("admin_shop.categories.meta_desc")} rules={[{ min: 6 }]}>
              <Input.TextArea showCount rows={5} />
            </Form.Item>
          </Col>
        </Row>
      </S.ProductSectionWrapper>
    </>
  );
};

export default ProductDescription;
