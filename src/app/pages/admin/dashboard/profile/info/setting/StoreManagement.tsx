import { Col, Input, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";

import * as S from "../AccountStoreInfo.styles";

const StoreManagement = ({ id }: any) => {
  const { t } = useTranslation();
  const phoneNumberPattern = /(0[3|5|7|8|9])+([0-9]{8})\b/g;

  return (
    <S.ShopSettingCard
      className="mb-5"
      type="inner"
      id={id}
      title={
        <>
          <Typography.Title className="mb-1" level={4}>
            {t("admin_shop.shop_info.store_setting.store_account_name")}
          </Typography.Title>
          <span className="leading-4 font-normal text-gray-600">
            {t("admin_shop.shop_info.store_setting.store_account_name_desc")}
          </span>
        </>
      }
      bordered={false}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Row>
            <Col span={12}>
              <S.FormField
                colon={false}
                name="name_manager"
                hasFeedback
                label={<b>{t("admin_shop.shop_info.store_setting.lable_name_account")}</b>}
                rules={[
                  {
                    required: true,
                    message: `${t("admin_shop.shop_info.store_setting.lable_name_account")} ${t(
                      "admin_shop.shop_info.store_setting.validate_required"
                    )}`,
                  },
                ]}
              >
                <Input size="large" />
              </S.FormField>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <S.FormField
            colon={false}
            name="email_manager"
            hasFeedback
            label={<b>{t("admin_shop.shop_info.store_setting.lable_email_account")}</b>}
            rules={[
              { required: true, message: `Email ${t("admin_shop.shop_info.store_setting.validate_type")}` },
              { type: "email" },
              { message: `Eamil ${t("admin_shop.shop_info.store_setting.validate_type")}` },
            ]}
          >
            <Input size="large" />
          </S.FormField>
        </Col>
        <Col span={12}>
          <S.FormField
            colon={false}
            name="phone_manager"
            hasFeedback
            label={<b>{t("admin_shop.shop_info.store_setting.lable_phone_account")}</b>}
            rules={[
              { required: true, message: t("admin_shop.shop_info.store_setting.validate_type") },
              { pattern: phoneNumberPattern, message: t("admin_shop.shop_info.store_setting.validate_type") },
            ]}
          >
            <Input size="large" />
          </S.FormField>
        </Col>
      </Row>
    </S.ShopSettingCard>
  );
};

export default StoreManagement;
