import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { AdminBreadcrumb } from "@app/app/components/common/Breadcrumb/Breadcrumb";
import {
  useGetInfoShopRootQuery,
  useUpdateDocumentMutation,
  useUpdateFrontSideShopMutation,
} from "@app/store/slices/api/admin/adminShopApi";
import { useAppSelector } from "@app/store/store";
import { baseImageUrl, isEntityError, notifyError, notifySuccess } from "@app/utils/helper";
import { Alert, Button, Col, Divider, Form, Image, Input, Row, Space, Typography, UploadProps } from "antd";
import { TFunction } from "i18next";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import * as S from "../AccountStoreInfo.styles";

import Address from "./Address";

const acceptedAvatar = ["image/png", "image/jpg", "image/jpeg", "image/gif", "image/svg", "image/webp"];
const getBase64 = (img: any, callback: any) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const BusinessLicense = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const shopId = useAppSelector((state) => state.userState.user?.shop_id);
  const { data: shopInformation } = useGetInfoShopRootQuery(shopId);
  const [updateDocument, { isLoading, error }] = useUpdateDocumentMutation();

  const [updateFrontSideShop] = useUpdateFrontSideShopMutation();

  const handleSubmit = async (fieldValues: any) => {
    try {
      const { national_id, name, email, phone, front_avatar, back_avatar, avatar, city, district, ward, address } =
        fieldValues;
      const formData = new FormData();
      const addressDetail = `${address}, ${ward}, ${district}, ${city}`;
      if (typeof front_avatar !== "string" || typeof back_avatar !== "string" || typeof avatar !== "string") {
        formData.append("front_side", front_avatar.fileList[0].originFileObj);
        formData.append("back_side", back_avatar.fileList[0].originFileObj);
        formData.append("portrait_photo", avatar.fileList[0].originFileObj);
      }
      formData.append("national_id", national_id);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("address", addressDetail);
      formData.append("_method", "PATCH");

      await updateDocument({ shopId: shopId, data: formData }).unwrap();
      notifySuccess("Successfully", "Create successfully");
    } catch (err: any) {
      if (err.originalStatus === 500) {
        notifyError("Error", "Hình ảnh không hông phải là chứng minh nhân dân");
      } else {
        notifyError("Error", "Số giấy tờ tùy thân không trùng khớp");
      }
    }
  };

  const handleGetAddressSelect = (wardName: string) => {
    if (wardName !== "") {
      return true;
    }
    return false;
  };

  const errorForm: any = useMemo(() => {
    const errorResult = error;

    if (isEntityError(errorResult)) {
      return errorResult.data.errors;
    }

    return null;
  }, [error]);

  const [imageUrlFrontSide, setImageUrlFrontSide] = useState();
  const [imageUrlBackSide, setImageUrlBackSide] = useState();
  const [imageUrlAvtar, setImageUrlAvtar] = useState();

  const uploadButton = (value: string, t: TFunction<"translation", undefined>) => {
    let label = "";
    if (value === "front_avatar") {
      label = t("admin_shop.shop_info.store_bus.preview_front_side");
    } else if (value === "back_avatar") {
      label = t("admin_shop.shop_info.store_bus.preview_back_side");
    } else {
      label = t("admin_shop.shop_info.store_bus.preview_portrait");
    }

    return (
      <div className="flex flex-col justify-between items-center">
        <PlusOutlined />
        {label}
      </div>
    );
  };

  const validateMessages = {
    required: "${label} " + "không được để trống!",
    types: {
      email: "${label} " + "Không đúng định dạng",
    },
    pattern: {
      mismatch: "${label} " + "Không đúng định dạng",
    },
  };
  useEffect(() => {
    form.setFieldsValue({
      national_id: shopInformation?.national_id,
      name: shopInformation?.users[0]?.full_name,
      email: shopInformation?.users[0]?.email,
      phone: shopInformation?.users[0]?.phone,
      front_avatar: shopInformation?.front_side,
      back_avatar: shopInformation?.back_side,
      avatar: shopInformation?.avatar,
      address: shopInformation?.address,
    });
    if (shopInformation?.address) {
      const parts = shopInformation.address.split(",").map((part) => part.trim());
      const [address, ward, district, city] = parts;

      form.setFieldsValue({
        city,
        district,
        ward,
        address,
      });
    }
  }, [shopInformation, form]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const props_Front: UploadProps = {
    listType: "picture-card",
    name: "front_side",
    method: "PATCH",
    className: "avatar-uploader rounded-none w-fit h-auto",
    accept: acceptedAvatar.join(","),
    showUploadList: false,
    beforeUpload: () => {
      return false;
    },
    onChange: async (info) => {
      getBase64(info.file, (url: any) => {
        setImageUrlFrontSide(url);
      });
      if (info.file instanceof File) {
        try {
          const formData = new FormData();
          formData.append("front_side", info.file);
          formData.append("_method", "PATCH");
          await updateFrontSideShop({ data: formData, shopId: shopId }).unwrap();
        } catch (err) {
          console.log(err);
        }
      } else {
        notifyError("Error", "Upload avatar failed");
      }
    },
  };

  const props_Back: UploadProps = {
    listType: "picture-card",
    className: "avatar-uploader rounded-none w-fit h-auto",
    accept: acceptedAvatar.join(","),
    showUploadList: false,
    beforeUpload: () => {
      return false;
    },
    onChange(info: any) {
      getBase64(info.file, (url: any) => {
        setImageUrlBackSide(url);
      });
    },
  };
  const avatar: UploadProps = {
    listType: "picture-card",
    className: "avatar-uploader rounded-none w-fit h-auto",
    accept: acceptedAvatar.join(","),
    showUploadList: false,
    beforeUpload: () => {
      return false;
    },
    onChange(info: any) {
      getBase64(info.file, (url: any) => {
        setImageUrlAvtar(url);
      });
    },
  };

  return (
    <main>
      <div className="bg-white px-6 pb-6 mb-6">
        <AdminBreadcrumb />
        <section className="flex items-center gap-x-2">
          <Link to="/admin/shop/profile">
            <ArrowLeftOutlined className="text-lg text-black" />
          </Link>
          <Typography.Title className="mb-0" level={3}>
            {t("admin_shop.shop_info.store_bus.title")}
          </Typography.Title>
        </section>
      </div>
      <S.MainContent>
        <div className="body">
          <S.ShopSettingCard
            className="mb-5"
            type="inner"
            title={
              <Typography.Title level={4} className="mb-0">
                {t("admin_shop.shop_info.store_bus.national_id")}
              </Typography.Title>
            }
            bordered={false}
          >
            <Form
              autoComplete="off"
              onFinish={handleSubmit}
              id="send_records"
              requiredMark={false}
              form={form}
              validateMessages={validateMessages}
            >
              <Row gutter={32}>
                <Col span={12}>
                  <S.FormField
                    name="national_id"
                    colon={false}
                    labelAlign={"left"}
                    rules={[{ required: true }]}
                    label={<div className="font-bold">{t("admin_shop.shop_info.store_bus.national_id_number")}</div>}
                    validateStatus={errorForm?.national_id && "error"}
                    help={errorForm?.national_id && errorForm?.national_id}
                  >
                    <Input size="large" disabled />
                  </S.FormField>
                  <S.FormField
                    name="name"
                    hasFeedback
                    colon={false}
                    labelAlign={"left"}
                    rules={[{ required: true }]}
                    label={<div className="font-bold">{t("admin_shop.shop_info.store_bus.full_name")}</div>}
                  >
                    <Input size="large" disabled />
                  </S.FormField>
                  <S.FormField
                    name="email"
                    hasFeedback
                    colon={false}
                    labelAlign={"left"}
                    label={<div className="font-bold">{t("admin_shop.shop_info.store_bus.email")}</div>}
                    rules={[{ required: true }, { type: "email" }]}
                    validateStatus={errorForm?.email && "error"}
                    help={errorForm?.email && errorForm?.email}
                  >
                    <Input size="large" />
                  </S.FormField>
                  <S.FormField
                    name="phone"
                    hasFeedback
                    colon={false}
                    labelAlign={"left"}
                    label={<div className="font-bold">{t("admin_shop.shop_info.store_bus.phone")}</div>}
                    rules={[{ required: true }, { pattern: /(0[3|5|7|8|9])+([0-9]{8})\b/g }]}
                    validateStatus={errorForm?.phone && "error"}
                    help={errorForm?.phone && errorForm?.phone}
                  >
                    <Input size="large" />
                  </S.FormField>
                </Col>
                <Col span={12}>
                  <div className="font-bold">{t("admin_shop.shop_info.store_bus.upload_full")}</div>
                  <div className="my-1">
                    <Typography.Text className="text-gray-500 text-justify">
                      {`.PDF, .JPG, .PNG | ${t("admin_shop.shop_info.store_bus.max_size")} 5MB`}
                    </Typography.Text>
                  </div>
                  <Alert
                    message={<div className="font-bold">{t("admin_shop.shop_info.store_bus.note")}</div>}
                    type="warning"
                    showIcon
                    className="mb-5"
                    description={
                      <ul>
                        <li className="list-disc">{t("admin_shop.shop_info.store_bus.national_upload")}</li>
                        <li className="list-disc">
                          {t("admin_shop.shop_info.store_bus.take_a_photo")}
                          <Button className="mt-2" onClick={showModal} type="primary">
                            {t("admin_shop.shop_info.store_bus.preview_upload")}
                          </Button>
                        </li>
                      </ul>
                    }
                  />
                  <div className="grid auto-cols-auto gap-6 grid-cols-2">
                    <S.FormField
                      name="front_avatar"
                      hasFeedback
                      colon={false}
                      valuePropName="file"
                      rules={[
                        {
                          required: true,
                          message: t("admin_shop.shop_info,store_bus.validate_file"),
                        },
                      ]}
                      validateStatus={errorForm?.front_avatar && "error"}
                      help={errorForm?.front_avatar && errorForm?.front_avatar}
                    >
                      <S.UploadAvatarShop {...props_Front}>
                        {imageUrlFrontSide || shopInformation?.front_side ? (
                          <Image
                            src={imageUrlFrontSide || `${baseImageUrl}/${shopInformation?.front_side}`}
                            alt="Front_avatar"
                            preview={{
                              visible: false,
                              mask: (
                                <div className="flex flex-col justify-between items-center">
                                  <PlusOutlined />
                                  <div>{t("admin_shop.shop_info.store_bus.preview_front_side")}</div>
                                </div>
                              ),
                            }}
                            className="img object-cover h-full"
                          />
                        ) : (
                          uploadButton("front_avatar", t)
                        )}
                      </S.UploadAvatarShop>
                    </S.FormField>
                    <S.FormField
                      name="back_avatar"
                      hasFeedback
                      colon={false}
                      valuePropName="file"
                      rules={[
                        {
                          required: true,
                          message: t("admin_shop.shop_info,store_bus.validate_file"),
                        },
                      ]}
                      validateStatus={errorForm?.back_avatar && "error"}
                      help={errorForm?.back_avatar && errorForm?.back_avatar}
                    >
                      <S.UploadAvatarShop {...props_Back}>
                        {imageUrlBackSide || shopInformation?.back_side ? (
                          <Image
                            src={imageUrlBackSide || `${baseImageUrl}/${shopInformation?.back_side}`}
                            alt="user-name"
                            preview={{
                              visible: false,
                              mask: (
                                <div className="flex flex-col justify-between items-center">
                                  <PlusOutlined />
                                  <div>{t("admin_shop.shop_info.store_bus.preview_back_side")}</div>
                                </div>
                              ),
                            }}
                            className="img object-cover h-full"
                          />
                        ) : (
                          uploadButton("back_avatar", t)
                        )}
                      </S.UploadAvatarShop>
                    </S.FormField>
                    <S.FormField
                      name="avatar"
                      hasFeedback
                      colon={false}
                      valuePropName="file"
                      rules={[
                        {
                          required: true,
                          message: t("admin_shop.shop_info,store_bus.validate_file"),
                        },
                      ]}
                      validateStatus={errorForm?.avatar && "error"}
                      help={errorForm?.avatar && errorForm?.avatar}
                    >
                      <S.UploadAvatarShop {...avatar}>
                        {imageUrlAvtar || shopInformation?.portrait_photo ? (
                          <Image
                            src={imageUrlAvtar || `${baseImageUrl}/${shopInformation?.portrait_photo}`}
                            alt="user-name"
                            preview={{
                              visible: false,
                              mask: (
                                <div className="flex flex-col justify-between items-center">
                                  <PlusOutlined />
                                  <div>{t("admin_shop.shop_info.store_bus.preview_portrait")}</div>
                                </div>
                              ),
                            }}
                            className="img object-cover h-full"
                          />
                        ) : (
                          uploadButton("avatar", t)
                        )}
                      </S.UploadAvatarShop>
                    </S.FormField>
                  </div>
                </Col>
              </Row>
              <Divider />
              <Typography.Title level={4} className="mb-0">
                {t("admin_shop.shop_info.store_bus.address")}
              </Typography.Title>
              <div className="leading-4 font-normal text-gray-600 my-2">
                {t("admin_shop.shop_info.store_bus.address_desc")}
              </div>
              <Address onAddressChange={handleGetAddressSelect} />
            </Form>
          </S.ShopSettingCard>
          <S.FeatureButtonStyle>
            <Link to="/admin/shop/profile">
              <Button>{t("admin_shop.shop_info.store_bus.back")}</Button>
            </Link>
            <Button loading={isLoading} type="primary" htmlType="submit" form="send_records">
              {t("admin_shop.shop_info.store_bus.submit")}
            </Button>
          </S.FeatureButtonStyle>
        </div>
      </S.MainContent>
      <S.ModalProfileImage
        title={<div className="text-center">{t("admin_shop.shop_info.store_bus.regulation")}</div>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <Button block type="primary" onClick={handleOk}>
            Ok
          </Button>
        }
      >
        <>
          <Alert
            className="mb-6"
            message={<div className="font-bold">{t("admin_shop.shop_info.store_bus.note")}</div>}
            type="warning"
            showIcon
            description={
              <ul>
                <li className="list-disc">{t("admin_shop.shop_info.store_bus.note_cmnd")}</li>
                <li className="list-disc">{t("admin_shop.shop_info.store_bus.note_load_image")}</li>
              </ul>
            }
          />
          <div className="flex flex-col items-center">
            <Space direction="vertical">
              <Space direction="horizontal">
                <img
                  src="https://salt.tikicdn.com/ts/user/aa/7f/b2/224058c16005ff85db69b1db81da29c6.png"
                  alt="user-name"
                  className="img object-cover w-[188px]"
                />
                <img
                  src="https://salt.tikicdn.com/ts/user/aa/7f/b2/224058c16005ff85db69b1db81da29c6.png"
                  alt="user-name"
                  className="img object-cover w-[188px]"
                />
              </Space>
              <div className="text-center">
                <img
                  src="https://salt.tikicdn.com/ts/user/aa/7f/b2/224058c16005ff85db69b1db81da29c6.png"
                  alt="user-name"
                  className="img object-cover w-[188px]"
                />
              </div>
            </Space>
          </div>
        </>
      </S.ModalProfileImage>
    </main>
  );
};

export default BusinessLicense;
