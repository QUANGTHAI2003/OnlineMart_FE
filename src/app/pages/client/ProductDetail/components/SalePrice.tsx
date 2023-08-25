import { useTranslation } from "react-i18next";

import CountdownComponent from "./CountdownComponent";

const SalePrice = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { t } = useTranslation();
  return (
    <div className="price-and-icon no-background">
      <div className="product-price hot-deal">
        <div className="flash-sale-price">
          <span>150.000 ₫</span>
          <div className="sale">
            <span className="list-price">175.000 ₫</span>
            <span>-14%</span>
          </div>
        </div>
        <div className="flash-sale-countdown">
          <span>{t("user.product_detail.end_after")}</span>
          <CountdownComponent />
          <span className="status">{t("user.product.launched")}</span>
        </div>
      </div>
    </div>
  );
};

export default SalePrice;
