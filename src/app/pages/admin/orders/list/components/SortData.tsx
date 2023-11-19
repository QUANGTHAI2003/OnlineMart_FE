import { CloseCircleOutlined } from "@ant-design/icons";
import {
  deleteFilteredValue,
  deleteOneFilteredValue,
  setSearchValue,
} from "@app/store/slices/redux/admin/orderAdminSlice";
import { useAppDispatch, useAppSelector } from "@app/store/store";
import { Button, Col, Row, Tag } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

import { searchType } from "../Order";
import * as S from "../Order.styles";

const SortData = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const filteredValue = useAppSelector((state) => state.orderAdmin.filteredValue);

  const handleDeleteAllSort = () => {
    dispatch(deleteFilteredValue());
  };

  return (
    <S.SortData>
      <Row wrap={false} align="middle" className="mb-4 row-block">
        <Col className="flex-shrink-0 flex mr-4 filtering">{t("admin_shop.product.list.filter.filtering")}</Col>
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
    </S.SortData>
  );
};

export default SortData;

export const SortDataItem = ({ value }: any) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    selectSearchType,
    filteredValue: { delivery_om, delivery_ghtk, dateFilter },
  } = useAppSelector((state) => state.orderAdmin);

  const currentSearchType = React.useMemo(() => {
    return searchType(t).find((item) => item.value === selectSearchType);
  }, [selectSearchType, t]);
  const handleRemoveSort = (value: any) => {
    const keyValue = value[0];
    if (keyValue === "searchValueFilter") {
      console.log("Removing searchValueFilter");
      dispatch(setSearchValue(""));
    } else if (keyValue === "dateFilter") {
      console.log("Removing dateFilter");
      dispatch(deleteOneFilteredValue("dateFilter"));
    } else if (keyValue === "delivery_ghtk") {
      console.log("Removing deliveryFilter");
      dispatch(deleteOneFilteredValue("delivery_ghtk"));
    }
  };

  const getFilterText = (value: any) => {
    switch (value[0]) {
      case "searchValueFilter": {
        return currentSearchType ? `${currentSearchType.label}: ${value[1]}` : "";
      }
      case "delivery_ghtk": {
        const ghtkDeliveryLength = delivery_ghtk.length;
        return ghtkDeliveryLength > 1
          ? `${t("admin_shop.product.list.filter.filtering")} ${t("admin_shop.orders.list.filter.ghtk_delivery")}`
          : `${t("admin_shop.product.list.filter.filtering")} ${t("admin_shop.orders.list.filter.ghtk_delivery")}`;
      }
      case "delivery_om": {
        const omDeliveryLength = delivery_om.length;
        return omDeliveryLength > 1
          ? `${t("admin_shop.product.list.filter.filtering")} ${t("admin_shop.orders.list.filter.om_delivery")}`
          : `${t("admin_shop.product.list.filter.filtering")} ${t("admin_shop.orders.list.filter.om_delivery")}`;
      }
      case "dateFilter": {
        const dateFilterLength = dateFilter.length;
        return dateFilterLength > 1
          ? `${t("admin_shop.product.list.filter.filtering")} ${value[1]}`
          : `${t("admin_shop.product.list.filter.filtering")}  ${value[1]}`;
      }
      default:
        return null;
    }
  };

  const shouldShowSortItem = (value: any) => {
    console.log(value);
    switch (value[0]) {
      case "searchValueFilter":
        return value[1] !== "";
      case "delivery_om":
        return delivery_om === true;
      case "delivery_ghtk":
        return delivery_ghtk === true;
      case "dateFilter":
        return dateFilter.length > 0;
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
