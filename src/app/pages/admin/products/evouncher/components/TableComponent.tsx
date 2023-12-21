import { AdminTable } from "@app/app/components/common/Table/AdminTable";
import { useDeleteVoucherMutation, useGetVoucherRootQuery } from "@app/store/slices/api/admin/voucherApi";
import { useAppSelector } from "@app/store/store";
import { IVoucher } from "@app/types/voucher.types";
import { formatCurrency, formatVNCurrency, handleApiError, notifySuccess } from "@app/utils/helper";
import { Button, Card, Divider, Modal, Space } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import { SorterResult } from "antd/es/table/interface";
import dayjs from "dayjs";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import EditVoucher from "./EditEvoucher";

import { UpdateData } from ".";

interface IDataType {
  id: number;
  shop_id: number;
  code: string;
  usage_limit: number;
  min_discount_amount: number;
  max_discount_amount: number;
  discount: number;
  unit: "0" | "1";
  status: string;
  start_date: string;
  expired_date: string | null;
  created_at: string;
  updated_at: string;
}
const { confirm } = Modal;

const TableComponent = React.memo(() => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { t } = useTranslation();
  const location = useLocation();
  const shop_id = useAppSelector((state) => state.userState.user)?.shop?.id;

  const { data: voucherData, isFetching } = useGetVoucherRootQuery(shop_id);
  const [editingVoucherId, setEdtingVoucherId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [deleteVoucher] = useDeleteVoucherMutation();
  const hasSelected = selectedRowKeys.length > 0;
  const showModal = () => {
    setIsModalOpen(true);
  };

  const showDeleteConfirm = (id: number) => {
    confirm({
      title: t("admin_shop.product.evouncher.table.delete_cf"),
      okText: t("admin_shop.product.evouncher.table.yes"),
      okType: "danger",
      centered: true,
      onOk: () => handleDeleteVoucher(id),
      cancelText: t("admin_shop.product.evouncher.table.no"),
    });
  };
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const handleEditVoucher = (id: number) => {
    setEdtingVoucherId(id);
    showModal();
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDeleteVoucher = async (id: number) => {
    try {
      await deleteVoucher(id).unwrap();
      notifySuccess(
        t("admin_shop.product.evouncher.successfully"),
        t("admin_shop.product.evouncher.delete_successfully")
      );
    } catch (err) {
      handleApiError(err);
    }
  };

  const [sortedInfo, setSortedInfo] = useState<SorterResult<IVoucher>>({});
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const handleChange: TableProps<IVoucher>["onChange"] = (_, __, sorter) => {
    setSortedInfo(sorter as SorterResult<IVoucher>);
  };
  formatVNCurrency(100000);
  const columns: ColumnsType<IDataType> = [
    {
      title: t("admin_shop.product.evouncher.table.id_vouncher"),
      dataIndex: "code",
      key: "1",
      sorter: (a, b) => a.code.localeCompare(b.code),
      sortOrder: sortedInfo.columnKey === "code" ? sortedInfo.order : null,
    },
    {
      title: t("admin_shop.product.evouncher.table.usage_limit"),
      dataIndex: "usage_limit",
      key: "2",
      sorter: (a, b) => a.usage_limit - b.usage_limit,
      sortOrder: sortedInfo.columnKey === "usage_limit" ? sortedInfo.order : null,
    },
    {
      title: t("admin_shop.product.evouncher.table.discount"),
      key: "3",
      sorter: (a, b) => a.discount - b.discount,
      sortOrder: sortedInfo.columnKey === "discount" ? sortedInfo.order : null,
      render: (record) => {
        console.log(record.unit);
        return record.unit === "0" ? record.discount : formatCurrency(record.discount);
      },
    },
    {
      title: t("admin_shop.product.evouncher.table.unit"),
      dataIndex: "unit",
      key: "4",
      render: (value) => (value === "1" ? "VNĐ" : "%"),
    },
    {
      title: t("admin_shop.product.evouncher.table.min_discount_amount"),
      dataIndex: "min_discount_amount",
      key: "5",
      sorter: (a, b) => a.min_discount_amount - b.min_discount_amount,
      sortOrder: sortedInfo.columnKey === "min_discount_amount" ? sortedInfo.order : null,
      render: (value) => formatCurrency(value),
    },
    {
      title: t("admin_shop.product.evouncher.table.max_discount_amount"),
      dataIndex: "max_discount_amount",
      key: "6",
      sorter: (a, b) => a.max_discount_amount - b.max_discount_amount,
      sortOrder: sortedInfo.columnKey === "max_discount_amount" ? sortedInfo.order : null,
      render: (value) => formatCurrency(value),
    },
    {
      title: t("admin_shop.product.evouncher.table.status"),
      dataIndex: "status",
      key: "6",
      render: (value) =>
        value === "0"
          ? t("admin_shop.product.evouncher.expired")
          : value === "1"
          ? t("admin_shop.product.evouncher.valid")
          : value === "2"
          ? t("admin_shop.product.evouncher.not_activated")
          : null,
    },
    {
      title: t("admin_shop.product.evouncher.table.start_date"),
      dataIndex: "start_date",
      key: "7",
      sorter: (a: any, b: any) => a.start_date.length - b.start_date.length,
      sortOrder: sortedInfo.columnKey === "start_date" ? sortedInfo.order : null,
    },
    {
      title: t("admin_shop.product.evouncher.table.expiration_date"),
      dataIndex: "expired_date",
      key: "8",
      sorter: (a: any, b: any) => a.expired_date.length - b.expired_date.length,
      sortOrder: sortedInfo.columnKey === "expired_date" ? sortedInfo.order : null,
    },
    {
      key: "9",
      render: (_, record) => (
        <Space size="middle" direction="vertical">
          <Button type="primary" onClick={() => handleEditVoucher(record.id)} ghost className="w-full">
            {t("admin_shop.suppliers.btn_edit")}
            <Modal
              centered
              className="w-[768px]"
              title={t("admin_shop.product.evouncher.form.update_voucher")}
              open={isModalOpen && editingVoucherId === record.id}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[]}
            >
              <EditVoucher id={record.id} onCancel={handleCancel} />
            </Modal>
          </Button>
          <Button type="primary" onClick={() => showDeleteConfirm(record.id)} ghost>
            {t("admin_shop.product.evouncher.table.delete")}
          </Button>
        </Space>
      ),
    },
  ];
  const queryParams = new URLSearchParams(location.search);
  const statusParam = queryParams.get("status");
  const discountParam = queryParams.get("max_discount_amount");
  const startParam = queryParams.get("start_date");
  const endParam = queryParams.get("expired_date");

  const displayedVouchers = useMemo(() => {
    let filteredVouchers = voucherData || [];

    if (statusParam) {
      filteredVouchers = filteredVouchers.filter((voucher) => voucher.status === statusParam);
    }

    if (discountParam) {
      const operator = discountParam.charAt(0);
      const value = parseInt(discountParam.slice(1));
      if (operator === "<") {
        filteredVouchers = filteredVouchers.filter((voucher) => voucher.max_discount_amount < value);
      } else if (operator === ">") {
        filteredVouchers = filteredVouchers.filter((voucher) => voucher.max_discount_amount > value);
      }
    }

    if (startParam && endParam) {
      const startDate = dayjs(startParam, "YYYY-MM-DD");
      const endDate = dayjs(endParam, "YYYY-MM-DD");

      filteredVouchers = filteredVouchers.filter(
        (voucher) =>
          dayjs(voucher.start_date).isSameOrAfter(startDate) && dayjs(voucher.expired_date).isSameOrBefore(endDate)
      );
    }

    return filteredVouchers;
  }, [endParam, startParam, statusParam, discountParam, voucherData]);
  return (
    <Card className="m-6">
      <Space className="flex justify-end m-4" direction="horizontal" align="center">
        <h3>
          {hasSelected
            ? `${t("admin_shop.orders.list.table.selecting", { count: selectedRowKeys.length })}`
            : t("admin_shop.product.evouncher.table.title")}
        </h3>
        <Divider type="vertical" />
        <UpdateData hasSelected={hasSelected} selectedRowKeys={selectedRowKeys} />
      </Space>
      <AdminTable
        loading={isFetching}
        bordered
        columns={columns}
        pagination={{ pageSize: 5 }}
        onChange={handleChange}
        rowSelection={rowSelection}
        dataSource={displayedVouchers}
        scroll={{ x: 500 }}
        rowKey={(record) => record.id}
      />
    </Card>
  );
});

export default TableComponent;
