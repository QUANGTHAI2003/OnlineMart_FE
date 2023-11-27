import { OfficialIcon } from "@app/app/assets/images";
import { baseImageKitUrl, formatCurrency, formatPercent, formatVNCurrency } from "@app/utils/helper";
import { Rate } from "antd";
import { useLayoutEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

import * as S from "./ProductCard.styles";

interface IProductCardItem {
  id: number | string;
  name: string;
  slug?: string;
  price: number;
  discountRate: number;
  quantitySold: number;
  ratingAverage: number;
  thumbnailUrl: string;
  type?: string;
  variant_name?: string[];
}

const ProductCard: React.FC<IProductCardItem> = ({
  id,
  name,
  slug,
  price,
  discountRate,
  quantitySold,
  ratingAverage,
  thumbnailUrl,
  type,
  variant_name,
}) => {
  const { t } = useTranslation();
  const productItemRef = useRef<HTMLDivElement>(null);
  const smallProductItem = 170;

  useLayoutEffect(() => {
    const handleResize = () => {
      if (productItemRef.current) {
        const productItemWidth = productItemRef.current.offsetWidth;
        productItemRef.current.classList.toggle("small", productItemWidth < smallProductItem);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <S.ProductItem ref={productItemRef}>
      <Link to={`/product/${slug}/${id}`} className="product-item">
        <span className="flex flex-col w-full">
          <S.Thumbnail>
            <div className="w-full h-full absolute top-0 left-0">
              <div className="thumbnail">
                <LazyLoadImage
                  alt={name}
                  src={`${baseImageKitUrl}/${thumbnailUrl}`}
                  placeholderSrc={`${baseImageKitUrl}/${thumbnailUrl}?tr=bl-50`}
                  className="w-full h-full object-contain block"
                />
              </div>
            </div>
          </S.Thumbnail>
          <S.Info>
            <div className="info">
              <div className="flex items-center h-5 gap-1 my-1">
                <img src={OfficialIcon} width="72" height="20" alt="official_store" className="top-0 left-0" />
                <p>{t("user.product.sponsorship")}</p>
              </div>
              <S.ProductName className="name-product">
                <div className="name mb-1">
                  <h3>{name}</h3>
                </div>
                {ratingAverage == 0 || (
                  <div className="flex items-start mt-2 flex-wrap">
                    <div className="rating-star">
                      <Rate disabled allowHalf defaultValue={ratingAverage} />
                    </div>
                    <div className="quantity has-border flex-1">
                      <span>{`${t("user.product.sold")} ${formatVNCurrency(quantitySold)}`}</span>
                    </div>
                  </div>
                )}
              </S.ProductName>
              <div>
                <div className={`price-discount ${discountRate !== 0 && "has-discount"}`}>
                  <div className="price-discount__price">{formatCurrency(price)}</div>
                  {discountRate == 0 || (
                    <div className="price-discount__discount">
                      <span>{formatPercent(discountRate)}</span>
                    </div>
                  )}
                </div>
              </div>
              {type === "configurable" && (
                <div className="have-variant">
                  {variant_name?.map((variant, index) => {
                    return (
                      <div key={index} className="variant-item">
                        <div className="variant-item-text">{`Nhiều ${variant}`}</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </S.Info>
        </span>
      </Link>
    </S.ProductItem>
  );
};

export default ProductCard;
