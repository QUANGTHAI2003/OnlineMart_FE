import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Form, Radio, Row } from "antd";
import { useTranslation } from "react-i18next";

const Filter = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Form.Item rules={[{ required: true, message: "Please pick an item!" }]} className="form_item">
        <Radio.Group>
          <Row className="row_radio">
            <Col className="radio">
              <Radio.Button value="content">{t("admin_shop.product.review.filter.include_content")}</Radio.Button>
            </Col>
            <Col className="radio">
              <Radio.Button value="media">{t("admin_shop.product.review.filter.include_media")}</Radio.Button>
            </Col>
            <Col className="radio">
              <Radio.Button value="unanswered">{t("admin_shop.product.review.filter.not_yet_replied")}</Radio.Button>
            </Col>
          </Row>
        </Radio.Group>
      </Form.Item>

      <Row className="row_filtering">
        <Col xs={24} sm={24} md={5} lg={3} xl={3} className="filtering">
          {`${t("admin_shop.product.review.filter.filtering")}:`}
        </Col>
        <Col xs={24} sm={24} md={18} lg={21} xl={21} className="rating_type">
          <div className="rating_type_item">
            <div className="content">
              <p>{`${t("admin_shop.product.review.filter.content_type")}:`}</p>
              <p>{t("admin_shop.product.review.filter.include_content")}</p>
            </div>

            <Button
              type="primary"
              ghost
              shape="circle"
              icon={<FontAwesomeIcon icon={faCircleXmark} />}
              className="break_rating_type"
            />
          </div>

          <div className="rating_type_item">
            <div className="content">
              <p>{`${t("admin_shop.product.review.filter.content_type")}:`}</p>
              <p>{t("admin_shop.product.review.filter.include_media")}</p>
            </div>

            <Button
              type="primary"
              ghost
              shape="circle"
              icon={<FontAwesomeIcon icon={faCircleXmark} />}
              className="break_rating_type"
            />
          </div>

          <div className="rating_type_item">
            <div className="content">
              <p>{`${t("admin_shop.product.review.filter.seller_reply")}:`}</p>
              <p>{t("admin_shop.product.review.filter.not_yet_replied")}</p>
            </div>

            <Button
              type="primary"
              ghost
              shape="circle"
              icon={<FontAwesomeIcon icon={faCircleXmark} />}
              className="break_rating_type"
            />
          </div>
          <div className="delete_all">
            <Button type="primary" ghost className="delete_button">
              {t("admin_shop.product.review.filter.clear_all")}
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Filter;
