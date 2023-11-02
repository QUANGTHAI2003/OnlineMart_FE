import { ExclamationCircleFilled } from "@ant-design/icons";
import { Can, PermissionsSwitch } from "@app/app/components/common/Permissions";
import { AdminTable } from "@app/app/components/common/Table/AdminTable";
import { useDebounce, useResponsive } from "@app/hooks";
import { useDeleteProductMutation } from "@app/store/slices/api/admin/productApi";
import { useAppSelector } from "@app/store/store";
import { formatCurrency, formatDateTime, notifyError, notifySuccess, removeDiacritics } from "@app/utils/helper";
import { Button, Card, Modal, Space } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import { SorterResult } from "antd/lib/table/interface";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

import * as S from "../Product.styles";

import { ProductDataTablet, ProductTableDataName, SortData, UpdateData } from ".";

const { confirm } = Modal;

interface IDataType {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  stock: number;
  updated_at: string;
}

const TableComponent: React.FC<any> = React.memo(({ productList, isFetching }) => {
  const { t } = useTranslation();

  const location = useLocation();
  const { isDesktop } = useResponsive();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [sortedInfo, setSortedInfo] = useState<SorterResult<IDataType>>({});

  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const filteredValue = useAppSelector((state) => state.productAdmin.filteredValue);

  const isFilteredValueEmpty = Object.values(filteredValue).every(
    (value) => !value || (Array.isArray(value) && value.length === 0)
  );

  const searchValue = useAppSelector((state) => state.productAdmin.searchValue);
  const debouncedValue = useDebounce(searchValue, 300);
  const searchType = useAppSelector((state) => state.productAdmin.selectSearchType) || "name";

  const columns: ColumnsType<IDataType> = [
    {
      title: t("admin_shop.product.list.table.product"),
      dataIndex: "name",
      key: "name",
      width: "10%",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      render: (_, record: any) => {
        return <ProductTableDataName data={record} trans={t} />;
      },
    },
    {
      title: t("admin_shop.product.list.table.category"),
      dataIndex: "category",
      key: "category",
      sorter: (a: any, b: any) => a.category.localeCompare(b.category),
      sortOrder: sortedInfo.columnKey === "category" ? sortedInfo.order : null,
    },
    {
      title: t("admin_shop.product.list.table.brand"),
      dataIndex: "brand",
      key: "brand",
      sorter: (a: any, b: any) => a.brand.localeCompare(b.brand),
      sortOrder: sortedInfo.columnKey === "brand" ? sortedInfo.order : null,
    },
    {
      title: t("admin_shop.product.list.table.price"),
      dataIndex: "price",
      key: "price",
      sorter: (a: any, b: any) => a.price - b.price,
      sortOrder: sortedInfo.columnKey === "price" ? sortedInfo.order : null,
      render: (_: any, record: any) => {
        if (typeof record?.price === "number") {
          return <span>{formatCurrency(record?.price)}</span>;
        }
        const priceRange = record?.price.split("-");
        const minPrice = parseInt(priceRange[0]);
        const maxPrice = parseInt(priceRange[1]);
        return <span>{`${formatCurrency(minPrice)} - ${formatCurrency(maxPrice)}`}</span>;
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
      sorter: (a: any, b: any) => (new Date(a.updated_at) as any) - (new Date(b.updated_at) as any),
      sortOrder: sortedInfo.columnKey === "updated_at" ? sortedInfo.order : null,
      render: (_: any, record: any) => {
        return <span>{formatDateTime(record?.updated_at)}</span>;
      },
    },
    {
      title: t("admin_shop.product.list.table.action"),
      key: "action",
      align: "center",
      render: (_, record: any) => (
        <Space size="middle" direction="vertical">
          <PermissionsSwitch>
            <Can permissions={["Update product"]}>
              <Link to={`edit/${record?.id}`}>
                <Button type="primary" ghost className="w-full">
                  {t("admin_shop.product.list.table.edit")}
                </Button>
              </Link>
            </Can>
            <Can>
              <Button disabled type="primary" ghost className="w-full">
                {t("admin_shop.product.list.table.edit")}
              </Button>
            </Can>
          </PermissionsSwitch>
          <PermissionsSwitch>
            <Can permissions={["Delete product"]}>
              <Button className="w-full" danger onClick={() => showDeleteConfirm(record?.id, record?.name)}>
                {t("admin_shop.product.list.table.delete")}
              </Button>
            </Can>
            <Can>
              <Button disabled className="w-full" danger onClick={() => showDeleteConfirm(record?.id, record?.name)}>
                {t("admin_shop.product.list.table.delete")}
              </Button>
            </Can>
          </PermissionsSwitch>
        </Space>
      ),
    },
  ];

  const columnsVariant: any = [
    {
      title: t("admin_shop.product.list.table.product"),
      dataIndex: "name",
      key: "name",
      width: "40%",
      render: (_: any, record: any) => {
        return <ProductTableDataName data={record} trans={t} />;
      },
    },
    {
      title: t("admin_shop.product.list.table.category"),
      dataIndex: "variant_name",
      key: "variant_name",
      render: (_: any, record: any) => {
        return <span>{`${record?.variant_name} - ${record?.variant_value}`}</span>;
      },
    },
    {
      title: t("admin_shop.product.list.table.price"),
      dataIndex: "price",
      key: "price",
      render: (_: any, record: any) => {
        if (typeof record?.price === "number") {
          return <span>{formatCurrency(record?.price)}</span>;
        }
        const priceRange = record?.price.split("-");
        const minPrice = parseInt(priceRange[0]);
        const maxPrice = parseInt(priceRange[1]);
        return <span>{`${formatCurrency(minPrice)} - ${formatCurrency(maxPrice)}`}</span>;
      },
    },
    {
      title: t("admin_shop.product.list.table.stock"),
      dataIndex: "stock",
      key: "stock",
    },
  ];

  const showDeleteConfirm = (productId: number, productName: string) => {
    confirm({
      title: `Bạn có muốn xóa sản phẩm này? - Sản phẩm này sẽ tự động vĩnh viên sau 30 ngày`,
      icon: <ExclamationCircleFilled />,
      content: `${productName}`,
      centered: true,
      keyboard: true,
      okText: "Yes",
      okType: "danger",
      maskClosable: true,
      onOk() {
        try {
          deleteProduct(productId);
          notifySuccess("Delete product successfully");
        } catch (err) {
          console.log(err);
          notifyError("Delete product failed");
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange, 
  };

  const hasSelected = selectedRowKeys.length > 0;
  const categoryData = useAppSelector((state) => state.productAdmin.filteredValue.categoryFilter);
  const brandData = useAppSelector((state) => state.productAdmin.filteredValue.brandFilter);

  const displayedProducts = useMemo(() => {
    const queryParams = new URLSearchParams(location.search);
    const tabParam = queryParams.get("tab");

    let filteredProducts =
      tabParam === "all" ? productList : productList?.filter((product: any) => product?.status === tabParam);

    if (debouncedValue) {
      filteredProducts = filteredProducts?.filter((product: any) => {
        const fieldValue = product[searchType];
        console.log("fieldValue", fieldValue);

        const searchValueString = debouncedValue.toString();

        return removeDiacritics(fieldValue.toString())
          .toLowerCase()
          .includes(removeDiacritics(searchValueString).toLowerCase());
      });
    }

    if (categoryData.length > 0) {
      filteredProducts = filteredProducts?.filter((product: any) => {
        const fieldValue = product?.category;

        return categoryData.includes(fieldValue);
      });
    }

    if (brandData.length > 0) {
      filteredProducts = filteredProducts?.filter((product: any) => {
        const fieldValue = product?.brand;

        return brandData.includes(fieldValue);
      });
    }

    return filteredProducts;
  }, [brandData, categoryData, debouncedValue, location.search, productList, searchType]);

  const handleChange: TableProps<IDataType>["onChange"] = (_, __, sorter) => {
    setSortedInfo(sorter as SorterResult<IDataType>);
  };

  return (
    <S.TableStyle>
      <Card bordered>
        <div className="card-inner">
          {!isFilteredValueEmpty && <SortData />}
          {isDesktop && <UpdateData hasSelected={hasSelected} selectedRowKeys={selectedRowKeys} />}
          {isDesktop ? (
            <div className="body">
              <AdminTable
                rowSelection={rowSelection}
                rowKey={(record) => record?.id}
                columns={columns}
                dataSource={displayedProducts}
                bordered
                onChange={handleChange}
                loading={isLoading && isFetching}
                pagination={{
                  pageSize: 10,
                  hideOnSinglePage: true,
                }}
                expandable={{
                  expandedRowRender: (record) => {
                    return (
                      <AdminTable
                        bordered
                        rowKey={(record) => record?.id}
                        dataSource={record?.items}
                        columns={columnsVariant}
                        loading={isLoading && isFetching}
                        pagination={{
                          pageSize: 2,
                          hideOnSinglePage: true,
                        }}
                      />
                    );
                  },
                  rowExpandable: (record) => record.type === "configurable",
                }}
              />
            </div>
          ) : (
            <ProductDataTablet data={displayedProducts} showConfirm={showDeleteConfirm} />
          )}
        </div>
      </Card>
    </S.TableStyle>
  );
});

export default TableComponent;
