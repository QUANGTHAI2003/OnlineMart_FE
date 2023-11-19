import { BankOutlined, MessageTwoTone } from "@ant-design/icons";
import { AdminTable } from "@app/app/components/common/Table/AdminTable";
import { useDebounce } from "@app/hooks";
import { useGetOrderQueryRootQuery } from "@app/store/slices/api/admin/orderApi";
import { useAppSelector } from "@app/store/store";
import { IOrder } from "@app/types/order.types";
import { formatCurrency, removeDiacritics } from "@app/utils/helper";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Divider, Space, Tag } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import { SorterResult } from "antd/lib/table/interface";
import dayjs from "dayjs";
import { TFunction } from "i18next";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

import * as S from "../Order.styles";

import OrderTableDataName from "./OrderTableDataName";
import UpdateData from "./UpdateData";

import { ProductTableDataName, SortData } from ".";

const getStatusTagColor = (status: any, t: TFunction<"translation", undefined>) => {
  switch (status) {
    case "awaiting":
      return ["purple", t("admin_shop.orders.list.status.awaiting")];
    case "processing":
      return ["blue", t("admin_shop.orders.list.status.processing")];
    case "shipping":
      return ["gold", t("admin_shop.orders.list.status.shipping")];
    case "canceled":
      return ["red", t("admin_shop.orders.list.status.canceled")];
    case "delivered":
      return ["green", t("admin_shop.orders.list.status.delivered")];
    default:
      return [];
  }
};

const TableComponent = React.memo(() => {
  const { t } = useTranslation();
  const location = useLocation();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const filteredValue = useAppSelector((state) => state.orderAdmin.filteredValue);

  const isFilteredValueEmpty = Object.values(filteredValue).every(
    (value) => !value || (Array.isArray(value) && value.length === 0)
  );

  const [sortedInfo, setSortedInfo] = useState<SorterResult<IOrder>>({});
  const { data: orderData, isFetching } = useGetOrderQueryRootQuery();
  const columns: ColumnsType<IOrder> = [
    {
      title: t("admin_shop.orders.list.table.order"),
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === "id" ? sortedInfo.order : null,
      render: (_: any, record: any) => {
        return <OrderTableDataName data={record} trans={t} />;
      },
    },
    {
      title: t("admin_shop.orders.list.table.status"),
      dataIndex: "shipping_unit",
      key: "status",
      sorter: (a: any, b: any) => a.status.length - b.status.length,
      sortOrder: sortedInfo.columnKey === "status" ? sortedInfo.order : null,
      render: (_: any, record: any) => {
        const [statusColor, statusText] = getStatusTagColor(
          record?.status === "awaiting"
            ? "awaiting"
            : record?.status === "processing"
            ? "processing"
            : record?.status === "shipping"
            ? "shipping"
            : record?.status === "canceled"
            ? "canceled"
            : "delivered",
          t
        );
        return (
          <div>
            <div>
              <Tag color={statusColor} className="mb-1">
                {statusText}
              </Tag>
            </div>
            <div>
              <span>{t("admin_shop.orders.list.table.pick_delivery")}</span>
              <span className="text-orange-500 mr-2">{record.shipping_unit}</span>
              <span>
                {`(${t("admin_shop.orders.list.table.shipping_fee")}
                ${formatCurrency(22000)})`}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      title: t("admin_shop.orders.list.table.quantity"),
      dataIndex: "grand_total",
      key: "grand_total",
      sorter: (a, b) => a.grand_total - b.grand_total,
      sortOrder: sortedInfo.columnKey === "grand_total" ? sortedInfo.order : null,
      render: (_: any, record: any) => (
        <div>
          <div>
            <p>
              GTĐH:&nbsp;
              {formatCurrency(record.grand_total)}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: t("admin_shop.orders.list.table.action"),
      key: "action",
      align: "center",
      render: (_, record: any) => (
        <Space size="middle" direction="vertical">
          <Link to={`/admin/shop/orders/${record.id}`}>
            <Button type="primary" ghost className="w-full">
              {t("admin_shop.orders.list.table.detail")}
            </Button>
          </Link>
        </Space>
      ),
    },
  ];
  const columnsProduct: ColumnsType<IOrder> = [
    {
      title: t("admin_shop.orders.list.table.product"),
      dataIndex: "product",
      key: "product",
      render: (_, record: any) => {
        console.log(record?.order_item[0]?.product);
        return <ProductTableDataName data={record?.order_item[0]?.product} trans={t} />;
      },
    },
    {
      title: t("admin_shop.orders.list.table.qty"),
      dataIndex: "product_quantity",
      key: "product_quantity",
      render: (_: any, record: any) => {
        return (
          <div>
            <span className="mr-2">{`x${record?.order_item[0]?.product?.product_quantity}`}</span>
          </div>
        );
      },
    },
    {
      title: t("admin_shop.orders.list.table.sale_price"),
      dataIndex: "product_sale",
      key: "product_sale",
      render: (_: any, record: any) => {
        return (
          <div>
            <span className="mr-2">{formatCurrency(record?.order_item[0]?.product?.product_sale)}</span>
          </div>
        );
      },
    },
  ];
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const searchValue = useAppSelector((state) => state.orderAdmin.searchValue);
  const debouncedValue = useDebounce(searchValue, 300);
  const searchType = useAppSelector((state) => state.orderAdmin.selectSearchType) || "name";
  const delivery_om = useAppSelector((state) => state.orderAdmin.filteredValue.delivery_om);
  const delivery_ghtk = useAppSelector((state) => state.orderAdmin.filteredValue.delivery_ghtk);
  const dateFilter = useAppSelector((state) => state.orderAdmin.filteredValue.dateFilter);

  const displayedOrders = useMemo(() => {
    const queryParams = new URLSearchParams(location.search);
    const tabParam = queryParams.get("tab");

    let filteredOrders: IOrder[] = orderData || [];

    filteredOrders =
      tabParam === "all" ? orderData || [] : (orderData || []).filter((record) => record.status === tabParam);

    if (debouncedValue) {
      filteredOrders = filteredOrders?.filter((record: any) => {
        const fieldrecord = record[searchType];
        const searchrecordString = debouncedValue.toString();

        return removeDiacritics(fieldrecord.toString())
          .toLowerCase()
          .includes(removeDiacritics(searchrecordString).toLowerCase());
      });
    }

    if (delivery_ghtk) {
      filteredOrders = filteredOrders?.filter((record: any) => {
        return record?.shipping_unit === "GHTK";
      });
    }
    if (delivery_om) {
      filteredOrders = filteredOrders?.filter((record: any) => {
        return record?.shipping_unit === "OM";
      });
    }
    if (dateFilter) {
      filteredOrders = filteredOrders?.filter((record: any) => {
        const date = dayjs(record?.created_at).format("YYYY-MM-DD");
        console.log(date);

        return dayjs(date).isSame(dayjs(dateFilter), "day");
      });
    }

    return filteredOrders;
  }, [location.search, orderData, debouncedValue, delivery_ghtk, delivery_om, dateFilter, searchType]);

  const handleChange: TableProps<IOrder>["onChange"] = (_pagination, _filters, sorter) => {
    setSortedInfo(sorter as SorterResult<IOrder>);
  };

  return (
    <S.TableStyle>
      <Card bordered>
        <div className="card-inner">
          {!isFilteredValueEmpty && <SortData />}
          <div className="header">
            <Space className="mb-4" direction="horizontal" align="center">
              <h3>
                {hasSelected
                  ? `${t("admin_shop.orders.list.table.selecting", { count: selectedRowKeys?.length })}`
                  : t("admin_shop.orders.list.table.orders")}
              </h3>
              <Divider type="vertical" />
              <UpdateData hasSelected={hasSelected} />
            </Space>
          </div>
          <div className="body">
            <AdminTable
              rowSelection={rowSelection}
              rowKey={(record) => record.id}
              columns={columns}
              expandable={{
                expandedRowRender: (record: any) => {
                  return (
                    <Card bordered>
                      <div className="card-inner">
                        <div className="header">
                          <Space className="mb-4" direction="horizontal" align="center">
                            <FontAwesomeIcon icon={faUser} />
                            <h4>{`${record?.user?.full_name} (${record?.user?.phone})`}</h4>
                            <span className="text-gray-400">/</span>
                            <h4>{`${record?.street}, ${record.district},  ${record.city}  `}</h4>
                            <span className="text-gray-400">/</span>
                            <BankOutlined />
                            <h4>{record?.order_item?.shop_name}</h4>
                            <Link to="#" className="flex ">
                              <MessageTwoTone />
                              <h4 className=" ml-2 text-blue-500">Chat</h4>
                            </Link>
                            <Divider type="vertical" />
                          </Space>
                        </div>
                        <div className="body">
                          <AdminTable
                            pagination={{
                              pageSize: 2,
                            }}
                            rowKey={(record) => record.id + record.full_name}
                            columns={columnsProduct}
                            dataSource={displayedOrders}
                            bordered
                            scroll={{ x: 500 }}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </Card>
                  );
                },
                rowExpandable: (record) => record.name !== "Not Expandable",
              }}
              pagination={{
                pageSize: 3,
              }}
              loading={isFetching}
              scroll={{ x: 500 }}
              dataSource={displayedOrders}
              bordered
              onChange={handleChange}
            />
          </div>
        </div>
      </Card>
    </S.TableStyle>
  );
});

export default TableComponent;
