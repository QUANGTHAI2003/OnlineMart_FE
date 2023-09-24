import { InfoCircleOutlined } from "@ant-design/icons";
import AdminUpload from "@app/app/components/common/Upload/AdminUpload";
import { Col, Divider, Form, InputNumber, Row, Select } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "../ProductCreate.styles";

import { ProductOptionPrice, ProductTableVariants } from ".";

const ProductOptions = ({ form }: any) => {
  const { t } = useTranslation();

  const [isVariant, setIsVariant] = useState<boolean>(true);
  const [dynamicFormName, setDynamicFormName] = useState<string[]>([]);
  const [currentVariantValues, setCurrentVariantValues] = useState<any>({});

  return (
    <S.ProductOptionsStyle>
      <S.ProductVariantStyle>
        <ProductOptionPrice
          form={form}
          isVariant={isVariant}
          setIsVariant={setIsVariant}
          dynamicFormName={dynamicFormName}
          setDynamicFormName={setDynamicFormName}
          setCurrentVariantValues={setCurrentVariantValues}
        />
      </S.ProductVariantStyle>
      <S.ProductSectionWrapper>
        <div className="title">
          {isVariant
            ? t("admin_shop.product.create.option.label.variant_operation")
            : t("admin_shop.product.create.option.label.variant_operation")}
        </div>
        <Row>
          <Col xs={24} md={12}>
            <Form.Item
              hasFeedback
              label={t("admin_shop.product.create.option.label.operation_model")}
              name="operation"
              colon={false}
              rules={[
                { required: true, message: t("admin_shop.product.create.option.rules.operation_model_required") },
              ]}
            >
              <Select
                options={[
                  { value: "", label: "Select", disabled: true },
                  { value: "fpt", label: "FPT - Hàng lưu kho Tiki" },
                  { value: "dropship", label: "Dropship - Nhà bán tự đóng gói, Tiki giao hàng" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
        <div className="mt-3">
          <div className="mb-3">
            <InfoCircleOutlined className="note-icon" />
            <b className="underline">{t("admin_shop.product.create.option.label.note")}</b>
            {t("admin_shop.product.create.option.label.note_shipping")}
          </div>
          <Row gutter={16}>
            <Col xs={24} md={10}>
              <Form.Item
                hasFeedback
                label={t("admin_shop.product.create.option.label.weight")}
                name="weight"
                colon={false}
                rules={[{ required: true, message: t("admin_shop.product.create.option.rules.weight_required") }]}
              >
                <InputNumber
                  className="w-full"
                  addonBefore="kg"
                  placeholder={t("admin_shop.product.create.option.placeholder.selling_price")}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={14}>
              <Form.Item
                hasFeedback
                label={t("admin_shop.product.create.option.label.dimension")}
                name="length_width_height"
                colon={false}
                rules={[
                  ({ getFieldsValue }) => ({
                    validator() {
                      const { length, width, height } = getFieldsValue(["length", "width", "height"]);

                      if (length === undefined || width === undefined || height === undefined) {
                        return Promise.reject(
                          new Error(t("admin_shop.product.create.option.rules.dimension_required"))
                        );
                      }

                      if (length < 1 || width < 1 || height < 1) {
                        return Promise.reject(new Error(t("admin_shop.product.create.option.rules.dimension_value")));
                      }

                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Row gutter={[8, 8]} align="middle">
                  <Col>
                    <Form.Item name="length" noStyle>
                      <InputNumber
                        className="w-32"
                        placeholder={t("admin_shop.product.create.option.placeholder.length")}
                      />
                    </Form.Item>
                  </Col>
                  <Col>x</Col>
                  <Col>
                    <Form.Item name="width" noStyle>
                      <InputNumber
                        className="w-32"
                        placeholder={t("admin_shop.product.create.option.placeholder.width")}
                      />
                    </Form.Item>
                  </Col>
                  <Col>x</Col>
                  <Col>
                    <Form.Item name="height" noStyle>
                      <InputNumber
                        className="w-32"
                        placeholder={t("admin_shop.product.create.option.placeholder.height")}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
            </Col>
          </Row>
        </div>
        <Divider />
        {isVariant && <ProductTableVariants form={form} currentVariantValues={currentVariantValues} />}
      </S.ProductSectionWrapper>

      <S.ProductSectionWrapper>
        <div className="title">{t("admin_shop.product.create.option.label.images")}</div>
        <Form.Item
          label={t("admin_shop.product.create.option.label.product_image")}
          name="product_image"
          rules={[
            {
              required: true,
              message: t("admin_shop.product.create.option.rules.product_image_required"),
            },
          ]}
        >
          <AdminUpload
            uploadText={t("admin_shop.product.create.option.label.click_drag_upload")}
            uploadDesc={t("admin_shop.product.create.option.label.image_limit")}
          />
        </Form.Item>
        <Form.Item label={t("admin_shop.product.create.option.label.gallery_images")} name="gallery_images">
          <AdminUpload
            uploadText={t("admin_shop.product.create.option.label.click_drag_upload")}
            uploadDesc={t("admin_shop.product.create.option.label.image_limit")}
            isMultiple={true}
          />
        </Form.Item>
      </S.ProductSectionWrapper>
    </S.ProductOptionsStyle>
  );
};

export default ProductOptions;
