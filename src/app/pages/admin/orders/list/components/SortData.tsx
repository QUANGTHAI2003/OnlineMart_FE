import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Col, Row, Tag } from "antd";
import { useTranslation } from "react-i18next";

import * as S from "../Order.styles";

const SortData = () => {
  const { t } = useTranslation();

  return (
    <S.SortData>
      <Row wrap={false} align="middle" className="mb-4 row-block">
        <Col className="flex-shrink-0 flex mr-4 filtering">{t("admin_shop.product.list.filter.filtering")}</Col>
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
    </S.SortData>
  );
};

export default SortData;

export const SortDataItem = () => {
  return (
    <S.SortDataItemStyle className="d-inline-block margin-bottom-half">
      <Tag className="sort-item">
        <span>Ngày đặt hàng: 30 ngày qua (25/08/2023 - 23/09/2023)</span>
        <CloseCircleOutlined />
      </Tag>
    </S.SortDataItemStyle>
  );
};
