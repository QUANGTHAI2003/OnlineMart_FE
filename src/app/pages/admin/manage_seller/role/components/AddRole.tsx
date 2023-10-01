import { Button, Form, Input, Modal, Select, message } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];

const AddRole = () => {
  const { t } = useTranslation();

  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    // console.log(values)
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const [form] = Form.useForm();

  const onFinish = () => {
    message.success("Submit success!");
  };

  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const filteredOptions = OPTIONS.filter((option) => !selectedItems.includes(option));

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {t("admin_shop.manage_seller.site_header.add_roles")}
      </Button>
      <Modal
        open={visible}
        title={<div className="flex justify-center">{t("admin_shop.manage_seller.site_header.add_roles_title")}</div>}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            {t("admin_shop.manage_seller.site_header.cancel")}
          </Button>,
          <Button key="submit" form="myForm" type="primary" htmlType="submit" onClick={handleOk}>
            {t("admin_shop.manage_seller.site_header.add_new")}
          </Button>,
        ]}
      >
        <Form
          form={form}
          id="myForm"
          name="nest-messages"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{ maxWidth: 500 }}
        >
          <Form.Item name="name" rules={[{ required: true }, { type: "string", min: 3 }]}>
            <Input placeholder={t("admin_shop.manage_seller.table_header.enter_role_name")} />
          </Form.Item>

          <Form.Item name="permission" rules={[{ required: true }]}>
            <Select
              mode="multiple"
              placeholder={t("admin_shop.manage_seller.table_header.multiple_permission")}
              value={selectedItems}
              onChange={setSelectedItems}
              style={{ width: "100%" }}
              options={filteredOptions.map((item) => ({
                value: item,
                label: item,
              }))}
            />
          </Form.Item>
          <Form.Item name="description">
            <Input.TextArea placeholder={t("admin_shop.manage_seller.table_header.enter_role_description")} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddRole;
