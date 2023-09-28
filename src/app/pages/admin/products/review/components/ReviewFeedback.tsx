import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Form, Input, Modal, Rate, Row } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { RatingText } from "../data";

interface IReviewFeedbackProps {
  data: any;
}

const ReviewFeedback: React.FC<IReviewFeedbackProps> = ({ data }) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={showModal} className="border-0 hover:bg-slate-100">
        {t("admin_shop.product.review.feedback.action")}
      </Button>
      <Modal
        title={
          <div>
            {t("admin_shop.product.review.feedback.comment")}
            <a href={data.id} className="ml-2">{`#${data.id}`}</a>
          </div>
        }
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
        centered
        footer={[
          <Button key="back" onClick={handleCancel}>
            {t("admin_shop.product.review.feedback.close")}
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            {t("admin_shop.product.review.feedback.send_a_response")}
          </Button>,
        ]}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <div className="pr-4">
              <Avatar size={45} icon={<UserOutlined />} />
            </div>
            <div>
              <div className="font-bold">{data.reviewer}</div>
              <div className="text-xs font-normal">
                {`${t("admin_shop.product.review.feedback.joined")} 14 ${t(
                  "admin_shop.product.review.feedback.ago"
                )} | ${t("admin_shop.product.review.feedback.comment_on")} ${data.review_date} | ${t(
                  "admin_shop.product.review.feedback.used_for"
                )} 5 ${t("admin_shop.product.review.feedback.days")} `}
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <Rate disabled allowHalf defaultValue={data.rating} className="text-base pr-3" />
            <div className="font-semibold">{RatingText(t).status[data.status]}</div>
          </div>

          <div>
            <div className="comment text-sm">{data.comment}</div>
            <img src={data.image} alt="" width={100} className="p-3 rounded-md" />
          </div>

          <Row className="flex flex-col">
            <Row className="flex items-center">
              <Col span={2}>
                <Avatar src={<img src={data.seller_avatar} alt="avatar" />} />
              </Col>
              <Col span={20} className="font-bold">
                {data.seller_name}
              </Col>
            </Row>
            <Row>
              <Col span={2}></Col>
              <Col span={22} className="text-sm font-normal">
                {data.seller_reply}
              </Col>
            </Row>
          </Row>

          <div>
            <Form.Item rules={[{ required: true, message: "Please input Intro" }]}>
              <Input.TextArea showCount maxLength={100} />
            </Form.Item>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ReviewFeedback;
