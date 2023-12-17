import { RightOutlined } from "@ant-design/icons";
import { ProfileCard } from "@app/app/assets/icons";
import { Alert, Button, Space } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const AlertNotification = ({ className }: any) => {
  const { t } = useTranslation();

  return (
    <Alert
      message={<span className="font-semibold">{t("admin_shop.shop_info.provide_warehouse")}</span>}
      type="warning"
      className={className}
      showIcon
      icon={
        <div className="mr-4">
          <ProfileCard />
        </div>
      }
      action={
        <Link to="/admin/shop/profile/business_license">
          <Button type="primary">
            {t("admin_shop.shop_info.setup_addresses")}
            <Space>
              <RightOutlined />
            </Space>
          </Button>
        </Link>
      }
    />
  );
};

export default AlertNotification;
