import { DownOutlined } from "@ant-design/icons";
import { Can, PermissionsSwitch } from "@app/app/components/common/Permissions";
import usePermissions from "@app/hooks/usePermissions";
import { useDeleteMultipleProductMutation, useUpdateStoreMultipleMutation } from "@app/store/slices/api/admin/binApi";
import { handleApiError, notifySuccess } from "@app/utils/helper";
import { Button, Dropdown, MenuProps, Space, Tooltip } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface IUpdateDataProps {
  hasSelected: boolean;
  selectedRowKeys: React.Key[];
  setCompleteAction: any;
}

const UpdateData: React.FC<IUpdateDataProps> = ({ hasSelected, selectedRowKeys, setCompleteAction }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [restoreMultiple] = useUpdateStoreMultipleMutation();
  const [deleteMultiple] = useDeleteMultipleProductMutation();
  const { permissions } = usePermissions();

  const handleRestoreMultiple = async () => {
    try {
      await restoreMultiple({ productId: selectedRowKeys }).unwrap();

      notifySuccess(t("admin_shop.bin.restore_success"));
      setCompleteAction(true);
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleDeleteMultiple = async () => {
    try {
      await deleteMultiple(selectedRowKeys).unwrap();

      notifySuccess(t("admin_shop.bin.delete_success"));
      setCompleteAction(true);
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setOpen(false);
    switch (e.key) {
      case "1":
        handleRestoreMultiple();
        break;
      case "2":
        handleDeleteMultiple();
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
      label: t("admin_shop.bin.restore"),
      key: "1",
      disabled: !permissions?.includes("Update bin"),
    },
    {
      label: t("admin_shop.bin.delete"),
      key: "2",
      disabled: !permissions?.includes("Delete bin"),
    },
  ];

  return (
    <Space direction="horizontal" align="center">
      <PermissionsSwitch>
        <Can permissions={["Update bin", "Delete bin"]}>
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
                {t("admin_shop.inventory.table.select_action")}
                <DownOutlined />
              </Button>
            ) : (
              <Tooltip title={t("admin_shop.inventory.table.please_choose")}>
                <Button disabled>
                  {t("admin_shop.inventory.table.please_select")}
                  <DownOutlined />
                </Button>
              </Tooltip>
            )}
          </Dropdown>
        </Can>
      </PermissionsSwitch>
    </Space>
  );
};

export default UpdateData;
