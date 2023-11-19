import { DownOutlined } from "@ant-design/icons";
import { Can, PermissionsSwitch } from "@app/app/components/common/Permissions";
import usePermissions from "@app/hooks/usePermissions";
import { Button, Dropdown, MenuProps, Space, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const { Link } = Typography;

interface IUpdateDataProps {
  hasSelected: boolean;
  selectedRowKeys: React.Key[];
  handleSelectProducts: any;
}

const UpdateData: React.FC<IUpdateDataProps> = ({ hasSelected, handleSelectProducts }) => {
  const { t } = useTranslation();
  const [, setSelected] = useState(false);
  const [completeAction, setCompleteAction] = useState(false);
  const { permissions } = usePermissions();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSelected(hasSelected);
  }, [hasSelected]);

  useEffect(() => {
    if (completeAction) {
      setSelected(false);
      setCompleteAction(false);
    }
  }, [completeAction]);

  const handlePrintQRCode = () => {
    // console.log();
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case "1":
        handlePrintQRCode();
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
      disabled: !permissions.includes("Print QR"),
    },
  ];

  return (
    <Space direction="horizontal" align="center">
      <PermissionsSwitch>
        <Can permissions={["Print QR"]}>
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
