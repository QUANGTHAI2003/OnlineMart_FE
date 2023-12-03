import { baseImageKitUrl, formatCurrency } from "@app/utils/helper";

import * as S from "./ProductCard.styles";

interface IProductCardItemSale {
  id: number;
  name: string;
  slug?: string;
  price: number;
  discountRate: number;
  thumbnailUrl: string;
}

const ProductCardSale: React.FC<IProductCardItemSale> = ({ id, slug, name, price, discountRate, thumbnailUrl }) => {
  const priceSale = price - price * 0.1; // Giá flashsale < giá giảm

  return (
    <S.ProductSale>
      <a href={`/product/${slug}/${id}`} className="deals__item">
        <div className="relative w-full">
          <div className="relative w-full pb-[100%]">
            <img
              alt={name}
              src={`${baseImageKitUrl}/${thumbnailUrl}`}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>
          <span className="deals__price__discount">{`-${discountRate} %`}</span>
          <div className="deals__price has-discount">
            <span className="text-md m-auto">{formatCurrency(priceSale)}</span>
          </div>
          {/* <div className="deals__qty">
            <div className="deals__progress" style={{ width: `${percent}%` }}></div>
            {soldOut && <img className="fire-icon" src={FireIcon} alt="fire" />}
            <span className="deals__status">{`${t("user.product.sold")} ${sold}` || t("user.product.launched")}</span>
          </div> */}
        </div>
      </a>
    </S.ProductSale>
  );
};

export default ProductCardSale;
