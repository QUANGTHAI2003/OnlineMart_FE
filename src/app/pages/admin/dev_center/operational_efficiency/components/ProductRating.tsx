import { RightOutlined } from "@ant-design/icons";
import { RatingStar } from "@app/app/assets/icons";
import { Button, Card, Col, Progress, Rate, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ProductRating = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Card bordered={false}>
        <Row>
          <Col span={12}>
            <span className="font-semibold text-base">
              {t("admin_shop.dev_center.operational_efficiency.card_rating_orders")}
            </span>
          </Col>
          <Col span={12} className="text-right">
            <Link to="/admin/shop/products/review">
              <Button type="default">
                {t("admin_shop.dev_center.operational_efficiency.view_details")}
                <RightOutlined />
              </Button>
            </Link>
          </Col>
        </Row>
        <Row gutter={16} className="pt-5">
          <Col span={10}>
            <div className="flex flex-col justify-center text-center">
              <Typography.Title level={4}>--/5</Typography.Title>
              <div>
                (0)
                {t("admin_shop.dev_center.operational_efficiency.view_details")}
              </div>
              <Rate disabled defaultValue={3} />
            </div>
          </Col>
          <Col span={14}>
            <Row justify="space-between">
              <Col>
                <div className="flex items-center text-sm">
                  <span>5</span>
                  <RatingStar />
                </div>
              </Col>
              <Col className="text-gray-500">
                (0)
                {t("admin_shop.dev_center.operational_efficiency.reiview")}
              </Col>
              <Col span={24}>
                <Progress strokeColor="#30BF78" percent={50} showInfo={false} />
              </Col>
            </Row>
            <Row justify="space-between">
              <Col>
                <div className="flex items-center text-sm">
                  <span>4</span>
                  <RatingStar />
                </div>
              </Col>
              <Col className="text-gray-500">
                (0)
                {t("admin_shop.dev_center.operational_efficiency.reiview")}
              </Col>
              <Col span={24}>
                <Progress strokeColor="#30BF78" percent={79} showInfo={false} />
              </Col>
            </Row>
            <Row justify="space-between">
              <Col>
                <div className="flex items-center text-sm">
                  <span>3</span>
                  <RatingStar />
                </div>
              </Col>
              <Col className="text-gray-500">
                (0)
                {t("admin_shop.dev_center.operational_efficiency.reiview")}
              </Col>
              <Col span={24}>
                <Progress strokeColor="#FAAD14" percent={9} showInfo={false} />
              </Col>
            </Row>
            <Row justify="space-between">
              <Col>
                <div className="flex items-center text-sm">
                  <span>2</span>
                  <RatingStar />
                </div>
              </Col>
              <Col className="text-gray-500">
                (0)
                {t("admin_shop.dev_center.operational_efficiency.reiview")}
              </Col>
              <Col span={24}>
                <Progress strokeColor="#F4664A" percent={20} showInfo={false} />
              </Col>
            </Row>
            <Row justify="space-between">
              <Col>
                <div className="flex items-center text-sm">
                  <span>1</span>
                  <RatingStar />
                </div>
              </Col>
              <Col className="text-gray-500">
                (0)
                {t("admin_shop.dev_center.operational_efficiency.reiview")}
              </Col>
              <Col span={24}>
                <Progress strokeColor="#F4664A" percent={20} showInfo={false} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ProductRating;
