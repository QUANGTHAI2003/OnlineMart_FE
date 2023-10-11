import { SearchOutlined } from "@ant-design/icons";
import { useDebounce } from "@app/hooks";
import { removeDiacritics } from "@app/utils/helper";
import { Alert, Button, Cascader, Input } from "antd";
import { DefaultOptionType } from "antd/es/cascader";
import { useState } from "react";

import * as S from "../ProductCreate.styles";

const SelectCategory = ({ value = {}, onChange, optionsSelect = [] }: any) => {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string[]>([]);

  const [searchCategory, setSearchCategory] = useState<string>("");
  const debouncedSearchCategory = useDebounce(searchCategory, 500);

  const filter = (inputValue: string, path: DefaultOptionType[]) =>
    path.some(
      (option) =>
        removeDiacritics((option.label as string).toLowerCase()).indexOf(removeDiacritics(inputValue.toLowerCase())) >
        -1
    );

  const triggerChange = (changedValue: { selectedValue?: any[] }) => {
    onChange?.({ ...selectedValue, ...value, ...changedValue });
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
            {selectedValue.length > 0 ? selectedValue.join(" / ") : "---"}
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
