import { useGetInfoShopRootQuery } from "@app/store/slices/api/admin/adminShopApi";
import { useAppSelector } from "@app/store/store";
import { baseImageUrl } from "@app/utils/helper";
import { Col, Image, Input, Row, Typography, Upload, UploadProps } from "antd";
import { RcFile } from "antd/es/upload";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import * as S from "../AccountStoreInfo.styles";

const base_url = import.meta.env.VITE_BASE_URL as string;
const acceptedAvatar = ["image/png", "image/jpg", "image/jpeg", "image/gif", "image/svg", "image/webp"];

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const StoreInfo = ({ id, errorForm }: any) => {
  const { t } = useTranslation();
  const shopId = useAppSelector((state) => state.userState.user?.shop_id);

  const { data: shopInformation } = useGetInfoShopRootQuery(shopId);

  const [imageUrl, setImageUrl] = useState("");

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
        setImageUrl(url);
      });
    },
  };

  return (
    <S.ShopSettingCard
      className="mb-5"
      type="inner"
      id={id}
      title={
        <Typography.Title level={4} className="mb-0">
          {t("admin_shop.shop_info.store_setting.title")}
        </Typography.Title>
      }
      bordered={false}
    >
      <Row gutter={16}>
        <Col span={24}>
          <S.FormField
            name="name_store"
            hasFeedback
            colon={false}
            labelAlign={"left"}
            validateStatus={errorForm?.name_store && "error"}
            help={errorForm?.name_store && errorForm?.name_store}
            label={
              <Row>
                <Col className="flex-1">
                  <div className="font-semibold">{t("admin_shop.shop_info.store_setting.lable_name")}</div>
                  <Typography.Text className="mb-0 text-gray-500 text-justify">
                    {t("admin_shop.shop_info.store_setting.lable_name_desc")}
                  </Typography.Text>
                </Col>
              </Row>
            }
            rules={[
              {
                required: true,
                message: `${t("admin_shop.shop_info.store_setting.lable_name")} ${t(
                  "admin_shop.shop_info.store_setting.validate_required"
                )}`,
              },
            ]}
          >
            <Input size="large" showCount maxLength={35} />
          </S.FormField>
        </Col>
        <Col span={24} className="mb-5">
          <S.FormField
            name="url_store"
            className="mb-0"
            hasFeedback
            colon={false}
            labelAlign={"left"}
            validateStatus={errorForm?.url_store && "error"}
            help={errorForm?.url_store && errorForm?.url_store}
            label={
              <Row>
                <Col className="flex-1">
                  <div className="font-semibold">{t("admin_shop.shop_info.store_setting.url_store")}</div>
                  <Typography.Text className="mb-0 text-gray-500 text-justify">
                    {t("admin_shop.shop_info.store_setting.url_store_desc")}
                  </Typography.Text>
                </Col>
              </Row>
            }
            rules={[
              {
                required: true,
                message: `${t("admin_shop.shop_info.store_setting.url_store")} ${t(
                  "admin_shop.shop_info.store_setting.validate_required"
                )}`,
              },
            ]}
          >
            <Input size="large" addonBefore={`${base_url}/store/`} />
          </S.FormField>
          <Link to={`${base_url}/store/${shopInformation?.url}`} target="_blank">
            <span>
              <Typography.Text className="mb-0 text-gray-500 text-justify">
                {t("admin_shop.shop_info.store_setting.url_link")}
              </Typography.Text>
            </span>
          </Link>
        </Col>
        <Col span={12}>
          <S.FormField
            name="avatar_store"
            colon={false}
            labelAlign={"left"}
            valuePropName="file"
            validateStatus={errorForm?.avatar_store && "error"}
            help={errorForm?.avatar_store && errorForm?.avatar_store}
            label={
              <Row className="mb-1">
                <Col className="flex-1">
                  <div className="font-semibold">{t("admin_shop.shop_info.store_setting.store_avatar")}</div>
                  <Typography.Text className="mb-0 text-justify">
                    {t("admin_shop.shop_info.store_setting.store_avatar_desc")}
                  </Typography.Text>
                </Col>
              </Row>
            }
          >
            <Upload {...props}>
              <Image
                src={imageUrl || `${baseImageUrl}/${shopInformation?.avatar}`}
                alt="LOGO"
                width={100}
                height={100}
                preview={{
                  visible: false,
                  mask: t("admin_shop.shop_info.store_setting.store_cover"),
                }}
                fallback={`${baseImageUrl}/${shopInformation?.avatar}`}
                className="img object-cover"
              />
            </Upload>
          </S.FormField>
        </Col>
      </Row>
    </S.ShopSettingCard>
  );
};

export default StoreInfo;
