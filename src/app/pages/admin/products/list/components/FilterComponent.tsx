import { FilterOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Select } from "@app/app/components/common/Select/Select";
import { useResponsive } from "@app/hooks";
import { Button, Col, Divider, Form, Input, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { ProductListFilterBrand, ProductListFilterCategory } from "../data";
import * as S from "../Product.styles";

import { DropdownSelect } from ".";

const FilterComponent = React.memo(({ setSearchValue, setSelectSearchType, searchTypeData }: any) => {
  const { isTablet, isDesktop } = useResponsive();
  const { t } = useTranslation();

  const [open, setOpen] = useState<boolean>(false);
  const [selectedSearchTypeLabel, setSelectedSearchTypeLabel] = useState<string>(searchTypeData[0].label);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
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

  useEffect(() => {
    console.log("Filter Component rendered");
  });

  return (
    <section className="filter pt-4 pb-6 px-6 bg-white">
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
              {isDesktop && (
                <Col>
                  <Space size={16}>
                    <DropdownSelect
                      name={t("admin_shop.product.list.filter.category")}
                      data={ProductListFilterCategory}
                      placement="bottomLeft"
                    />
                    <DropdownSelect
                      name={t("admin_shop.product.list.filter.brand")}
                      data={ProductListFilterBrand}
                      placement="bottomRight"
                    />
                  </Space>
                </Col>
              )}
            </Row>
          </Form>
        </Col>
        <Col>
          <Button size="large" onClick={showDrawer}>
            {isTablet ? (
              <>
                <span className="mr-2">{t("admin_shop.product.list.filter.other_filter")}</span>
                <PlusOutlined />
              </>
            ) : (
              <FilterOutlined />
            )}
          </Button>
        </Col>
      </Row>
      <SortDrawer onClose={onClose} open={open} t={t} />
    </section>
  );
});

export default FilterComponent;

export const SortDrawer = ({ onClose, open, t }: any) => {
  return (
    <S.DrawerStyle
      title={t("admin_shop.product.list.filter.other_filter")}
      placement="right"
      onClose={onClose}
      open={open}
      width={400}
      footer={
        <div className="grid grid-cols-2 gap-x-3">
          <Button onClick={onClose}>{t("admin_shop.product.list.filter.cancel")}</Button>
          <Button onClick={onClose} type="primary">
            {t("admin_shop.product.list.filter.apply")}
          </Button>
        </div>
      }
    >
      <Form layout="vertical">
        <Form.Item label={t("admin_shop.product.list.filter.category")} htmlFor="category">
          <Select
            mode="multiple"
            placeholder={t("admin_shop.product.list.filter.select_category")}
            id="category"
            options={ProductListFilterCategory}
            allowClear
          />
        </Form.Item>
        <Divider />
        <Form.Item label={t("admin_shop.product.list.filter.brand")} htmlFor="brand">
          <Select
            mode="multiple"
            id="brand"
            placeholder={t("admin_shop.product.list.filter.select_brand")}
            options={ProductListFilterCategory}
            allowClear
          />
        </Form.Item>
      </Form>
    </S.DrawerStyle>
  );
};
