import { useSyncToURL } from "@app/hooks";
import { useGetProductListQuery } from "@app/store/slices/api/admin/printQRApi";
import { baseImageKitUrl, formatCurrency, formatNumber } from "@app/utils/helper";
import { Divider, Select, Typography } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import * as S from "../PrintQRCode.styles";
const { Title } = Typography;

const FilterComponent = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const syncToURL = useSyncToURL();

  const [size] = useState<SizeType>("large");

  const { data: ProductList } = useGetProductListQuery();
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const currentProductId = new URLSearchParams(location.search).get("product_id");
  const currentProductIdArray = currentProductId?.split(",") || [];
  const currentValueId = new URLSearchParams(location.search).get("variant_value_id");
  const currentValueIdArray = currentValueId?.split(",") || [];

  const handleSelectChange = (value: string) => {
    setSelectedProductId(value);

    if (selectedProductId === null || selectedProductId === undefined) {
      currentProductIdArray.push(value);
    }

    const selectedProduct = ProductList?.find((item: any) => item.id === value);
    const variantValueId = selectedProduct?.id;

    if (variantValueId && !currentValueIdArray.includes(variantValueId.toString())) {
      currentValueIdArray.push(variantValueId.toString());
    }

    syncToURL({ product_id: currentProductIdArray.join(","), variant_value_id: currentValueIdArray.join(",") });
  };

  return (
    <S.FilterComponent>
      <Select
        showSearch
        size={size}
        placeholder={t("admin_shop.print_qrcode.filter.placeholder_input")}
        className="select_filter"
        onChange={handleSelectChange}
        value={selectedProductId}
      >
        {ProductList?.map((item: any) => {
          const currentProductIdArray = [...new Set(currentProductId?.split(","))];
          const isSetProduct = currentProductIdArray?.includes(String(item.id));

          return (
            <Select.Option key={item.id} value={item.id} disabled={isSetProduct}>
              <S.SelectItem className={`select-item ${isSetProduct ? "disabled" : ""}`}>
                <div className="left_item">
                  <img src={`${baseImageKitUrl}/${item.thumbnail_url}`} alt={item.name} />
                  <div className="">
                    <p className="name block truncate max-w-xl">{item.name}</p>
                    <p className="product_code block truncate max-w-sm">{item.variant}</p>
                  </div>
                </div>

                <div className="right_item">
                  <Title level={5} className="retail_price">
                    {formatCurrency(item.regular_price)}
                  </Title>
                  <div className="bottom_content">
                    <div className="bottom_content_item">
                      <p className="bottom_content_item_label">{t("admin_shop.print_qrcode.filter.stock")}</p>
                      <span className="bottom_content_item_value">{formatNumber(item.stock_qty)}</span>
                    </div>

                    <Divider type="vertical" className="divider" />

                    <div className="bottom_content_item">
                      <p className="bottom_content_item_label">{t("admin_shop.print_qrcode.filter.sellable")}</p>
                      <span className="bottom_content_item_value">{formatNumber(item.sale_price)}</span>
                    </div>
                  </div>
                </div>
              </S.SelectItem>
            </Select.Option>
          );
        })}
      </Select>
    </S.FilterComponent>
  );
};

export default FilterComponent;
