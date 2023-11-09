import { SearchOutlined } from "@ant-design/icons";
import { useDebounce } from "@app/hooks";
import { Button, Checkbox, Input } from "antd";
import { forwardRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "../SellerInfo.styles";

interface IFilterDropdownDataProps {
  name: string;
  data: { id: number; label: string; value: string }[];
  setLoading: (value: boolean) => void;
  setOpen: (value: boolean) => void;
  onChange: (value: any) => void;
  currentValue?: any;
}

const FilterDropdownData: React.ForwardRefRenderFunction<HTMLDivElement, IFilterDropdownDataProps> = (
  { name, data, setLoading, setOpen, onChange, currentValue },
  ref
) => {
  const { t } = useTranslation();

  const [filteredData, setFilteredData] = useState<IFilterDropdownDataProps["data"]>(data);
  const [searchInput, setSearchInput] = useState<string>("");

  const [checkedList, setCheckedList] = useState<any[]>([]);

  const debouncedSearchInput = useDebounce(searchInput, 300);

  const handleGetCheckBoxData = (value: any) => {
    const currentIndex = checkedList.indexOf(value);
    const newCheckedList = [...checkedList];

    if (currentIndex === -1) {
      newCheckedList.push(value);
    } else {
      newCheckedList.splice(currentIndex, 1);
    }

    setCheckedList(newCheckedList);
  };

  const handleRemoveCheckBox = () => {
    setCheckedList([]);
  };

  const handleApplyCheckBox = () => {
    setOpen(false);
    onChange(checkedList);
  };

  const handleGetSearchCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    const searchText = debouncedSearchInput?.toLowerCase();

    const filtered = data?.filter((item) => item?.label?.toLowerCase()?.includes(searchText));
    setTimeout(() => {
      setLoading(false);
    }, 300);
    setFilteredData(filtered);
  }, [debouncedSearchInput, data, setLoading]);

  return (
    <S.FilterDropdownStyle ref={ref} className="filter-data">
      <div className="header">
        <Input
          placeholder={t("admin_shop.product.list.filter.search_by", {
            search_by: name.toLowerCase(),
          })}
          prefix={<SearchOutlined />}
          onChange={handleGetSearchCheckBox}
        />
      </div>
      <Checkbox.Group
        defaultValue={currentValue}
        className="flex px-4 py-3 content"
        options={filteredData?.map((item: any) => ({
          label: item?.label,
          value: item?.value,
        }))}
        onChange={handleGetCheckBoxData}
      >
        <Checkbox />
      </Checkbox.Group>
      <div className="footer">
        <div className="footer-default">
          <Button onClick={handleRemoveCheckBox}>{t("admin_shop.product.list.filter.cancel")}</Button>
          <Button type="primary" onClick={handleApplyCheckBox}>
            {t("admin_shop.product.list.filter.apply")}
          </Button>
        </div>
      </div>
    </S.FilterDropdownStyle>
  );
};

export default forwardRef(FilterDropdownData);
