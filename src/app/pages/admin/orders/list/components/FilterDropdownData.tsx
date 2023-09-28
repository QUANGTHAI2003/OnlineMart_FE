import { SearchOutlined } from "@ant-design/icons";
import { useDebounce } from "@app/hooks";
import { Button, Checkbox, Input } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { forwardRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "../Order.styles";

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

  const [checkedList, setCheckedList] = useState<any[]>([]);

  const debouncedSearchInput = useDebounce(searchInput, 300);

  const handleGetCheckBoxData = (e: CheckboxChangeEvent) => {
    const { value } = e.target;
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
    const newCheckedList = checkedList.map((item) => ({ ...item, checked: false }));
    setCheckedList(newCheckedList);
  };

  const handleApplyCheckBox = () => {
    setOpen(false);
    console.log("check list", checkedList);
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
            <Checkbox value={item.value} onChange={handleGetCheckBoxData}>
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
