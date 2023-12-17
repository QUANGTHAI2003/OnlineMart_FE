import { Col, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";

import * as S from "../ProductReview.styles";

const { Title } = Typography;

const SiteHeaderItem = () => {
  const { t } = useTranslation();

  return (
    <S.SiteHeader>
      <Row className="main_title">
        <Col span={24}>
          <Title level={4} className="title">
            {t("admin_shop.product.review.site_header.review_management")}
          </Title>
        </Col>
      </Row>
    </S.SiteHeader>
  );
};

export default SiteHeaderItem;
