import RichText from "@app/app/components/common/Form/RichText";
import SelectOrCreate from "@app/app/components/common/Select/SelectOrCreate";
import { Col, Form, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "../ProductEdit.styles";

const ProductDescription = ({ form }: any) => {
  const { t } = useTranslation();
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    const description = form.getFieldValue("description");
    setDescription(description);
  }, [description, form, setDescription]);

  const handleGetValue = (e: any) => {
    return e;
  };

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
          getValueFromEvent={handleGetValue}
        >
          <RichText
            onChange={(content: any) => form.setFieldsValue({ description: content })}
            initValue={description}
          />
        </Form.Item>
      </S.ProductSectionWrapper>
      <S.ProductSectionWrapper>
        <div className="title">SEO</div>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="meta_title" label={t("admin_shop.categories.meta_title")} rules={[{ min: 6 }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="meta_keywords" label={t("admin_shop.categories.meta_keyword")}>
              <SelectOrCreate
                isMultiple
                initValue={form.getFieldValue("meta_keywords")}
                onSelected={(value: any) => {
                  form.setFieldsValue({ meta_keywords: value });
                }}
                placeholder={t("admin_shop.categories.meta_keyword")}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name="meta_description" label={t("admin_shop.categories.meta_desc")} rules={[{ min: 6 }]}>
              <Input.TextArea rows={3} />
            </Form.Item>
          </Col>
        </Row>
      </S.ProductSectionWrapper>
    </>
  );
};

export default ProductDescription;
