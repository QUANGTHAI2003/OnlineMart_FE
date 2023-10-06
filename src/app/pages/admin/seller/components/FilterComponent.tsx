import { Button, Col, Form, Input, Select, Space } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import FillerDrawer from "./FillerDrawer";
import * as S from "../SellerInfo.styles";
const sellerTypeData = (t: any) => {
  return [
    { value: t("admin_shop.seller.filter.type.all"), label: t("admin_shop.seller.filter.type.all") },
    { value: t("admin_shop.seller.filter.type.sale_country"), label: t("admin_shop.seller.filter.type.sale_country") },
    { value: t("admin_shop.seller.filter.type.sale_country"), label: t("admin_shop.seller.filter.type.sale_country") },
  ];
}

const sellerAdminTypeData = (t: any) => {
  return [ 
    { value: t("admin_shop.seller.filter.type.all"), label: t("admin_shop.seller.filter.type.all") },
    { value: t("admin_shop.seller.filter.type.shop_admin"), label: t("admin_shop.seller.filter.type.shop_admin") },
    { value: t("admin_shop.seller.filter.type.not_shop_admin"), label: t("admin_shop.seller.filter.type.not_shop_admin") },
  ];
}

const FilterComponent = React.memo(
  ({ setSearchValue, setSelectSearchType, searchTypeData, profileStatusTypeData, statusTypeData }: any) => {
    const { t } = useTranslation();
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
    const [selectedSearchTypeLabel, setSelectedSearchTypeLabel] = useState<string>(searchTypeData[0].label);
    return (
      <Form>
        <S.RowCustom gutter={16} align="middle" className="gap-y-2">
          <Col xs={24} lg={12}>
            <Space.Compact className="flex items-center" size="middle">
              <Select
                defaultValue={searchTypeData[0].value}
                className="w-52"
                onChange={handleSelectSearchType}
                options={searchTypeData}
              />
              <div className="flex-grow">
                <Input
                  size="middle"
                  placeholder={t("admin_shop.seller.filter.placeholder", {
                    placeholder: selectedSearchTypeLabel.toLowerCase(),
                  })}
                  onChange={(e: any) => handleSearch(e.target.value)}
                />
              </div>
            </Space.Compact>
          </Col>
          <Col xs={24} lg={12}>
            <S.FilterTypeSpace size={8}>
              <Select placeholder={t("admin_shop.seller.filter.type.condition")} dropdownMatchSelectWidth={false} size="middle" options={statusTypeData} />
              <Select placeholder={t("admin_shop.seller.filter.type.profile_status")} size="middle" dropdownMatchSelectWidth={false} options={profileStatusTypeData} />
              <FillerDrawer statusTypeData={statusTypeData} sellerTypeData={sellerTypeData(t)} profileStatusTypeData={profileStatusTypeData} sellerAdminTypeData={sellerAdminTypeData(t)} />
            </S.FilterTypeSpace>
          </Col>
          <Col span={24} className="flex" >
          <div className="flex-1"></div>
          <Space size={8}>
            <Button>{t("admin_shop.seller.filter.reset_btn")}</Button>
            <Button type="primary">{t("admin_shop.seller.filter.search_btn")}</Button>
          </Space>
          </Col>
        </S.RowCustom>
      </Form>
    );
  }
);

export default FilterComponent;
