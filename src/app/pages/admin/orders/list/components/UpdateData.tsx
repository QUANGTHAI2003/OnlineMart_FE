import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Space, Tooltip } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const UpdateData: React.FC<any> = ({ hasSelected }) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const handleUpdateQuantity = () => {
    console.log("Update quantity");
  };

  const handleUpdateStatus = () => {
    console.log("Update status");
  };

  const handleDelete = () => {
    console.log("Delete");
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
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
    {
      label: t("admin_shop.orders.list.filter.print"),
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
            {t("admin_shop.orders.list.filter.update_selected")}
            <DownOutlined />
          </Button>
        ) : (
          <Tooltip title={t("admin_shop.orders.list.filter.select_at_less")}>
            <Button disabled>
              {t("admin_shop.orders.list.filter.update_selected")}
              <DownOutlined />
            </Button>
          </Tooltip>
        )}
      </Dropdown>
    </Space>
  );
};

export default UpdateData;
