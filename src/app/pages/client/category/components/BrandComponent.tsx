import { useGetShopListQuery } from "@app/store/slices/api/shopApi";
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 as uuidv4 } from "uuid";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import * as S from "../ProductCategory.styles";

import { BrandItem } from ".";

const BrandComponent = () => {
  const { data: getShopData, isFetching } = useGetShopListQuery();
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
        {getShopData?.map((item: any): any => (
          <SwiperSlide className="brand_content" key={uuidv4()}>
            <BrandItem
              avatar={item.avatar}
              isFetching={isFetching}
              slug={item.url}
              name={item.name}
              supplier={item?.supplier[0]?.name}
              rate={item.rating}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </S.ProductCategory>
  );
};

export default BrandComponent;
