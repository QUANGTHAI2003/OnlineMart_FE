import { UserOutlined } from "@ant-design/icons";
import { useReplyReviewMutation } from "@app/store/slices/api/admin/reviewApi";
import { formatDateTime, handleApiError, notifySuccess } from "@app/utils/helper";
import { Avatar, Button, Col, Form, Input, Modal, Rate, Row } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { RatingText } from "../data";

interface IReviewFeedbackProps {
  data: any;
}

const ReviewFeedback: React.FC<IReviewFeedbackProps> = ({ data }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [replyReview, { isLoading }] = useReplyReviewMutation();

  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  const handleSubmit = async (fieldValues: any) => {
    try {
      await replyReview({
        reviewId: data.id,
        data: { content: fieldValues.reply_review },
      }).unwrap();
      notifySuccess("Successfully", "Feedback successfully");
      form.resetFields();
      setOpen(false);
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      {data?.reply_admin ? (
        <div>Đã trả lời</div>
      ) : (
        <Button type="primary" onClick={showModal} className="border-0">
          {t("admin_shop.product.review.feedback.action")}
        </Button>
      )}

      <Modal
        title={
          <div>
            {t("admin_shop.product.review.feedback.comment")}
            <Link to={data.id} className="ml-2">{`#${data.id}`}</Link>
          </div>
        }
        open={open}
        onCancel={handleCancel}
        width={700}
        centered
        footer={[
          <Button key="back" onClick={handleCancel}>
            {t("admin_shop.product.review.feedback.close")}
          </Button>,
          <Button key="submit" loading={isLoading} type="primary" form="replyReivew" htmlType="submit">
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
              <div className="font-bold">{data.full_name}</div>
              <div className="text-xs font-normal">
                {`${t("admin_shop.product.review.feedback.joined")} 14 ${t(
                  "admin_shop.product.review.feedback.ago"
                )} | ${t("admin_shop.product.review.feedback.comment_on")} ${formatDateTime(data.review_date)} | ${t(
                  "admin_shop.product.review.feedback.used_for"
                )} 5 ${t("admin_shop.product.review.feedback.days")} `}
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <Rate disabled allowHalf defaultValue={data.rating} className="text-base pr-3" />
            <div className="font-semibold">{RatingText(t).status[data.rating]}</div>
          </div>
          <div className="comment text-sm">{data.content}</div>
          <div className="flex items-center justify-start">
            {data?.image?.map((image: any) => {
              return (
                <div key={uuidv4()} className="mr-3">
                  <img src={image.media} alt="media" width="80" className="rounded-lg" />
                </div>
              );
            })}
          </div>
          <Row className="flex flex-col">
            <Row className="flex items-center">
              <Col span={2}>
                <Avatar src={<img src={data.shop_avatar} alt="avatar" />} />
              </Col>
              <Col span={20} className="font-bold">
                {data.shop_name}
              </Col>
            </Row>
            <Row>
              <Col span={2}></Col>
              <Col span={22} className="text-sm font-normal">
                {data.reply_admin}
              </Col>
            </Row>
          </Row>

          <div>
            <Form form={form} id="replyReivew" autoComplete="off" onFinish={handleSubmit}>
              <Form.Item name="reply_review" rules={[{ required: true, message: "Please input Intro" }]}>
                <Input.TextArea showCount maxLength={100} />
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ReviewFeedback;
