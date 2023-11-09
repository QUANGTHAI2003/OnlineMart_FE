import {
  setPermission,
  setSearchValue,
  setSelectSearchType,
  setStatusType,
} from "@app/store/slices/redux/admin/sellerAdminSlice";
import { useAppDispatch, useAppSelector } from "@app/store/store";
import { Col, Form, Input, Row, Select, Space } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "../SellerInfo.styles";

import DropdownSelect from "./DropdownSelect";
import FillerDrawer from "./FillerDrawer";

const FilterComponent = React.memo(({ searchTypeData, statusTypeData, permissionList }: any) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [selectedSearchTypeLabel, setSelectedSearchTypeLabel] = useState<string>(searchTypeData[0].label);

  const statusType = useAppSelector((state) => state.sellerAdmin.filteredValue.statusType) || "all";
  const permissionFilter = useAppSelector((state) => state.sellerAdmin.filteredValue.permissionFilter) || [];

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

  const handleChangeStatusType = (status: any) => {
    dispatch(setStatusType(status));
  };

  const handleOnChangePermission = (value: any) => {
    dispatch(setPermission(value.at(-1)));
  };

  return (
    <Form>
      <S.RowCustom gutter={16} align="middle" className="gap-y-2">
        <Col xs={24} lg={16}>
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
        <Col xs={24} lg={8}>
          <S.FilterTypeSpace>
            <Row gutter={8}>
              <Col span={8}>
                <Select
                  placeholder={t("admin_shop.seller.filter.type.condition")}
                  popupMatchSelectWidth={false}
                  size="middle"
                  options={statusTypeData}
                  className="w-full"
                  onChange={handleChangeStatusType}
                  defaultValue={statusType[0]}
                  value={statusType}
                />
              </Col>
              <Col span={8}>
                <DropdownSelect
                  name={t("admin_shop.seller.register.form.permission")}
                  data={permissionList?.map((item: any) => {
                    return { label: item.name, value: item.name };
                  })}
                  placement="top"
                  onChange={handleOnChangePermission}
                  currentValue={permissionFilter}
                />
              </Col>
              <Col span={8}>
                <FillerDrawer statusTypeData={statusTypeData} permissionList={permissionList} />
              </Col>
            </Row>
          </S.FilterTypeSpace>
        </Col>
      </S.RowCustom>
    </Form>
  );
});

export default FilterComponent;
