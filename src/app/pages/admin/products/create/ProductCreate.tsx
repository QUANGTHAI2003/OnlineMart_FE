import { ArrowLeftOutlined } from "@ant-design/icons";
import { AdminBreadcrumb } from "@app/app/components/common/Breadcrumb/Breadcrumb";
import { useResponsive } from "@app/hooks";
import { Badge, Button, Card, Col, Collapse, Form, message, Row, Steps, Typography } from "antd";
import { FormInstance } from "antd/lib/form";
import { TFunction } from "i18next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { ProductDescription, ProductGeneral, ProductOptions } from "./components";
import * as S from "./ProductCreate.styles";

const collapseData = (t: TFunction<"translation", undefined>, form: FormInstance) => {
  const items = [
    {
      key: "1",
      label: <b>{t("admin_shop.product.create.basic_info")}</b>,
      children: <ProductGeneral form={form} />,
    },
    {
      key: "2",
      label: <b>{t("admin_shop.product.create.product_desc")}</b>,
      children: <ProductDescription form={form} />,
    },
    {
      key: "3",
      label: <b>{t("admin_shop.product.create.option_operaton")}</b>,
      children: <ProductOptions form={form} />,
    },
  ];

  return items;
};

const ProductCreate = () => {
  const { t } = useTranslation();
  const { isSmallDesktop } = useResponsive();
  const [form] = Form.useForm();

  const [expandCollapse, setExpandCollapse] = useState(false);
  const [activeCollapse, setActiveCollapse] = useState<string[]>([]);
  const [current, setCurrent] = useState<number>(0);

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

  const handleSubmit = async (data: any) => {
    const isNormal = !!data.price;

    const basis_info = {
      name: data.name,
      category: data.category?.selectedValue,
      brand: data.brand,
      origin: data.origin,
    };

    const product_desc = {
      video: data.video,
      description: data.description,
    };

    const option_operation_normal = {
      price: data.price,
      product_code: data.product_code,
    };

    const option_operation_variants: { [key: string]: string[] } = {
      variants: [],
      product_code_variants: [],
      inventory_quantity: [],
      selling_price: [],
      product_code: [],
    };

    for (const key in data) {
      if (key.startsWith("variant-")) {
        option_operation_variants.variants.push(data[key]);
      } else if (key.startsWith("product_code_variant-")) {
        option_operation_variants.product_code_variants.push(data[key]);
      } else if (key.startsWith("inventory_quantity-")) {
        option_operation_variants.inventory_quantity.push(data[key] || data.inventory_quantity || 0);
      } else if (key.startsWith("selling_price-")) {
        option_operation_variants.selling_price.push(data[key] || data.selling_price);
      } else if (key.startsWith("product_code-")) {
        option_operation_variants.product_code.push(data[key] || data.product_code || uuidv4());
      }
    }

    const product = {
      basis_info,
      product_desc,
      option_operation: isNormal ? option_operation_normal : option_operation_variants,
      operation: data.operation,
      dimemsion: {
        weight: data.weight,
        length: data.length,
        width: data.width,
        height: data.height,
      },
      status: data.status,
    };

    console.log(product);
  };

  const handleSubmitFailed = () => {
    message.error("Please complete the required information");
  };

  return (
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
          form={form}
          scrollToFirstError
          layout="vertical"
          onFinish={handleSubmit}
          onFinishFailed={handleSubmitFailed}
          autoComplete="off"
          initialValues={{ variants: [], operation: "" }}
          className="form-with-bold-label"
        >
          <Row gutter={16}>
            <Col xs={{ span: 21, order: 1 }} lg={{ span: 17, order: 0 }} xl={{ span: 18, order: 0 }}>
              <S.ProductCollapsed>
                <Collapse
                  accordion
                  items={collapseData(t, form)}
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
                        type="primary"
                        htmlType="submit"
                        ghost
                        onClick={() => form.setFieldsValue({ status: "draft" })}
                      >
                        {t("admin_shop.product.create.save_draft")}
                      </Button>
                    </Form.Item>
                    <Form.Item name="status">
                      <Button type="primary" htmlType="submit" onClick={() => form.setFieldsValue({ status: "off" })}>
                        {t("admin_shop.product.create.save_off")}
                      </Button>
                    </Form.Item>
                  </>
                )}

                <Form.Item name="status">
                  <Button type="primary" htmlType="submit" onClick={() => form.setFieldsValue({ status: "on" })}>
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
                      {expandCollapse ? t("admin_shop.product.create.collapse") : t("admin_shop.product.create.expand")}
                    </button>
                  </div>
                  <StepComponent t={t} form={form} current={current} onChange={onChange} />
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
  );
};

export default ProductCreate;

const StepComponent = ({ t, form, current, onChange }: any) => {
  const [errorCounts, setErrorCounts] = useState({
    basis: 0,
    desc: 0,
    option: 0,
  });

  useEffect(() => {
    const getFieldsError = (fields: string[]) => form.getFieldsError(fields);

    const basisCount = getFieldsError(["name", "category", "brand", "origin"]).filter(
      (error: any) => error.errors.length > 0
    ).length;

    const descCount = getFieldsError(["video", "description"]).filter((error: any) => error.errors.length > 0).length;
    const optionCount = getFieldsError([
      "price",
      "product_code",
      "operation",
      "weight",
      "length_width_height",
      "length",
      "height",
      "width",
      "product_image",
      "gallery_images",
    ]).filter((error: any) => error.errors.length > 0).length;

    setErrorCounts((prevCounts) => ({
      ...prevCounts,
      basis: basisCount,
      desc: descCount,
      option: optionCount,
    }));
  }, [form]);

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
