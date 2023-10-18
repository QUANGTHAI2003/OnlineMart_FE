import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useDeleteRoleMutation } from "@app/store/slices/api/admin/roleApi";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, Space } from "antd";
import { useTranslation } from "react-i18next";

const DeleteRole = ({ id }: any) => {
  const { t } = useTranslation();

  const [deleteRole] = useDeleteRoleMutation();

  const [modal, contextHolder] = Modal.useModal();

  const confirm = (id: number) => {
    modal.confirm({
      title: t("admin_shop.manage_seller.table_header.confirm"),
      icon: <ExclamationCircleOutlined />,
      content: t("admin_shop.manage_seller.table_header.confirm_detail"),
      okText: t("admin_shop.manage_seller.table_header.delete"),
      cancelText: t("admin_shop.manage_seller.table_header.cancel"),
      centered: true,
      async onOk() {
        await deleteRole({ id });
      },
    });
  };

  return (
    <div>
      <Space>
        <Button onClick={() => confirm(id)} type="primary" danger ghost>
          <FontAwesomeIcon icon={faTrashCan} />
        </Button>
      </Space>
      {contextHolder}
    </div>
  );
};

export default DeleteRole;
