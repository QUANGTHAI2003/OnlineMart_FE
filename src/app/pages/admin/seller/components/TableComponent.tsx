import { ExclamationCircleFilled, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Can, PermissionsSwitch } from "@app/app/components/common/Permissions";
import { AdminTable } from "@app/app/components/common/Table/AdminTable";
import { useDebounce } from "@app/hooks";
import { useDeleteSellerMutation, useGetAllSellerQuery } from "@app/store/slices/api/admin/sellerApi";
import { useAppSelector } from "@app/store/store";
import { ISeller } from "@app/types/seller.type";
import { handleApiError, notifySuccess, removeDiacritics } from "@app/utils/helper";
import { Button, Card, Modal, Space, Tag } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import * as S from "../SellerInfo.styles";

import SortData from "./SortData";
import EditPermission from "./table/EditPermission";
import SellerInfoTableData from "./table/SellerInfoTableData";
import SellerStatusTableData from "./table/SellerStatusTableData";
import ShowPermission from "./table/ShowPermission";

interface IDataType {
  id: number;
  code: string;
  name: string;
  age: number;
  kam_email: string;
  hotline: string;
  email: string;
}

const { confirm } = Modal;

const TableComponent = React.memo(({ permissionList }: any) => {
  const { t } = useTranslation();
  const { data: sellers, isFetching } = useGetAllSellerQuery();
  const [deleteSeller] = useDeleteSellerMutation();

  const {
    filteredValue,
    searchValue,
    selectSearchType: searchType = "name",
  } = useAppSelector((state) => state.sellerAdmin);

  const debouncedValue = useDebounce(searchValue, 300);

  const statusType = filteredValue?.statusType || "all";
  const permissionFilter = filteredValue?.permissionFilter;

  const handleDeleteAdmin = async (id: number) => {
    try {
      await deleteSeller(id).unwrap();
      notifySuccess("Delete seller successfully");
    } catch (error) {
      handleApiError(error);
    }
  };

  const showDeleteConfirm = (id: any) => {
    confirm({
      title: "Are you sure delete this task?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      centered: true,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      maskClosable: true,
      onOk: () => handleDeleteAdmin(id),
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const columns: ColumnsType<IDataType> = [
    {
      title: t("admin_shop.seller.table.seller_info"),
      dataIndex: "name",
      key: "name",
      render: (_, record: any) => {
        return <SellerInfoTableData data={record} />;
      },
    },
    {
      title: t("admin_shop.seller.table.condition"),
      dataIndex: "status",
      key: "status",
      render: (_, record: any) => {
        return <SellerStatusTableData data={record} trans={t} />;
      },
    },
    {
      title: t("admin_shop.seller.table.contact_info"),
      dataIndex: "status",
      key: "status",
      render: (_, record: any) => {
        return (
          <div>
            <dt className="text-editor">{`${t("admin_shop.seller.table.creator")}:`}</dt>
            <dd>
              <Link to={record.hotline}>
                <PhoneOutlined />
                {` ${record?.shop_owner?.phone?.replace("+84", 0)}`}
              </Link>
            </dd>
            <dd>
              <Link to={record?.email}>
                <MailOutlined />
                {` ${record?.shop_owner?.email}`}
              </Link>
            </dd>
          </div>
        );
      },
    },
    {
      title: t("admin_shop.seller.register.form.role"),
      dataIndex: "status",
      key: "status",
      render: (_, record: any) => {
        return (
          <Space>
            {record.roles.map((item: any) => {
              return <Tag key={item?.id}>{item?.name}</Tag>;
            })}
          </Space>
        );
      },
    },
    {
      title: "",
      dataIndex: "detail",
      key: "detail",
      width: 140,
      fixed: "right",
      render: (_, record: any) => {
        if (!record?.is_owner) {
          return (
            <div className="flex flex-col gap-y-2">
              {/* <Link target="_blank" to={`#`}>
                {t("admin_shop.seller.table.detail")}
              </Link> */}
              <ShowPermission permissions={record?.permissions} />

              <PermissionsSwitch>
                <Can permissions={["Authorizations"]}>
                  <EditPermission data={record} permissions={permissionList} isFetching={isFetching} />
                  <Button type="primary" danger ghost onClick={() => showDeleteConfirm(record.id)}>
                    {t("admin_shop.seller.table.delete")}
                  </Button>
                </Can>
                <Can>
                  <EditPermission disabled data={record} permissions={permissionList} isFetching={isFetching} />
                  <Button disabled type="primary" danger ghost onClick={() => showDeleteConfirm(record.id)}>
                    {t("admin_shop.seller.table.delete")}
                  </Button>
                </Can>
              </PermissionsSwitch>
            </div>
          );
        }
        return <p>{t("admin_shop.seller.table.edit_admin")}</p>;
      },
    },
  ];

  const displayedSellers = useMemo(() => {
    let filteredSellers: ISeller[] | undefined = sellers;

    if (debouncedValue) {
      filteredSellers = filteredSellers?.filter((seller: any) => {
        const fieldValue = seller[searchType];
        const searchValueString = debouncedValue.toString();
        return removeDiacritics(fieldValue.toString())
          .toLowerCase()
          .includes(removeDiacritics(searchValueString).toLowerCase());
      });
    }

    if (statusType) {
      filteredSellers = filteredSellers?.filter((seller: any) => {
        if (statusType !== "all") {
          return seller.status === statusType;
        }
        return seller;
      });
    }

    if (permissionFilter?.length > 0) {
      filteredSellers = filteredSellers?.filter((seller: any) => {
        const sellerPermission = seller.permissions.map((item: any) => item?.name);
        return permissionFilter.every((item: any) => {
          return sellerPermission.includes(item);
        });
      });
    }

    return filteredSellers;
  }, [debouncedValue, permissionFilter, searchType, sellers, statusType]);

  const handleChange: TableProps<IDataType>["onChange"] = (pagination, filters) => {
    console.log("Various parameters", pagination, filters);
  };

  const isFilteredValueEmpty = Object.values(filteredValue).every(
    (value) => !value || (Array.isArray(value) && value.length === 0)
  );

  return (
    <S.TableComponent>
      <Card bordered>
        <div className="card-inner">
          {!isFilteredValueEmpty && <SortData />}
          <div className="body">
            <AdminTable
              scroll={{
                x: 1000,
              }}
              rowKey={(record) => record.id}
              columns={columns}
              dataSource={displayedSellers}
              bordered
              onChange={handleChange}
              loading={isFetching}
            />
          </div>
        </div>
      </Card>
    </S.TableComponent>
  );
});

export default TableComponent;
