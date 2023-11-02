import * as S from "@app/app/pages/admin/seller/SellerInfo.styles";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Space, Tag } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface IShowPermissionProps {
  id: number;
  data?: any;
}
const ShowPermission = ({ id, data }: IShowPermissionProps) => {
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
      <div className="flex flex-col justify-center items-center">
        <Link target="_blank" to={`#/${id}`}>
          {t("admin_shop.seller.table.detail")}
        </Link>
        <Button type="link" onClick={showModal}>
          <Tag color="gold" className="m-0">
            <FontAwesomeIcon icon={faEye} />
          </Tag>
        </Button>
      </div>
      <S.ModalPermission
        title={t("admin_shop.seller.title_permissions")}
        footer={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Space size={[20, 13]} wrap>
          {data && data.length ? (
            data.map((permissions: any) => (
              <Button key={permissions.id} className="permission_item">
                {permissions.name}
              </Button>
            ))
          ) : (
            <p>{t("admin_shop.seller.no_permissions")}</p>
          )}
        </Space>
      </S.ModalPermission>
    </>
  );
};
export default ShowPermission;
