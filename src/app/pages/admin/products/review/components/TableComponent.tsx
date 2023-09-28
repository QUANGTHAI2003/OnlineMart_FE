import { removeDiacritics } from "@app/utils/helper";
import { Card, Rate, Table, Typography } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import { RatingListData, RatingText } from "../data";
import * as S from "../ProductReview.styles";

import { ReviewFeedback } from ".";
const { Text } = Typography;

const TableComponent = React.memo(({ searchValue, searchType }: any) => {
  const { t } = useTranslation();

  const location = useLocation();

  const columns: any = [
    {
      title: t("admin_shop.product.review.table_cpn.order_id"),
      dataIndex: "id",
      key: "id",
      width: 120,
    },
    {
      title: t("admin_shop.product.review.table_cpn.product"),
      dataIndex: "product",
      key: "product",
      width: 350,
      render: (_: any, record: any) => {
        return (
          <div className="flex gap-2">
            <img src={record.thumbnail} alt="Thumbnail" width={90} />
            <div className="flex flex-col justify-center gap-1">
              <div className="line-clamp-2 font-medium">{record.title}</div>
              <Paragraph copyable={{ text: record.sku }} className="mb-0">{`SKU: ${record.sku}`}</Paragraph>
            </div>
          </div>
        );
      },
    },
    {
      title: t("admin_shop.product.review.table_cpn.rating"),
      dataIndex: "rating",
      key: "rating",
      width: 150,
      sorter: (a: any, b: any) => a.rating - b.rating,
      render: (_: any, record: any) => {
        return (
          <div className="flex flex-col items-center gap-2">
            <div>
              <Rate disabled allowHalf defaultValue={record.rating} className="text-base" />
            </div>
            <div>{`(${record.rating})`}</div>
          </div>
        );
      },
    },
    {
      title: t("admin_shop.product.review.table_cpn.content"),
      dataIndex: "content",
      key: "content",
      width: 150,
      render: (_: any, record: any) => {
        return <p className="line-clamp-2">{record.comment}</p>;
      },
    },
    {
      title: t("admin_shop.product.review.table_cpn.reviewer"),
      dataIndex: "reviewer",
      key: "reviewer",
      width: 150,
    },
    {
      title: t("admin_shop.product.review.table_cpn.review_date"),
      dataIndex: "review_date",
      key: "review_date",
      width: 150,
    },
    {
      title: t("admin_shop.product.review.table_cpn.seller_replies"),
      dataIndex: "seller_reply",
      key: "seller_reply",
      width: 150,
      render: (_: any, record: any) => {
        return <p className="line-clamp-2">{record.seller_reply}</p>;
      },
    },
    {
      title: t("admin_shop.product.review.table_cpn.status"),
      key: "status",
      width: 130,
      render: (_: any, record: any) => {
        return <div className="flex justify-center">{RatingText(t).status[record.status]}</div>;
      },
    },
    {
      title: t("admin_shop.product.review.table_cpn.action"),
      key: "operation",
      fixed: "right",
      width: 100,
      render: (_: any, record: any) => {
        return (
          <div className="flex justify-center">
            <ReviewFeedback data={record} />
          </div>
        );
      },
    },
  ];

  const displayedRating: any = useMemo(() => {
    const queryParams = new URLSearchParams(location.search);
    const tabParam = queryParams.get("tab");

    let filteredProducts =
      tabParam === "all" ? RatingListData : RatingListData.filter((product) => product.status === tabParam);

    if (searchValue) {
      filteredProducts = filteredProducts.filter((product: any) => {
        const fieldValue = product[searchType];
        const searchValueString = searchValue.toString();

        return removeDiacritics(fieldValue.toString())
          .toLowerCase()
          .includes(removeDiacritics(searchValueString).toLowerCase());
      });
    }

    return filteredProducts;
  }, [location.search, searchType, searchValue]);

  return (
    <S.TableComponent span={24}>
      <Card>
        <div className="mb-4">
          <Text className="pr-2">{`${t("admin_shop.product.review.table_cpn.total_review")}:`}</Text>
          <Text strong>{displayedRating.length}</Text>
        </div>
        <div>
          <Table dataSource={displayedRating} rowKey={(record) => record.id} columns={columns} scroll={{ x: 1300 }} />
        </div>
      </Card>
    </S.TableComponent>
  );
});

export default TableComponent;
