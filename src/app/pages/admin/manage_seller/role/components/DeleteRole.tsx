import { ExclamationCircleOutlined } from "@ant-design/icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, Space } from "antd";
import { useTranslation } from "react-i18next";

const DeleteRole = () => {
  const { t } = useTranslation();

  const [modal, contextHolder] = Modal.useModal();

  const confirm = () => {
    modal.confirm({
      title: t("admin_shop.manage_seller.table_header.confirm"),
      icon: <ExclamationCircleOutlined />,
      content: t("admin_shop.manage_seller.table_header.confirm_detail"),
      okText: t("admin_shop.manage_seller.table_header.delete"),
      cancelText: t("admin_shop.manage_seller.table_header.cancel"),
    });
  };

  return (
    <div>
      <Space>
        <Button onClick={confirm} type="primary" danger ghost>
          <FontAwesomeIcon icon={faTrashCan} />
        </Button>
      </Space>
      {contextHolder}
    </div>
  );
};

export default DeleteRole;
