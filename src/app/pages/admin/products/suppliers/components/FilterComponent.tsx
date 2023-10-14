import { SearchOutlined } from "@ant-design/icons";
import { Select } from "@app/app/components/common/Select/Select";
import { Col, Form, Input, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const FilterComponent = React.memo(({ setSearchValue, setSelectSearchType, searchTypeData }: any) => {
  const { t } = useTranslation();

  const [selectedSearchTypeLabel, setSelectedSearchTypeLabel] = useState<string>(searchTypeData[0].label);

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

  useEffect(() => {
    console.log("Filter Component rendered");
  });

  return (
    <section className="filter pt-4 bg-white">
      <Row gutter={16} wrap={false} align="middle">
        <Col className="flex-1">
          <Form>
            <Row gutter={16} align="middle">
              <Col className="flex-grow">
                <section>
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
                </section>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </section>
  );
});

export default FilterComponent;