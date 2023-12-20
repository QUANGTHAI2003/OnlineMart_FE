import { DownOutlined } from "@ant-design/icons";
import { useDeleteMultiSupplierMutation } from "@app/store/slices/api/supplierApi";
import { handleApiError, notifySuccess } from "@app/utils/helper";
import { Button, Dropdown, MenuProps, Space, Tooltip } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const shopId = 1;
const UpdateData: React.FC<any> = ({ hasSelected, selectedRowKeys }) => {
  const { t } = useTranslation();
  const [deleteMultiSupplier] = useDeleteMultiSupplierMutation();
  const [open, setOpen] = useState<boolean>(false);
  const handleDelete = async () => {
    try {
      await deleteMultiSupplier({
        suppliersId: selectedRowKeys,
        shopId,
      }).unwrap();
      notifySuccess("Successfully", "Delete supplier successfully");
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
      label: t("admin_shop.suppliers.dropdown_delete"),
      key: "1",
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
