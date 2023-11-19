import { FilterOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useResponsive } from "@app/hooks";
import {
  setDate,
  setDeliveryGHTK,
  setDeliveryOm,
  setSearchValue,
  setSelectSearchType,
} from "@app/store/slices/redux/admin/orderAdminSlice";
import { useAppDispatch, useAppSelector } from "@app/store/store";
import { Button, Checkbox, Col, DatePicker, Form, Input, Radio, Row, Select, Space } from "antd";
import dayjs from "dayjs";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { searchType } from "../Order";
import * as S from "../Order.styles";

const FilterComponent = React.memo(() => {
  const { isTablet } = useResponsive();
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedSearchTypeLabel, setSelectedSearchTypeLabel] = useState(t("admin_shop.orders.list.filter.type.id"));
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector((state) => state.orderAdmin.searchValue);
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
    const selectedSearchType = searchType(t).find((item: any) => item.value === key);
    if (selectedSearchType) {
      setSelectedSearchTypeLabel(selectedSearchType.label);
    }
    dispatch(setSelectSearchType(key));
  };

  const [defaultOrderId, setDefaultOrderId] = useState<any>([]);
  const { OrderIdFilter } = useAppSelector((state) => state.orderAdmin.searchValue);

  useEffect(() => {
    setDefaultOrderId(OrderIdFilter);
  }, [defaultOrderId, setDefaultOrderId, OrderIdFilter]);

  return (
    <S.Filter>
      <section className="filte px-6 bg-white pt-4 pb-6">
        <Row gutter={16} wrap={false} align="middle">
          <Col className="flex-1 mb-3">
            <Form>
              <Row gutter={16} align="middle">
                <Col className="flex-grow">
                  <section>
                    <Space.Compact className="flex items-center" size="large">
                      <Select
                        className="w-36"
                        defaultValue={searchType(t)[0].value}
                        options={searchType(t)}
                        onChange={handleSelectSearchType}
                      />
                      <div className="flex-grow">
                        <Input
                          value={searchValue}
                          placeholder={t("admin_shop.orders.list.filter.placeholder", {
                            placeholder: selectedSearchTypeLabel.toLowerCase(),
                          })}
                          prefix={<SearchOutlined />}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
                        />
                      </div>
                    </Space.Compact>
                  </section>
                </Col>
              </Row>
            </Form>
          </Col>

          <Col>
            <Button size="large" className="mb-3 filter_drawer" onClick={showDrawer}>
              {isTablet ? (
                <>
                  <span className="mr-2 ">{t("admin_shop.orders.list.filter.other_filter")}</span>
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
    </S.Filter>
  );
});

export default FilterComponent;

const SortDrawer = ({ onClose, open, t }: any) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const [defaultDelivery] = useState<boolean>(false);
  const { delivery_om, delivery_ghtk, dateFilter } = useAppSelector((state) => state.orderAdmin.filteredValue);

  useEffect(() => {
    form.setFieldsValue({
      delivery_om: false,
      delivery_ghtk: false,
    });
  }, [delivery_om, delivery_ghtk, form, dateFilter]);

  const handleApplySort = (values: any) => {
    const { delivery_om, delivery_ghtk, date } = values;

    dispatch(setDeliveryOm(delivery_om));
    dispatch(setDeliveryGHTK(delivery_ghtk));
    dispatch(setDate(dayjs(date).format("YYYY-MM-DD")));
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
          <Button onClick={onClose} htmlType="submit" type="primary" form="ortherSortOrderForm">
            {t("admin_shop.product.list.filter.apply")}
          </Button>
        </div>
      }
    >
      <Form form={form} id="ortherSortOrderForm" onFinish={handleApplySort}>
        <Row className="mt-6  checkbox-group h-38 ">
          <Col span={23} className="mb-3 mt-6">
            <h4>{t("admin_shop.orders.list.filter.delivery")}</h4>
          </Col>
          <Col span={1} className="mb-3 flex mt-6 ">
            <Link to="#">
              <span>{t("admin_shop.orders.list.filter.delete_filter")}</span>
            </Link>
          </Col>
          <Col span={24}>
            <Checkbox.Group defaultValue={[defaultDelivery]} className="w-full">
              <Row>
                <Col span={12} className="mb-4">
                  <Form.Item name="delivery_om" valuePropName="checked">
                    <Checkbox value="delivery_om">OM Delivery</Checkbox>
                  </Form.Item>
                </Col>
                <Col span={12} className="mb-4">
                  <Form.Item name="delivery_ghtk" valuePropName="checked">
                    <Checkbox value="delivery_ghtk">GHTK Delivery</Checkbox>
                  </Form.Item>
                </Col>
              </Row>
            </Checkbox.Group>
          </Col>
        </Row>

        <Row className="mt-6 radio-group h-38 ">
          <Col span={23} className="mb-3 mt-6">
            <h4>{t("admin_shop.orders.list.filter.order_date")}</h4>
          </Col>
          <Col span={1} className="mb-3 flex mt-6 ">
            <Link to="#">
              <span>{t("admin_shop.orders.list.filter.delete_filter")}</span>
            </Link>
          </Col>
          <Col span={24}>
            <Radio.Group className="w-full">
              <Row>
                <Col span={24} className="mt-4 w-full">
                  <Form.Item name="date">
                    <DatePicker className="w-full date" format="YYYY-MM-DD" />
                  </Form.Item>
                </Col>
              </Row>
            </Radio.Group>
          </Col>
        </Row>
      </Form>
    </S.DrawerStyle>
  );
};
