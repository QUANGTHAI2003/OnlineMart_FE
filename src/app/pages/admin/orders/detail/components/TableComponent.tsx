import { AdminTable } from "@app/app/components/common/Table/Table.styles";
import { baseImageUrl, formatCurrency } from "@app/utils/helper";
import { Image, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import * as S from "../OrderDetail.styles";

interface IOrderDetail {
  id: number;
  product_name: string;
  sale_price: number;
  product_sku: string;
  qty: number;
  variant: string;
  price: number;
  subtotal: number;
  discount: number;
  grand_total: number;
  thumbnail_url: string;
}

const TableComponent = (data: any) => {
  const { t } = useTranslation();
  const [idCounter] = useState<number>(1);
  const grand_total = data?.data?.grand_total;
  const columns: ColumnsType<Partial<IOrderDetail>> = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
      align: "center",
      render: (_: any, __: any, index: number) => {
        return <Typography.Title level={5}>{idCounter + index}</Typography.Title>;
      },
      className: "w-20",
    },
    {
      title: t("admin_shop.orders.detail.table.image"),
      dataIndex: "thumbnail_url",
      key: "thumbnail_url",
      align: "center",
      render: (_: any, record: any) => {
        return <Image width={64} preview={false} src={`${baseImageUrl}/${record?.product?.product_image}`} />;
      },
    },
    {
      title: t("admin_shop.orders.detail.table.products_name"),
      dataIndex: "product_name",
      key: "product_name",
      align: "left",
      render: (_: any, record: any) => {
        return (
          <>
            <div className="line-clamp-2">{record?.product?.product_name}</div>
            <Link target="_blank" to="#/">
              {`SKU: ${record?.product?.product_sku}`}
            </Link>
          </>
        );
      },
      className: "w-76",
    },
    {
      title: t("admin_shop.orders.detail.table.qty"),
      dataIndex: "qty",
      key: "qty",
      align: "center",
      render: (_: any, record: any) => {
        return <Typography.Title level={5}>{record?.product?.product_quantity}</Typography.Title>;
      },
      className: "w-32",
    },
    {
      title: t("admin_shop.orders.detail.table.unit_price"),
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (_: any, record: any) => {
        return <span>{formatCurrency(record?.product?.product_price)}</span>;
      },
    },
    {
      title: t("admin_shop.orders.detail.table.discount"),
      dataIndex: "sale_price",
      key: "sale_price",
      align: "center",
      render: (_: any, record: any) => {
        return <span>{formatCurrency(record?.product?.product_sale)}</span>;
      },
    },
    {
      title: t("admin_shop.orders.detail.table.into_money"),
      dataIndex: "grand_total",
      key: "grand_total",
      align: "right",
      render: (_: any, record: any) => {
        return <span>{formatCurrency(record?.product?.total_money)}</span>;
      },
    },
  ];

  return (
    <AdminTable
      columns={columns}
      scroll={{ x: 500 }}
      dataSource={data?.data?.order_item}
      pagination={false}
      summary={() => {
        return (
          <Table.Summary.Row>
            <Table.Summary.Cell index={0} colSpan={3} />
            <Table.Summary.Cell index={1} colSpan={6}>
              <S.OrderDetailTotalPrice>
                <p>{t("admin_shop.orders.detail.table.total_amount")}</p>
                <span>{formatCurrency(data?.data?.grand_total)}</span>
              </S.OrderDetailTotalPrice>
              <S.OrderDetailTotalPrice>
                <p>{t("admin_shop.orders.detail.table.delivery_charges")}</p>
                <span>{formatCurrency(data?.data?.shipping_fee)}</span>
              </S.OrderDetailTotalPrice>
              <S.OrderDetailTotalPrice>
                <h4>{t("admin_shop.orders.detail.guests_must_pay")}</h4>
                <span>{formatCurrency(grand_total)}</span>
              </S.OrderDetailTotalPrice>
            </Table.Summary.Cell>
          </Table.Summary.Row>
        );
      }}
    />
  );
};

export default TableComponent;
