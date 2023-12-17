import { QuestionCircleOutlined, RightOutlined } from "@ant-design/icons";
import { IShopInformation } from "@app/types/shop.types";
import { Button, Col, List, Row, Tag, Typography } from "antd";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import * as S from "../AccountStoreInfo.styles";

interface IAccountProps {
  id: string;
  shopInfomation: IShopInformation;
}

const dataList = (shopInfomation: IShopInformation, t: TFunction<"translation", undefined>) => [
  {
    label: t("admin_shop.shop_info.national_id"),
    value:
      shopInfomation?.national_id === null ? (
        <Tag color="warning" icon={<QuestionCircleOutlined />}>
          {t("admin_shop.shop_info.national_id_need")}
        </Tag>
      ) : (
        <Tag color="success">
          <span>{t("admin_shop.shop_info.national_id_already")}</span>
        </Tag>
      ),
  },
  { label: t("admin_shop.shop_info.contract_number"), value: `OnlineMart/OM${shopInfomation?.id}` },
];

const BusinessLicense = ({ id, shopInfomation }: IAccountProps) => {
  const { t } = useTranslation();

  return (
    <S.ShopInfoCard
      type="inner"
      id={id}
      title={
        <Row>
          <Col className="flex-1">
            <Typography.Title className="mb-1" level={4}>
              {t("admin_shop.shop_info.national_id")}
            </Typography.Title>
            <span className="leading-4 font-normal text-gray-600">{t("admin_shop.shop_info.national_id_desc")}</span>
          </Col>
          <Col>
            <Button type="link">
              <Link to="/admin/shop/profile/business_license">
                <span>{t("admin_shop.shop_info.detail")}</span>
                <RightOutlined />
              </Link>
            </Button>
          </Col>
        </Row>
      }
      bordered={false}
    >
      <List
        size="large"
        header={null}
        footer={null}
        bordered={false}
        dataSource={dataList(shopInfomation, t)}
        renderItem={(item) => (
          <List.Item>
            <Row className="w-full">
              <Col span={12}>{item.label}</Col>
              <Col span={12}>
                <Typography.Text>{item.value}</Typography.Text>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </S.ShopInfoCard>
  );
};

export default BusinessLicense;
