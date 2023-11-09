import * as S from "@app/app/pages/admin/seller/SellerInfo.styles";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface IShowPermissionProps {
  permissions?: any;
}
const ShowPermission = ({ permissions }: IShowPermissionProps) => {
  const { t } = useTranslation();
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
    <>
      <Button type="primary" ghost onClick={showModal}>
        <FontAwesomeIcon icon={faEye} />
      </Button>
      <S.ModalPermission
        title={t("admin_shop.seller.title_permissions")}
        centered
        className="max-w-[800px] w-full"
        footer={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {permissions?.length ? (
          permissions?.map((permission: any) => (
            <Button key={permission?.id} className="permission_item">
              {permission?.name}
            </Button>
          ))
        ) : (
          <p>{t("admin_shop.seller.no_permissions")}</p>
        )}
      </S.ModalPermission>
    </>
  );
};
export default ShowPermission;
