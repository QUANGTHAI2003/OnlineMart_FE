import { useSyncToURL } from "@app/hooks";
import { formatCurrency, formatNumber } from "@app/utils/helper";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, InputNumber, Table, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import { InventoryListData } from "../../inventory/data";
import * as S from "../PrintQRCode.styles";
const { Link } = Typography;

// interface IProductInfo {
//   id: number;
//   product_media: string;
//   name: string;
//   product_code: string;
//   sellable: number;
//   qty_inventory: number;
//   created_at: string;
//   retail_price: number;
//   import_price: number;
//   wholesale_price: number;
//   barcode: string;
//   supplier: string;
//   status: string;
// }

const TableComponentQRCode = () => {
  const { t } = useTranslation();

  const location = useLocation();
  const syncToURL = useSyncToURL();

  const currentProductId = new URLSearchParams(location.search).get("product_id");
  const currentProductIdArray = currentProductId?.split(",") || [];

  const handleDeleteClick = (productId: number) => {
    const updatedProductIds = currentProductIdArray.filter((id) => id !== String(productId));
    syncToURL({ product_id: updatedProductIds.join(",") });
  };

  const columns: any = [
    {
      title: "STT",
      dataIndex: "index",
      align: "center",
      key: "index",
      width: 80,
      render: (_: any, __: any, index: number) => <span>{index + 1}</span>,
    },
    {
      title: t("admin_shop.inventory.table.image"),
      dataIndex: "product_media",
      key: "product_media",
      align: "center",
      width: 130,
      render: (_: any, record: any) => {
        return <img src={record.product_media} alt="Media" className="w-16 rounded" />;
      },
    },
    {
      title: t("admin_shop.inventory.table.qrcode"),
      dataIndex: "barcode",
      key: "barcode",
      width: 180,
      render: (_: any, record: any) => {
        return (
          <Link href={record.barcode} target="_blank" className="line-clamp-1">
            {record.product_code}
          </Link>
        );
      },
    },
    {
      title: t("admin_shop.inventory.table.product"),
      dataIndex: "name",
      key: "name",
      width: 220,
      render: (_: any, record: any) => {
        return <p className="line-clamp-2">{record.name}</p>;
      },
    },
    {
      title: t("admin_shop.print_qrcode.table.quantity"),
      dataIndex: "sellable",
      key: "sellable",
      align: "center",
      width: 200,
      render: (_: any, record: any) => {
        return (
          <div>
            <InputNumber
              defaultValue={formatNumber(record.sellable)}
              bordered={false}
              controls={false}
              className="w-32 border-b border-0 border-solid border-slate-300 rounded-none hover:border-slate-500"
            />
          </div>
        );
      },
    },
    {
      title: t("admin_shop.inventory.table.retail_price"),
      dataIndex: "retail_price",
      key: "retail_price",
      align: "center",
      width: 150,
      render: (_: any, record: any) => {
        return <div>{formatCurrency(record.retail_price)}</div>;
      },
    },
    {
      title: t("admin_shop.print_qrcode.table.delete"),
      dataIndex: "delete",
      key: "delete",
      align: "center",
      fixed: "right",
      width: 100,
      render: (_: any, record: any) => {
        return (
          <Button type="primary" danger ghost className="border-0 text-lg" onClick={() => handleDeleteClick(record.id)}>
            <FontAwesomeIcon icon={faXmark} />
          </Button>
        );
      },
    },
  ];

  return (
    <S.TableComponent>
      <div className="mt-3">
        <Table
          dataSource={InventoryListData}
          columns={columns}
          rowKey={(record) => record.id}
          bordered
          scroll={{ x: 1300 }}
        />
      </div>
    </S.TableComponent>
  );
};

export default TableComponentQRCode;
