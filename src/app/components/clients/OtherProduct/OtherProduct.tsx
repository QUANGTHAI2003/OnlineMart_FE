import ProductCard from "@app/app/components/clients/ProductCard/ProductCard";
import ProductCardSkeleton from "@app/app/components/clients/ProductCard/ProductCardSkeleton";
import { Row } from "antd";
import { useEffect, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 as uuidv4 } from "uuid";

import * as S from "./OtherProduct.styles";

interface IOtherProductProps {
  title?: string;
  data: IProductData[];
}

interface IProductData {
  id: number;
  name: string;
  price: number;
  discount_rate: number;
  quantity_sold: number;
  rating_average: number;
  thumbnail_url: string;
}

const OtherProduct = ({ title = "Sản phẩm tương tự", data }: IOtherProductProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const number = 6;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  });

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
        {loading ? (
          <ProductCardSkeleton count={number} />
        ) : (
          <Row>
            {data.map((item: any) => (
              <SwiperSlide key={uuidv4()}>
                <ProductCard
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  discountRate={item.discount_rate}
                  quantitySold={item.quantity_sold}
                  ratingAverage={item.rating_average}
                  thumbnailUrl={item.thumbnail_url}
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
