import { Card, Col, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";

const CustomerInteraction = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Card bordered={false} title={t("admin_shop.dev_center.operational_efficiency.interaction_metrics")}>
        <Row gutter={16}>
          <Col span={12}>
            <Row justify="space-between" align="middle">
              <span className="font-semibold text-sm">
                {t("admin_shop.dev_center.operational_efficiency.chat_response_rate")}
              </span>
            </Row>
            <Row gutter={16}>
              <Col span={12} className="flex flex-col justify-center items-center">
                <Typography.Title level={4}>--</Typography.Title>
                <span>
                  {t("admin_shop.dev_center.operational_efficiency.target")}
                  &gt;= 80%
                </span>
              </Col>
              <Col span={12}>
                <div className="w-full flex flex-col">
                  <div className="p-2 flex justify-between">
                    <div>{t("admin_shop.dev_center.operational_efficiency.chat_respose")}</div>
                    <div>0</div>
                  </div>
                  <div className="p-2 font-semibold flex justify-between bg-[#fafafa]">
                    <div>{t("admin_shop.dev_center.operational_efficiency.chat_received")}</div>
                    <div>0</div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row justify="space-between" align="middle">
              <span className="font-semibold text-sm">
                {t("admin_shop.dev_center.operational_efficiency.average_response")}
              </span>
            </Row>
            <Row gutter={16}>
              <Col span={24} className="flex flex-col justify-center items-center">
                <Typography.Title level={4}>--</Typography.Title>
                <span>
                  {t("admin_shop.dev_center.operational_efficiency.target")}
                  &gt;= 30 min
                </span>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default CustomerInteraction;
