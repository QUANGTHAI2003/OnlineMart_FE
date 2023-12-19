import { useSyncToURL } from "@app/hooks";
import { useGetProductPrintQRQuery } from "@app/store/slices/api/admin/printQRApi";
import { baseImageKitUrl, formatCurrency } from "@app/utils/helper";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Table } from "antd";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import * as S from "../PrintQRCode.styles";

const TableComponentQRCode = () => {
  const { t } = useTranslation();

  const location = useLocation();
  const syncToURL = useSyncToURL();
  const params = new URLSearchParams(location.search);

  const { data: productPrintQR, isFetching } = useGetProductPrintQRQuery({
    productId: params.get("product_id"),
    variantValueId: params.get("variant_value_id"),
  });

  const currentValueId = new URLSearchParams(location.search).get("variant_value_id");
  const currentValueIdArray = currentValueId?.split(",") || [];
  const currentProductId = new URLSearchParams(location.search).get("product_id");
  const currentProductIdArray = currentProductId?.split(",") || [];

  const handleDeleteClick = (productId: number, valueId: number, isVariant: boolean) => {
    if (isVariant) {
      const updatedVariantIds = currentValueIdArray.filter((id) => id !== String(valueId));
      syncToURL({ variant_value_id: updatedVariantIds.join(",") });

      // Get all variant_value_id of a product
      const allVariantIdsOfProduct = productPrintQR
        ?.filter((item: any) => item.product_id === productId)
        .map((item: any) => String(item.id));

      // If the deleted variant_value_id is the last one of the product, delete the product_id
      if (allVariantIdsOfProduct?.length === 1 && allVariantIdsOfProduct[0] === String(valueId)) {
        const updatedProductIds = currentProductIdArray.filter((id) => id !== String(productId));
        syncToURL({ product_id: updatedProductIds.join(",") });
      }
    } else {
      const updatedProductIds = currentProductIdArray.filter((id) => id !== String(productId));
      syncToURL({ product_id: updatedProductIds.join(",") });
    }
  };

  const columns: any = [
    {
      title: "STT",
      dataIndex: "index",
      align: "center",
      key: "index",
      width: 50,
      render: (_: any, __: any, index: number) => <span>{index + 1}</span>,
    },
    {
      title: t("admin_shop.inventory.table.image"),
      dataIndex: "product_media",
      key: "product_media",
      align: "center",
      width: 70,
      render: (_: any, record: any) => {
        return <img src={`${baseImageKitUrl}/${record.thumbnail_url}`} alt="Media" className="w-16 rounded" />;
      },
    },

    {
      title: t("admin_shop.inventory.table.product"),
      dataIndex: "name",
      key: "name",
      width: 150,
      render: (_: any, record: any) => {
        return <p className="line-clamp-2">{record.name}</p>;
      },
    },

    {
      title: t("admin_shop.inventory.table.retail_price"),
      dataIndex: "regular_price",
      key: "regular_price",
      align: "center",
      width: 100,
      render: (_: any, record: any) => {
        return <div>{formatCurrency(record.regular_price)}</div>;
      },
    },
    {
      title: t("admin_shop.print_qrcode.table.delete"),
      dataIndex: "delete",
      key: "delete",
      align: "center",
      fixed: "right",
      width: 50,
      render: (_: any, record: any) => {
        return (
          <Button
            type="primary"
            danger
            ghost
            className="border-0 text-lg"
            onClick={() => handleDeleteClick(record.product_id, record.value_id, record.isVariant)}
          >
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
          dataSource={productPrintQR}
          columns={columns}
          rowKey={(record) => `${record.product_id}_${record.id}`}
          bordered
          loading={isFetching}
        />
      </div>
    </S.TableComponent>
  );
};

export default TableComponentQRCode;
