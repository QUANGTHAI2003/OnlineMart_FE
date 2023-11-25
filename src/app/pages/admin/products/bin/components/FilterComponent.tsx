import { SearchOutlined } from "@ant-design/icons";
import { setSearchValue, setSelectSearchType } from "@app/store/slices/redux/admin/binAdminSlice";
import { useAppDispatch, useAppSelector } from "@app/store/store";
import { Form, Input, Select, Space } from "antd";
import React, { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";

const FilterComponent = React.memo(({ searchTypeData }: any) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const searchValue = useAppSelector((state) => state.binAdmin.searchValue);
  const [selectedSearchTypeLabel, setSelectedSearchTypeLabel] = useState<string>(searchTypeData[0].label);

  const handleSearch = (value: string) => {
    dispatch(setSearchValue(value));
  };

  const handleSelectSearchType = (key: any) => {
    const selectedSearchType = searchTypeData.find((item: any) => item.value === key);
    if (selectedSearchType) {
      setSelectedSearchTypeLabel(selectedSearchType.label);
    }
    dispatch(setSelectSearchType(key));
  };

  return (
    <section className="filter py-4 px-6 bg-white rounded-t-md">
      <Form>
        <Space.Compact className="flex items-center" size="large">
          <Select
            className="w-40"
            defaultValue={searchTypeData[0].value}
            options={searchTypeData}
            onChange={handleSelectSearchType}
          />
          <div className="flex-grow">
            <Input
              value={searchValue}
              size="large"
              placeholder={t("admin_shop.product.list.filter.placeholder", {
                placeholder: selectedSearchTypeLabel.toLowerCase(),
              })}
              prefix={<SearchOutlined />}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
            />
          </div>
        </Space.Compact>

        {/* <DatePicker className="checkbox_group" id="date-picker" onChange={(state) => setDefaultDate(state)} /> */}
      </Form>
    </section>
  );
});

export default FilterComponent;
