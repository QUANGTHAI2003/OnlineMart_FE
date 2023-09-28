import { RightOutlined } from "@ant-design/icons";
import { Col, Row, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { useTranslation } from "react-i18next";

import * as S from "../ProductReview.styles";

const { Title, Text, Link } = Typography;

const SiteHeaderItem = () => {
  const { t } = useTranslation();

  const suggestions = [
    {
      id: 1,
      suggestion: t("admin_shop.product.review.site_header.suggestion"),
      connector: t("admin_shop.product.review.site_header.connector"),
      link: t("admin_shop.product.review.site_header.link"),
    },
  ];

  return (
    <S.SiteHeader>
      <Row className="main_title">
        <Col span={24}>
          <Title level={4} className="title">
            {t("admin_shop.product.review.site_header.review_management")}
          </Title>
        </Col>
      </Row>

      {suggestions.map((suggestion) => {
        return (
          <Row key={suggestion.id} className="main_content">
            <Col span={24}>
              <Content className="content">
                <Row className="container">
                  <Col xs={24} sm={14} md={17} lg={19} xl={21} className="left_container">
                    <Text strong className="suggestion">
                      {suggestion.suggestion}
                      <Text className="try_create">{suggestion.connector}</Text>
                      <Link href="product-strategy" target="_blank">
                        {suggestion.link}
                      </Link>
                    </Text>
                  </Col>

                  <Col xs={24} sm={8} md={6} lg={4} xl={3}>
                    <a href="see-more" className="see_more">
                      <div className="detail">{t("admin_shop.product.review.site_header.view_details")}</div>
                      <RightOutlined className="icon" />
                    </a>
                  </Col>
                </Row>
              </Content>
            </Col>
          </Row>
        );
      })}
    </S.SiteHeader>
  );
};

export default SiteHeaderItem;
