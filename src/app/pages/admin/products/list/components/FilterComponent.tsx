import { FilterOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Select } from "@app/app/components/common/Select/Select";
import { useResponsive } from "@app/hooks";
import { useGetCategoryForSortQuery } from "@app/store/slices/api/categoryApi";
import { useGetSupplierForSortQuery } from "@app/store/slices/api/supplierApi";
import {
  setBrandValue,
  setCategoryValue,
  setSearchValue,
  setSelectSearchType,
} from "@app/store/slices/redux/admin/productAdminSlice";
import { useAppDispatch, useAppSelector } from "@app/store/store";
import { Button, Col, Divider, Form, Input, Row, Space } from "antd";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "../Product.styles";

import { DropdownSelect } from ".";

const FilterComponent = React.memo(({ searchTypeData }: any) => {
  const { isTablet, isDesktop } = useResponsive();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const shopId = useAppSelector((state) => state.userState.user)?.shop?.id;

  const { data: supplierSortList } = useGetSupplierForSortQuery(shopId);
  const { data: categortSortList } = useGetCategoryForSortQuery(shopId);

  const searchValue = useAppSelector((state) => state.productAdmin.searchValue);

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
  };

  const handleOnChangeBrand = (value: any) => {
    dispatch(setBrandValue(value));
  };

  const [defaultCategory, setDefaultCategory] = useState<any>([]);
  const [defaultSupplier, setDefaultSupplier] = useState<any>([]);

  const { brandFilter, categoryFilter } = useAppSelector((state) => state.productAdmin.filteredValue);

  useEffect(() => {
    setDefaultCategory(categoryFilter);
  }, [defaultCategory, setDefaultCategory, categoryFilter]);

  useEffect(() => {
    setDefaultSupplier(brandFilter);
  }, [defaultSupplier, setDefaultSupplier, brandFilter]);

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

  const { brandFilter, categoryFilter } = useAppSelector((state) => state.productAdmin.filteredValue);

  useEffect(() => {
    setDefaultCategory(categoryFilter);
  }, [defaultCategory, setDefaultCategory, categoryFilter]);

  useEffect(() => {
    setDefaultSupplier(brandFilter);
  }, [defaultSupplier, setDefaultSupplier, brandFilter]);

  useEffect(() => {
    form?.setFieldsValue({
      brand: form.getFieldValue("brand")?.length > 0 ? form.getFieldValue("brand") : defaultSupplier,
      category: form.getFieldValue("category")?.length > 0 ? form.getFieldValue("category") : defaultCategory,
    });
  }, [brandFilter, categoryFilter, defaultCategory, defaultSupplier, form]);

  const handleApplySort = (values: any) => {
    const { category, brand } = values;
    dispatch(setCategoryValue(category));
    dispatch(setBrandValue(brand));
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
      </Form>
    </S.DrawerStyle>
  );
};
