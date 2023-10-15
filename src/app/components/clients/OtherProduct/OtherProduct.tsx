import ProductCard from "@app/app/components/clients/ProductCard/ProductCard";
import ProductCardSkeleton from "@app/app/components/clients/ProductCard/ProductCardSkeleton";
import { Row } from "antd";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import * as S from "./OtherProduct.styles";

interface IOtherProductProps {
  title?: string;
  data: IProductData[];
  isLoading: boolean;
}

export interface IProductData {
  id: number;
  name: string;
  slug: string;
  current_price: number;
  discount_rate: number;
  sold_count: number;
  rating: number;
  thumbnail_url: string;
  type: string;
  variant_name: string[];
}

const OtherProduct = ({ title = "Sản phẩm tương tự", data, isLoading }: IOtherProductProps) => {
  const number = 6;

  return (
    <S.OtherProductStyle>
      <h2>{title}</h2>
      <Swiper
        spaceBetween={10}
        slidesPerView={8.5}
        loop={true}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          320: {
            slidesPerView: 1.5,
          },
          480: {
            slidesPerView: 2.5,
          },
          768: {
            slidesPerView: 3.5,
          },
          992: {
            slidesPerView: 4.5,
          },
          1200: {
            slidesPerView: 5.5,
          },
          1400: {
            slidesPerView: 6.5,
          },
        }}
      >
        {isLoading ? (
          <ProductCardSkeleton count={number} />
        ) : (
          <Row>
            {data.map((item: IProductData) => (
              <SwiperSlide key={item.id}>
                <ProductCard
                  id={item.id}
                  name={item.name}
                  slug={item.slug}
                  price={item.current_price}
                  discountRate={item.discount_rate}
                  quantitySold={item.sold_count}
                  ratingAverage={item.rating}
                  thumbnailUrl={item.thumbnail_url}
                  type={item.type}
                  variant_name={item?.variant_name}
                />
              </SwiperSlide>
            ))}
          </Row>
        )}
      </Swiper>
    </S.OtherProductStyle>
  );
};

export default OtherProduct;
