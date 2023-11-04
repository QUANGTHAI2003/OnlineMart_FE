import { DownOutlined } from "@ant-design/icons";
import { SuperAdminTable } from "@app/app/components/common/Table/SuperAdminTable";
import { removeDiacritics } from "@app/utils/helper";
import { Button, Card, Dropdown, Form, Input, MenuProps, Modal, Space, Tag } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import { SorterResult } from "antd/es/table/interface";
import { TFunction } from "i18next";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { data } from "../data";

interface IDataType {
  id: number;
  name: string;
  phone: number;
  email: string;
  status: string;
  code: string;
}

interface ITableComponentProps {
  searchValue: string;
  searchType: string;
  selectType: string;
  selectValue: string;
}

const TableComponent = React.memo(({ searchValue, searchType, selectType, selectValue }: ITableComponentProps) => {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sortedInfo, setSortedInfo] = useState<SorterResult<IDataType>>({});

  const handleMenuClick = () => {
    setIsModalVisible(true);
  };
  const getStatusTagColor = (status: string, t: TFunction<"translation", undefined>) => {
    switch (status) {
      case "disabled":
        return ["volcano", t("admin_super.shop_list.filter.disabled")];
      case "enabled":
        return ["green", t("admin_super.shop_list.filter.enabled")];
      default:
        return [];
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Button className="p-0 bg-transparent" type="text">
          {t("admin_super.shop_list.table.approve")}
        </Button>
      ),
    },
    {
      key: "2",
      label: (
        <Button className="p-0 bg-transparent" onClick={handleMenuClick} type="text">
          {t("admin_super.shop_list.table.cancel")}
        </Button>
      ),
    },
  ];

  const columns: ColumnsType<IDataType> = [
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
      dataIndex: "status",
      key: "status",
      render: (_id, record) => {
        const [statusColor, statusText] = getStatusTagColor(record.status, t);
        return <Tag color={statusColor}>{statusText}</Tag>;
      },
    },
    {
      title: t("admin_super.shop_list.table.action"),
      key: "action",
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
            menu={{
              items,
            }}
          >
            {t("admin_super.shop_list.table.approve")}
          </Dropdown.Button>
        </Space>
      ),
    },
  ];

  const displayedShop = useMemo(() => {
    let filteredShop = data;
    if (searchValue) {
      filteredShop = filteredShop.filter((shop: any) => {
        const fieldValue = shop[searchType];
        const searchValueString = searchValue.toString();

        return removeDiacritics(fieldValue.toString())
          .toLowerCase()
          .includes(removeDiacritics(searchValueString).toLowerCase());
      });
    }
    if (selectValue) {
      filteredShop = filteredShop.filter((shop: any) => {
        const fieldSelectValue = shop.status;
        return fieldSelectValue === selectType;
      });
    }

    return filteredShop;
  }, [searchType, searchValue, selectType, selectValue]);

  const handleChange: TableProps<IDataType>["onChange"] = (_pagination, _filters, sorter) => {
    setSortedInfo(sorter as SorterResult<IDataType>);
  };
  return (
    <>
      <section>
        <Card bordered>
          <div className="card-inner">
            <div className="body">
              <SuperAdminTable
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
          <Button key="confirm" type="primary" block onClick={() => setIsModalVisible(false)}>
            {t("admin_super.shop_list.table.confirm")}
          </Button>,
        ]}
      >
        <Form.Item>
          <Input.TextArea autoSize={{ minRows: 5 }} placeholder={t("admin_super.shop_list.table.text_area")} />
        </Form.Item>
      </Modal>
    </>
  );
});

export default TableComponent;
