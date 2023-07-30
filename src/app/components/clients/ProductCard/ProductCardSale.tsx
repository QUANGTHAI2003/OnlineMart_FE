import FireIcon from "@app/app/assets/images/fire_icon.svg";
import { formatCurrency } from "@app/utils/helper";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "./ProductCard.styles";

interface IProductCardItemSale {
  id: number;
  name: string;
  price: number;
  discountRate: number;
  thumbnailUrl: string;
}

const ProductCardSale: React.FC<IProductCardItemSale> = ({ id, name, price, discountRate, thumbnailUrl }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { t } = useTranslation();

  const [state] = useState({
    totalStock: 100, // Tổng sản phẩm đem bán giảm giá
    sold: 51, // Số lượng sản phẩm đã bán
  });
  const { totalStock, sold } = state;
  const percent = (sold / totalStock) * 100; // Phần trăm sản phẩm đã bán
  const soldOut = totalStock / sold <= 2; // Đang cháy hàng

  return (
    <S.ProductSale>
      <a href={`/${id}`} className="deals__item">
        <div className="relative w-full">
          <div className="relative w-full pb-[100%]">
            <img alt={name} src={thumbnailUrl} className="absolute top-0 left-0 w-full h-full object-cover" />
          </div>
          <span className="deals__price__discount">{`-${discountRate} %`}</span>
          <div className="deals__price has-discount">
            <span className="text-md m-auto">{formatCurrency(price)}</span>
          </div>
          <div className="deals__qty">
            <div className="deals__progress" style={{ width: `${percent}%` }}></div>
            {soldOut && <img className="fire-icon" src={FireIcon} alt="fire" />}
            <span className="deals__status">{`${t("user.product.sold")} ${sold}` || t("user.product.launched")}</span>
          </div>
        </div>
      </a>
    </S.ProductSale>
  );
};

export default ProductCardSale;
