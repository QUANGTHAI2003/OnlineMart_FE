import { ArrowLeftOutlined } from "@ant-design/icons";
import { AdminBreadcrumb } from "@app/app/components/common/Breadcrumb/Breadcrumb";
import { useGetInfoShopRootQuery, useUpdateBoothMutation } from "@app/store/slices/api/admin/adminShopApi";
import { useAppSelector } from "@app/store/store";
import { handleApiError, isEntityError, notifySuccess } from "@app/utils/helper";
import { Button, Col, Form, Row, Typography } from "antd";
import { TFunction } from "i18next";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import * as S from "../AccountStoreInfo.styles";

import StoreInfo from "./StoreInfo";
import StoreManagement from "./StoreManagement";

const baseImage = import.meta.env.VITE_BASE_IMAGE_URL + "/";

const itemAnchor = (t: TFunction<"translation", undefined>) => [
  {
    key: "store-info",
    href: "#store-info",
    title: (
      <Typography.Text className="font-semibold">{t("admin_shop.shop_info.store_setting.store_info")}</Typography.Text>
    ),
  },
  {
    key: "store-management",
    href: "#store-management",
    title: (
      <Typography.Text className="font-semibold">
        {t("admin_shop.shop_info.store_setting.store_manager")}
      </Typography.Text>
    ),
  },
];

const StoreSetting = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const shopId = useAppSelector((state) => state.userState.user?.shop_id);

  const [updateBooth, { isLoading, error }] = useUpdateBoothMutation();
  const { data: shopInfomation } = useGetInfoShopRootQuery(shopId);

  const handleSubmit = async (fieldValues: any) => {
    try {
      const { name_manager, phone_manager, email_manager, avatar_store, name_store, url_store } = fieldValues;
      const formData = new FormData();
      if (typeof avatar_store !== "string") {
        formData.append("avatar", avatar_store.fileList[0].originFileObj);
      }
      formData.append("name", name_store);
      formData.append("url", url_store);
      formData.append("name_manager", name_manager);
      formData.append("phone_manager", phone_manager);
      formData.append("email_manager", email_manager);
      formData.append("_method", "PATCH");

      await updateBooth({ shopId: shopId, data: formData }).unwrap();
      notifySuccess("Successfully", "Save changes successfully");
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
    form.setFieldsValue({
      name_manager: shopInfomation?.users[0]?.full_name,
      phone_manager: shopInfomation?.users[0]?.phone,
      email_manager: shopInfomation?.users[0]?.email,
      name_store: shopInfomation?.name,
      url_store: shopInfomation?.url,
      avatar_store: baseImage + shopInfomation?.avatar,
    });
  }, [shopInfomation, form]);

  return (
    <main>
      <div className="bg-white px-6 pb-6">
        <AdminBreadcrumb />
        <section className="flex items-center gap-x-2">
          <Link to="/admin/shop/profile">
            <ArrowLeftOutlined className="text-lg text-black" />
          </Link>
          <Typography.Title className="mb-0" level={3}>
            {t("admin_shop.shop_info.store_setting.title")}
          </Typography.Title>
        </section>
      </div>
      <S.MainContent>
        <div className="body">
          <Row gutter={24}>
            <Col span={7}>
              <S.AnchorAccount items={itemAnchor(t)} />
            </Col>
            <Col span={17}>
              <Form form={form} autoComplete="off" id="update-booth" onFinish={handleSubmit}>
                <StoreInfo id="store-info" errorForm={errorForm} />
                <StoreManagement id="store-management" />
              </Form>
            </Col>
          </Row>
          <S.FeatureButtonStyle>
            <Link to="/admin/shop/profile">
              <Button>{t("admin_shop.shop_info.store_setting.cancel")}</Button>
            </Link>
            <Button loading={isLoading} form="update-booth" type="primary" htmlType="submit">
              {t("admin_shop.shop_info.store_setting.save")}
            </Button>
          </S.FeatureButtonStyle>
        </div>
      </S.MainContent>
    </main>
  );
};

export default StoreSetting;
