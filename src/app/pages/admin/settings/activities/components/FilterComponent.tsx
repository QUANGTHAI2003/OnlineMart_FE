import { FilterOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useResponsive } from "@app/hooks";
import { Button, Col, DatePicker, Divider, Form, Input, Row, Select, Space } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { LogFilterAuthor, LogFilterModule } from "../data";
import * as S from "../Log.styles";

import { DropdownSelect } from ".";
const { RangePicker } = DatePicker;

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

  return (
    <section className="filter py-4 px-6 bg-white rounded-t-md">
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
                      name={t("admin_shop.settings.logs.table.author")}
                      data={LogFilterAuthor}
                      placement="bottomLeft"
                    />
                    <DropdownSelect
                      name={t("admin_shop.settings.logs.table.action")}
                      data={LogFilterModule}
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
        <SortDrawer onClose={onClose} open={open} t={t} />
      </Row>
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
        <Form.Item label={t("admin_shop.settings.logs.table.author")} htmlFor="author">
          <Select
            mode="multiple"
            id="author"
            placeholder={t("admin_shop.settings.logs.filter.select_author")}
            options={LogFilterAuthor}
            allowClear
          />
        </Form.Item>

        <Divider />

        <Form.Item label={t("admin_shop.settings.logs.table.action")} htmlFor="action">
          <Select
            mode="multiple"
            id="action"
            placeholder={t("admin_shop.settings.logs.filter.select_action")}
            options={LogFilterModule}
            allowClear
          />
        </Form.Item>

        <Divider />

        <Form.Item name="date-picker" label={t("admin_shop.settings.logs.filter.time")}>
          <RangePicker className="checkbox_group" />
        </Form.Item>
      </Form>
    </S.DrawerStyle>
  );
};
