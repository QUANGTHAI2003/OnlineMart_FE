import OfficialIcon from "@app/app/assets/images/official.png";
import { formatCurrency, formatVNCurrency } from "@app/utils/helper";
import { Rate } from "antd";
import { useLayoutEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import * as S from "./ProductCard.styles";

interface IProductCardItem {
  id: number;
  name: string;
  price: number;
  discountRate: number;
  quantitySold: number;
  ratingAverage: number;
  thumbnailUrl: string;
  type?: string;
}

const ProductCard: React.FC<IProductCardItem> = ({
  id,
  name,
  price,
  discountRate,
  quantitySold,
  ratingAverage,
  thumbnailUrl,
  type,
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
      <a href={`/${id}`} className="product-item">
        <span className="flex flex-col w-full">
          <S.Thumbnail>
            <div className="w-full h-full absolute top-0 left-0">
              <div className="thumbnail">
                <img src={thumbnailUrl} className="w-full h-full object-contain block" alt="Img" />
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
                      <span>{`${discountRate} %`}</span>
                    </div>
                  )}
                </div>
              </div>
              {type === "configurable" && (
                <div className="have-variant">
                  <div className="variant-item">
                    <div className="variant-item-text">Nhiều màu</div>
                  </div>
                </div>
              )}
            </div>
            <S.DeliveryInfo className="delivery-info">
              <div className="delivery-date">
                <span>Giao thứ 2, ngày 31/07</span>
              </div>
            </S.DeliveryInfo>
          </S.Info>
        </span>
      </a>
    </S.ProductItem>
  );
};

export default ProductCard;
