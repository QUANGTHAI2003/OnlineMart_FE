import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Input, InputRef, Select, Space, message } from "antd";
import { useRef, useState } from "react";

interface ISelectedOrCreateProps {
  initValue?: any[];
  isMultiple?: boolean;
  placeholder: string;
  buttonText?: string;
  onSelected?: (value: string) => void;
}

const SelectOrCreate: React.FC<ISelectedOrCreateProps> = ({
  initValue = [],
  isMultiple,
  placeholder,
  buttonText = "Add item",
  onSelected,
}) => {
  const [items, setItems] = useState<string[]>(initValue);

  const [name, setName] = useState<string>("");
  const inputRef = useRef<InputRef | null>(null);
  const onNameChange = (value: string) => {
    setName(value);
  };

  const addItem = () => {
    if (name.trim() !== "") {
      setItems([...items, name]);
      setName("");
      if (inputRef.current) {
        inputRef.current.focus();
      }
    } else {
      message.error("Please enter item");
    }
  };

  return (
    <Select
      onChange={onSelected}
      defaultValue={isMultiple && (initValue?.map((item) => ({ label: item, value: item })) as any)}
      mode={isMultiple ? "multiple" : undefined}
      placeholder={placeholder}
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: "8px 0" }} />
          <Space style={{ padding: "0 8px 4px" }}>
            <Input
              placeholder="Please enter item"
              ref={inputRef}
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
            />
            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
              {buttonText}
            </Button>
          </Space>
        </>
      )}
      options={items.map((item) => ({ label: item, value: item }))}
    />
  );
};

export default SelectOrCreate;
