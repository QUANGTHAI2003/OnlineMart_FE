import { FilterOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useResponsive } from "@app/hooks";
import { Button, Checkbox, Col, DatePicker, Form, Input, Radio, Row, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import * as S from "../Order.styles";
interface IFilterComponentProps {
  setSearchValue: (value: string) => void;
  setSelectSearchType: (key: any) => void;
  searchTypeData: any[];
}
interface ISortDrawerProps {
  onClose: () => void;
  open: boolean;
  t: any;
}
const { RangePicker } = DatePicker;
const FilterComponent = React.memo(({ setSearchValue, setSelectSearchType, searchTypeData }: IFilterComponentProps) => {
  const { isTablet } = useResponsive();
  const { t } = useTranslation();

  const [open, setOpen] = useState<boolean>(false);
  const [selectedSearchTypeLabel, setSelectedSearchTypeLabel] = useState(searchTypeData[0].label);

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
  }, []);

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
                        defaultValue={searchTypeData[0].value}
                        options={searchTypeData}
                        onChange={handleSelectSearchType}
                      />
                      <div className="flex-grow">
                        <Input
                          placeholder={t("admin_shop.orders.list.filter.placeholder", {
                            placeholder: selectedSearchTypeLabel.toLowerCase(),
                          })}
                          prefix={<SearchOutlined />}
                          onChange={(e) => handleSearch(e.target.value)}
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
        <S.OmCol>
          <div className="om-col">
            <div className="om-col-col">{t("admin_shop.orders.list.filter.not_printed")}</div>
          </div>
          <div className="om-col">
            <div className="om-col-col">{t("admin_shop.orders.list.filter.need_invoice")}</div>
          </div>
        </S.OmCol>
        <SortDrawer onClose={onClose} open={open} t={t} />
      </section>
    </S.Filter>
  );
});

export default FilterComponent;

const SortDrawer = ({ onClose, open, t }: ISortDrawerProps) => {
  const handleChange = (value: any) => {
    console.log(`selected ${value}`);
  };
  const [showRangePicker, setShowRangePicker] = useState(false);

  const onChange = (checkedValues: any) => {
    console.log("checked = ", checkedValues);
  };
  const handleRadioChange = (e: any) => {
    if (e.target.value === t("admin_shop.orders.list.filter.custom")) {
      setShowRangePicker(true);
    } else {
      setShowRangePicker(false);
    }
  };
  const [value, setValue] = useState(1);

  const onChangeRadio = (e: any) => {
    console.log("radio check: ", e.target.value);
    setValue(e.target.value);
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
          <Button onClick={onClose} type="primary">
            {t("admin_shop.product.list.filter.apply")}
          </Button>
        </div>
      }
    >
      <S.FilterComponent>
        <Row className="">
          <Col span={23} className="mb-3  ">
            <h4>{t("admin_shop.orders.list.filter.order_label")}</h4>
          </Col>
          <Col span={1} className="mb-3 flex ">
            <Link to="#">
              <span>{t("admin_shop.orders.list.filter.delete_filter")}</span>
            </Link>
          </Col>
          <Col span={24}>
            <Select
              className="w-full"
              defaultValue={t("admin_shop.orders.list.filter.order_label")}
              onChange={handleChange}
              options={[
                { value: "jack", label: t("admin_shop.orders.list.filter.invoice_required") },
                { value: "lucy", label: t("admin_shop.orders.list.filter.invoice_issued") },
              ]}
            />
          </Col>
        </Row>
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
            <Checkbox.Group className="w-full" onChange={onChange}>
              <Row>
                <Col span={12} className="mb-4">
                  <Checkbox value={t("admin_shop.orders.list.filter.om_delivery")}>
                    {t("admin_shop.orders.list.filter.om_delivery")}
                  </Checkbox>
                </Col>
                <Col span={12} className="mb-4">
                  <Checkbox value={t("admin_shop.orders.list.filter.ghtk_delivery")}>
                    {t("admin_shop.orders.list.filter.ghtk_delivery")}
                  </Checkbox>
                </Col>
                <Col span={12}>
                  <Checkbox value={t("admin_shop.orders.list.filter.shop_delivery")}>
                    {t("admin_shop.orders.list.filter.shop_delivery")}
                  </Checkbox>
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
            <Radio.Group className="w-full" value={value} onChange={onChangeRadio}>
              <Row>
                <Col span={12} className="mb-4">
                  <Radio value={t("admin_shop.orders.list.filter.today")}>
                    {t("admin_shop.orders.list.filter.today")}
                  </Radio>
                </Col>
                <Col span={12} className="mb-4">
                  <Radio value={t("admin_shop.orders.list.filter.last_7")}>
                    {t("admin_shop.orders.list.filter.last_7")}
                  </Radio>
                </Col>
                <Col span={12} className="mb-4">
                  <Radio value={t("admin_shop.orders.list.filter.last_30")}>
                    {t("admin_shop.orders.list.filter.last_30")}
                  </Radio>
                </Col>
                <Col span={12}>
                  <Radio value={t("admin_shop.orders.list.filter.all_time")}>
                    {t("admin_shop.orders.list.filter.all_time")}
                  </Radio>
                </Col>
                <Col span={12}>
                  <Radio onChange={handleRadioChange} value={t("admin_shop.orders.list.filter.custom")}>
                    {t("admin_shop.orders.list.filter.custom")}
                  </Radio>
                </Col>

                {showRangePicker && (
                  <Col span={24} className="mt-4">
                    <RangePicker showTime={{ format: "HH:mm" }} format="YYYY-MM-DD HH:mm" onChange={onChange} />
                  </Col>
                )}
              </Row>
            </Radio.Group>
          </Col>
        </Row>
      </S.FilterComponent>
    </S.DrawerStyle>
  );
};
