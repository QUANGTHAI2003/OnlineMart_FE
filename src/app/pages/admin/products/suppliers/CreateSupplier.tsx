import { ArrowLeftOutlined } from "@ant-design/icons";
import { AdminBreadcrumb } from "@app/app/components/common/Breadcrumb/Breadcrumb";
import { useCreateSupplierMutation } from "@app/store/slices/api/supplierApi";
import { handleApiError, isEntityError, notifySuccess } from "@app/utils/helper";
import { Button, Col, Form, Input, Typography } from "antd";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import SelectAddress from "./components/SelectAddress";
import * as S from "./Supplier.styles";

const CreateSupplier = () => {
  const { t } = useTranslation();

  const [createSupplier, { error, isLoading }] = useCreateSupplierMutation();
  const [form] = Form.useForm();
  const handleSubmit = async (FormValues: any) => {
    const { name, email, phone, address, code, website, city, district, ward } = FormValues;
    const addressDetail = `${address}, ${ward}, ${district}, ${city}`;

    const values = {
      name: name,
      email: email,
      phone: phone,
      address: addressDetail,
      code: code,
      website: website ? website : "",
    };

    try {
      await createSupplier(values).unwrap();
      notifySuccess("Successfully", "Create supplier successfully");
      form.resetFields();
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

  const validateMessages = {
    required: "${label} " + t("admin_shop.suppliers.err_null"),
    types: {
      email: "${label} " + t("admin_shop.suppliers.err_pattern"),
    },
    pattern: {
      mismatch: "${label} " + t("admin_shop.suppliers.err_pattern"),
    },
    string: {
      min: "${label} " + t("admin_shop.suppliers.err_min", { min: "${min}" }),
    },
  };

  return (
    <div>
      <main className="p-5 bg-white">
        <AdminBreadcrumb />
        <section className="flex items-center gap-x-2">
          <Link to="/admin/shop/suppliers">
            <ArrowLeftOutlined className="text-lg text-black" />
          </Link>
          <Typography.Title className="mb-0" level={3}>
            {t("admin_shop.suppliers.title")}
          </Typography.Title>
        </section>
      </main>
      <div className="p-5 bg-[#f5f5f5]">
        <Form
          className="md:text-sm sm:text-xs p-5 bg-white rounded-sm"
          form={form}
          autoComplete="off"
          onFinish={handleSubmit}
          validateMessages={validateMessages}
        >
          <S.Field gutter={16} justify="space-between">
            <Col span="12">
              <S.FormField
                name="name"
                hasFeedback
                colon={false}
                label={t("admin_shop.suppliers.label_name")}
                rules={[{ required: true }, { whitespace: true }, { min: 6 }]}
                validateStatus={errorForm?.name && "error"}
                help={errorForm?.name?.[0]}
              >
                <Input placeholder={t("admin_shop.suppliers.input_pla")} />
              </S.FormField>
              <S.FormField
                name="code"
                hasFeedback
                colon={false}
                label={t("admin_shop.suppliers.label_supplier_code")}
                rules={[{ required: true }]}
                validateStatus={errorForm?.code && "error"}
                help={errorForm?.code?.[0]}
              >
                <Input placeholder={t("admin_shop.suppliers.input_pla")} />
              </S.FormField>
            </Col>
            <Col span="12">
              <S.FormField
                name="email"
                hasFeedback
                colon={false}
                label={t("admin_shop.suppliers.label_email")}
                rules={[{ required: true }, { type: "email" }]}
                validateStatus={errorForm?.email && "error"}
                help={errorForm?.email?.[0]}
              >
                <Input type="email" />
              </S.FormField>
              <S.FormField
                name="phone"
                hasFeedback
                colon={false}
                label={t("admin_shop.suppliers.label_phone")}
                rules={[{ required: true }, { pattern: /(0[3|5|7|8|9])+([0-9]{8})\b/g }]}
                validateStatus={errorForm?.phone && "error"}
                help={errorForm?.phone?.[0]}
              >
                <Input placeholder={t("admin_shop.suppliers.input_pla")} />
              </S.FormField>
            </Col>
            <SelectAddress onAddressChange={(value) => form.setFieldsValue({ full_address: value })} />
            <Col span={12}>
              <S.Field>
                <S.FormField
                  name="website"
                  hasFeedback
                  colon={false}
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
                  <Input />
                </S.FormField>
              </S.Field>
            </Col>
          </S.Field>
          <S.Field justify="end">
            <Button size="large" type="primary" htmlType="submit" loading={isLoading}>
              {t("admin_shop.suppliers.btn_add")}
            </Button>
          </S.Field>
        </Form>
      </div>
    </div>
  );
};
export default CreateSupplier;
