import { useGetAllRoleQuery } from "@app/store/slices/api/admin/roleApi";
import { formatDateTime, removeDiacritics } from "@app/utils/helper";
import { Card, Col, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table/interface";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { DeleteRole, EditRole, ViewPermissions } from ".";

interface IDataType {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

const { Text } = Typography;

const TableComponent = React.memo(({ searchValue, searchType }: any) => {
  const { t } = useTranslation();

  const { data: roles, isFetching } = useGetAllRoleQuery();

  const columns: ColumnsType<IDataType> = [
    {
      title: t("admin_shop.manage_seller.table_header.name"),
      dataIndex: "name",
      key: "name",
      width: 60,
    },
    {
      title: t("admin_shop.manage_seller.table_header.description"),
      dataIndex: "description",
      key: "description",
      width: 130,
      render: (_: any, record: any) => {
        return <div className="line-clamp-2">{record.description}</div>;
      },
    },
    {
      title: t("admin_shop.manage_seller.table_header.create_at"),
      dataIndex: "created_at",
      key: "created_at",
      width: 80,
      sorter: (a: { created_at: string }, b: { created_at: string }) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      render: (_: any, record: any) => {
        return <>{formatDateTime(record?.created_at)}</>;
      },
    },
    {
      title: t("admin_shop.manage_seller.table_header.update_at"),
      dataIndex: "updated_at",
      key: "updated_at",
      width: 80,
      sorter: (a: { updated_at: string }, b: { updated_at: string }) =>
        new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime(),
      render: (_: any, record: any) => {
        return <>{formatDateTime(record?.updated_at)}</>;
      },
    },
    {
      title: t("admin_shop.manage_seller.table_header.action"),
      key: "action",
      align: "center",
      width: 70,
      fixed: "right",
      render: (_: any, record: any) => {
        return (
          <div className="flex justify-center gap-1">
            <ViewPermissions id={record.id} permissions={record.permissions} />
            <EditRole data={record} />
            <DeleteRole id={record.id} />
          </div>
        );
      },
    },
  ];

  const displayedRoles: any = useMemo(() => {
    let filterRoles = roles;

    if (searchValue) {
      filterRoles = filterRoles?.filter((role: any) => {
        const fieldValue = role[searchType];
        const searchValueString = searchValue.toString();

        return removeDiacritics(fieldValue.toString())
          .toLowerCase()
          .includes(removeDiacritics(searchValueString).toLowerCase());
      });
    }

    return filterRoles;
  }, [roles, searchType, searchValue]);

  return (
    <Col span={24}>
      <Card>
        <div className="mb-4">
          <Text className="pr-2">{t("admin_shop.manage_seller.table_header.tolal_roles")}</Text>
          <Text strong className="pr-2">
            {displayedRoles?.length}
          </Text>
        </div>
        <div>
          <Table
            bordered
            loading={isFetching}
            dataSource={displayedRoles}
            rowKey={(record) => record.id}
            columns={columns}
            scroll={{ x: 1300 }}
          />
        </div>
      </Card>
    </Col>
  );
});

export default TableComponent;
