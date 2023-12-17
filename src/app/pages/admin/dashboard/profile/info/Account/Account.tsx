import { IShopInformation } from "@app/types/shop.types";
import { Col, List, Row, Typography } from "antd";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";

import * as S from "../AccountStoreInfo.styles";

interface IAccountProps {
  id: string;
  shopInfomation: IShopInformation;
}

const dataList = (t: TFunction<"translation", undefined>, shopInfomation: IShopInformation) => [
  { label: t("admin_shop.shop_info.user_info"), value: shopInfomation?.users[0]?.email },
  { label: t("admin_shop.shop_info.user_id"), value: shopInfomation?.id },
];

const Account = ({ id, shopInfomation }: IAccountProps) => {
  const { t } = useTranslation();
  return (
    <S.ShopInfoCard
      className="mb-5"
      type="inner"
      id={id}
      title={
        <>
          <Typography.Title className="mb-1" level={4}>
            {t("admin_shop.shop_info.account_information")}
          </Typography.Title>
          <span className="leading-4 font-normal text-gray-600">
            {t("admin_shop.shop_info.account_information_desc")}
          </span>
        </>
      }
      bordered={false}
    >
      <List
        size="large"
        header={null}
        footer={null}
        bordered={false}
        dataSource={dataList(t, shopInfomation)}
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

export default Account;
