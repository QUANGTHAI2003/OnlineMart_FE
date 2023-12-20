import { ArrowLeftOutlined } from "@ant-design/icons";
import { AdminBreadcrumb } from "@app/app/components/common/Breadcrumb/Breadcrumb";
import { useResponsive } from "@app/hooks";
import { useAddProductMutation } from "@app/store/slices/api/admin/productApi";
import { setFormError } from "@app/store/slices/redux/admin/productAdminSlice";
import { useAppDispatch, useAppSelector } from "@app/store/store";
import { handleApiError, isEntityError, notifySuccess } from "@app/utils/helper";
import { Badge, Button, Card, Col, Collapse, Form, message, Row, Spin, Steps, Typography } from "antd";
import { FormInstance } from "antd/lib/form";
import { TFunction } from "i18next";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import { ProductDescription, ProductGeneral, ProductOptions } from "./components";
import * as S from "./ProductCreate.styles";

interface IInputData {
  [key: string]: number | string;
}

interface ITransformedRecord {
  [key: string]: number | string;
}

const collapseData = (t: TFunction<"translation", undefined>, form: FormInstance, errorForm: any) => {
  const items = [
    {
      key: "1",
      label: <b>{t("admin_shop.product.create.basic_info")}</b>,
      children: <ProductGeneral errorForm={errorForm} />,
      forceRender: true,
    },
    {
      key: "2",
      label: <b>{t("admin_shop.product.create.product_desc")}</b>,
      children: <ProductDescription form={form} errorForm={errorForm} />,
      forceRender: true,
    },
    {
      key: "3",
      label: <b>{t("admin_shop.product.create.option_operaton")}</b>,
      children: <ProductOptions form={form} errorForm={errorForm} />,
      forceRender: true,
    },
  ];

  return items;
};

const ProductCreate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isSmallDesktop } = useResponsive();
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  const [expandCollapse, setExpandCollapse] = useState(false);
  const [activeCollapse, setActiveCollapse] = useState<string[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [fieldValue, setFieldValue] = useState<any>({});

  const shopId = useAppSelector((state) => state.userState.user)?.shop?.id;

  const [addProduct, { isLoading, error }] = useAddProductMutation();

  const handleExpandCollapse = () => {
    setExpandCollapse(!expandCollapse);
  };

  const onChange = (value: number) => {
    const panelKey = (value + 1).toString();

    setActiveCollapse([panelKey]);
    setCurrent(value);
  };

  const handleChangeCollapse = (key: string | string[]) => {
    if (key?.length > 0) {
      setActiveCollapse(Array.isArray(key) ? key : [key]);
      setCurrent(parseInt(key[0]) - 1);
    } else {
      setActiveCollapse([]);
      setCurrent(0);
    }
  };

  const createProductVariants = (data: Record<string, any>, compare: any): any => {
    const variants: any = [];
    const variantData: Record<string, string[]> = {};

    for (const key in data) {
      if (key.startsWith("variant-")) {
        const variantKey = key.replace("variant-", "");
        variantData[variantKey] = [data[key]];
      } else if (key.startsWith("product_code_variant-")) {
        const variantKey = key.replace("product_code_variant-", "");
        if (variantData[variantKey]) {
          variantData[variantKey].push(data[key]);
        }
      }
    }

    for (const key in variantData) {
      variants.push({ variant: variantData[key] });
    }

    const variantFormated: Record<string, any> = {};

    for (const variant in variants) {
      const variantName = variants[variant].variant[0];
      const variantValues = variants[variant].variant[1];
      const variantValuesObject: Record<string, any> = {};

      for (let i = 0; i < variantValues.length; i++) {
        variantValuesObject[variantValues[i]] = null;
      }

      variantFormated[variantName] = {
        variant_name: variantName,
        variant_values: variantValuesObject,
      };
    }

    for (const [key, value] of Object.entries(compare)) {
      for (const variantName in variantFormated) {
        const variantValues: Record<string, any> = variantFormated[variantName].variant_values;

        if (key in variantValues) {
          variantValues[key] = value;
        }
      }
    }

    return variantFormated;
  };

  const transformData = (inputData: IInputData): ITransformedRecord[] => {
    const transformedData: ITransformedRecord[] = [];

    for (const key in inputData) {
      const matches = key.match(/\[(\d+)\]\.(.+)/);
      if (matches) {
        const [, offerIndex, field] = matches;
        const existingOffer = transformedData[parseInt(offerIndex, 10)] || {};

        transformedData[parseInt(offerIndex, 10)] = {
          ...existingOffer,
          [field]: inputData[key],
        };
      }
    }

    return transformedData;
  };

  const handleSubmit = async (data: any) => {
    const offerArray = Object.entries(data).filter(([key]) => key.startsWith("offer"));
    const inputData: IInputData = {};

    offerArray.forEach(([key, value]) => {
      const matches = key.match(/offer\[(\d+)\]\.(quantity|product_code|selling_price|sale_price)/);
      if (matches) {
        const [, offerIndex, field] = matches;
        inputData[`offer[${offerIndex}].${field}`] = value as number | string;
      }
    });

    const transformedData = transformData(inputData);
    const variant_name: any[] = [];
    for (const key in data) {
      if (key.startsWith("product_code_variant-")) {
        variant_name.push(...data[key]);
      }
    }

    const newtransformedData: any = {};

    variant_name.forEach((variantName, index) => {
      newtransformedData[variantName] = transformedData[index];
    });

    const isNormal = !!data.price;

    const basis_info = {
      name: data.name,
      category_id: data.category_id,
      supplier_id: data.supplier_id,
      origin: data.origin,
    };

    const product_desc = {
      video: data.video,
      description: data.description,
    };

    const option_operation_normal: any = {
      price: data.price,
      sale_price: data.sale_price,
      stock: data.stock,
      product_code: data.product_code,
    };

    const option_operation_variants: any = {
      variants: createProductVariants(data, newtransformedData),
    };

    const seo_meta: any = {
      meta_title: data.meta_title,
      meta_keywords: data.meta_keywords,
      meta_description: data.meta_description,
    };

    const product = {
      basis_info,
      product_desc,
      option_operation: isNormal ? option_operation_normal : option_operation_variants,
      product_image: data.product_image,
      gallery_images: data.gallery_images,
      status: data.status,
      seo_meta,
    };

    try {
      const galleryArray = Object.values(product.gallery_images || []) as any[];

      const formData = new FormData();
      formData.append("type", isNormal ? "normal" : "variant");
      formData.append("shop_id", shopId);
      formData.append("name", product.basis_info.name);
      formData.append("category_id", product.basis_info.category_id.at(-1));
      formData.append("supplier_id", product.basis_info.supplier_id);
      formData.append("origin", product.basis_info.origin);
      formData.append("description", product.product_desc.description || "");
      formData.append("status", product.status);
      formData.append("thumbnail_url", product.product_image);
      formData.append("meta_title", product.seo_meta.meta_title || "");
      formData.append("meta_description", product.seo_meta.meta_description || "");

      if (product?.seo_meta?.meta_keywords?.length > 0) {
        formData.append("meta_keywords", product.seo_meta.meta_keywords.join(","));
      }

      if (galleryArray.length > 0) {
        if (!galleryArray[0]?.originFileObj) {
          galleryArray[1].forEach((file: any, index: number) => {
            formData.append(`gallery[${index}]`, file?.originFileObj);
          });
        } else {
          galleryArray.forEach((file: any, index: number) => {
            formData.append(`gallery[${index}]`, file?.originFileObj);
          });
        }
      }

      if (isNormal) {
        formData.append("regular_price", product.option_operation.price);
        formData.append("sale_price", product.option_operation.sale_price);
        formData.append("stock_qty", product.option_operation.stock);
        formData.append("sku", product.option_operation.product_code);
      } else {
        formData.append("variants", JSON.stringify(product.option_operation.variants));
      }

      await addProduct(formData).unwrap();
      notifySuccess("Added product", "Successfully");

      form.resetFields();

      isLoading || navigate("/admin/shop/products");
    } catch (err: any) {
      handleApiError(err);
    }
  };

  const errorForm: any = useMemo(() => {
    const errorResult = error;

    if (isEntityError(errorResult)) {
      return errorResult.data.errors;
    }

    return null;
  }, [error]);

  useEffect(() => {
    dispatch(setFormError(errorForm));
  }, [dispatch, errorForm]);

  const handleSubmitFailed = () => {
    message.error("Please complete the required information");
  };

  const handleValuesChange = (_: any, allValues: any) => {
    setFieldValue(allValues);
  };

  return (
    <Spin spinning={isLoading} size="large">
      <S.ProductCreateStyle>
        <header className="bg-white p-6">
          <AdminBreadcrumb />
          <section className="flex items-center gap-x-2">
            <Link to="/admin/shop/products">
              <ArrowLeftOutlined className="text-lg text-black" />
            </Link>
            <Typography.Title className="mb-0" level={3}>
              {t("admin_shop.sidebar.product_create")}
            </Typography.Title>
          </section>
        </header>
        <S.CreatePlaceStyle>
          <Form
            onFieldsChange={handleValuesChange}
            onValuesChange={handleValuesChange}
            form={form}
            scrollToFirstError
            layout="vertical"
            onFinish={handleSubmit}
            onFinishFailed={handleSubmitFailed}
            autoComplete="off"
            initialValues={{ sale_price: 0, stock: 0 }}
            className="form-with-bold-label"
          >
            <Row gutter={16}>
              <Col xs={{ span: 21, order: 1 }} lg={{ span: 17, order: 0 }} xl={{ span: 18, order: 0 }}>
                <S.ProductCollapsed>
                  <Collapse
                    accordion
                    items={collapseData(t, form, errorForm)}
                    defaultActiveKey={["1"]}
                    activeKey={activeCollapse.length > 0 ? activeCollapse : undefined}
                    onChange={handleChangeCollapse}
                    expandIconPosition="end"
                  />
                </S.ProductCollapsed>
                <S.FeatureButtonStyle>
                  <Link to="/admin/shop/products">
                    <Button>{t("admin_shop.product.create.cancel")}</Button>
                  </Link>
                  {isSmallDesktop && (
                    <>
                      <Form.Item name="status">
                        <Button
                          loading={isLoading}
                          type="primary"
                          htmlType="submit"
                          ghost
                          onClick={() => form.setFieldsValue({ status: "draft" })}
                        >
                          {t("admin_shop.product.create.save_draft")}
                        </Button>
                      </Form.Item>
                      <Form.Item name="status">
                        <Button
                          loading={isLoading}
                          type="primary"
                          htmlType="submit"
                          onClick={() => form.setFieldsValue({ status: "off" })}
                        >
                          {t("admin_shop.product.create.save_off")}
                        </Button>
                      </Form.Item>
                    </>
                  )}

                  <Form.Item name="status">
                    <Button
                      loading={isLoading}
                      type="primary"
                      htmlType="submit"
                      onClick={() => form.setFieldsValue({ status: "selling" })}
                    >
                      {t("admin_shop.product.create.save_on")}
                    </Button>
                  </Form.Item>
                </S.FeatureButtonStyle>
              </Col>
              <Col xs={{ span: 3, order: 0 }} lg={{ span: 7, order: 1 }} xl={{ span: 6, order: 1 }}>
                {isSmallDesktop ? (
                  <Card>
                    <div className="mb-3">
                      <button className="expand-collapse" onClick={handleExpandCollapse}>
                        {expandCollapse
                          ? t("admin_shop.product.create.collapse")
                          : t("admin_shop.product.create.expand")}
                      </button>
                    </div>
                    <StepComponent t={t} form={form} current={current} onChange={onChange} fieldValue={fieldValue} />
                  </Card>
                ) : (
                  <Steps
                    direction="vertical"
                    current={current}
                    onChange={onChange}
                    items={[
                      { title: "" },
                      { title: t("admin_shop.product.create.product_desc") },
                      { title: t("admin_shop.product.create.option_operaton") },
                    ]}
                  />
                )}
              </Col>
            </Row>
          </Form>
        </S.CreatePlaceStyle>
      </S.ProductCreateStyle>
    </Spin>
  );
};

export default ProductCreate;

const StepComponent = ({ t, form, current, onChange, fieldValue }: any) => {
  const [errorCounts, setErrorCounts] = useState({
    basis: 0,
    desc: 0,
    option: 0,
  });

  useEffect(() => {
    const getFieldsError = (fields: string[]) => form.getFieldsError(fields);

    const basisCount = getFieldsError(["name", "category_id", "supplier_id", "origin"]).filter(
      (error: any) => error.errors.length > 0
    ).length;

    const descCount = getFieldsError(["video", "description"]).filter((error: any) => error.errors.length > 0).length;
    const optionCount = getFieldsError(["price", "sale_price", "product_code", "stock", "product_image"]).filter(
      (error: any) => error.errors.length > 0
    ).length;

    setErrorCounts((prevCounts) => ({
      ...prevCounts,
      basis: basisCount,
      desc: descCount,
      option: optionCount,
    }));
  }, [form, fieldValue]);

  const titleComponent = (title: any, count: any) => (
    <Row wrap={false} justify="space-between" align="middle">
      <Col>{title}</Col>
      <Col>
        <Badge count={count} />
      </Col>
    </Row>
  );

  const stepsConfig = [
    {
      title: titleComponent(t("admin_shop.product.create.basic_info"), errorCounts.basis),
    },
    {
      title: titleComponent(t("admin_shop.product.create.product_desc"), errorCounts.desc),
    },
    {
      title: titleComponent(t("admin_shop.product.create.option_operaton"), errorCounts.option),
    },
  ];

  return <Steps direction="vertical" size="small" current={current} onChange={onChange} items={stepsConfig} />;
};
