import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Input, Modal, Select, message } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface IEditRoleProps {
  data: any;
}

const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];

const EditRole: React.FC<IEditRoleProps> = ({ data }) => {
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
    <div>
      <Button onClick={showModal} className="border-1 border-solid border-yellow-500">
        <FontAwesomeIcon icon={faPenToSquare} className="text-yellow-500" />
      </Button>
      <Modal
        open={visible}
        title={<div className="flex justify-center">{t("admin_shop.manage_seller.table_header.edit_role")}</div>}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            {t("admin_shop.manage_seller.table_header.cancel")}
          </Button>,
          <Button key="submit" form="myForm" type="primary" htmlType="submit" onClick={handleOk}>
            {t("admin_shop.manage_seller.table_header.edit")}
          </Button>,
        ]}
      >
        <Form
          form={form}
          name="nest-messages"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={{
            name: data?.name,
            permission: data?.permission,
            description: data?.description,
          }}
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
              className="w-full"
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
    </div>
  );
};
export default EditRole;
