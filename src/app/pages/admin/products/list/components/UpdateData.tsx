import { DownOutlined } from "@ant-design/icons";
import { Can, PermissionsSwitch } from "@app/app/components/common/Permissions";
import usePermissions from "@app/hooks/usePermissions";
import {
  useDeleteMultipleProductMutation,
  useUpdateStatusMultipleMutation,
} from "@app/store/slices/api/admin/productApi";
import { handleApiError, notifySuccess } from "@app/utils/helper";
import { Button, Divider, Dropdown, MenuProps, Space, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

interface IUpdateDataProps {
  hasSelected: boolean;
  selectedRowKeys: React.Key[];
}

const UpdateData: React.FC<IUpdateDataProps> = ({ hasSelected, selectedRowKeys }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(false);
  const [completeAction, setCompleteAction] = useState(false);
  const currentTab = new URLSearchParams(location.search).get("tab") as string;

  useEffect(() => {
    setSelected(hasSelected);
  }, [hasSelected]);

  useEffect(() => {
    if (completeAction) {
      setSelected(false);
      setCompleteAction(false);
    }
  }, [completeAction]);

  const [deleteMultipleProduct] = useDeleteMultipleProductMutation();
  const [updateStatusMultiple] = useUpdateStatusMultipleMutation();
  const { permissions } = usePermissions();

  const handleUpdateQuantity = () => {
    console.log("Update quantity");
  };

  const handleUpdateStatus = () => {
    console.log("Update status");
  };

  const handleDelete = async () => {
    try {
      await deleteMultipleProduct(selectedRowKeys).unwrap();

      notifySuccess("Delete product successfully");
      setCompleteAction(true);
      setSelected(false);
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setOpen(false);
    switch (e.key) {
      case "1":
        handleUpdateQuantity();
        break;
      case "2":
        handleUpdateStatus();
        break;
      case "3":
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
    // {
    //   label: t("admin_shop.product.list.filter.update_quantity"),
    //   key: "1",
    //   disabled: !permissions?.includes("Update product"),
    // },
    // {
    //   label: t("admin_shop.product.list.filter.update_status"),
    //   key: "2",
    //   disabled: !permissions?.includes("Update product"),
    // },
    {
      label: t("admin_shop.product.list.filter.delete"),
      key: "3",
      disabled: !permissions?.includes("Delete product"),
    },
  ];

  const handleUpdateMultipleStatus = async (status: string) => {
    try {
      await updateStatusMultiple({ productId: selectedRowKeys, status }).unwrap();

      notifySuccess("Update status successfully");
      setCompleteAction(true);
      setSelected(false);
    } catch (err) {
      handleApiError(err);
    }
  };

  const getTextFromTab = (tab: any) => {
    switch (tab) {
      case "selling":
        return ["off", t("admin_shop.product.list.status.off")];
      case "draft":
        return ["selling", t("admin_shop.product.list.status.selling")];
      case "off":
        return ["selling", t("admin_shop.product.list.status.selling")];
      default:
        return "";
    }
  };

  const showUpdateStatus: string[] = ["selling", "off", "draft"];

  const [status, statusText] = getTextFromTab(currentTab);

  return (
    <div className="header">
      <Space className="mb-4" direction="horizontal" align="center">
        <h3>
          {selected
            ? `${t("admin_shop.product.list.table.selecting", { count: selectedRowKeys.length })}`
            : t("admin_shop.product.list.table.product")}
        </h3>
        <Divider type="vertical" />
        {/* {isDesktop && ( */}
        <Space direction="horizontal" align="center">
          <PermissionsSwitch>
            <Can permissions={["Update product", "Delete product"]}>
              <Dropdown
                menu={{
                  items,
                  onClick: handleMenuClick,
                }}
                trigger={["click"]}
                onOpenChange={handleOpenChange}
                open={open}
                disabled={!selected}
              >
                {selected ? (
                  <Button>
                    {t("admin_shop.product.list.filter.update_selected")}
                    <DownOutlined />
                  </Button>
                ) : (
                  <Tooltip title={t("admin_shop.product.list.filter.select_at_less")}>
                    <Button disabled>
                      {t("admin_shop.product.list.filter.update_selected")}
                      <DownOutlined />
                    </Button>
                  </Tooltip>
                )}
              </Dropdown>
            </Can>
          </PermissionsSwitch>
          <PermissionsSwitch>
            <Can permissions={["Update product"]}>
              {showUpdateStatus?.includes(currentTab) && (
                <Button disabled={!selected} onClick={() => handleUpdateMultipleStatus(status)}>
                  {`Cập nhật trạng thái sang ${statusText}`}
                </Button>
              )}
            </Can>
          </PermissionsSwitch>
        </Space>
        {/* )} */}
      </Space>
    </div>
  );
};

export default UpdateData;
