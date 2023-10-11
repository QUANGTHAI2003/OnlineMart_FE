import SelectAddress from "@app/app/components/clients/SelectAddress/SelectAddress";
import { useGetSupplierOnlyQuery, useUpdateSupplierMutation } from "@app/store/slices/api/supplierApi";
import { Button, Col, Form, Input } from "antd";
import { useTranslation } from "react-i18next";

import { isEntityError, notifyError, notifySuccess } from "@app/utils/helper";
import { useEffect, useMemo } from "react";
import * as S from "./Supplier.styles";

type FieldType = {
  name: string;
  email?: string;
  phone?: number;
  address?: string;
  code?: string;
  website?: string;
};

const EditSupplier = ({ id, onCancel }: any) => {
  const { t } = useTranslation();
  const { data } = useGetSupplierOnlyQuery(id);
  const [updateSupplier, { error, isLoading }] = useUpdateSupplierMutation();
  const [form] = Form.useForm();
  const handleSubmit = async (fieldValues: FieldType) => {
    const values = {
      ...fieldValues,
      id,
    };

    try {
      await updateSupplier(values).unwrap();
      notifySuccess("Successfully", "Update supplier successfully");
    } catch (err) {
      notifyError("Error", "Update supplier failed");
    }
    onCancel();
  };
  const errorForm: any = useMemo(() => {
    const errorResult = error;

    if (isEntityError(errorResult)) {
      return errorResult;
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
  };

  useEffect(() => {
    form.setFieldsValue({
      name: data?.name,
      code: data?.code,
      email: data?.email,
      phone: data?.phone,
      address: data?.address,
      website: data?.website,
    });
  }, [data, form]);

  return (
    <div>
      <Form
        className="md:text-sm sm:text-xs"
        form={form}
        autoComplete="off"
        onFinish={handleSubmit}
        validateMessages={validateMessages}
      >
        <S.Field gutter={16} justify="space-between">
          <Col span="8">
            <S.FormField
              name="name"
              hasFeedback
              label={t("admin_shop.suppliers.label_name")}
              rules={[{ required: true }, { whitespace: true }, { min: 6 }]}
              validateStatus={errorForm?.name && "error"}
              help={errorForm?.name?.[0]}
            >
              <Input placeholder="Nhập vào" />
            </S.FormField>
            <S.FormField
              name="code"
              hasFeedback
              label={t("admin_shop.suppliers.label_supplier_code")}
              rules={[{ required: true }]}
              validateStatus={errorForm?.code && "error"}
              help={errorForm?.code?.[0]}
            >
              <Input placeholder="Nhập vào" />
            </S.FormField>
            <S.FormField
              name="phone"
              hasFeedback
              label={t("admin_shop.suppliers.label_phone")}
              rules={[{ required: true }, { pattern: /(0[3|5|7|8|9])+([0-9]{8})\b/g }]}
              validateStatus={errorForm?.phone && "error"}
              help={errorForm?.phone?.[0]}
            >
              <Input placeholder="Nhập vào" />
            </S.FormField>
          </Col>
          <Col span="8">
            <S.FormField
              name="email"
              hasFeedback
              label={t("admin_shop.suppliers.label_email")}
              rules={[{ required: true }, { type: "email" }]}
              validateStatus={errorForm?.email && "error"}
              help={errorForm?.email?.[0]}
            >
              <Input type="email" />
            </S.FormField>
            <S.Field>
              <S.FormField
                name="address"
                label={t("admin_shop.suppliers.label_address")}
                className="w-full"
                hasFeedback
                rules={[{ required: true }, { whitespace: true }, { min: 6 }]}
                validateStatus={errorForm?.address && "error"}
                help={errorForm?.address?.[0]}
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
                <Input />
              </S.FormField>
            </S.Field>
          </Col>
          <S.AddressField span="8">
            <S.FormField
              name="full_address"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: t("admin_shop.suppliers.area"),
                },
              ]}
            >
              <SelectAddress onAddressChange={(value) => form.setFieldsValue({ full_address: value })} />
            </S.FormField>
          </S.AddressField>
        </S.Field>
        <S.Field justify="end">
          <Button size="large" type="primary" htmlType="submit" loading={isLoading}>
            {t("admin_shop.suppliers.btn_update")}
          </Button>
        </S.Field>
      </Form>
    </div>
  );
};

export default EditSupplier;
