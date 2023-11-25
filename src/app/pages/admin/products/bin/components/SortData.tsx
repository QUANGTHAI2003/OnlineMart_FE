import { CloseCircleOutlined } from "@ant-design/icons";
import { deleteFilteredValue, setSearchValue } from "@app/store/slices/redux/admin/binAdminSlice";
import { useAppDispatch, useAppSelector } from "@app/store/store";
import { Button, Col, Row, Tag } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

import * as S from "../../inventory/ProductInventory.styles";
import { searchType } from "../Bin";

const SortData = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const filteredValue = useAppSelector((state) => state.binAdmin.filteredValue);

  const handleDeleteAllSort = () => {
    dispatch(deleteFilteredValue());
    dispatch(setSearchValue(""));
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

  const { selectSearchType } = useAppSelector((state) => state.binAdmin);

  const currentSearchType = React.useMemo(() => {
    return searchType(t).find((item) => item.value === selectSearchType);
  }, [selectSearchType, t]);

  const handleRemoveSort = (value: any) => {
    const keyValue = value[0];

    if (keyValue === "searchValueFilter") {
      dispatch(setSearchValue(""));
    }
  };

  const getFilterText = (value: any) => {
    switch (value[0]) {
      case "searchValueFilter": {
        return currentSearchType ? `${currentSearchType.label}: ${value[1]}` : "";
      }

      default:
        return null;
    }
  };

  const shouldShowSortItem = (value: any) => {
    switch (value[0]) {
      case "searchValueFilter":
        return value[1] !== "";
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
