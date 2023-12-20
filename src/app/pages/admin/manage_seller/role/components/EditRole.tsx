import { useGetAllPermissionsQuery, useUpdateRoleMutation } from "@app/store/slices/api/admin/roleApi";
import { IPermission } from "@app/types/roles.type";
import { handleApiError, isEntityError, notifySuccess } from "@app/utils/helper";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Input, Modal, Select, message } from "antd";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

interface IEditRoleProps {
  data: any;
}

const EditRole: React.FC<IEditRoleProps> = ({ data }) => {
  const { t } = useTranslation();
  const { data: permissions } = useGetAllPermissionsQuery();
  const [updateRole, { isLoading, error }] = useUpdateRoleMutation();

  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const [form] = Form.useForm();

  const handleSubmit = async (fieldValues: any) => {
    try {
      await updateRole({
        id: data?.id,
        name: fieldValues.name,
        description: fieldValues.description,
        permissions: fieldValues.permission,
      }).unwrap();

      setVisible(false);

      notifySuccess("Cập nhật thành công", "Thành công");
    } catch (err) {
      handleApiError(err);
    }
  };

  const errorForm: any = useMemo(() => {
    const errorResult = error;

    if (isEntityError(errorResult)) {
      return errorResult.data.errors;
    }

    return null;
  }, [error]);

  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const filteredOptions = permissions?.filter((option: IPermission) => !selectedItems.includes(option.name));

  return (
    <div>
      <Button onClick={showModal} className="border-1 border-solid border-yellow-500">
        <FontAwesomeIcon icon={faPenToSquare} className="text-yellow-500" />
      </Button>
      <Modal
        open={visible}
        title={<div className="flex justify-center">{t("admin_shop.manage_seller.table_header.edit_role")}</div>}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            {t("admin_shop.manage_seller.table_header.cancel")}
          </Button>,
          <Button key="submit" loading={isLoading} form="editRoleForm" type="primary" htmlType="submit">
            {t("admin_shop.manage_seller.table_header.edit")}
          </Button>,
        ]}
      >
        <Form
          form={form}
          id="editRoleForm"
          name="edit_role"
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={{
            name: data?.name,
            permission: data?.permissions?.map((item: IPermission) => item?.id),
            description: data?.description,
          }}
          style={{ maxWidth: 500 }}
        >
          <Form.Item
            name="name"
            rules={[{ required: true }, { type: "string", min: 3 }]}
            help={errorForm?.name?.[0]}
            validateStatus={errorForm?.name && errorForm?.name[0]}
          >
            <Input placeholder={t("admin_shop.manage_seller.table_header.enter_role_name")} />
          </Form.Item>

          <Form.Item
            name="permission"
            rules={[{ required: true }]}
            help={errorForm?.permission?.[0]}
            validateStatus={errorForm?.permission && errorForm?.permission[0]}
          >
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
    </div>
  );
};
export default EditRole;
