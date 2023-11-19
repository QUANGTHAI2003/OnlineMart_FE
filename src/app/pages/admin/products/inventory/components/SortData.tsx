import { CloseCircleOutlined } from "@ant-design/icons";
import {
  deleteFilteredValue,
  deleteOneFilteredValue,
  setSearchValue,
} from "@app/store/slices/redux/admin/inventoryAdminSlice";
import { useAppDispatch, useAppSelector } from "@app/store/store";
import { Button, Col, Row, Tag } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

import { searchType } from "../ProductInventory";
import * as S from "../ProductInventory.styles";

const SortData = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const filteredValue = useAppSelector((state) => state.inventoryAdmin.filteredValue);

  const handleDeleteAllSort = () => {
    dispatch(deleteFilteredValue());
  };

  return (
    <Row wrap={false} align="middle" className="mb-4">
      <Col className="flex-shrink-0 mr-4">{t("admin_shop.product.list.filter.filtering")}</Col>
      <Col className="flex flex-wrap gap-2 item-center">
        {Object.entries(filteredValue).map((value: any, index: number) => {
          const sortValue = value[1];
          if ((Array.isArray(sortValue) && sortValue.length > 0) || sortValue !== "") {
            return <SortDataItem key={index} value={value} />;
          }
          return null;
        })}
      </Col>
      <Col>
        <Button type="link" onClick={handleDeleteAllSort}>
          <span>{t("admin_shop.product.list.filter.clear_all")}</span>
        </Button>
      </Col>
    </Row>
  );
};

export default SortData;

export const SortDataItem = ({ value }: any) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const {
    selectSearchType,
    filteredValue: { brandFilter, categoryFilter, dateFilter },
  } = useAppSelector((state) => state.inventoryAdmin);

  const currentSearchType = React.useMemo(() => {
    return searchType(t).find((item) => item.value === selectSearchType);
  }, [selectSearchType, t]);

  const handleRemoveSort = (value: any) => {
    const keyValue = value[0];

    if (keyValue === "searchValueFilter") {
      dispatch(setSearchValue(""));
    } else if (keyValue === "categoryFilter") {
      dispatch(deleteOneFilteredValue("categoryFilter"));
    } else if (keyValue === "brandFilter") {
      dispatch(deleteOneFilteredValue("brandFilter"));
    } else if (keyValue === "dateFilter") {
      dispatch(deleteOneFilteredValue("dateFilter"));
    }
  };

  const getFilterText = (value: any) => {
    switch (value[0]) {
      case "searchValueFilter": {
        return currentSearchType ? `${currentSearchType.label}: ${value[1]}` : "";
      }
      case "brandFilter": {
        const brandFilterLength = brandFilter.length;
        return brandFilterLength > 1
          ? `${brandFilter[0]} + ${brandFilterLength - 1} ${t("admin_shop.product.list.filter.brand")}`
          : `${t("admin_shop.product.list.filter.brand")}: ${brandFilter[0]}`;
      }
      case "categoryFilter": {
        const categoryFilterLength = categoryFilter.length;
        return categoryFilterLength > 0
          ? categoryFilterLength > 1
            ? `${categoryFilter[0]} + ${categoryFilterLength - 1} ${t("admin_shop.product.list.filter.category")}`
            : `${t("admin_shop.product.list.filter.category")}: ${categoryFilter[0]}`
          : null;
      }
      case "dateFilter": {
        const dateFilterLength = dateFilter.length;
        return dateFilterLength > 0
          ? dateFilterLength > 1
            ? `${t("admin_shop.product.list.filter.date")}: ${dateFilter}`
            : `${t("admin_shop.product.list.filter.date")}: ${dateFilter}`
          : null;
      }

      default:
        return null;
    }
  };

  const shouldShowSortItem = (value: any) => {
    switch (value[0]) {
      case "searchValueFilter":
        return value[1] !== "";
      case "categoryFilter":
        return categoryFilter.length > 0;
      case "brandFilter":
        return brandFilter.length > 0;
      case "dateFilter":
        return dateFilter;
      default:
        return false;
    }
  };

  if (shouldShowSortItem(value)) {
    return (
      <S.SortDataItemStyle className="d-inline-block margin-bottom-half">
        <Tag className="sort-item">
          <span>{getFilterText(value)}</span>
          <CloseCircleOutlined onClick={() => handleRemoveSort(value)} />
        </Tag>
      </S.SortDataItemStyle>
    );
  }
  return null;
};
