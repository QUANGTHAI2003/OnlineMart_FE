import { DownOutlined } from "@ant-design/icons";
import { Can, PermissionsSwitch } from "@app/app/components/common/Permissions";
import usePermissions from "@app/hooks/usePermissions";
import { useDeleteMultiVoucherMutation } from "@app/store/slices/api/admin/voucherApi";
import { useAppSelector } from "@app/store/store";
import { handleApiError, notifySuccess } from "@app/utils/helper";
import { Button, Dropdown, MenuProps, Space, Tooltip } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const UpdateData: React.FC<any> = ({ hasSelected, selectedRowKeys }) => {
  const { t } = useTranslation();
  const [deleteMultiVoucher] = useDeleteMultiVoucherMutation();
  const [open, setOpen] = useState<boolean>(false);
  const { permissions } = usePermissions();

  const shopId = useAppSelector((state) => state.userState.user)?.shop?.id;

  const handleDelete = async () => {
    try {
      await deleteMultiVoucher({
        voucherId: selectedRowKeys,
        shopId,
      }).unwrap();
      notifySuccess(
        t("admin_shop.product.evouncher.successfully"),
        t("admin_shop.product.evouncher.delete_successfully")
      );
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case "1":
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
      label: t("admin_shop.product.evouncher.delete_muitiple"),
      key: "1",
      disabled: !permissions?.includes("Delete voucher"),
    },
  ];

  return (
    <Space direction="horizontal" align="center">
      <PermissionsSwitch>
        <Can permissions={["Delete voucher"]}>
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
                {t("admin_shop.product.evouncher.update_selected")}
                <DownOutlined />
              </Button>
            ) : (
              <Tooltip title={t("admin_shop.product.evouncher.select_at_less")}>
                <Button disabled>
                  {t("admin_shop.product.evouncher.update_selected")}
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
