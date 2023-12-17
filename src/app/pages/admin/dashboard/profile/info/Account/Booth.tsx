import { RightOutlined } from "@ant-design/icons";
import { IShopInformation } from "@app/types/shop.types";
import { Button, Col, List, Row, Typography } from "antd";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import * as S from "../AccountStoreInfo.styles";

interface IAccountProps {
  id: string;
  shopInfomation: IShopInformation;
}

const dataList = (shopInfomation: IShopInformation, t: TFunction<"translation", undefined>) => [
  { label: t("admin_shop.shop_info.store_name"), value: shopInfomation?.name },
  { label: t("admin_shop.shop_info.store_phone"), value: shopInfomation?.users[0]?.phone?.replace("0", "+84") },
  { label: t("admin_shop.shop_info.store_code"), value: "OM" + shopInfomation?.id },
];

const Booth = ({ id, shopInfomation }: IAccountProps) => {
  const { t } = useTranslation();

  return (
    <S.ShopInfoCard
      className="mb-5"
      type="inner"
      id={id}
      title={
        <Row>
          <Col className="flex-1">
            <Typography.Title className="mb-1" level={4}>
              {t("admin_shop.shop_info.store_info_title")}
            </Typography.Title>
            <span className="leading-4 font-normal text-gray-600">{t("admin_shop.shop_info.store_info_desc")}</span>
          </Col>
          <Col>
            <Button type="link">
              <Link to="/admin/shop/profile/store_setting">
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

export default Booth;
