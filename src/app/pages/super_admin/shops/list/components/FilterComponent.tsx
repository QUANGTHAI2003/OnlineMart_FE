import { SearchOutlined } from "@ant-design/icons";
import { Col, Form, Input, Row, Select, Space } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const FilterComponent = React.memo(
  ({ setSearchValue, setSelectSearchType, searchTypeData, setSelectType, setSelectValue, selectTypeData }: any) => {
    const { t } = useTranslation();
    const [selectedSearchTypeLabel, setSelectedSearchTypeLabel] = useState<string>(searchTypeData[0].label);
    const handleSelectType = (value: any) => {
      const selectType = selectTypeData.find((item: any) => item.value === value);
      setSelectValue(selectType);
      setSelectType(value);
    };
    const handleSearch = (value: any) => {
      setSearchValue(value);
    };
    const handleSelectSearchType = (key: any) => {
      const selectedSearchType = searchTypeData.find((item: any) => item.value === key);
      if (selectedSearchType) {
        setSelectedSearchTypeLabel(selectedSearchType.label);
      }
      setSelectSearchType(key);
    };

    return (
      <section className="filter pt-4 bg-white">
        <Form>
          <Row gutter={16} align="middle">
            <Col span={19} className="flex-grow">
              <Space.Compact className="flex items-center" size="large">
                <Select
                  className="w-36"
                  defaultValue={searchTypeData[0].value}
                  options={searchTypeData}
                  onChange={handleSelectSearchType}
                />
                <div className="flex-grow">
                  <Input
                    size="large"
                    placeholder={t("admin_shop.product.list.filter.placeholder", {
                      placeholder: selectedSearchTypeLabel.toLowerCase(),
                    })}
                    prefix={<SearchOutlined />}
                    onChange={(e: any) => handleSearch(e.target.value)}
                  />
                </div>
              </Space.Compact>
            </Col>
            <Col span={5}>
              <Select
                className="w-full"
                placeholder={t("admin_super.shop_list.filter.status")}
                size="large"
                popupMatchSelectWidth={false}
                onChange={handleSelectType}
                options={selectTypeData}
              />
            </Col>
          </Row>
        </Form>
      </section>
    );
  }
);

export default FilterComponent;
