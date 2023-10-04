import { removeDiacritics } from "@app/utils/helper";
import { Card, Table, Tooltip, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { InventoryListData } from "../data";

import { StatusProductData } from ".";

const { Text } = Typography;

interface IDataType {
  id: number;
  product_media: string;
  name: string;
  product_code: string;
  sellable: number;
  qty_inventory: number;
  created_at: string;
  retail_price: number;
  import_price: number;
  wholesale_price: number;
  barcode: string;
  supplier: string;
  status: string;
}

const TableComponent = React.memo(({ searchValue, searchType }: any) => {
  const { t } = useTranslation();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const columns: ColumnsType<IDataType> = [
    {
      title: t("admin_shop.inventory.table.image"),
      dataIndex: "product_media",
      key: "product_media",
      align: "center",
      width: 100,
      render: (_: any, record: any) => {
        return (
          <div>
            <img src={record.product_media} alt="Media" />
          </div>
        );
      },
    },
    {
      title: t("admin_shop.inventory.table.product"),
      dataIndex: "name",
      key: "name",
      width: 300,
      render: (_: any, record: any) => {
        return (
          <div className="flex flex-col gap-1.5">
            <Tooltip title={record.name} placement="topLeft">
              <Link to={`/admin/shop/products/${record.product_code}`} className="line-clamp-1">
                {record.name}
              </Link>
            </Tooltip>
            <Text type="secondary" className="text-[13px] line-clamp-1">
              {record.product_code}
            </Text>
          </div>
        );
      },
    },
    {
      title: t("admin_shop.inventory.table.sellable"),
      dataIndex: "sellable",
      key: "sellable",
      align: "center",
      width: 150,
      sorter: (a: any, b: any) => {
        const numericA = parseFloat(a.sellable.replace(/,/g, ""));
        const numericB = parseFloat(b.sellable.replace(/,/g, ""));
        return numericA - numericB;
      },
    },
    {
      title: t("admin_shop.inventory.table.inventory"),
      dataIndex: "qty_inventory",
      key: "qty_inventory",
      align: "center",
      sorter: (a: any, b: any) => {
        const numericA = parseFloat(a.qty_inventory.replace(/,/g, ""));
        const numericB = parseFloat(b.qty_inventory.replace(/,/g, ""));
        return numericA - numericB;
      },
      width: 150,
    },
    {
      title: t("admin_shop.inventory.table.created_at"),
      dataIndex: "created_at",
      key: "created_at",
      width: 150,
      sorter: (a: any, b: any) => {
        const parseDate = (dateString: string) => {
          const regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
          const match = dateString.match(regex);

          if (match) {
            const [, month, day, year] = match;
            const numericMonth = parseInt(month, 10);
            const numericDay = parseInt(day, 10);

            if (numericMonth >= 1 && numericMonth <= 12 && numericDay >= 1 && numericDay <= 31) {
              const formattedDate = `${numericMonth}/${numericDay}/${year}`;
              return new Date(formattedDate);
            }
            console.error(`Invalid date: ${dateString}`);
            return null;
          }
          console.error(`Invalid date format: ${dateString}`);
          return null;
        };

        const dateA = parseDate(a.created_at);
        const dateB = parseDate(b.created_at);

        if (dateA && dateB) {
          return dateA.getTime() - dateB.getTime();
        }
        return dateA ? -1 : dateB ? 1 : 0;
      },
    },
    {
      title: t("admin_shop.inventory.table.retail_price"),
      dataIndex: "retail_price",
      key: "retail_price",
      align: "right",
      width: 150,
    },
    {
      title: t("admin_shop.inventory.table.import_price"),
      dataIndex: "import_price",
      key: "import_price",
      align: "right",
      width: 150,
    },
    {
      title: t("admin_shop.inventory.table.wholesale_price"),
      dataIndex: "wholesale_price",
      key: "wholesale_price",
      align: "right",
      width: 135,
    },
    {
      title: t("admin_shop.inventory.table.barcode"),
      dataIndex: "barcode",
      key: "barcode",
      width: 130,
      render: (_: any, record: any) => {
        return <span className="line-clamp-1">{record.barcode}</span>;
      },
    },
    {
      title: t("admin_shop.inventory.table.supplier"),
      dataIndex: "supplier",
      key: "supplier",
      align: "center",
      width: 130,
      render: (_: any, record: any) => {
        return <span className="line-clamp-2">{record.supplier}</span>;
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
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const displayedInventory: any = useMemo(() => {
    let filterInventory = InventoryListData;

    if (searchValue) {
      filterInventory = filterInventory.filter((product: any) => {
        const fieldValue = product[searchType];
        const searchValueString = searchValue.toString();

        return removeDiacritics(fieldValue.toString())
          .toLowerCase()
          .includes(removeDiacritics(searchValueString).toLowerCase());
      });
    }

    return filterInventory;
  }, [searchType, searchValue]);

  return (
    <Card>
      <div className="mb-4">
        <Text>{`${t("admin_shop.inventory.table.number_of_stock")}:`}</Text>
        <Text strong className="px-2">
          {displayedInventory.length}
        </Text>
        {hasSelected
          ? `(${t("admin_shop.manage_seller.table_header.selected")} ${selectedRowKeys.length} ${t(
              "admin_shop.manage_seller.table_header.items"
            )})`
          : ""}
      </div>
      <div>
        <Table
          dataSource={displayedInventory}
          rowKey={(record) => record.id}
          columns={columns}
          rowSelection={rowSelection}
          bordered
          scroll={{ x: 1300 }}
        />
      </div>
    </Card>
  );
});

export default TableComponent;
