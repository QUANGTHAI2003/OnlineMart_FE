import { ExclamationCircleFilled } from "@ant-design/icons";
import { AdminTable } from "@app/app/components/common/Table/AdminTable";
import { useResponsive } from "@app/hooks";
import { removeDiacritics } from "@app/utils/helper";
import { Button, Card, Divider, Modal, Space, Tag } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import { SorterResult } from "antd/lib/table/interface";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { SupplierData } from "../data";
import EditSupplier from "../EditSupplier";

import UpdateData from "./UpdateData";

const { confirm } = Modal;

const TableComponent = React.memo(({ searchValue, searchType }: any) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
    supplier_code: string;
    name: string;
    phone: string;
    email: string;
    tag: string[];
    address: string;
    website: string;
  }

  const { isDesktop } = useResponsive();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [sortedInfo, setSortedInfo] = useState<SorterResult<IDataType>>({});

  const columns: ColumnsType<IDataType> = [
    {
      title: t("admin_shop.suppliers.col_supplier_code"),
      dataIndex: "supplier_code",
      key: "supplier_code",
      sorter: (a: any, b: any) => a.supplier_code - b.supplier_code,
      sortOrder: sortedInfo.columnKey === "supplier_code" ? sortedInfo.order : null,
    },
    {
      title: t("admin_shop.suppliers.col_name"),
      dataIndex: "name",
      key: "name",
      sorter: (a: any, b: any) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
    },
    {
      title: t("admin_shop.suppliers.col_phone"),
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: t("admin_shop.suppliers.col_email"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("admin_shop.suppliers.col_tag"),
      dataIndex: "tag",
      key: "tag",
      render: (_, { tag }) => (
        <>
          {tag.map((tag: any) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag className="mb-2" color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },

    {
      title: t("admin_shop.suppliers.col_address"),
      dataIndex: "address",
      key: "address",
    },
    {
      title: t("admin_shop.suppliers.col_website"),
      dataIndex: "website",
      key: "website",
      render: (_, { website }) => (
        <Link target="_blank" to={website} style={{ textDecoration: "none" }}>
          {website}
        </Link>
      ),
    },
    {
      title: t("admin_shop.suppliers.action"),
      key: "action",
      align: "center",
      fixed: "right",
      render: (_: any, record: any) => (
        <Space size="middle" direction="vertical">
          <Button type="primary" onClick={showModal} ghost className="w-full">
            {t("admin_shop.suppliers.btn_edit")}
          </Button>
          <Modal
            centered
            className="w-full"
            title={t("admin_shop.suppliers.title")}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[]}
          >
            <EditSupplier />
          </Modal>
          <Button className="w-full" onClick={() => showConfirm(record.id)}>
            {t("admin_shop.suppliers.btn_delete")}
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
  const displayedInventory: any = useMemo(() => {
    let filterInventory = SupplierData;

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

  const handleChange: TableProps<IDataType>["onChange"] = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setSortedInfo(sorter as SorterResult<IDataType>);
  };

  return (
    <section>
      <Card bordered>
        <div className="card-inner">
          <div className="header">
            <Space className="mb-4" direction="horizontal" align="center">
              <h3>
                {hasSelected
                  ? `${t("admin_shop.suppliers.name", { count: selectedRowKeys.length })}`
                  : t("admin_shop.suppliers.name")}
              </h3>
              <Divider type="vertical" />
              {isDesktop && <UpdateData hasSelected={hasSelected} />}
            </Space>
          </div>

          <div className="body">
            <AdminTable
              rowSelection={rowSelection}
              rowKey={(record) => record.id}
              columns={columns}
              dataSource={displayedInventory}
              bordered
              scroll={{ x: 1024 }}
              onChange={handleChange}
            />
          </div>
        </div>
      </Card>
    </section>
  );
});

export default TableComponent;
