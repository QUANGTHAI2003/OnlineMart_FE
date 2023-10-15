import { useAppSelector } from "@app/store/store";
import { formatCurrency, formatPercent } from "@app/utils/helper";

const NormalPrice = () => {
  const price = useAppSelector((state) => state.productDetail.price);
  const { current_price, isSale, regular_price, discount_rate } = price || {};

  return (
    <div className="price-and-icon mb-2">
      <div className="product-price">
        <div className="product-price__current-price">{formatCurrency(current_price)}</div>
        {isSale && (
          <>
            <div className="product-price__list-price">{formatCurrency(regular_price)}</div>
            <div className="product-price__discount-rate">{formatPercent(discount_rate)}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default NormalPrice;
