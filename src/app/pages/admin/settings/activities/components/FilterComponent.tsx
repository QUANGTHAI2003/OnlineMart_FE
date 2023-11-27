import { FilterOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useResponsive } from "@app/hooks";
import { useGetMembersShopQuery } from "@app/store/slices/api/activityApi";
import {
  setActionValue,
  setAuthorValue,
  setEndDate,
  setSearchValue,
  setSelectSearchType,
  setStartDate,
} from "@app/store/slices/redux/admin/activityAdminSlice";
import { useAppDispatch, useAppSelector } from "@app/store/store";
import { Button, Col, DatePicker, Divider, Form, Input, Row, Select, Space } from "antd";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { LogFilterModule } from "../data";
import * as S from "../Log.styles";

import { DropdownSelect } from ".";
const { RangePicker } = DatePicker;

const FilterComponent = React.memo(({ searchTypeData }: any) => {
  const { isTablet, isDesktop } = useResponsive();
  const { t } = useTranslation();
  const { data: members = [] } = useGetMembersShopQuery();
  const dispatch = useAppDispatch();

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

  const handleOnChangeAuthor = (value: any) => {
    dispatch(setAuthorValue(value));
    setDefaultAuthor(value);
  };

  const handleOnChangeAction = (value: any) => {
    dispatch(setActionValue(value));
    setDefaultAction(value);
  };

  const [defaultAuthor, setDefaultAuthor] = useState<any>([]);
  const [defaultAction, setDefaultAction] = useState<any>([]);

  const { authorFilter } = useAppSelector((state) => state.activityAdmin.filteredValue);
  const { actionFilter } = useAppSelector((state) => state.activityAdmin.filteredValue);

  useEffect(() => {
    setDefaultAuthor(authorFilter);
  }, [defaultAuthor, setDefaultAuthor, authorFilter]);

  useEffect(() => {
    setDefaultAction(actionFilter);
  }, [defaultAction, setDefaultAction, actionFilter]);

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
                        // value={searchValue}
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
                      name={t("admin_shop.settings.logs.table.author")}
                      data={members}
                      placement="bottomLeft"
                      onChange={handleOnChangeAuthor}
                      currentValue={defaultAuthor}
                    />
                    <DropdownSelect
                      name={t("admin_shop.settings.logs.table.action")}
                      data={LogFilterModule}
                      placement="bottomRight"
                      onChange={handleOnChangeAction}
                      currentValue={defaultAction}
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
  const { data: members = [] } = useGetMembersShopQuery();

  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [dateRange, setDateRange] = useState<any>(null);

  const authorData = useAppSelector((state) => state.activityAdmin.filteredValue.authorFilter);
  const actionData = useAppSelector((state) => state.activityAdmin.filteredValue.actionFilter);

  useEffect(() => {
    form.setFieldsValue({
      author: authorData,
      action: actionData,
    });
  }, [form, authorData, actionData]);

  const handleApplySort = (values: any) => {
    const { author, action } = values;
    const startDate = dateRange ? dateRange[0].format("DD-MM-YYYY") : null;
    const endDate = dateRange ? dateRange[1].format("DD-MM-YYYY") : null;
    dispatch(setAuthorValue(author));
    dispatch(setActionValue(action));
    dispatch(setStartDate(startDate));
    dispatch(setEndDate(endDate));
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
          <Button form="activityDrawerSort" onClick={onClose} type="primary" htmlType="submit">
            {t("admin_shop.product.list.filter.apply")}
          </Button>
        </div>
      }
    >
      <Form form={form} id="activityDrawerSort" layout="vertical" onFinish={handleApplySort} autoComplete="off">
        <Form.Item name="author" label={t("admin_shop.settings.logs.table.author")} htmlFor="author">
          <Select
            mode="multiple"
            id="author"
            placeholder={t("admin_shop.settings.logs.filter.select_author")}
            popupMatchSelectWidth={false}
            options={members}
            allowClear
          />
        </Form.Item>

        <Divider />

        <Form.Item name="action" label={t("admin_shop.settings.logs.table.action")} htmlFor="action">
          <Select
            mode="multiple"
            id="action"
            placeholder={t("admin_shop.settings.logs.filter.select_action")}
            popupMatchSelectWidth={false}
            options={LogFilterModule}
            allowClear
          />
        </Form.Item>

        <Divider />

        <Form.Item name="date-picker" label={t("admin_shop.settings.logs.filter.time")}>
          <RangePicker onChange={(dates: any) => setDateRange(dates)} className="checkbox_group" />
        </Form.Item>
      </Form>
    </S.DrawerStyle>
  );
};
