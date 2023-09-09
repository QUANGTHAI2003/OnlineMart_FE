import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Col, Row, Tag } from "antd";
import { useTranslation } from "react-i18next";

import * as S from "../Product.styles";

const SortData = () => {
  const { t } = useTranslation();

  return (
    <Row wrap={false} align="middle" className="mb-4">
      <Col className="flex-shrink-0 mr-4">{t("admin_shop.product.list.filter.filtering")}</Col>
      <Col className="flex flex-wrap gap-2 item-center">
        <SortDataItem />
        <SortDataItem />
      </Col>
      <Col>
        <Button type="link">
          <span>{t("admin_shop.product.list.filter.clear_all")}</span>
        </Button>
      </Col>
    </Row>
  );
};

export default SortData;

export const SortDataItem = () => {
  return (
    <S.SortDataItemStyle className="d-inline-block margin-bottom-half">
      <Tag className="sort-item">
        <span>Danh mục: Đồ Chơi - Mẹ & Bé</span>
        <CloseCircleOutlined />
      </Tag>
    </S.SortDataItemStyle>
  );
};
