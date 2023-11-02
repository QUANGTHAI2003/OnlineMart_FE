import SelectAddress from "@app/app/components/clients/SelectAddress/SelectAddress";
import { useCreateSupplierMutation } from "@app/store/slices/api/supplierApi";
import { isEntityError, notifyError, notifySuccess } from "@app/utils/helper";
import { Button, Col, Form, Input } from "antd";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import * as S from "./Supplier.styles";

type FormValues = {
  name: string;
  email: string;
  phone: number;
  address: string;
  code: string;
  website: string;
  full_address: string;
};

type ErrorMessage = {
  [key: number]: string;
};

const CreateSupplier = ({ onCancel }: any) => {
  const { t } = useTranslation();
  const [createSupplier, { error, isLoading }] = useCreateSupplierMutation();
  const [form] = Form.useForm();
  const handleSubmit = async (data: FormValues) => {
    const name = data.name;
    const email = data.email;
    const phone = data.phone;
    const full_address = data.full_address;
    const address = data.address;
    const code = data.code;
    const website = data.website;
    const shop_id = 1;
    const value = {
      name,
      email,
      phone,
      address: address + ", " + full_address,
      code,
      website,
      shop_id,
    };
    try {
      await createSupplier(value).unwrap();
      notifySuccess("Successfully", "Create supplier successfully");
      form.resetFields();
    } catch (err: any) {
      const status = err.status || 500;
      const errorMessages: ErrorMessage = {
        400: "Bad Request",
        401: "Unauthorized",
        500: "Internal Server Error",
      };

      const errorMessage = errorMessages[status];
      notifyError("Register failed", errorMessage);
    }
    onCancel();
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
            {t("admin_shop.suppliers.btn_add")}
          </Button>
        </S.Field>
      </Form>
    </div>
  );
};
export default CreateSupplier;
