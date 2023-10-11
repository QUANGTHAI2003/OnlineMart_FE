import { DownOutlined } from "@ant-design/icons";
import { useDeleteMassCategoryMutation, useUpdateMassStatusMutation } from "@app/store/slices/api/categoryApi";
import { notifyError, notifySuccess } from "@app/utils/helper";
import { Button, Dropdown, MenuProps, Space, Tooltip } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const shopId = 1;

const UpdateData: React.FC<any> = ({ hasSelected, selectedRowKeys }) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState<boolean>(false);

  const [updateMassStatus] = useUpdateMassStatusMutation();
  const [deleteMassCategory] = useDeleteMassCategoryMutation();

  const handleUpdateStatus = async () => {
    try {
      await updateMassStatus({
        categoryId: selectedRowKeys,
        shopId,
      }).unwrap();
      notifySuccess("Cập nhật trạng thái thành công", "Thành công");
    } catch (err) {
      notifyError("Cập nhật trạng thái thất bại", "Thất bại");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMassCategory({
        categoryId: selectedRowKeys,
        shopId,
      }).unwrap();
      notifySuccess("Xóa danh mục thành công", "Thành công");
    } catch (err) {
      notifyError("Xóa danh mục thất bại", "Thất bại");
    }
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case "1":
        handleUpdateStatus();
        break;
      case "2":
        handleDelete();
        break;
      default:
        break;
    }
  };

  const handleOpenChange = (flag: boolean) => {
    setOpen((prevFlag) => (prevFlag ? false : flag));
  };

  const items: MenuProps["items"] = [
    {
      label: t("admin_shop.suppliers.dropdown_update_status"),
      key: "1",
    },
    {
      label: t("admin_shop.suppliers.dropdown_delete"),
      key: "2",
    },
  ];

  return (
    <Space direction="horizontal" align="center">
      <Dropdown
        menu={{
          items,
          onClick: handleMenuClick,
        }}
        trigger={["click"]}
        onOpenChange={handleOpenChange}
        open={open}
        disabled={!hasSelected}
      >
        {hasSelected ? (
          <Button>
            {t("admin_shop.suppliers.dropdown_selected")}
            <DownOutlined />
          </Button>
        ) : (
          <Tooltip title={t("admin_shop.product.list.filter.select_at_less")}>
            <Button disabled>
              {t("admin_shop.suppliers.dropdown_selected")}
              <DownOutlined />
            </Button>
          </Tooltip>
        )}
      </Dropdown>
    </Space>
  );
};

export default UpdateData;
