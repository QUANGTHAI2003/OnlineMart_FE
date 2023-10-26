import { ExclamationCircleFilled } from "@ant-design/icons";
import { AdminTable } from "@app/app/components/common/Table/AdminTable";
import { useResponsive } from "@app/hooks";
import { formatCurrency, removeDiacritics } from "@app/utils/helper";
import { Button, Card, Divider, Modal, Space } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import { SorterResult } from "antd/lib/table/interface";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

import { ProductData } from "../data";
import * as S from "../Product.styles";

import { ProductDataTablet, ProductTableDataName, SortData, UpdateData } from ".";

const { confirm } = Modal;

const TableComponent = React.memo(({ searchValue, searchType }: any) => {
  const { t } = useTranslation();
  const showConfirm = (id: number) => {
    confirm({
      title: "Do you Want to delete these items?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      centered: true,
      keyboard: true,
      maskClosable: true,
      onOk() {
        console.log("Delete ", id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  interface IDataType {
    id: number;
    name: string;
    category: string;
    brand: string;
    price: number;
    stock: number;
    updated_at: string;
  }

  const location = useLocation();
  const { isDesktop } = useResponsive();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [sortedInfo, setSortedInfo] = useState<SorterResult<IDataType>>({});

  const columns: ColumnsType<IDataType> = [
    {
      title: t("admin_shop.product.list.table.product"),
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      render: (_, record: any) => {
        return <ProductTableDataName data={record} trans={t} />;
      },
    },
    {
      title: t("admin_shop.product.list.table.category"),
      dataIndex: "category",
      key: "category",
      sorter: (a: any, b: any) => a.category.length - b.category.length,
      sortOrder: sortedInfo.columnKey === "category" ? sortedInfo.order : null,
    },
    {
      title: t("admin_shop.product.list.table.brand"),
      dataIndex: "brand",
      key: "brand",
      sorter: (a: any, b: any) => a.brand.length - b.brand.length,
      sortOrder: sortedInfo.columnKey === "brand" ? sortedInfo.order : null,
    },
    {
      title: t("admin_shop.product.list.table.price"),
      dataIndex: "price",
      key: "price",
      sorter: (a: any, b: any) => a.price - b.price,
      sortOrder: sortedInfo.columnKey === "price" ? sortedInfo.order : null,
      render: (_: any, record: any) => {
        return <span>{formatCurrency(record.price)}</span>;
      },
    },
    {
      title: t("admin_shop.product.list.table.stock"),
      dataIndex: "stock",
      key: "stock",
      sorter: (a: any, b: any) => a.stock - b.stock,
      sortOrder: sortedInfo.columnKey === "stock" ? sortedInfo.order : null,
    },
    {
      title: t("admin_shop.product.list.table.updated_at"),
      dataIndex: "updated_at",
      key: "updated_at",
      sorter: (a: any, b: any) => a.updated_at.length - b.updated_at.length,
      sortOrder: sortedInfo.columnKey === "updated_at" ? sortedInfo.order : null,
    },
    {
      title: t("admin_shop.product.list.table.action"),
      key: "action",
      align: "center",
      render: (_, record: any) => (
        <Space size="middle" direction="vertical">
          <Link to={`edit/${record.id}`}>
            <Button type="primary" ghost className="w-full">
              {t("admin_shop.product.list.table.edit")}
            </Button>
          </Link>
          <Button className="w-full" onClick={() => showConfirm(record.id)}>
            {t("admin_shop.product.list.table.delete")}
          </Button>
        </Space>
      ),
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

  useEffect(() => {
    console.log("Table component rendered");
  });

  const displayedProducts = useMemo(() => {
    const queryParams = new URLSearchParams(location.search);
    const tabParam = queryParams.get("tab");

    let filteredProducts =
      tabParam === "all" ? ProductData : ProductData.filter((product) => product.status === tabParam);

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

  const handleChange: TableProps<IDataType>["onChange"] = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setSortedInfo(sorter as SorterResult<IDataType>);
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
                  ? `${t("admin_shop.product.list.table.selecting", { count: selectedRowKeys.length })}`
                  : t("admin_shop.product.list.table.product")}
              </h3>
              <Divider type="vertical" />
              {isDesktop && <UpdateData hasSelected={hasSelected} />}
            </Space>
          </div>
          {isDesktop ? (
            <div className="body">
              <AdminTable
                rowSelection={rowSelection}
                rowKey={(record) => record.id}
                columns={columns}
                dataSource={displayedProducts}
                bordered
                onChange={handleChange}
              />
            </div>
          ) : (
            <ProductDataTablet data={displayedProducts} showConfirm={showConfirm} />
          )}
        </div>
      </Card>
    </S.TableStyle>
  );
});

export default TableComponent;
