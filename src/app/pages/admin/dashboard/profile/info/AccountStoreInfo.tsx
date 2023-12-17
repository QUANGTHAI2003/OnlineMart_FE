import { CheckCircleOutlined, InfoCircleOutlined, QuestionCircleOutlined, RightOutlined } from "@ant-design/icons";
import { AdminBreadcrumb } from "@app/app/components/common/Breadcrumb/Breadcrumb";
import { useGetInfoShopRootQuery, useUpdateStatusMutation } from "@app/store/slices/api/admin/adminShopApi";
import { useAppSelector } from "@app/store/store";
import { IShopInformation } from "@app/types/shop.types";
import { baseImageUrl, handleApiError, notifySuccess } from "@app/utils/helper";
import { Avatar, Button, Col, Progress, Row, Space, Switch, Tag, Tooltip, Typography } from "antd";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import Account from "./Account/Account";
import Booth from "./Account/Booth";
import BusinessLicense from "./Account/BusinessLicense";
import Warehouse from "./Account/Warehouse";
import * as S from "./AccountStoreInfo.styles";
import AlertNotification from "./components/AlertNotification";

const { Text } = Typography;

const itemAnchor = (t: TFunction<"translation", undefined>) => [
  {
    key: "account",
    href: "#account",
    title: (
      <Row justify="start" wrap={false} align="middle">
        <Progress type="circle" percent={100} size={30} className="mr-3" />
        <Col className="flex-1">
          <Typography.Text className="font-semibold">{t("admin_shop.shop_info.account_information")}</Typography.Text>
        </Col>
      </Row>
    ),
  },
  {
    key: "booth",
    href: "#booth",
    title: (
      <Row justify="start" wrap={false} align="middle">
        <Progress
          type="circle"
          size={30}
          className="mr-3"
          format={() => (
            <div className="text-gray-300">
              <QuestionCircleOutlined />
            </div>
          )}
        />
        <Col className="flex-1">
          <Typography.Text className="font-semibold">
            <span>{t("admin_shop.shop_info.store_info")}</span>
          </Typography.Text>
        </Col>
      </Row>
    ),
  },
  {
    key: "warehouse",
    href: "#warehouse",
    title: (
      <Row justify={"start"} wrap={false} align="middle">
        <Progress
          type="circle"
          size={30}
          className="mr-3"
          format={() => (
            <div className="text-gray-300">
              <QuestionCircleOutlined />
            </div>
          )}
        />
        <Col className="flex-1">
          <Typography.Text className="font-semibold">{t("admin_shop.shop_info.bank")}</Typography.Text>
        </Col>
      </Row>
    ),
  },
  {
    key: "business-license",
    href: "#business-license",
    title: (
      <Row justify={"start"} wrap={false} align="middle">
        <Progress
          type="circle"
          size={30}
          className="mr-3"
          format={() => (
            <div className="text-gray-300">
              <QuestionCircleOutlined />
            </div>
          )}
        />
        <Col className="flex-1">
          <Typography.Text className="font-semibold">{t("admin_shop.shop_info.legal_document")}</Typography.Text>
        </Col>
      </Row>
    ),
  },
];

const getTypeTagColor = (type: any, t: TFunction<"translation", undefined>) => {
  switch (type) {
    case "0": {
      return (
        <Tooltip placement="top" title={t("admin_shop.shop_info.tooltip_not_yet_approved")}>
          <Tag className="m-0">
            <span>{t("admin_shop.shop_info.not_yet_approved")}</span>
            <InfoCircleOutlined />
          </Tag>
        </Tooltip>
      );
    }
    case "1": {
      return (
        <Tag color="green" className="m-0">
          <CheckCircleOutlined />
          <span>{t("admin_shop.shop_info.yet_approved")}</span>
        </Tag>
      );
    }
    case "2": {
      return (
        <Tag color="red" className="m-0">
          <span>{t("admin_shop.shop_info.error_approved")}</span>
        </Tag>
      );
    }
    default:
      return null;
  }
};
const AccountStoreInfo = () => {
  const { t } = useTranslation();
  const shopId = useAppSelector((state) => state.userState.user?.shop_id);

  const { data: shopInfomation } = useGetInfoShopRootQuery(shopId);
  const [updateStatus] = useUpdateStatusMutation();

  const disabled = shopInfomation?.type === "0" || shopInfomation?.type == "2" ? true : false;

  const handleChangeStatus = async (shopId: number, t: TFunction<"translation", undefined>) => {
    try {
      await updateStatus(shopId).unwrap();
      notifySuccess(t("admin_shop.shop_info.notifi.status"), "Thành công");
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleSwitchChange = () => {
    handleChangeStatus(shopId, t);
  };

  return (
    <main>
      <div className="bg-white px-6 pb-1">
        <AdminBreadcrumb />
        <Typography.Title className="mb-1" level={3}>
          {t("admin_shop.shop_info.title")}
        </Typography.Title>
      </div>
      <AlertNotification />
      <S.MainContent>
        <div className="header mb-4">
          <Row wrap={false} justify="space-between" align="middle">
            <Col span={2}>
              <Avatar size={64} src={<img src={`${baseImageUrl}/${shopInfomation?.avatar}`} alt="avatar" />} />
            </Col>
            <Col span={4}>
              <span className="store_name">{shopInfomation?.name}</span>
            </Col>
            <Col span={2} />
            <Col>{getTypeTagColor(shopInfomation?.type, t)}</Col>
            <Col>
              <div className="divider h-4 mx-4"></div>
            </Col>
            <Col span={5}>
              <div className="copy_id">
                <span>{t("admin_shop.shop_info.shop_id")}</span>
                <Text strong={true} copyable>
                  {`OM${shopInfomation?.id}`}
                </Text>
              </div>
            </Col>
            <Col>
              <Switch
                checkedChildren={t("admin_shop.shop_info.switch_on")}
                unCheckedChildren={t("admin_shop.shop_info.switch_of")}
                disabled={disabled}
                onChange={handleSwitchChange}
                defaultChecked={shopInfomation?.type === "1"}
              />
            </Col>
            <Col>
              <div className="divider h-8 mx-6"></div>
            </Col>
            <Col>
              <Link to="/admin/shop/profile/store_setting">
                <Button type="primary" ghost>
                  {t("admin_shop.shop_info.store_setting_button")}
                  <Space className="ml-2">
                    <RightOutlined />
                  </Space>
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
        <div className="body">
          <Row gutter={24}>
            <Col span={7}>
              <S.AnchorAccount items={itemAnchor(t)} />
            </Col>
            <Col span={17}>
              <Account id="account" shopInfomation={shopInfomation as IShopInformation} />
              <Booth id="booth" shopInfomation={shopInfomation as IShopInformation} />
              <Warehouse id="warehouse" shopInfomation={shopInfomation as IShopInformation} />
              <BusinessLicense id="business-license" shopInfomation={shopInfomation as IShopInformation} />
            </Col>
          </Row>
        </div>
      </S.MainContent>
    </main>
  );
};

export default AccountStoreInfo;
