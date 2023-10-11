import { ExclamationCircleFilled } from "@ant-design/icons";
import { AdminTable } from "@app/app/components/common/Table/AdminTable";
import { useResponsive } from "@app/hooks";
import { useDeleteSupplierMutation, useGetSupplierListQuery } from "@app/store/slices/api/supplierApi";
import { ISupplier } from "@app/types/suppliers.types";
import { notifyError, notifySuccess, removeDiacritics } from "@app/utils/helper";
import { Button, Card, Divider, Modal, Space } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import { SorterResult } from "antd/lib/table/interface";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import EditSupplier from "../EditSupplier";

import UpdateData from "./UpdateData";

const { confirm } = Modal;

const shop_id = 1;
const TableComponent = React.memo(({ searchValue, searchType }: any) => {
  const { t } = useTranslation();
  const { data = [], isFetching } = useGetSupplierListQuery({ shop_id });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingSupplierId, setEdtingSupplierId] = useState<number | null>(null);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleEditSupplier = (id: number) => {
    setEdtingSupplierId(id);
    showModal();
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [deleteSupplier] = useDeleteSupplierMutation();
  const handleDeleteSupplier = async (id: number) => {
    try {
      await deleteSupplier(id).unwrap();
      notifySuccess("Successfully", "Delete supplier successfully");
    } catch (err) {
      notifyError("Error", "Delete supplier failed");
    }
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
        handleDeleteSupplier(id);
      },
      onCancel() {
        console.log("Cancel");
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
      sorter: (a, b) => a.code.length - b.code.length,
      sortOrder: sortedInfo.columnKey === "code" ? sortedInfo.order : null,
    },
    {
      title: t("admin_shop.suppliers.col_name"),
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
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
          <Button type="primary" onClick={() => handleEditSupplier(record.id)} ghost className="w-full">
            {t("admin_shop.suppliers.btn_edit")}
          </Button>
          <Modal
            centered
            className="w-[768px]"
            title={t("admin_shop.suppliers.title_update")}
            open={isModalOpen && editingSupplierId === record.id}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[]}
          >
            <EditSupplier id={record.id} onCancel={handleCancel} />
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
  const suppliersList: any = useMemo(() => {
    let filterInventory = data;
    console.log("filterInventory", filterInventory);

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
  }, [searchType, searchValue, data]);

  const handleChange: TableProps<ISupplier>["onChange"] = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
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
