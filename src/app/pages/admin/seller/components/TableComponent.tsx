import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { AdminTable } from "@app/app/components/common/Table/AdminTable";
import { removeDiacritics } from "@app/utils/helper";
import type { ColumnsType, TableProps } from "antd/es/table";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { SellerData } from "../data";
import * as S from "../SellerInfo.styles";

import SellerInfoTableData from "./table/SellerInfoTableData";
import SellerStatusTableData from "./table/SellerStatusTableData";
import ShowPermission from "./table/ShowPermission";

const TableComponent = React.memo(({ searchValue, searchType }: any) => {
  const { t } = useTranslation();
  interface IDataType {
    id: number;
    code: string;
    name: string;
    age: number;
    kam_email: string;
    hotline: string;
    email: string;
  }
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
                {` ${record.hotline.replace("+84", 0)}`}
              </Link>
            </dd>
            <dd>
              <Link to={record.email}>
                <MailOutlined />
                {` ${record.email}`}
              </Link>
            </dd>
          </div>
        );
      },
    },
    {
      title: "",
      dataIndex: "detail",
      key: "detail",
      width: 100,
      fixed: "right",
      render: (_, record: any) => {
        return <ShowPermission id={record.id} data={record.permission} />;
      },
    },
  ];
  const displayedProducts = useMemo(() => {
    let filteredProducts: any[] = SellerData;
    if (searchValue) {
      filteredProducts = filteredProducts.filter((seller: any) => {
        const fieldValue = seller[searchType];
        const searchValueString = searchValue.toString();
        return removeDiacritics(fieldValue.toString())
          .toLowerCase()
          .includes(removeDiacritics(searchValueString).toLowerCase());
      });
    }
    return filteredProducts;
  }, [searchType, searchValue]);

  const handleChange: TableProps<IDataType>["onChange"] = (pagination, filters) => {
    console.log("Various parameters", pagination, filters);
  };
  return (
    <S.TableComponent>
      <AdminTable
        scroll={{
          x: 1000,
        }}
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={displayedProducts}
        bordered
        onChange={handleChange}
      />
    </S.TableComponent>
  );
});

export default TableComponent;
