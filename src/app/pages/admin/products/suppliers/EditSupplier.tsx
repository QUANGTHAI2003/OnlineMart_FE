import { ArrowLeftOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { AdminBreadcrumb } from "@app/app/components/common/Breadcrumb/Breadcrumb";
import { useGetSupplierOnlyQuery, useUpdateSupplierMutation } from "@app/store/slices/api/supplierApi";
import { baseImageUrl, isEntityError, notifyError, notifySuccess } from "@app/utils/helper";
import { Button, Col, Form, Image, Input, Typography } from "antd";
import Upload, { RcFile, UploadProps } from "antd/es/upload";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

import SelectAddress from "./components/SelectAddress";
import * as S from "./Supplier.styles";

const acceptedAvatar = ["image/png", "image/jpg", "image/jpeg", "image/gif", "image/svg", "image/webp"];

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const EditSupplier = () => {
  const { t } = useTranslation();

  const { id } = useParams();

  const supplierId: number = parseInt(id || "0");
  const { data: supplierDetail } = useGetSupplierOnlyQuery(supplierId);
  const [updateSupplier, { error, isLoading }] = useUpdateSupplierMutation();

  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  const handleSubmit = async (fieldValues: any) => {
    const { name, email, phone, address, code, website, avatar, city, district, ward } = fieldValues;

    const formData = new FormData();
    const addressDetail = `${address}, ${ward}, ${district}, ${city}`;
    if (typeof avatar !== "string") {
      formData.append("avatar", avatar.fileList[0].originFileObj);
    }
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", addressDetail);
    formData.append("code", code);
    formData.append("website", website ? website : "");
    formData.append("_method", "PUT");

    try {
      await updateSupplier({ supplierId: supplierId, data: formData }).unwrap();
      notifySuccess("Successfully", "Update supplier successfully");
    } catch (err) {
      notifyError("Error", "Update supplier failed");
    }
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
      name: supplierDetail?.name,
      code: supplierDetail?.code,
      email: supplierDetail?.email,
      phone: supplierDetail?.phone,
      address: supplierDetail?.address,
      website: supplierDetail?.website,
      avatar: baseImageUrl + supplierDetail?.avatar,
    });
    if (supplierDetail?.address) {
      const parts = supplierDetail?.address.split(",").map((part) => part.trim());
      const [address, ward, district, city] = parts;
      form.setFieldsValue({
        city,
        district,
        ward,
        address,
      });
    }
  }, [supplierDetail, form]);

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
            {t("admin_shop.sidebar.supplier_edit")}
          </Typography.Title>
        </section>
      </main>
      <div className="p-5 bg-[#f5f5f5]">
        <Form
          className="md:text-sm sm:text-xs"
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
                <Input placeholder="Nhập vào" />
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
                <Input placeholder="Nhập vào" />
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
                <Input placeholder="Nhập vào" />
              </S.FormField>
            </Col>
            <SelectAddress onAddressChange={(value) => form.setFieldsValue({ full_address: value })} />
            <Col span={12}>
              <S.FormField
                name="avatar"
                colon={false}
                valuePropName="file"
                validateStatus={errorForm?.avatar && "error"}
                help={errorForm?.avatar && errorForm?.avatar}
                label="Ảnh nhà cung cấp"
              >
                <Upload {...props}>
                  {imageUrl || supplierDetail?.avatar ? (
                    <Image
                      src={imageUrl || `${baseImageUrl}/${supplierDetail?.avatar}`}
                      alt="avatar"
                      width={100}
                      height={100}
                      preview={{
                        visible: false,
                        mask: "Tải ảnh mới",
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
              {t("admin_shop.suppliers.btn_update")}
            </Button>
          </S.Field>
        </Form>
      </div>
    </div>
  );
};

export default EditSupplier;
