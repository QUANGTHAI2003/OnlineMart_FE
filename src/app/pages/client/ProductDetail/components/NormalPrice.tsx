import { useAppSelector } from "@app/store/store";
import { formatCurrency, formatPercent } from "@app/utils/helper";
import { round } from "lodash";

const NormalPrice = () => {
  const dataCart = useAppSelector((state) => state.productDetail.dataCart);
  console.log("🚀 ~ dataCart:", dataCart);

  const isSale = dataCart?.salePrice > 0;
  const currentPrice = isSale ? dataCart?.salePrice : dataCart.regularPrice;

  const discountPrice = 100 - (dataCart?.salePrice / dataCart?.regularPrice) * 100 || 0;

  return (
    <div className="price-and-icon mb-2">
      <div className="product-price">
        <div className="product-price__current-price">{formatCurrency(currentPrice)}</div>
        {isSale && (
          <>
            <div className="product-price__list-price">{formatCurrency(dataCart?.regularPrice)}</div>
            <div className="product-price__discount-rate">{formatPercent(round(discountPrice))}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default NormalPrice;
