import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import { useState } from "react";

import { FilterDropdownData } from ".";

interface IDropdownSelectProps {
  name: string;
  data: { id: number; label: string; value: string }[];
  placement: "bottomLeft" | "bottom" | "bottomRight" | "topLeft" | "top" | "topRight";
}

const DropdownSelect: React.FC<IDropdownSelectProps> = ({ name, data, placement }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenChange = (flag: boolean) => {
    setOpen(flag);
  };

  const renderDropdown = () => {
    return <FilterDropdownData name={name} data={data} setLoading={setLoading} setOpen={setOpen} />;
  };

  return (
    <Dropdown
      dropdownRender={renderDropdown}
      trigger={["click"]}
      placement={placement}
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Button size="large" loading={loading}>
        <span>{name}</span>
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default DropdownSelect;
