import { ArrowLeftOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { AdminBreadcrumb } from "@app/app/components/common/Breadcrumb/Breadcrumb";
import { useCreateSupplierMutation } from "@app/store/slices/api/supplierApi";
import { handleApiError, isEntityError, notifySuccess } from "@app/utils/helper";
import { Button, Col, Form, Input, Image, Typography } from "antd";
import Upload, { RcFile, UploadProps } from "antd/es/upload";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import SelectAddress from "./components/SelectAddress";
import * as S from "./Supplier.styles";

const acceptedAvatar = ["image/png", "image/jpg", "image/jpeg", "image/gif", "image/svg", "image/webp"];

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const CreateSupplier = () => {
  const { t } = useTranslation();

  const [createSupplier, { error, isLoading }] = useCreateSupplierMutation();
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  const handleSubmit = async (FormValues: any) => {
    const { name, email, phone, address, code, website, avatar, city, district, ward } = FormValues;
    const formData = new FormData();
    const addressDetail = `${address}, ${ward}, ${district}, ${city}`;
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", addressDetail);
    formData.append("code", code);
    formData.append("website", website ? website : "");
    formData.append("avatar", avatar.fileList[0].originFileObj);
    try {
      await createSupplier(formData).unwrap();
      notifySuccess("Successfully", "Create supplier successfully");
      form.resetFields();
      setImageUrl("");
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

  const props: UploadProps = {
    className: "rounded-none",
    listType: "picture-card",
    accept: acceptedAvatar.join(","),
    showUploadList: false,
    beforeUpload: () => {
      return false;
    },
    onChange: (info: any) => {
      getBase64(info.file, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
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
              <S.FormField
                name="avatar"
                colon={false}
                valuePropName="file"
                rules={[{ required: true }]}
                validateStatus={errorForm?.avatar && "error"}
                help={errorForm?.avatar && errorForm?.avatar}
                label={t("admin_shop.suppliers.label_avatar")}
              >
                <Upload {...props}>
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt="avatar"
                      width={100}
                      height={100}
                      preview={{
                        visible: false,
                        mask: t("admin_shop.suppliers.preview_avatar"),
                      }}
                      className="img object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center">
                      {loading ? <LoadingOutlined /> : <PlusOutlined />}
                      <span className="mt-2">Upload</span>
                    </div>
                  )}
                </Upload>
              </S.FormField>
            </Col>
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
