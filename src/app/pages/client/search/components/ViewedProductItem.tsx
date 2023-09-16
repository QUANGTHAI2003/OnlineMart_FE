import OfficialIcon from "@app/app/assets/images/official.png";
import * as S from "@app/app/components/clients/ProductCard/ProductCard.styles";
import { formatCurrency } from "@app/utils/helper";
import { Col, Rate } from "antd";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface IViewedProductItem {
  id: number;
  name: string;
  price: number;
  discountRate: number;
  quantitySold: number;
  ratingAverage: number;
  thumbnailUrl: string;
}

const ViewedProductItem: React.FC<IViewedProductItem> = ({
  id,
  name,
  price,
  discountRate,
  quantitySold,
  ratingAverage,
  thumbnailUrl,
}) => {
  const { t } = useTranslation();

  return (
    <Col className="gutter-row" xs={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 4 }}>
      <S.ProductItem className="rounded-sm w-[178px] product_item">
        <a href={`/${id}`}>
          <span className="flex-col">
            <S.Thumbnail>
              <div className="w-full h-full absolute top-0 left-0">
                <div className="thumbnail">
                  <img src={thumbnailUrl} className="w-full h-full object-cover" alt="Img" />
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
                    <div className="flex items-end mt-2 flex-wrap">
                      <div className="rating-star">
                        <Rate disabled allowHalf defaultValue={ratingAverage} />
                      </div>
                      <div className="quantity has-border">
                        {`${t("user.product.sold")} ${quantitySold > 1000 ? "1000+" : quantitySold}`}
                      </div>
                    </div>
                  )}
                </S.ProductName>
                {/* đâu ra này vậy sao k gọi cái component productcard? thì gọi ra thôi làm lại nguyên này chi, để coi lại */}

                <div>
                  <div className="price-discount has-discount">
                    <div className="price-discount__price">{formatCurrency(price)}</div>
                    {discountRate == 0 || (
                      <div className="price-discount__discount">
                        <span>{`${discountRate} %`}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <S.DeliveryInfo>
                <div className="delivery-info">
                  <span>Giao thứ 2, ngày 31/07</span>
                </div>
              </S.DeliveryInfo>
            </S.Info>
          </span>
        </a>
      </S.ProductItem>
    </Col>
  );
};

export default ViewedProductItem;
