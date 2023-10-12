import { useSyncToURL } from "@app/hooks";
import { formatCurrency, formatNumber } from "@app/utils/helper";
import { Divider, Select, Typography } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import * as S from "../PrintQRCode.styles";
const { Title } = Typography;

interface IInventoryData {
  inventoryData: any;
}

const FilterComponent: React.FC<IInventoryData> = ({ inventoryData }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const syncToURL = useSyncToURL();

  const [size] = useState<SizeType>("large");

  const data = inventoryData || [];
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const currentProductId = new URLSearchParams(location.search).get("product_id");
  const currentProductIdArray = currentProductId?.split(",") || [];

  const handleSelectChange = (value: string) => {
    if (selectedProductId === null || selectedProductId === undefined) {
      setSelectedProductId(value);
    }

    if (!currentProductIdArray.includes(value)) {
      currentProductIdArray.push(value);
    }

    syncToURL({ product_id: currentProductIdArray.join(",") });
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
        {data.map((item: any) => {
          const currentProductIdArray = [...new Set(currentProductId?.split(","))];
          const isSetProduct = currentProductIdArray?.includes(String(item.id));

          return (
            <Select.Option key={item.id} value={item.id} disabled={isSetProduct}>
              <S.SelectItem className={`select-item ${isSetProduct ? "disabled" : ""}`}>
                <div className="left_item">
                  <img src={item.product_media} alt={item.name} />
                  <div className="">
                    <p className="name block truncate max-w-sm">{item.name}</p>
                    <p className="product_code block truncate max-w-sm">{item.product_code}</p>
                  </div>
                </div>

                <div className="right_item">
                  <Title level={5} className="retail_price">
                    {formatCurrency(item.retail_price)}
                  </Title>
                  <div className="bottom_content">
                    <div className="bottom_content_item">
                      <p className="bottom_content_item_label">{t("admin_shop.print_qrcode.filter.stock")}</p>
                      <span className="bottom_content_item_value">{formatNumber(item.qty_inventory)}</span>
                    </div>

                    <Divider type="vertical" className="divider" />

                    <div className="bottom_content_item">
                      <p className="bottom_content_item_label">{t("admin_shop.print_qrcode.filter.sellable")}</p>
                      <span className="bottom_content_item_value">{formatNumber(item.sellable)}</span>
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
