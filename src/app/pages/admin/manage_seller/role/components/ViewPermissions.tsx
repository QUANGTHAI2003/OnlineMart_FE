import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "../RoleManage.styles";

const ViewPermissions = () => {
  const { t } = useTranslation();

  const permissions = [
    {
      id: 1,
      permission: "View prod",
    },
    {
      id: 2,
      permission: "View",
    },
    {
      id: 3,
      permission: "View products",
    },
    {
      id: 4,
      permission: "View products",
    },
    {
      id: 5,
      permission: "View products",
    },
    {
      id: 6,
      permission: "View products",
    },
    {
      id: 7,
      permission: "View products",
    },
    {
      id: 8,
      permission: "View products",
    },
    {
      id: 9,
      permission: "View products",
    },
    {
      id: 10,
      permission: "View products",
    },
    {
      id: 11,
      permission: "View products",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button onClick={showModal} type="primary" ghost>
        <FontAwesomeIcon icon={faEye} />
      </Button>
      <S.ViewPermissions
        title={t("admin_shop.manage_seller.site_header.list_of_permissions")}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {permissions.map((permissions) => {
          return (
            <Button key={permissions.id} className="permission_item">
              {permissions.permission}
            </Button>
          );
        })}
      </S.ViewPermissions>
    </div>
  );
};
export default ViewPermissions;
