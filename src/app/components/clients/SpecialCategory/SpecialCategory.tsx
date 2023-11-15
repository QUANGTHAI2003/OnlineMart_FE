import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import SpecialCategoryItem from "./SpecialCategoryItem";

const SpecialCategoryData = [
  {
    id: 1,
    image: "https://salt.tikicdn.com/cache/280x280/ts/product/bd/5d/bb/51463a6b2005f3f8db53ac45f5dbe6d0.jpg.webp",
    name: "Máy tính bảng",
    url: "KhanhAn",
  },
  {
    id: 2,
    image: "https://salt.tikicdn.com/cache/280x280/ts/product/e2/f4/3b/0f494cb10f65d9b21e1aa90ab2de105b.jpg.webp",
    name: "Điện thoại",
    url: "KhanhAn",
  },
  {
    id: 3,
    image: "https://salt.tikicdn.com/cache/280x280/ts/product/d9/e7/c5/1e8879b20f37a74b93bd7b6dd0e64e13.png.webp",
    name: "Sách kĩ năng sống",
    url: "KhanhAn",
  },
  {
    id: 4,
    image: "https://salt.tikicdn.com/cache/280x280/ts/product/dd/49/7f/ab94b8b2e35c49fc38b063fae4e8266a.jpg.webp",
    name: "Truyện ngắn",
    url: "KhanhAn",
  },
  {
    id: 5,
    image: "https://salt.tikicdn.com/cache/280x280/ts/product/5e/18/24/2a6154ba08df6ce6161c13f4303fa19e.jpg.webp",
    name: "Tiểu thuyết",
    url: "KhanhAn",
  },
  {
    id: 6,
    image: "https://salt.tikicdn.com/cache/280x280/ts/product/22/33/d3/601306a5216073499075360883c650fc.jpg.webp",
    name: "Truyện tranh",
    url: "KhanhAn",
  },
  {
    id: 7,
    image: "https://salt.tikicdn.com/cache/280x280/ts/product/22/33/d3/601306a5216073499075360883c650fc.jpg.webp",
    name: "Truyện tranh",
    url: "KhanhAn",
  },
  {
    id: 8,
    image: "https://salt.tikicdn.com/cache/280x280/ts/product/22/33/d3/601306a5216073499075360883c650fc.jpg.webp",
    name: "Truyện tranh",
    url: "KhanhAn",
  },
];

const SpecialCategory = () => {
  const { t } = useTranslation();
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoadingSkeleton(false);
    }, 3000);
  }, []);
  return (
    <section className="w-full">
      <section className="bg-white rounded-lg px-3 py-3">
        <div className="text-base font-bold text-[#27272a] leading-6 mb-2">{t("user.special_category.name")}</div>
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
          <div className="flex items-center">
            {loadingSkeleton
              ? SpecialCategoryData.map((item) => {
                  return <SpecialCategoryItem.LoadingSkeleton key={item.id} />;
                })
              : SpecialCategoryData.map((item) => {
                  return (
                    <SwiperSlide key={item.id}>
                      <SpecialCategoryItem image={item.image} id={item.id} name={item.name} url={item.url} />
                    </SwiperSlide>
                  );
                })}
          </div>
        </Swiper>
      </section>
    </section>
  );
};

export default SpecialCategory;
