import { BankOutlined, MessageTwoTone } from "@ant-design/icons";
import { AdminTable } from "@app/app/components/common/Table/AdminTable";
import { formatCurrency, removeDiacritics } from "@app/utils/helper";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Divider, Space, Tag } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import { SorterResult } from "antd/lib/table/interface";
import { TFunction } from "i18next";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { OrderDataAdmin } from "../data";
import * as S from "../Order.styles";
import { IOrderAdmin } from "../OrderDataAdmin.interface";

import OrderTableDataName from "./OrderTableDataName";

import { ProductTableDataName, SortData, UpdateData } from ".";
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

const TableComponent = React.memo(({ searchValue, searchType }: any) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [sortedInfo, setSortedInfo] = useState<SorterResult<IOrderAdmin>>({});

  const columns: ColumnsType<IOrderAdmin> = [
    {
      title: t("admin_shop.orders.list.table.order"),
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      render: (_, record: any) => {
        return <OrderTableDataName data={record} trans={t} />;
      },
    },
    {
      title: t("admin_shop.orders.list.table.status"),
      dataIndex: "status",
      key: "status",
      sorter: (a: any, b: any) => a.status.length - b.status.length,
      sortOrder: sortedInfo.columnKey === "status" ? sortedInfo.order : null,
      render: (_id, record) => {
        const [statusColor, statusText] = getStatusTagColor(record.status_slug, t);
        console.log(record.status);
        return (
          <div>
            <div>
              <Tag color={statusColor} className="mb-1">
                {statusText}
              </Tag>
            </div>
            <div>
              <span>{t("admin_shop.orders.list.table.pick_delivery")}</span>
              <span className="text-orange-500 mr-2">{record.shipping[0].delivery_name}</span>
              <span>
                {`(${t("admin_shop.orders.list.table.shipping_fee")}
                ${formatCurrency(record.shipping[0].method_fee_text)})`}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      title: t("admin_shop.orders.list.table.confirm"),
      dataIndex: "confirm_date",
      key: "confirm_date",
      sorter: (a: any, b: any) => a.confirm_date.length - b.confirm_date.length,
      sortOrder: sortedInfo.columnKey === "confirm" ? sortedInfo.order : null,
      render: (confirm_date: string) => {
        return <span>{confirm_date}</span>;
      },
    },
    {
      title: t("admin_shop.orders.list.table.quantity"),
      dataIndex: "qty",
      key: "qty",
      sorter: (a: any, b: any) => a.qty_total - b.qty_total,
      sortOrder: sortedInfo.columnKey === "qty" ? sortedInfo.order : null,
      render: (_id, record) => (
        <div>
          <div>
            <span>{t("admin_shop.orders.list.table.qty")}</span>
            <span className=" mr-2">{record.total_qty}</span>
            <p>
              DT(tt):&nbsp;
              {formatCurrency(record.dt)}
            </p>
            <p>
              GTĐH:&nbsp;
              {formatCurrency(record.grand_total)}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: t("admin_shop.orders.list.table.order_label"),
      dataIndex: "label_order",
      key: "label_order",
      sorter: (a: any, b: any) => a.label_order - b.label_order,
      sortOrder: sortedInfo.columnKey === "label_order" ? sortedInfo.order : null,
      render: (label_order: string) => {
        return (
          <Tag color="warning" className=" p-1">
            {label_order}
          </Tag>
        );
      },
    },

    {
      title: t("admin_shop.orders.list.table.action"),
      key: "action",
      align: "center",
      render: (_, record: any) => (
        <Space size="middle" direction="vertical">
          <Link to={`edit/${record.id}`}>
            <Button type="primary" ghost className="w-full">
              {t("admin_shop.orders.list.table.print")}
            </Button>
          </Link>
        </Space>
      ),
    },
  ];
  const columnsProduct: ColumnsType<IOrderAdmin> = [
    {
      title: t("admin_shop.orders.list.table.product"),
      dataIndex: "product_name",
      key: "product_name",
      render: (_, record: any) => {
        return <ProductTableDataName data={record} trans={t} />;
      },
    },
    {
      title: t("admin_shop.orders.list.table.qty"),
      dataIndex: "qty",
      key: "qty",
      render: (record) => {
        return (
          <div>
            <span className="mr-2">{`x${record}`}</span>
          </div>
        );
      },
    },
    {
      title: t("admin_shop.orders.list.table.sale_price"),
      dataIndex: "sale_price",
      key: "sale_price",
      render: (record) => {
        return (
          <div>
            <span className="mr-2">{formatCurrency(record)}</span>
          </div>
        );
      },
    },
    {
      title: t("admin_shop.orders.list.table.sub_total"),
      dataIndex: "subtotal",
      key: "subtotal",
      render: (record) => {
        return (
          <div>
            <span className="mr-2">{formatCurrency(record)}</span>
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

  const displayedOrders = useMemo(() => {
    const queryParams = new URLSearchParams(location.search);
    const tabParam = queryParams.get("tab");

    let filteredOrders =
      tabParam === "all" ? OrderDataAdmin : OrderDataAdmin.filter((order: any) => order.status_slug === tabParam);

    if (searchValue) {
      filteredOrders = filteredOrders.filter((order: any) => {
        const fieldValue = order[searchType];
        const searchValueString = searchValue.toString();

        return removeDiacritics(fieldValue.toString())
          .toLowerCase()
          .includes(removeDiacritics(searchValueString).toLowerCase());
      });
    }

    return filteredOrders;
  }, [location.search, searchType, searchValue]);

  const handleChange: TableProps<IOrderAdmin>["onChange"] = (_pagination, _filters, sorter) => {
    setSortedInfo(sorter as SorterResult<IOrderAdmin>);
  };

  return (
    <S.TableStyle>
      <Card bordered>
        <div className="card-inner">
          <SortData />
          <div className="header">
            <Space className="mb-4" direction="horizontal" align="center">
              <h3>
                {hasSelected
                  ? `${t("admin_shop.orders.list.table.selecting", { count: selectedRowKeys.length })}`
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
                            <h4>{`${record.shipping_address[0].name} (${record.shipping_address[0].telephone})`}</h4>
                            <span className="text-gray-400">/</span>
                            <h4>{`${record.shipping_address[0].road}, ${record.shipping_address[0].ward},  ${record.shipping_address[0].district},  ${record.shipping_address[0].city}  `}</h4>
                            <span className="text-gray-400">/</span>
                            <BankOutlined />
                            <h4>{record.items[0].current_seller[0].name}</h4>
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
                            rowKey={uuidv4()}
                            columns={columnsProduct}
                            dataSource={record.items}
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
