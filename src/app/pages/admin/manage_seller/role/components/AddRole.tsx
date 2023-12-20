import { useAddRoleMutation, useGetAllPermissionsQuery } from "@app/store/slices/api/admin/roleApi";
import { IPermission } from "@app/types/roles.type";
import { handleApiError, notifySuccess } from "@app/utils/helper";
import { Button, Form, Input, Modal, Select, message } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const AddRole = () => {
  const { t } = useTranslation();

  const [visible, setVisible] = useState(false);
  const { data: permissions } = useGetAllPermissionsQuery();
  const [addRole, { isLoading }] = useAddRoleMutation();

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const [form] = Form.useForm();

  const handleSubmit = async (fieldValues: any) => {
    try {
      await addRole({
        name: fieldValues.name,
        description: fieldValues.description,
        permissions: fieldValues.permission,
      }).unwrap();

      setVisible(false);
      form.resetFields();

      notifySuccess("Thêm mới thành công", "Thành công");
    } catch (err) {
      handleApiError(err);
    }
  };

  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const filteredOptions = permissions?.filter((option: IPermission) => !selectedItems.includes(option.name));

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {t("admin_shop.manage_seller.site_header.add_roles")}
      </Button>
      <Modal
        open={visible}
        title={<div className="flex justify-center">{t("admin_shop.manage_seller.site_header.add_roles_title")}</div>}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            {t("admin_shop.manage_seller.site_header.cancel")}
          </Button>,
          <Button key="submit" loading={isLoading} form="addRoleForm" type="primary" htmlType="submit">
            {t("admin_shop.manage_seller.site_header.add_new")}
          </Button>,
        ]}
      >
        <Form
          form={form}
          id="addRoleForm"
          name="nest-messages"
          onFinish={handleSubmit}
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
              className="w-full"
              options={filteredOptions?.map((item: IPermission) => ({
                value: item?.id,
                label: item?.name,
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
