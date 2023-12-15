import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import SelectOrCreate from "@app/app/components/common/Select/SelectOrCreate";
import { useAppSelector } from "@app/store/store";
import { Button, Col, Form, Input, InputNumber, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface IOptionPrice {
  form: any;
  isVariant: boolean;
  setIsVariant: (value: boolean) => void;
  setCurrentVariantValues: (value: any) => void;
}

const ProductOptionPrice: React.FC<IOptionPrice> = ({ form, isVariant, setIsVariant, setCurrentVariantValues }) => {
  const { t } = useTranslation();

  const [dynamicFormName, setDynamicFormName] = useState<string[]>([]);
  const [currentVariants, setCurrentVariants] = useState<{ [key: string]: string }>({});

  const errorForm = useAppSelector((state) => state.productAdmin.errorForm);

  const maxDynamicForms = 2;

  const handleAddVariant = () => {
    const nextField = dynamicFormName.length + 1;
    setDynamicFormName([...dynamicFormName, `variant-${nextField}`]);

    if (!isVariant && dynamicFormName.length < maxDynamicForms) {
      setIsVariant(true);
      form.resetFields(["price", "product_code"]);
    } else if (dynamicFormName.length < maxDynamicForms) {
      form.resetFields([`variant-${nextField}`, `product_code_${nextField}`]);
    }
  };

  const handleDeleteAllVariant = () => {
    setDynamicFormName([]);
    setCurrentVariants({});
    setIsVariant(false);
  };

  const handleGetCurrentVariantValue = (content: any, field: any) => {
    form.setFieldsValue({
      [`product_code_${field}`]: content,
    });
    setCurrentVariantValues((prevValues: any) => ({ ...prevValues, [field]: content }));
  };

  const handleDeleteVariant = (field: string) => {
    const fieldNumber = Number(field.split("-")[1]);
    setDynamicFormName(dynamicFormName.filter((f) => f !== field));
    setCurrentVariants((prevVariants) => {
      const { ...restVariants } = prevVariants;
      return restVariants;
    });

    const fieldNamesToReset = [`variant-${fieldNumber}`, `product_code_${fieldNumber}`];
    form.resetFields(fieldNamesToReset);
  };

  const handleSelectedVariant = (field: string, value: string) => {
    setCurrentVariants((prevVariants) => ({ ...prevVariants, [field]: value }));
  };

  useEffect(() => {
    if (dynamicFormName.length === 0) {
      setIsVariant(false);
    }
  }, [dynamicFormName.length, setIsVariant]);

  const renderVariantFields = () => {
    return dynamicFormName.map((field: string, index: number) => (
      <React.Fragment key={field}>
        <Col span={11}>
          <Form.Item
            hasFeedback
            label={t("admin_shop.product.create.option.label.variant", { count: index + 1 })}
            name={field}
            colon={false}
            rules={[{ required: true, message: t("admin_shop.product.create.option.rules.variant_required") }]}
          >
            <Input
              type="text"
              placeholder="Enter variant"
              onChange={(e) => handleSelectedVariant(field, e.target.value)}
            />
          </Form.Item>
        </Col>
        <Col span={11}>
          {currentVariants[field] && (
            <Form.Item
              hasFeedback
              label={t("admin_shop.product.create.option.label.variant_for", { name: currentVariants[field] })}
              name={`product_code_${field}`}
              colon={false}
            >
              <SelectOrCreate
                isMultiple
                placeholder={t("admin_shop.product.create.option.placeholder.variant_for", {
                  name: currentVariants[field],
                })}
                onSelected={(content: any) => handleGetCurrentVariantValue(content, field)}
              />
            </Form.Item>
          )}
        </Col>
        <Col span={2} className="text-right">
          <DeleteOutlined className="text-red-500 text-lg" onClick={() => handleDeleteVariant(field)} />
        </Col>
      </React.Fragment>
    ));
  };

  const isAddButtonDisabled = dynamicFormName.length < maxDynamicForms;

  return (
    <>
      {isVariant && (
        <Col className="text-right">
          <Button type="link" danger onClick={() => handleDeleteAllVariant()}>
            <DeleteOutlined />
            {t("admin_shop.product.create.option.label.delete_all")}
          </Button>
        </Col>
      )}
      <Row gutter={16} align="middle">
        {isVariant ? (
          renderVariantFields()
        ) : (
          <>
            <Col xs={24} md={12}>
              <Form.Item
                hasFeedback
                label={t("admin_shop.product.create.option.label.selling_price")}
                name="price"
                colon={false}
                rules={[{ required: true, message: t("admin_shop.product.create.option.rules.selling_price") }]}
                validateStatus={errorForm?.regular_price && "error"}
                help={errorForm?.regular_price && errorForm?.regular_price[0]}
              >
                <InputNumber
                  className="block"
                  formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  parser={(value) => value?.replace(/\$\s?|(\.*)/g, "").replace(/\./g, "")}
                  addonAfter="đ"
                  min={0}
                  placeholder={t("admin_shop.product.create.option.placeholder.selling_price")}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                hasFeedback
                label={t("admin_shop.product.create.option.label.sale_price")}
                name="sale_price"
                colon={false}
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("price") > value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Giá giảm phải nhỏ hơn giá bán"));
                    },
                  }),
                ]}
                validateStatus={errorForm?.sale_price && "error"}
                help={errorForm?.sale_price && errorForm?.sale_price[0]}
              >
                <InputNumber
                  className="block"
                  formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  parser={(value) => value?.replace(/\$\s?|(\.*)/g, "").replace(/\./g, "")}
                  addonAfter="đ"
                  min={0}
                  placeholder={t("admin_shop.product.create.option.placeholder.sale_price")}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                hasFeedback
                label={t("admin_shop.product.create.option.label.quantity")}
                name="stock"
                colon={false}
                validateStatus={errorForm?.stock && "error"}
                help={errorForm?.stock && errorForm?.stock[0]}
              >
                <InputNumber
                  min={0}
                  className="w-full"
                  placeholder={t("admin_shop.product.create.option.placeholder.quantity")}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                hasFeedback
                label={t("admin_shop.product.create.option.label.product_code")}
                name="product_code"
                colon={false}
                rules={[{ required: true, message: t("admin_shop.product.create.option.rules.product_code") }]}
                validateStatus={errorForm?.sku && "error"}
                help={errorForm?.sku && errorForm?.sku[0]}
              >
                <Input type="text" placeholder={t("admin_shop.product.create.option.placeholder.product_code")} />
              </Form.Item>
            </Col>
          </>
        )}
        {isAddButtonDisabled && (
          <Col span={24}>
            <Button onClick={handleAddVariant} className="variant-btn justify-center" type="dashed" size="large" block>
              <PlusOutlined />
              {t("admin_shop.product.create.option.label.add_variant")}
            </Button>
          </Col>
        )}
      </Row>
    </>
  );
};

export default ProductOptionPrice;
