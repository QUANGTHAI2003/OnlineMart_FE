import { Can, PermissionsSwitch } from "@app/app/components/common/Permissions";
import { useDebounce } from "@app/hooks";
import { useAppSelector } from "@app/store/store";
import { formatCurrency, formatNumber, removeDiacritics } from "@app/utils/helper";
import { Button, Card, Divider, QRCode, Table, Tooltip, Typography } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import { SorterResult } from "antd/lib/table/interface";
import dayjs from "dayjs";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import { SortData, StatusProductData, UpdateData } from ".";

const { Text } = Typography;
interface IDataType {
  id: number;
  thumbnail_url: string;
  name: string;
  variant: number;
  stock_qty: number;
  created_at: string;
  regular_price: number;
  sale_price: number;
  qr_link: string;
  supplier_name: string;
  status: string;
  print_qrcode: string;
  category: string;
  brand: string;
}

const base_url = import.meta.env.VITE_BASE_URL;

const TableComponent: React.FC<any> = React.memo(({ productList, isFetching }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [sortedInfo, setSortedInfo] = useState<SorterResult<IDataType>>({});

  const filteredValue = useAppSelector((state) => state.inventoryAdmin.filteredValue);
  const isFilteredValueEmpty = Object.values(filteredValue).every(
    (value) => !value || (Array.isArray(value) && value.length === 0)
  );

  const searchValue = useAppSelector((state) => state.inventoryAdmin.searchValue);
  const debouncedValue = useDebounce(searchValue, 300);
  const searchType = useAppSelector((state) => state.inventoryAdmin.selectSearchType) || "name";

  const columns: ColumnsType<IDataType> = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      align: "center",
      width: 70,
      render: (_, __, index) => index + 1,
    },
    {
      title: t("admin_shop.inventory.table.image"),
      dataIndex: "thumbnail_url",
      key: "thumbnail_url",
      align: "center",
      width: 100,
      render: (_, record: any) => {
        return (
          <div>
            <img src={record?.thumbnail_url} alt="Media" />
          </div>
        );
      },
    },
    {
      title: t("admin_shop.inventory.table.product"),
      dataIndex: "name",
      key: "name",
      width: 260,
      render: (_, record: any) => {
        return (
          <div className="flex flex-col gap-1.5">
            <Tooltip title={record?.name} placement="topLeft">
              <Link to={`/admin/shop/products/${record?.variant}`} className="line-clamp-1">
                {record?.name}
              </Link>
            </Tooltip>
            <Text type="secondary" className="text-[13px] line-clamp-1">
              {record?.variant}
            </Text>
          </div>
        );
      },
    },
    {
      title: t("admin_shop.inventory.table.inventory"),
      dataIndex: "stock_qty",
      key: "stock_qty",
      align: "center",
      sorter: (a: any, b: any) => {
        const numericA = parseFloat(a.stock_qty.replace(/,/g, ""));
        const numericB = parseFloat(b.stock_qty.replace(/,/g, ""));
        return numericA - numericB;
      },
      sortOrder: sortedInfo.columnKey === "stock_qty" ? sortedInfo.order : null,
      width: 150,
      render: (_, record: any) => {
        return <div>{formatNumber(record?.stock_qty)}</div>;
      },
    },
    {
      title: t("admin_shop.inventory.table.created_at"),
      dataIndex: "created_at",
      key: "created_at",
      width: 150,
      align: "center",
      render: (date: string) => dayjs(date).format("DD/MM/YYYY h:mm:ss A"),
    },
    {
      title: t("admin_shop.inventory.table.retail_price"),
      dataIndex: "regular_price",
      key: "regular_price",
      align: "right",
      width: 150,
      render: (_, record: any) => {
        return <div>{formatCurrency(record?.regular_price)}</div>;
      },
    },
    {
      title: t("admin_shop.inventory.table.import_price"),
      dataIndex: "sale_price",
      key: "sale_price",
      align: "right",
      width: 150,
      render: (_, record: any) => {
        return <div>{formatCurrency(record?.sale_price)}</div>;
      },
    },
    {
      title: t("admin_shop.inventory.table.qrcode"),
      dataIndex: "qr_link",
      key: "qr_link",
      width: 155,
      align: "center",
      render: (_, record: any) => {
        return (
          <span className="line-clamp-1">
            <QRCode errorLevel="Q" value={`${base_url}/${record?.qr_link}`} size={122} />
          </span>
        );
      },
    },
    {
      title: t("admin_shop.inventory.table.supplier"),
      dataIndex: "supplier_name",
      key: "supplier_name",
      align: "center",
      width: 130,
      render: (_, record: any) => {
        return <span className="line-clamp-2">{record?.supplier_name}</span>;
      },
    },
    {
      title: t("admin_shop.inventory.table.status"),
      dataIndex: "status",
      key: "status",
      align: "center",
      fixed: "right",
      width: 150,
      render: (_, record: any) => {
        return <StatusProductData data={record} trans={t} />;
      },
    },
    {
      title: t("admin_shop.print_qrcode.site_header.print_qr_code"),
      dataIndex: "print_qrcode",
      key: "print_qrcode",
      align: "center",
      fixed: "right",
      width: 120,
      render: (_, record: any) => {
        return (
          <PermissionsSwitch>
            <Can permissions={["Print QR"]}>
              <Link to={`/admin/shop/products/print_qrcode?product_id=${record?.id}`} target="_blank">
                <Button type="primary" ghost>
                  {t("admin_shop.inventory.table.print_code")}
                </Button>
              </Link>
            </Can>
            <Can>
              <Button type="primary" ghost disabled>
                {t("admin_shop.inventory.table.print_code")}
              </Button>
            </Can>
          </PermissionsSwitch>
        );
      },
    },
  ];

  const onSelectChange = (newselectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newselectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;
  const categoryData = useAppSelector((state) => state.inventoryAdmin.filteredValue.categoryFilter);
  const brandData = useAppSelector((state) => state.inventoryAdmin.filteredValue.brandFilter);
  const dateData = useAppSelector((state) => state.inventoryAdmin.filteredValue.dateFilter);

  const displayedInventory = useMemo(() => {
    let filterInventory = productList;

    if (debouncedValue) {
      filterInventory = filterInventory?.filter((product: any) => {
        const fieldValue = product[searchType];
        const searchValueString = debouncedValue.toString();

        return removeDiacritics(fieldValue.toString())
          .toLowerCase()
          .includes(removeDiacritics(searchValueString).toLowerCase());
      });
    }

    if (categoryData.length > 0) {
      filterInventory = filterInventory?.filter((product: any) => {
        const fieldValue = product?.category;

        return categoryData.includes(fieldValue);
      });
    }

    if (brandData.length > 0) {
      filterInventory = filterInventory?.filter((product: any) => {
        const fieldValue = product?.brand;

        return brandData.includes(fieldValue);
      });
    }

    if (dateData) {
      filterInventory = filterInventory?.filter((product: any) => {
        const fieldValue = product?.created_at;
        const productDate = dayjs(fieldValue).format("DD/MM/YYYY");

        return productDate === dateData;
      });
    }

    return filterInventory;
  }, [brandData, categoryData, dateData, debouncedValue, productList, searchType]);

  const handleChange: TableProps<IDataType>["onChange"] = (_, __, sorter) => {
    setSortedInfo(sorter as SorterResult<IDataType>);
  };

  const handleSelectProducts = () => {
    const selectedIds = selectedRowKeys.map((key: any) => key.split("_")[0]);
    navigate(`/admin/shop/products/print_qrcode?product_id=${selectedIds}`);
  };

  return (
    <Card>
      {!isFilteredValueEmpty && <SortData />}
      <div className="mb-4 flex items-center">
        <Text>{`${t("admin_shop.inventory.table.number_of_stock")}:`}</Text>
        <Text strong className="px-2">
          {displayedInventory?.length}
        </Text>
        <div>
          {hasSelected
            ? `(${t("admin_shop.manage_seller.table_header.selected")} ${selectedRowKeys.length} ${t(
                "admin_shop.manage_seller.table_header.items"
              )})`
            : ""}
        </div>
        <Divider type="vertical" />
        <UpdateData
          hasSelected={hasSelected}
          selectedRowKeys={selectedRowKeys}
          handleSelectProducts={handleSelectProducts}
        />
      </div>
      <div>
        <Table
          rowSelection={rowSelection}
          rowKey={(record) => `${record?.id}_${record?.name}`}
          columns={columns}
          dataSource={displayedInventory}
          bordered
          onChange={handleChange}
          loading={isFetching}
          pagination={{
            pageSize: 10,
            hideOnSinglePage: true,
          }}
          scroll={{ x: 1300 }}
        />
      </div>
    </Card>
  );
});

export default TableComponent;
