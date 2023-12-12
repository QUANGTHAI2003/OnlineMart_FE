import { useAddReasonCancelForOrderMutation } from "@app/store/slices/api/user/orderApi";
import { useGetReasonCancelForShopQuery } from "@app/store/slices/api/user/reasoncancelApi";
import { useAppSelector } from "@app/store/store";
import { notifySuccess } from "@app/utils/helper";
import { Button, Form, Modal, Select, Spin } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ModalCancelOrder: React.FC<any> = ({ order_id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const shop_id = useAppSelector((state) => state.userState.user)?.shop?.id;
  const { data: reasonCancelData } = useGetReasonCancelForShopQuery(shop_id);
  const [addReasonCancel, { isLoading }] = useAddReasonCancelForOrderMutation(order_id);
  const options = reasonCancelData?.map((item: { reason_name: any; id: any }) => ({
    value: item.id,
    label: item.reason_name,
  }));
  const [reasonCancelId, setReasonCancelId] = useState<number>();
  console.log(reasonCancelId);
  const handleOk = async () => {
    const reason_cancel_id = reasonCancelId;
    const values = {
      order_id,
      reason_cancel_id,
    };
    try {
      await addReasonCancel(values).unwrap();
      setIsModalOpen(false);
      notifySuccess("Hủy đơn thành công");

      navigate("/account/orders");
    } catch (err) {
      console.log(err);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSelectChange = (value: number) => {
    setReasonCancelId(value);
  };
  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <Spin spinning={isLoading}>
      <Button type="primary" onClick={() => setIsModalOpen(true)} className="bg-yellow-300 font-bold text-black">
        {t("user.orders.order_details.cancel_order")}
      </Button>
      <Modal
        title={t("user.orders.order_details.reason_cancel")}
        open={isModalOpen}
        onOk={handleOk}
        confirmLoading={isLoading}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item name="reason">
            <Select
              className="w-full"
              showSearch
              placeholder={t("user.orders.order.choose_reason")}
              optionFilterProp="children"
              filterOption={filterOption}
              onChange={handleSelectChange}
              options={options}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Spin>
  );
};
export default ModalCancelOrder;
