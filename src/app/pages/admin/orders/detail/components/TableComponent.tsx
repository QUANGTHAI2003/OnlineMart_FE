import { AdminTable } from "@app/app/components/common/Table/Table.styles";
import { formatCurrency } from "@app/utils/helper";
import { Image, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
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

const TableComponent = () => {
  const { t } = useTranslation();
  const columns: ColumnsType<Partial<IOrderDetail>> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: t("admin_shop.orders.detail.table.image"),
      dataIndex: "thumbnail_url",
      key: "thumbnail_url",
      align: "center",
      render: (_: any, record: any) => {
        return <Image width={64} preview={false} src={`${record.thumbnail_url}`} />;
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
            <div>{record.product_name}</div>
            <h5 className="font-normal">{record.variant}</h5>
            <Link target="_blank" to="#/">
              {record.product_sku}
            </Link>
          </>
        );
      },
    },
    {
      title: t("admin_shop.orders.detail.table.qty"),
      dataIndex: "qty",
      key: "qty",
      align: "center",
    },
    {
      title: t("admin_shop.orders.detail.table.unit_price"),
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (_: any, record: any) => {
        return <span>{formatCurrency(record.price)}</span>;
      },
    },
    {
      title: t("admin_shop.orders.detail.table.discount"),
      dataIndex: "sale_price",
      key: "sale_price",
      align: "center",
    },
    {
      title: t("admin_shop.orders.detail.table.into_money"),
      dataIndex: "grand_total",
      key: "grand_total",
      align: "right",
      render: (_: any, record: any) => {
        return <span>{formatCurrency(record.grand_total)}</span>;
      },
    },
  ];
  const data: IOrderDetail[] = [
    {
      id: 2,
      product_name: "Order 2",
      product_sku: "7180770726869",
      sale_price: 0,
      qty: 2,
      variant: "Đen",
      price: 69000,
      subtotal: 138000,
      discount: 0,
      grand_total: 138000,
      thumbnail_url: "https://salt.tikicdn.com/cache/200x200/ts/product/4d/07/69/fee34463b2c954eb24ef46604cbe6b8e.png",
    },
  ];

  return (
    <AdminTable
      columns={columns}
      dataSource={data}
      pagination={false}
      summary={() => {
        return (
          <Table.Summary.Row>
            <Table.Summary.Cell index={0} colSpan={3} />
            <Table.Summary.Cell index={1} colSpan={6}>
              <S.OrderDetailTotalPrice>
                <p>{t("admin_shop.orders.detail.table.total_amount", { number_product: 1 })}</p>
                <span>{formatCurrency(120000)}</span>
              </S.OrderDetailTotalPrice>
              <S.OrderDetailTotalPrice>
                <p>{t("admin_shop.orders.detail.table.discount")}</p>
                <span>{formatCurrency(0)}</span>
              </S.OrderDetailTotalPrice>
              <S.OrderDetailTotalPrice>
                <p>{t("admin_shop.orders.detail.table.delivery_charges")}</p>
                <span>{formatCurrency(0)}</span>
              </S.OrderDetailTotalPrice>
              <S.OrderDetailTotalPrice>
                <p>{t("admin_shop.orders.detail.table.discount_code")}</p>
                <span>{formatCurrency(0)}</span>
              </S.OrderDetailTotalPrice>
              <S.OrderDetailTotalPrice>
                <h4>{t("admin_shop.orders.detail.guests_must_pay")}</h4>
                <span>{formatCurrency(120000)}</span>
              </S.OrderDetailTotalPrice>
            </Table.Summary.Cell>
          </Table.Summary.Row>
        );
      }}
    />
  );
};

export default TableComponent;
