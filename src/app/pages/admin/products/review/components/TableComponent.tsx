  import { formatDateTime, removeDiacritics } from "@app/utils/helper";
  import { Card, Rate, Table, Typography } from "antd";
  import Paragraph from "antd/es/typography/Paragraph";
  import React, { useMemo, useState } from "react";
  import { useTranslation } from "react-i18next";
  import { useLocation } from "react-router-dom";

  import * as S from "../ProductReview.styles";

  import { useDebounce } from "@app/hooks";
  import { useAppSelector } from "@app/store/store";
  import { ColumnsType, TableProps } from "antd/es/table";
  import { SorterResult } from "antd/es/table/interface";
  import dayjs from "dayjs";
  import isBetween from "dayjs/plugin/isBetween";
  import { ReviewFeedback } from ".";
  import { RatingText } from "../data";
import { IReview } from "@app/types/review.types";

  const { Text } = Typography;

  dayjs.extend(isBetween);

  const TableComponent: React.FC<any> = React.memo(({ reviewList, isFetching }) => {
    const { t } = useTranslation();
    const location = useLocation();

    const [sortedInfo, setSortedInfo] = useState<SorterResult<IReview>>({});

    const searchValue = useAppSelector((state) => state.reviewAdmin.searchValue);
    const searchType = useAppSelector((state) => state.reviewAdmin.selectSearchType) || "name";
    const debouncedValue = useDebounce(searchValue, 300);

    const columns: ColumnsType<IReview> = [
      {
        title: t("admin_shop.product.review.table_cpn.order_id"),
        dataIndex: "id",
        align: "center",
        key: "id",
        width: 120,
      },
      {
        title: t("admin_shop.product.review.table_cpn.product"),
        dataIndex: "product_name",
        align: "center",
        key: "product_name",
        width: 350,
        sorter: (a: any, b: any) => a.product_name.localeCompare(b.product_name),
        sortOrder: sortedInfo.columnKey === "product_name" ? sortedInfo.order : null,
        render: (_: any, record: any) => {
          return (
            <div className="flex gap-2">
              <img src={record.product_thumbnail} alt="Thumbnail" width={90} />
              <div className="flex flex-col justify-center gap-1">
                <div className="line-clamp-2 font-medium text-left">{record.product_name}</div>
                <Paragraph copyable={{ text: record.product_sku }} className="mb-0 text-left">
                  {`SKU: ${record.product_sku}`}
                </Paragraph>
              </div>
            </div>
          );
        },
      },
      {
        title: t("admin_shop.product.review.table_cpn.rating"),
        dataIndex: "rating",
        align: "center",
        key: "rating",
        width: 150,
        sorter: (a: any, b: any) => a.rating - b.rating,
        sortOrder: sortedInfo.columnKey === "rating" ? sortedInfo.order : null,
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
        title: t("admin_shop.product.review.table_cpn.status"),
        key: "status",
        align: "center",
        width: 130,
        render: (_: any, record: any) => {
          return <div className="flex justify-center">{RatingText(t).status[record.rating]}</div>;
        },
      },
      {
        title: t("admin_shop.product.review.table_cpn.content"),
        dataIndex: "content",
        align: "center",
        key: "content",
        width: 150,
        render: (_: any, record: any) => {
          return <p className="line-clamp-2">{record.content}</p>;
        },
      },
      {
        title: t("admin_shop.product.review.table_cpn.reviewer"),
        dataIndex: "user",
        align: "center",
        key: "user",
        width: 150,
      },
      {
        title: t("admin_shop.product.review.table_cpn.review_date"),
        dataIndex: "review_date",
        align: "center",
        key: "review_date",
        width: 150,
        render: (_: any, record: any) => {
          return <span>{formatDateTime(record?.review_date)}</span>;
        },
      },
      {
        title: t("admin_shop.product.review.table_cpn.seller_replies"),
        dataIndex: "reply_admin",
        align: "center",
        key: "reply_admin",
        width: 150,
        render: (_: any, record: any) => {
          return <p className="line-clamp-2">{record.reply_admin}</p>;
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

    const categoryData = useAppSelector((state) => state.reviewAdmin.filteredValue.categoryFilter);
    const brandData = useAppSelector((state) => state.reviewAdmin.filteredValue.brandFilter);
    const mediaChecked = useAppSelector((state) => state.reviewAdmin.mediaFilter);
    const replyReview = useAppSelector((state) => state.reviewAdmin.hasRepliedFilter);
    const startDate = useAppSelector((state) => state.reviewAdmin.filteredValue.startDateFilter);
    const endDate = useAppSelector((state) => state.reviewAdmin.filteredValue.endDateFilter);

    const displayedRating = useMemo(() => {
      const queryParams = new URLSearchParams(location.search);
      const tabParam = queryParams.get("tab");

      let filteredProducts =
        tabParam === "all" ? reviewList : reviewList?.filter((product: any) => product?.rating == tabParam);
      if (debouncedValue) {
        filteredProducts = filteredProducts?.filter((product: any) => {
          const fieldValue = product[searchType];
          const searchValueString = debouncedValue?.toString();

          return removeDiacritics(fieldValue?.toString())
            ?.toLowerCase()
            ?.includes(removeDiacritics(searchValueString)?.toLowerCase());
        });
      }

      if (categoryData?.length > 0) {
        filteredProducts = filteredProducts?.filter((product: any) => {
          const fieldValue = product?.category;
          return categoryData?.includes(fieldValue);
        });
      }

      if (brandData?.length > 0) {
        filteredProducts = filteredProducts?.filter((product: any) => {
          const fieldValue = product?.brand;
          return brandData?.includes(fieldValue);
        });
      }

      if (mediaChecked) {
        filteredProducts = filteredProducts?.filter((product: any) => {
          return product?.image && product?.image.length > 0;
        });
      }

      if (startDate && endDate) {
        filteredProducts = filteredProducts?.filter((product: any) => {
          const reviewDate = dayjs(product.review_date).locale("vi").format("YYYY-MM-DD");
          return dayjs(reviewDate).isBetween(startDate, endDate, null, "[]");
        });
      }

      if (replyReview === null) {
        return filteredProducts;
      } else if (replyReview) {
        filteredProducts = filteredProducts?.filter((product: any) => {
          return product?.reply_admin && product?.reply_admin.length > 0;
        });
      } else {
        filteredProducts = filteredProducts?.filter((product: any) => {
          return !product?.reply_admin || product?.reply_admin.length === 0;
        });
      }

      return filteredProducts;
    }, [
      brandData,
      categoryData,
      mediaChecked,
      startDate,
      endDate,
      replyReview,
      debouncedValue,
      location.search,
      reviewList,
      searchType,
    ]);

    const handleChange: TableProps<IReview>["onChange"] = (_, __, sorter) => {
      setSortedInfo(sorter as SorterResult<IReview>);
    };

    return (
      <S.TableComponent span={24}>
        <Card>
          <div className="mb-4">
            <Text className="pr-2">{`${t("admin_shop.product.review.table_cpn.total_review")}:`}</Text>
            <Text strong>{displayedRating?.length}</Text>
          </div>
          <div>
            <Table
              loading={isFetching}
              dataSource={displayedRating}
              rowKey={(record) => record.id}
              columns={columns}
              onChange={handleChange}
              scroll={{ x: 1300 }}
            />
          </div>
        </Card>
      </S.TableComponent>
    );
  });

  export default TableComponent;
