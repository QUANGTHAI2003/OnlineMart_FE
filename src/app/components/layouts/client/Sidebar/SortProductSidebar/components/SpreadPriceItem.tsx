import { useSyncToURL } from "@app/hooks";
import { Button, InputNumber } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "../SortProductSidebar.styles";

const SpreadPriceItem = () => {
  const { t } = useTranslation();
  const syncToURL = useSyncToURL();

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const status = maxPrice !== 0 ? (minPrice > maxPrice ? "error" : undefined) : undefined;

  const handleApplyPrice = () => {
    const priceValue = `${minPrice},${maxPrice === 0 ? 10000000000 : maxPrice}`;

    syncToURL({ price: priceValue });
    setMinPrice(0);
    setMaxPrice(0);
  };

  return (
    <div className="input_spread">
      <S.SpreadPriceItem className="input_number_space">
        <InputNumber
          size="middle"
          defaultValue={minPrice}
          value={minPrice}
          status={status}
          formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          parser={(value) => value?.replace(/\$\s?|(\.*)/g, "").replace(/\./g, "")}
          onChange={(value) => setMinPrice(value)}
          className="input_number"
        />

        <span className="dash">-</span>

        <InputNumber
          size="middle"
          defaultValue={maxPrice}
          value={maxPrice}
          status={status}
          formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          parser={(value) => value?.replace(/\$\s?|(\.*)/g, "").replace(/\./g, "")}
          onChange={(value) => setMaxPrice(value)}
          className="input_number"
        />
      </S.SpreadPriceItem>

      <S.Apply className="apply" wrap>
        <Button className="button" type="primary" ghost onClick={handleApplyPrice}>
          {t("user.product_category_sidebar.apply")}
        </Button>
      </S.Apply>
    </div>
  );
};

export default SpreadPriceItem;
