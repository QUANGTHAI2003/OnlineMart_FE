import { FilterOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Select } from "@app/app/components/common/Select/Select";
import { useResponsive } from "@app/hooks";
import { useGetCategoryForSortQuery } from "@app/store/slices/api/categoryApi";
import { useGetSupplierForSortQuery } from "@app/store/slices/api/supplierApi";
import {
  setBrandValue,
  setCategoryValue,
  setHasRepliedIncluded,
  setMediaIncluded,
  setStartDate,
  setEndDate,
  setSearchValue,
  setSelectSearchType,
} from "@app/store/slices/redux/admin/reviewAdminSlice";
import { useAppDispatch, useAppSelector } from "@app/store/store";
import { Button, Checkbox, Col, DatePicker, Divider, Form, Input, Radio, Row, Space } from "antd";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "../ProductReview.styles";

import DropdownSelect from "./DropdownSelect";

const { RangePicker } = DatePicker;

const rangeConfig = {
  rules: [{ type: "array" as const, required: true, message: "Please select time!" }],
};

const FilterComponent = React.memo(({ searchTypeData }: any) => {
  const { isTablet, isDesktop } = useResponsive();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const shopId = useAppSelector((state) => state.userState.user)?.shop?.id;

  const { data: supplierSortList } = useGetSupplierForSortQuery(shopId);
  const { data: categortSortList } = useGetCategoryForSortQuery(shopId);
  const searchValue = useAppSelector((state) => state.reviewAdmin.searchValue);

  const [open, setOpen] = useState<boolean>(false);
  const [selectedSearchTypeLabel, setSelectedSearchTypeLabel] = useState<string>(searchTypeData[0].label);
  const [defaultCategory, setDefaultCategory] = useState<any>([]);
  const [defaultSupplier, setDefaultSupplier] = useState<any>([]);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleSearch = (value: any) => {
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
  const { brandFilter, categoryFilter } = useAppSelector((state) => state.reviewAdmin.filteredValue);

  useEffect(() => {
    setDefaultCategory(categoryFilter);
  }, [defaultCategory, setDefaultCategory, categoryFilter]);

  useEffect(() => {
    setDefaultSupplier(brandFilter);
  }, [defaultSupplier, setDefaultSupplier, brandFilter]);

  return (
    <section className="filter pt-4 pb-6">
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
  const [dateRange, setDateRange] = useState<any>(null);

  const [replyFilter, setReplyFilter] = useState<boolean | null>(null);

  const { brandFilter, categoryFilter } = useAppSelector(
    (state) => state.reviewAdmin.filteredValue
  );
  const { mediaFilter, hasRepliedFilter } = useAppSelector((state) => state.reviewAdmin);
  useEffect(() => {
    if (hasRepliedFilter === null ) {
      setReplyFilter(null);
    } else if (hasRepliedFilter) {
      setReplyFilter(true);
    } else {
      setReplyFilter(false);
    }
  }, [hasRepliedFilter]);

  useEffect(() => {
    setDefaultCategory(categoryFilter);
    setDefaultSupplier(brandFilter);
  }, [categoryFilter, brandFilter]);

  useEffect(() => {
    form.setFieldsValue({
      brand: brandFilter,
      category: categoryFilter,
      media: mediaFilter,
      reply: replyFilter,
    });
  }, [brandFilter, categoryFilter, mediaFilter, form]);

  const handleApplySort = (values: any) => {
    const { category, brand, media, reply } = values;
    const startDate = dateRange ? dateRange[0].format("YYYY-MM-DD") : null;
    const endDate = dateRange ? dateRange[1].format("YYYY-MM-DD") : null;
    dispatch(setCategoryValue(category));
    dispatch(setBrandValue(brand));
    dispatch(setMediaIncluded(media));
    dispatch(setStartDate(startDate));
    dispatch(setEndDate(endDate));
    dispatch(setHasRepliedIncluded(reply));

    onClose();
  };

  return (
    <S.DrawerStyle
      title={t("admin_shop.product.list.filter.other_filter")}
      placement="right"
      onClose={onClose}
      open={open}
      width={500}
      footer={
        <div className="grid grid-cols-2 gap-x-3">
          <Button onClick={onClose}>{t("admin_shop.product.review.filter.clear_all")}</Button>
          <Button key="submit" form="otherSortReviewForm" type="primary" htmlType="submit">
            {t("admin_shop.product.review.filter.apply")}
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical" id="otherSortReviewForm" onFinish={handleApplySort}>
        <Checkbox.Group className="checkbox_group">
            <Col span={12}>
              <Form.Item name="media" valuePropName="checked">
                <Checkbox style={{ lineHeight: "32px" }}>
                  {t("admin_shop.product.review.filter.include_media")}
                </Checkbox>
              </Form.Item>
            </Col>
        </Checkbox.Group>

        <Divider />

        <Form.Item name="reply" label={t("admin_shop.product.review.filter.seller_reply")}>
          <Radio.Group className="radio_group" value={replyFilter} onChange={(e) => setReplyFilter(e.target.value)}>
            <Row>
              <Col span={12}>
                <Radio value={true}>{t("admin_shop.product.review.filter.already_replied")}</Radio>
              </Col>
              <Col span={12}>
                <Radio value={false}>{t("admin_shop.product.review.filter.not_yet_replied")}</Radio>
              </Col>
            </Row>
          </Radio.Group>
        </Form.Item>

        <Divider />

        <Form.Item label={t("admin_shop.product.list.filter.category")} name="category" htmlFor="category">
          <Select
            mode="multiple"
            placeholder={t("admin_shop.product.list.filter.select_category")}
            id="category"
            options={categortSortList}
            allowClear
            defaultValue={form.getFieldValue("category")?.length > 0 ? form.getFieldValue("category") : defaultCategory}
          />
        </Form.Item>

        <Divider />

        <Form.Item label={t("admin_shop.product.list.filter.brand")} htmlFor="brand" name="brand">
          <Select
            mode="multiple"
            id="brand"
            placeholder={t("admin_shop.product.list.filter.select_brand")}
            options={supplierSortList}
            allowClear
            defaultValue={form.getFieldValue("brand")?.length > 0 ? form.getFieldValue("brand") : defaultSupplier}
          />
        </Form.Item>

        <Divider />

        <Form.Item label={t("admin_shop.product.review.filter.review_date")} {...rangeConfig}>
          <Row>
            <Col span={24}>
              <RangePicker onChange={(dates: any) => setDateRange(dates)} className="range_picker" />
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </S.DrawerStyle>
  );
};
