import { ExclamationCircleFilled } from "@ant-design/icons";
import { Can, PermissionsSwitch } from "@app/app/components/common/Permissions";
import { useDebounce } from "@app/hooks";
import { useDeleteProductMutation, useUpdateRestoreProductMutation } from "@app/store/slices/api/admin/binApi";
import { useAppSelector } from "@app/store/store";
import { calculateTimes, handleApiError, notifySuccess, removeDiacritics } from "@app/utils/helper";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Button, Card, Divider, Modal, Space, Typography } from "antd";
import Table, { ColumnsType, TableProps } from "antd/es/table";
import { SorterResult } from "antd/es/table/interface";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { SortData, UpdateData } from ".";

const { Text } = Typography;
const { confirm } = Modal;

interface IDataType {
  id: number;
  product_media: string;
  name: string;
  category: string;
  supplier: string;
  price: number;
  stock: number;
  updated_at: string;
}

const baseImage = import.meta.env.VITE_BASE_IMAGE_URL;

const TableComponent: React.FC<any> = React.memo(({ productList, isFetching }) => {
  const { t } = useTranslation();
  const [completeAction, setCompleteAction] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [sortedInfo, setSortedInfo] = useState<SorterResult<IDataType>>({});
  const [hasSelected, setHasSelected] = useState(false);

  const [deleteProduct, { isLoading: isLoadingDelete }] = useDeleteProductMutation();
  const [restoreProduct, { isLoading: isLoadingRestore }] = useUpdateRestoreProductMutation();

  const isLoading = isLoadingDelete || isLoadingRestore;

  const filteredValue = useAppSelector((state) => state.inventoryAdmin.filteredValue);
  const isFilteredValueEmpty = Object.values(filteredValue).every(
    (value) => !value || (Array.isArray(value) && value.length === 0)
  );

  const searchValue = useAppSelector((state) => state.binAdmin.searchValue);
  const debouncedValue = useDebounce(searchValue, 300);
  const searchType = useAppSelector((state) => state.binAdmin.selectSearchType) || "name";

  useEffect(() => {
    const ishasSelected = selectedRowKeys.length > 0;

    setHasSelected(ishasSelected);
  }, [selectedRowKeys.length]);

  useEffect(() => {
    if (completeAction) {
      setHasSelected(false);
      setCompleteAction(false);
    }
  }, [completeAction]);

  const showRestoreConfirm = (productId: number, productName: string) => {
    confirm({
      title: t("admin_shop.bin.restore_modal_alert"),
      icon: <ExclamationCircleFilled />,
      content: `${productName}`,
      centered: true,
      keyboard: true,
      okText: t("admin_shop.bin.yes"),
      okType: "primary",
      maskClosable: true,
      onOk() {
        try {
          restoreProduct(productId);
          notifySuccess(t("admin_shop.bin.restore_success"));
        } catch (err) {
          handleApiError(err);
        }
      },
      onCancel() {
        // console.log("Cancel");
      },
    });
  };

  const showDeleteConfirm = (productId: number, productName: string) => {
    confirm({
      title: t("admin_shop.bin.delete_modal_alert"),
      icon: <ExclamationCircleFilled />,
      content: `${productName}`,
      centered: true,
      keyboard: true,
      okText: t("admin_shop.bin.yes"),
      okType: "danger",
      maskClosable: true,
      onOk() {
        try {
          deleteProduct(productId);
          notifySuccess(t("admin_shop.bin.delete_success"));
        } catch (err) {
          handleApiError(err);
        }
      },
      onCancel() {
        // console.log("Cancel");
      },
    });
  };

  const columns: ColumnsType<IDataType> = [
    {
      title: t("admin_shop.bin.seq"),
      dataIndex: "index",
      key: "index",
      align: "center",
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: t("admin_shop.inventory.table.image"),
      dataIndex: "product_media",
      key: "product_media",
      align: "center",
      width: 95,
      render: (_, record: any) => {
        return <img src={`${baseImage}/${record?.product_media}`} alt="Media" />;
      },
    },
    {
      title: t("admin_shop.product.list.table.product"),
      dataIndex: "name",
      key: "name",
      width: 200,
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      render: (_, record: any) => {
        return (
          <div className="flex flex-col">
            <span className="line-clamp-2">{record?.name}</span>
            <span className="text-[#94a3b8] text-[13px] line-clamp-1">{record?.sku}</span>
          </div>
        );
      },
    },
    {
      title: t("admin_shop.product.list.table.category"),
      dataIndex: "category",
      key: "category",
      width: 140,
      sorter: (a: any, b: any) => a.category.localeCompare(b.category),
      sortOrder: sortedInfo.columnKey === "category" ? sortedInfo.order : null,
      render: (_, record: any) => {
        return <div className="line-clamp-2">{record?.category}</div>;
      },
    },
    {
      title: t("admin_shop.product.list.table.brand"),
      dataIndex: "supplier",
      key: "supplier",
      width: 140,
      sorter: (a: any, b: any) => a.supplier.localeCompare(b.supplier),
      sortOrder: sortedInfo.columnKey === "supplier" ? sortedInfo.order : null,
      render: (_, record: any) => {
        return <div className="line-clamp-2">{record?.supplier}</div>;
      },
    },
    {
      title: t("admin_shop.product.list.table.deleted_at"),
      dataIndex: "deleted_at",
      key: "deleted_at",
      width: 150,
      align: "center",
      sorter: (a: any, b: any) => (new Date(a.deleted_at) as any) - (new Date(b.deleted_at) as any),
      sortOrder: sortedInfo.columnKey === "deleted_at" ? sortedInfo.order : null,
      render: (_: any, record: any) => {
        const times = calculateTimes(record?.deleted_at);
        return <span style={{ whiteSpace: "pre-wrap" }}>{times.deleted_at}</span>;
      },
    },
    {
      title: t("admin_shop.bin.deleted"),
      dataIndex: "deleted_at",
      key: "deleted_at",
      width: 160,
      align: "center",
      sorter: (a: any, b: any) => (new Date(a.deleted_at) as any) - (new Date(b.deleted_at) as any),
      sortOrder: sortedInfo.columnKey === "deleted_at" ? sortedInfo.order : null,
      render: (_: any, record: any) => {
        const times = calculateTimes(record?.deleted_at);
        return <span>{times.time_elapsed}</span>;
      },
    },
    {
      title: t("admin_shop.bin.permanently_delete_after"),
      dataIndex: "deleted_at",
      key: "deleted_at",
      width: 170,
      align: "center",
      sorter: (a: any, b: any) => (new Date(a.deleted_at) as any) - (new Date(b.deleted_at) as any),
      sortOrder: sortedInfo.columnKey === "deleted_at" ? sortedInfo.order : null,
      render: (_: any, record: any) => {
        const times = calculateTimes(record?.deleted_at);
        return <span>{times.time_remaining}</span>;
      },
    },
    {
      title: t("admin_shop.product.list.table.action"),
      key: "action",
      align: "center",
      width: 130,
      fixed: "right",
      render: (_, record: any) => (
        <Space size="small">
          <PermissionsSwitch>
            <Can permissions={["Update product"]}>
              <Button
                className="w-full"
                type="primary"
                ghost
                onClick={() => showRestoreConfirm(record?.id, record?.name)}
              >
                <FontAwesomeIcon icon={faArrowRotateLeft} />
              </Button>
            </Can>
            <Can>
              <Button disabled type="primary" ghost className="w-full">
                <FontAwesomeIcon icon={faArrowRotateLeft} />
              </Button>
            </Can>
          </PermissionsSwitch>
          <PermissionsSwitch>
            <Can permissions={["Delete product"]}>
              <Button className="w-full" danger onClick={() => showDeleteConfirm(record?.id, record?.name)}>
                <FontAwesomeIcon icon={faTrashCan} />
              </Button>
            </Can>
            <Can>
              <Button disabled className="w-full" danger>
                <FontAwesomeIcon icon={faTrashCan} />
              </Button>
            </Can>
          </PermissionsSwitch>
        </Space>
      ),
    },
  ];

  const onSelectChange = (newselectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newselectedRowKeys);

    if (newselectedRowKeys.length > 0) {
      setHasSelected(true);
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const displayedBin = useMemo(() => {
    let filterBin = productList;

    if (debouncedValue) {
      filterBin = filterBin?.filter((product: any) => {
        const fieldValue = product[searchType];
        const searchValueString = debouncedValue.toString();

        return removeDiacritics(fieldValue.toString())
          .toLowerCase()
          .includes(removeDiacritics(searchValueString).toLowerCase());
      });
    }
    return filterBin;
  }, [debouncedValue, productList, searchType]);

  const handleChange: TableProps<IDataType>["onChange"] = (_, __, sorter) => {
    setSortedInfo(sorter as SorterResult<IDataType>);
  };

  return (
    <Card>
      <Alert message={t("admin_shop.bin.permanently_delete_alert")} type="warning" showIcon closable className="mb-4" />

      {!isFilteredValueEmpty && <SortData />}
      <div className="mb-4 flex items-center">
        <Text>{`${t("admin_shop.inventory.table.number_of_stock")}:`}</Text>
        <Text strong className="px-2">
          {displayedBin?.length}
        </Text>
        <div>
          {hasSelected
            ? `(${t("admin_shop.manage_seller.table_header.selected")} ${selectedRowKeys.length} ${t(
                "admin_shop.manage_seller.table_header.items"
              )})`
            : ""}
        </div>

        <Divider type="vertical" />

        <UpdateData setCompleteAction={setCompleteAction} hasSelected={hasSelected} selectedRowKeys={selectedRowKeys} />
      </div>
      <div>
        <Table
          rowSelection={rowSelection}
          rowKey={(record) => record?.id}
          columns={columns}
          dataSource={displayedBin}
          bordered
          onChange={handleChange}
          loading={isLoading && isFetching}
          pagination={{
            pageSize: 10,
            hideOnSinglePage: true,
          }}
          scroll={{ x: 1000 }}
        />
      </div>
    </Card>
  );
});

export default TableComponent;
