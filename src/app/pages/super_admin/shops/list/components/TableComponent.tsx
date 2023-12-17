import { DownOutlined } from "@ant-design/icons";
import { SuperAdminTable } from "@app/app/components/common/Table/SuperAdminTable";
import {
  useAccpectShopMutation,
  useGetListManagerShopQuery,
  useReasonAccpectShopMutation,
} from "@app/store/slices/api/superadmin/managerShopApi";
import { setShopId } from "@app/store/slices/redux/superadmin/managerShopSlice";
import { useAppDispatch, useAppSelector } from "@app/store/store";
import { IManagerShop } from "@app/types/shop.types";
import { handleApiError, notifySuccess, removeDiacritics } from "@app/utils/helper";
import { Button, Card, Dropdown, Form, Input, MenuProps, Modal, Space, Tag } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import { SorterResult } from "antd/es/table/interface";
import { TFunction } from "i18next";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const TableComponent = React.memo(({ searchValue, searchType, selectType, selectValue }: any) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [selectedShopId, setSelectedShopId] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sortedInfo, setSortedInfo] = useState<SorterResult<IManagerShop>>({});

  const { data: getListManagerShop, isFetching } = useGetListManagerShopQuery();
  const [updateStatus, { isLoading }] = useAccpectShopMutation();
  const [reasonAccpect, { isLoading: loadReason }] = useReasonAccpectShopMutation();
  const dispatch = useAppDispatch();

  const shopIdSlice = useAppSelector((state) => state.managerShopSupperAdmin.shopId);
  const handleAccpect = async (shopId: number) => {
    try {
      setSelectedShopId(shopId);
      await updateStatus(shopId).unwrap();
      notifySuccess("Successfully", "Change accpect shop successfully");
    } catch (err: any) {
      handleApiError(err);
    }
  };

  const handleSubmit = async (fieldValues: any) => {
    try {
      await reasonAccpect({ shopId: shopIdSlice, data: { reason_accpect: fieldValues.reason_accpect } }).unwrap();
      notifySuccess("Successfully", "Reason accpect shop successfully");
      setIsModalVisible(false);
    } catch (err: any) {
      handleApiError(err);
    }
  };

  const handleMenuClick = (value: number) => {
    dispatch(setShopId(value));
    setIsModalVisible(true);
  };

  const getStatusTagColor = (type: string, t: TFunction<"translation", undefined>) => {
    switch (type) {
      case "0":
        return ["volcano", t("admin_super.shop_list.filter.disabled")];
      case "1":
        return ["green", t("admin_super.shop_list.filter.enabled")];
      case "2":
        return ["", "Duyệt không thành công"];
      default:
        return [];
    }
  };

  const getItems = (record: any): MenuProps["items"] => [
    {
      key: "1",
      label: (
        <Button className="p-0 bg-transparent" onClick={() => handleMenuClick(record?.id)} type="text">
          {t("admin_super.shop_list.table.cancel")}
        </Button>
      ),
    },
  ];

  const columns: ColumnsType<IManagerShop> = [
    {
      title: t("admin_super.shop_list.table.shop_code"),
      dataIndex: "code",
      key: "code",
      sorter: (a: any, b: any) => a.code.localeCompare(b.code),
      sortOrder: sortedInfo.columnKey === "code" ? sortedInfo.order : null,
    },
    {
      title: t("admin_super.shop_list.table.shop_name"),
      dataIndex: "name",
      key: "name",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
    },
    {
      title: t("admin_super.shop_list.table.shop_email"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("admin_super.shop_list.table.shop_phone"),
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: t("admin_super.shop_list.table.shop_status"),
      dataIndex: "type",
      key: "type",
      render: (_id, record) => {
        const [statusColor, statusText] = getStatusTagColor(record.type, t);
        return <Tag color={statusColor}>{statusText}</Tag>;
      },
    },
    {
      title: t("admin_super.shop_list.table.action"),
      key: "action",
      fixed: "right",
      width: 180,
      align: "center",
      render: (_, record: any) => (
        <Space size="middle" direction="vertical">
          <Link to={`detail/${record.id}`}>
            <Button type="primary" ghost className="w-full">
              {t("admin_super.shop_list.table.shop_detail")}
            </Button>
          </Link>
          <Dropdown.Button
            icon={<DownOutlined />}
            placement="bottomCenter"
            onClick={() => handleAccpect(record?.id)}
            loading={selectedShopId === record?.id && isLoading}
            menu={{ items: getItems(record) }}
          >
            {t("admin_super.shop_list.table.approve")}
          </Dropdown.Button>
        </Space>
      ),
    },
  ];
  const displayedShop = useMemo(() => {
    let filteredShop = getListManagerShop;
    if (searchValue) {
      filteredShop = filteredShop?.filter((shop: any) => {
        const fieldValue = shop[searchType];
        const searchValueString = searchValue.toString();

        return removeDiacritics(fieldValue?.toString())
          .toLowerCase()
          .includes(removeDiacritics(searchValueString).toLowerCase());
      });
    }
    if (selectValue) {
      filteredShop = filteredShop?.filter((shop: any) => {
        const fieldSelectValue = shop?.type;
        return fieldSelectValue === selectType;
      });
    }

    return filteredShop;
  }, [getListManagerShop, searchType, searchValue, selectType, selectValue]);

  const handleChange: TableProps<IManagerShop>["onChange"] = (_pagination, _filters, sorter) => {
    setSortedInfo(sorter as SorterResult<IManagerShop>);
  };
  return (
    <>
      <section>
        <Card bordered>
          <div className="card-inner">
            <div className="body">
              <SuperAdminTable
                loading={isFetching}
                columns={columns}
                dataSource={displayedShop}
                bordered
                onChange={handleChange}
                rowKey={undefined}
              />
            </div>
          </div>
        </Card>
      </section>
      <Modal
        title={t("admin_super.shop_list.table.notification")}
        width={720}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="confirm" type="primary" htmlType="submit" form="formReasonAccpect" block loading={loadReason}>
            {t("admin_super.shop_list.table.confirm")}
          </Button>,
        ]}
      >
        <Form form={form} autoComplete="off" id="formReasonAccpect" onFinish={handleSubmit}>
          <Form.Item name="reason_accpect">
            <Input.TextArea autoSize={{ minRows: 5 }} placeholder={t("admin_super.shop_list.table.text_area")} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});

export default TableComponent;
