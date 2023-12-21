import { ExclamationCircleFilled } from "@ant-design/icons";
import { AdminTable } from "@app/app/components/common/Table/AdminTable";
import { useResponsive } from "@app/hooks";
import { useDeleteSupplierMutation, useGetSupplierListQuery } from "@app/store/slices/api/supplierApi";
import { ISupplier } from "@app/types/suppliers.types";
import { handleApiError, notifySuccess, removeDiacritics } from "@app/utils/helper";
import { Button, Card, Divider, Modal, Space } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import { SorterResult } from "antd/lib/table/interface";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import SupplierTableDataName from "./SupplierTableDataName";
import UpdateData from "./UpdateData";

const { confirm } = Modal;

const TableComponent = React.memo(({ searchValue, searchType }: any) => {
  const { t } = useTranslation();

  const { data: supplierList, isFetching } = useGetSupplierListQuery();
  const [deleteSupplier] = useDeleteSupplierMutation();
  const handleDeleteSupplier = async (id: number) => {
    try {
      await deleteSupplier(id).unwrap();
      notifySuccess("Successfully", "Delete supplier successfully");
    } catch (err) {
      handleApiError(err);
    }
  };
  const showConfirm = (id: number) => {
    confirm({
      title: t("admin_shop.suppliers.delete_confirm"),
      icon: <ExclamationCircleFilled />,
      centered: true,
      keyboard: true,
      maskClosable: true,
      onOk() {
        handleDeleteSupplier(id);
      },
    });
  };
  const { isDesktop } = useResponsive();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [sortedInfo, setSortedInfo] = useState<SorterResult<ISupplier>>({});

  const columns: ColumnsType<ISupplier> = [
    {
      title: t("admin_shop.suppliers.col_supplier_code"),
      dataIndex: "code",
      key: "code",
      sorter: (a, b) => a.code.localeCompare(b.code),
      sortOrder: sortedInfo.columnKey === "code" ? sortedInfo.order : null,
    },
    {
      title: t("admin_shop.suppliers.col_name"),
      dataIndex: "name",
      key: "name",
      width: "20%",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      render: (_, record: ISupplier) => {
        return <SupplierTableDataName {...record} />;
      },
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
          {website ? website : null}
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
          <Link to={`edit/${record?.id}`}>
            <Button type="primary" ghost className="w-full">
              {t("admin_shop.suppliers.btn_edit")}
            </Button>
          </Link>
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

  const suppliersList: any = useMemo(() => {
    let filterInventory = supplierList;

    if (searchValue) {
      filterInventory = filterInventory?.filter((supplier: any) => {
        const fieldValue = supplier[searchType];
        const searchValueString = searchValue.toString();

        return removeDiacritics(fieldValue.toString())
          .toLowerCase()
          .includes(removeDiacritics(searchValueString).toLowerCase());
      });
    }

    return filterInventory;
  }, [searchType, searchValue, supplierList]);

  const handleChange: TableProps<ISupplier>["onChange"] = (_, __, sorter) => {
    setSortedInfo(sorter as SorterResult<ISupplier>);
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
              {isDesktop && <UpdateData hasSelected={hasSelected} selectedRowKeys={selectedRowKeys} />}
            </Space>
          </div>
          <div className="body">
            <AdminTable
              loading={isFetching}
              rowSelection={rowSelection}
              rowKey={(record) => record.id}
              columns={columns}
              dataSource={suppliersList}
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
