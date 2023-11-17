import { SearchOutlined } from "@ant-design/icons";
import { useDebounce } from "@app/hooks";
import { Button, Checkbox, Input } from "antd";
import { forwardRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "../Log.styles";

interface IFilterDropdownDataProps {
  name: string;
  data: { id: number; label: string; value: string }[];
  setLoading: (value: boolean) => void;
  setOpen: (value: boolean) => void;
}

const FilterDropdownData: React.ForwardRefRenderFunction<HTMLDivElement, IFilterDropdownDataProps> = (
  { name, data, setLoading, setOpen },
  ref
) => {
  const { t } = useTranslation();

  const [filteredData, setFilteredData] = useState<IFilterDropdownDataProps["data"]>(data);
  const [searchInput, setSearchInput] = useState<string>("");
  const [checkedList, setCheckedList] = useState<string[]>([]);

  const debouncedSearchInput = useDebounce(searchInput, 300);

  const handleGetCheckBoxData = (value: string) => {
    const newCheckedList = checkedList.includes(value)
      ? checkedList.filter((item) => item !== value)
      : [...checkedList, value];
    setCheckedList(newCheckedList);
  };

  const handleRemoveCheckBox = () => {
    setCheckedList([]);
  };

  const handleApplyCheckBox = () => {
    setOpen(false);
  };

  const handleGetSearchCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    const searchText = debouncedSearchInput.toLowerCase();
    const filtered = data.filter((item) => item.label.toLowerCase().includes(searchText));
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
      <div className="content">
        {filteredData.map((item: any) => (
          <div className="mb-4" key={item.id}>
            <Checkbox checked={checkedList.includes(item.value)} onChange={() => handleGetCheckBoxData(item.value)}>
              {item.label}
            </Checkbox>
          </div>
        ))}
      </div>
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
