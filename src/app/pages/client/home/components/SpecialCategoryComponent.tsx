import SpecialCategory from "@app/app/components/clients/SpecialCategory/SpecialCategory";
import React from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

const SpecialCategoryComponent = React.memo(() => {
  return (
    <section>
      <div className="header">
        <h2 className="title">Danh mục đặc biệt</h2>
      </div>
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
        <SwiperSlide>
          <SpecialCategory />
        </SwiperSlide>
      </Swiper>
    </section>
  );
});

export default SpecialCategoryComponent;
