import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { brand } from "../data";
import * as S from "../ProductCategory.styles";

import { BrandItem } from ".";

const BrandComponent = () => {
  return (
    <S.ProductCategory>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        className="mySwiper"
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          480: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 1,
          },
          992: {
            slidesPerView: 1,
          },
          1200: {
            slidesPerView: 2,
          },
          1400: {
            slidesPerView: 2,
          },
        }}
      >
        {brand.map((item: any): any => (
          <SwiperSlide className="brand_content" key={item.id}>
            <BrandItem image={item.image} title={item.title} brand={item.brand} rate={item.rate} detail={item.detail} />
          </SwiperSlide>
        ))}
      </Swiper>
    </S.ProductCategory>
  );
};

export default BrandComponent;
