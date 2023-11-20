import { useAppDispatch, useAppSelector } from "@app/store/store";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Form, Radio, Row } from "antd";
import { useTranslation } from "react-i18next";
import {
  deleteFilteredValue,
  deleteOneFilteredValue,
  setHasRepliedIncluded,
  setMediaIncluded,
  setSearchValue,
} from "@app/store/slices/redux/admin/reviewAdminSlice";
import { searchType } from "../data";
import React from "react";

const Filter = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const filteredValue = useAppSelector((state) => state.reviewAdmin.filteredValue);
  const { mediaFilter, hasRepliedFilter } = useAppSelector((state) => state.reviewAdmin);
  const isFilteredValueEmpty = Object.values(filteredValue).every(
    (value) => !value || (Array.isArray(value) && value.length === 0)
  );

  const handleDeleteAllSort = () => {
    dispatch(deleteFilteredValue());
  };

  const handleChange = (e: any) => {
    const { value } = e.target;
    if (value === "media") {
      dispatch(setMediaIncluded(true));
      dispatch(setHasRepliedIncluded(null));
    } else if (value === "reply") {
      dispatch(setHasRepliedIncluded(true));
      dispatch(setMediaIncluded(false));
    } else {
      dispatch(setMediaIncluded(false));
      dispatch(setHasRepliedIncluded(false));
    }
  };
  const toggleDisable = (value: any) => {
    if (value === "media") {
      dispatch(setMediaIncluded(false));
    } else {
      dispatch(setHasRepliedIncluded(null));
    }
  };
  return (
    <div>
      <Form.Item rules={[{ required: true, message: "Please pick an item!" }]} className="form_item">
        <Radio.Group onChange={handleChange} optionType="button" buttonStyle="solid">
          <Row className="row_radio">
            <Col>
              <Radio.Button onClick={() => toggleDisable("media")} className={mediaFilter ? "radio_button_enabled" : "radio_button_disabled"} value="media">
                {t("admin_shop.product.review.filter.include_media")}
              </Radio.Button>
            </Col>
            <Col> 
              <Radio.Button onClick={() => toggleDisable("unanswered")} className={hasRepliedFilter === null ? "radio_button_disabled" : hasRepliedFilter ? "" : "radio_button_enabled"} value="unanswered">
                {t("admin_shop.product.review.filter.not_yet_replied")}
              </Radio.Button>
            </Col>
            <Col>
              <Radio.Button onClick={() => toggleDisable("reply")} className={hasRepliedFilter === null ? "radio_button_disabled" : hasRepliedFilter ? "radio_button_enabled" : ""} value="reply">
                {t("admin_shop.product.review.filter.already_replied")}
              </Radio.Button>
            </Col>
          </Row>
        </Radio.Group>
      </Form.Item>
      {!isFilteredValueEmpty && (
        <Row className="row_filtering">
          <Col xs={24} sm={24} md={5} lg={3} xl={3} className="filtering">
            {`${t("admin_shop.product.review.filter.filtering")}:`}
          </Col>
          <Col xs={24} sm={24} md={18} lg={21} xl={21} className="rating_type">
            {Object.entries(filteredValue).map((value: any, index: number) => {
              const sortValue = value[1];
              if ((Array.isArray(sortValue) && sortValue.length > 0) || sortValue !== "") {
                return <SortDataItem key={index} value={value} />;
              }
              return null;
            })}
            <div className="delete_all">
              <Button type="primary" onClick={handleDeleteAllSort} ghost className="delete_button">
                {t("admin_shop.product.review.filter.clear_all")}
              </Button>
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Filter;

export const SortDataItem = ({ value }: any) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    selectSearchType,
    filteredValue: { brandFilter, categoryFilter, startDateFilter, endDateFilter },
  } = useAppSelector((state) => state.reviewAdmin);
  const currentSearchType = React.useMemo(() => {
    return searchType(t).find((item: any) => item.value === selectSearchType);
  }, [selectSearchType, t]);

  const handleRemoveSort = (value: any) => {
    const keyValue = value[0];
    if (keyValue === "searchValueFilter") {
      dispatch(setSearchValue(""));
    } else if (keyValue === "categoryFilter") {
      dispatch(deleteOneFilteredValue("categoryFilter"));
    } else if (keyValue === "brandFilter") {
      dispatch(deleteOneFilteredValue("brandFilter"));
    } else if (keyValue === "startDateFilter") {
      dispatch(deleteOneFilteredValue("startDateFilter"));
      dispatch(deleteOneFilteredValue("endDateFilter"));
    }
  };

  const getFilterText = (value: any) => {
    switch (value[0]) {
      case "searchValueFilter": {
        return currentSearchType ? `${currentSearchType.label}: ${value[1]}` : "";
      }
      case "brandFilter": {
        const brandFilterLength = brandFilter?.length;
        return brandFilterLength > 1
          ? `${brandFilter[0]} + ${brandFilterLength - 1} ${t("admin_shop.product.list.filter.brand")}`
          : `${t("admin_shop.product.list.filter.brand")}: ${brandFilter[0]}`;
      }
      case "categoryFilter": {
        const categoryFilterLength = categoryFilter?.length;
        return categoryFilterLength > 0
          ? categoryFilterLength > 1
            ? `${categoryFilter[0]} + ${categoryFilterLength - 1} ${t("admin_shop.product.list.filter.category")}`
            : `${t("admin_shop.product.list.filter.category")}: ${categoryFilter[0]}`
          : null;
      }
      case "startDateFilter": {
        if (endDateFilter) {
          return `${t("admin_shop.product.review.filter.review_date")}: ${startDateFilter}   ${endDateFilter}`;
        }
        return `${t("admin_shop.product.review.filter.review_date")}: ${startDateFilter}`;
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
        return categoryFilter?.length > 0;
      case "brandFilter":
        return brandFilter?.length > 0;
      case "startDateFilter":
        return startDateFilter !== null;
      default:
        return false;
    }
  };

  if (shouldShowSortItem(value)) {
    return (
      <div className="rating_type_item">
        <div className="content">
          <p>{getFilterText(value)}</p>
        </div>
        <Button
          type="primary"
          ghost
          onClick={() => handleRemoveSort(value)}
          shape="circle"
          icon={<FontAwesomeIcon icon={faCircleXmark} />}
          className="break_rating_type"
        />
      </div>
    );
  }
  return null;
};
