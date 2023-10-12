import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Space, Tooltip, Typography } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const { Link } = Typography;

const UpdateData: React.FC<any> = ({ hasSelected, handleSelectProducts }) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const handlePrintQRCode = () => {
    // console.log("Print QR Code");
  };

  const handleCheckingInventory = () => {
    // console.log("Checking inventory");
  };

  const handleApplyingTaxes = () => {
    // console.log("Applying taxes");
  };

  const handlePermissionSale = () => {
    // console.log("Granting permission to sell");
  };

  const handleDeleteVersions = () => {
    // console.log("Deleting product versions");
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case "1":
        handlePrintQRCode();
        break;
      case "2":
        handleCheckingInventory();
        break;
      case "3":
        handleApplyingTaxes();
        break;
      case "4":
        handlePermissionSale();
        break;
      case "5":
        handleDeleteVersions();
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
      label: <Link onClick={handleSelectProducts}>{t("admin_shop.inventory.table.print_qrcode")}</Link>,
      key: "1",
    },
    {
      label: t("admin_shop.inventory.table.check_inventory"),
      key: "2",
    },
    {
      label: t("admin_shop.inventory.table.apply_tax"),
      key: "3",
    },
    {
      label: t("admin_shop.inventory.table.authorize_sale"),
      key: "4",
    },
    {
      label: t("admin_shop.inventory.table.delete_version"),
      key: "5",
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
    </Space>
  );
};

export default UpdateData;
