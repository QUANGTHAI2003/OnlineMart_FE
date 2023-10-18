import { IPermission } from "@app/types/roles.type";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "../RoleManage.styles";

const ViewPermissions: React.FC<any> = ({ id, permissions }) => {
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPermissionId, setCurrentPermissionId] = useState<number | null>(null);

  const handleShowPermission = (id: any) => {
    setIsModalOpen(true);
    setCurrentPermissionId(id);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button onClick={() => handleShowPermission(id)} type="primary" ghost>
        <FontAwesomeIcon icon={faEye} />
      </Button>
      <S.ViewPermissions
        width="800px"
        centered
        title={t("admin_shop.manage_seller.site_header.list_of_permissions")}
        open={isModalOpen && currentPermissionId === id}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {permissions?.map((permission: IPermission) => {
          return (
            <Button key={permission.id} className="permission_item">
              {permission.name}
            </Button>
          );
        })}
      </S.ViewPermissions>
    </div>
  );
};
export default ViewPermissions;
