import { SearchOutlined } from "@ant-design/icons";
import { useDebounce } from "@app/hooks";
import { removeDiacritics } from "@app/utils/helper";
import { Alert, Button, Cascader, Input } from "antd";
import { DefaultOptionType } from "antd/es/cascader";
import { useEffect, useState } from "react";

import * as S from "../ProductEdit.styles";

const SelectCategory = ({ value = [], onChange, optionsSelect = [] }: any) => {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<any[]>(value);
  useEffect(() => {
    setSelectedValue(value);
  }, [value]);
  const [searchCategory, setSearchCategory] = useState<string>("");
  const debouncedSearchCategory = useDebounce(searchCategory, 500);
  const filter = (inputValue: string, path: DefaultOptionType[]) =>
    path.some(
      (option) =>
        removeDiacritics((option.label as string).toLowerCase()).indexOf(removeDiacritics(inputValue.toLowerCase())) >
        -1
    );
  const triggerChange = (changedValue: { selectedValue?: any[] }) => {
    if (changedValue.selectedValue) {
      const updatedValue = [...new Set([...(changedValue.selectedValue || []), changedValue.selectedValue.at(-1)])];
      onChange?.(updatedValue);
    }
  };
  const handleGetCategory = (value: any) => {
    triggerChange({ selectedValue: value });
    setSelectedValue(value);
  };
  return (
    <Cascader
      fieldNames={{ value: "id" }}
      allowClear={false}
      value={selectedValue}
      open={openDropdown}
      onDropdownVisibleChange={(open) => setOpenDropdown(open)}
      placement="bottomLeft"
      options={optionsSelect}
      dropdownRender={(menus) => (
        <SelectDropdown
          menus={menus}
          setOpenDropdown={setOpenDropdown}
          setSelectedValue={setSelectedValue}
          setSearchCategory={setSearchCategory}
          selectedValue={selectedValue}
          triggerChange={triggerChange}
          optionsSelect={optionsSelect}
        />
      )}
      placeholder="Select category"
      searchValue={debouncedSearchCategory}
      showSearch={{ filter }}
      notFoundContent="No matching results"
      changeOnSelect
      onChange={handleGetCategory}
      dropdownMenuColumnStyle={{ minWidth: "200px" }}
    />
  );
};
export default SelectCategory;
const SelectDropdown = ({
  menus,
  setSearchCategory,
  setOpenDropdown,
  selectedValue,
  setSelectedValue,
  triggerChange,
  optionsSelect,
}: any) => {
  const handleGetValue = (value: any) => {
    setSearchCategory(value);
  };
  const handleConfirm = (selectedValue: any) => {
    setSelectedValue(selectedValue);
    triggerChange({ selectedValue });
    setOpenDropdown(false);
  };
  const handleCancel = () => {
    setOpenDropdown(false);
    triggerChange({ selectedValue: [] });
    setSelectedValue([]);
  };
  const findLabelById = (options: any, id: any): any => {
    for (const option of options) {
      if (option.id === id) {
        return option.label;
      }
      if (option.children) {
        const label = findLabelById(option.children, id);
        if (label) {
          return label;
        }
      }
    }
    return null;
  };
  return (
    <S.DropdownSelectStyle>
      <Alert message="Please select the last-level category in bold" showIcon />
      <div className="search-input">
        <Input
          onChange={(e: any) => handleGetValue(e.target.value)}
          placeholder="Search by category name"
          prefix={<SearchOutlined />}
        />
      </div>
      {menus}
      <div className="feature-btn">
        <div className="margin-bottom-half">
          <b>Selecting: </b>
          <span className="blue query-product-selecting-categories">
            {selectedValue.length > 0
              ? selectedValue.map((id: number) => findLabelById(optionsSelect, id)).join(" / ")
              : "---"}
          </span>
        </div>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button type="primary" className="ml-3" onClick={() => handleConfirm(selectedValue)}>
          Confirm
        </Button>
      </div>
    </S.DropdownSelectStyle>
  );
};
