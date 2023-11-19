import { FilterOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Select } from "@app/app/components/common/Select/Select";
import { useResponsive } from "@app/hooks";
import { useGetCategoryForSortQuery } from "@app/store/slices/api/categoryApi";
import { useGetSupplierForSortQuery } from "@app/store/slices/api/supplierApi";
import {
  setBrandValue,
  setCategoryValue,
  setDateValue,
  setSearchValue,
  setSelectSearchType,
} from "@app/store/slices/redux/admin/inventoryAdminSlice";
import { useAppDispatch, useAppSelector } from "@app/store/store";
import { Button, Checkbox, Col, DatePicker, Divider, Form, Input, Row, Space } from "antd";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "../ProductInventory.styles";

import { DropdownSelect } from ".";

const FilterComponent = React.memo(({ searchTypeData }: any) => {
  const { isTablet, isDesktop } = useResponsive();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const shopId = useAppSelector((state) => state.userState.user)?.shop?.id;

  const { data: supplierSortList } = useGetSupplierForSortQuery(shopId);
  const { data: categortSortList } = useGetCategoryForSortQuery(shopId);

  const searchValue = useAppSelector((state) => state.inventoryAdmin.searchValue);

  const [open, setOpen] = useState<boolean>(false);
  const [selectedSearchTypeLabel, setSelectedSearchTypeLabel] = useState<string>(searchTypeData[0].label);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

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

  const handleOnChangeCategory = (value: any) => {
    dispatch(setCategoryValue(value));
    setDefaultCategory(value);
  };

  const handleOnChangeBrand = (value: any) => {
    dispatch(setBrandValue(value));
    setDefaultSupplier(value);
  };

  const [defaultCategory, setDefaultCategory] = useState<any>([]);
  const [defaultSupplier, setDefaultSupplier] = useState<any>([]);
  const [defaultDate, setDefaultDate] = useState<any>([]);

  const { brandFilter, categoryFilter, dateFilter } = useAppSelector((state) => state.inventoryAdmin.filteredValue);

  useEffect(() => {
    setDefaultCategory(categoryFilter);
  }, [defaultCategory, setDefaultCategory, categoryFilter]);

  useEffect(() => {
    setDefaultSupplier(brandFilter);
  }, [defaultSupplier, setDefaultSupplier, brandFilter]);

  useEffect(() => {
    setDefaultDate(dateFilter);
  }, [defaultDate, setDefaultDate, dateFilter]);

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
                </section>
              </Col>
              {isDesktop && (
                <Col>
                  <Space size={16}>
                    <DropdownSelect
                      name={t("admin_shop.product.list.filter.category")}
                      data={categortSortList}
                      placement="bottomLeft"
                      onChange={handleOnChangeCategory}
                      currentValue={defaultCategory}
                    />
                    <DropdownSelect
                      name={t("admin_shop.product.list.filter.brand")}
                      data={supplierSortList}
                      placement="bottomRight"
                      onChange={handleOnChangeBrand}
                      currentValue={defaultSupplier}
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
      <SortDrawer
        onClose={onClose}
        open={open}
        t={t}
        categortSortList={categortSortList}
        supplierSortList={supplierSortList}
      />
    </section>
  );
});

export default FilterComponent;

export const SortDrawer = ({ onClose, open, t, supplierSortList, categortSortList }: any) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const [defaultCategory, setDefaultCategory] = useState<any>([]);
  const [defaultSupplier, setDefaultSupplier] = useState<any>([]);
  const [defaultDate, setDefaultDate] = useState<any>(null);

  const { brandFilter, categoryFilter, dateFilter } = useAppSelector((state) => state.inventoryAdmin.filteredValue);

  useEffect(() => {
    setDefaultCategory(categoryFilter);
  }, [defaultCategory, setDefaultCategory, categoryFilter]);

  useEffect(() => {
    setDefaultSupplier(brandFilter);
  }, [defaultSupplier, setDefaultSupplier, brandFilter]);

  useEffect(() => {
    form.setFieldsValue({
      brand: form.getFieldValue("brand")?.length > 0 ? form.getFieldValue("brand") : defaultSupplier,
      category: form.getFieldValue("category")?.length > 0 ? form.getFieldValue("category") : defaultCategory,
    });
  }, [brandFilter, categoryFilter, dateFilter, defaultCategory, defaultSupplier, form]);

  const handleApplySort = (values: any) => {
    const { category, brand } = values;
    const date = defaultDate ? defaultDate.format("DD/MM/YYYY") : null;

    dispatch(setCategoryValue(category));
    dispatch(setBrandValue(brand));
    dispatch(setDateValue(date));
    onClose();
  };

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
          <Button key="submit" form="otherSortProductForm" type="primary" htmlType="submit">
            {t("admin_shop.product.list.filter.apply")}
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical" id="otherSortProductForm" onFinish={handleApplySort}>
        <Form.Item label={t("admin_shop.product.list.filter.category")} name="category" htmlFor="category">
          <Select
            mode="multiple"
            placeholder={t("admin_shop.product.list.filter.select_category")}
            id="category"
            options={categortSortList}
            allowClear
          />
        </Form.Item>

        <Divider />

        <Form.Item label={t("admin_shop.product.list.filter.brand")} name="brand" htmlFor="brand">
          <Select
            mode="multiple"
            id="brand"
            placeholder={t("admin_shop.product.list.filter.select_brand")}
            options={supplierSortList}
            allowClear
          />
        </Form.Item>

        <Divider />

        <Checkbox.Group className="checkbox_group">
          <Form.Item
            name="warranty"
            htmlFor="warranty"
            label={t("admin_shop.inventory.filter.warranty")}
            className="w-full m-0"
          >
            <Row>
              <Col span={12}>
                <Checkbox value="yes" className="leading-8">
                  {t("admin_shop.inventory.filter.yes")}
                </Checkbox>
              </Col>
              <Col span={12}>
                <Checkbox value="no" className="leading-8">
                  {t("admin_shop.inventory.filter.no")}
                </Checkbox>
              </Col>
            </Row>
          </Form.Item>
        </Checkbox.Group>

        <Divider />

        <Checkbox.Group className="checkbox_group">
          <Form.Item
            name="checkbox-group"
            label={t("admin_shop.inventory.filter.warranty_policy")}
            className="w-full m-0"
          >
            <Row>
              <Col span={12}>
                <Checkbox value="12-month" className="leading-8">
                  {t("admin_shop.inventory.filter.12-month_warranty")}
                </Checkbox>
              </Col>
              <Col span={12}>
                <Checkbox value="24-month" className="leading-8">
                  {t("admin_shop.inventory.filter.24-month_warranty")}
                </Checkbox>
              </Col>
              <Col span={12}>
                <Checkbox value="36-month" className="leading-8">
                  {t("admin_shop.inventory.filter.36-month_warranty")}
                </Checkbox>
              </Col>
            </Row>
          </Form.Item>
        </Checkbox.Group>

        <Divider />

        <Checkbox.Group className="checkbox_group">
          <Form.Item name="checkbox-group" label={t("admin_shop.inventory.filter.selling")} className="w-full m-0">
            <Row>
              <Col span={12}>
                <Checkbox value="sale" className="leading-8">
                  {t("admin_shop.inventory.filter.allowing_sales")}
                </Checkbox>
              </Col>
              <Col span={12}>
                <Checkbox value="non-sale" className="leading-8">
                  {t("admin_shop.inventory.filter.not_allowing_sales")}
                </Checkbox>
              </Col>
            </Row>
          </Form.Item>
        </Checkbox.Group>

        <Divider />

        <Form.Item name="date" htmlFor="date-picker" label={t("admin_shop.inventory.filter.creation_date")}>
          <DatePicker className="checkbox_group" id="date-picker" onChange={(state) => setDefaultDate(state)} />
        </Form.Item>
      </Form>
    </S.DrawerStyle>
  );
};
