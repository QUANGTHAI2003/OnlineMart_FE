import { RatingItem } from "@app/app/components/layouts/client/Sidebar/SortProductSidebar/components";
import { Checkbox, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import OptionSkeleton from "../skeletons/OptionSkeleton";
import * as S from "../UserSearch.styles";

const rating = [
  {
    id: 1,
    content: "Từ 1 sao",
    value: 1,
  },
  {
    id: 2,
    content: "Từ 4 sao",
    value: 4.75,
  },
  {
    id: 3,
    content: "Từ 5 sao",
    value: 5,
  },
  {
    id: 4,
    content: "Từ 5 sao",
    value: 5,
  },
  {
    id: 5,
    content: "Từ 5 sao",
    value: 5,
  },
  {
    id: 6,
    content: "Từ 5 sao",
    value: 5,
  },
  {
    id: 7,
    content: "Từ 5 sao",
    value: 5,
  },
  {
    id: 8,
    content: "Từ 5 sao",
    value: 5,
  },
];

const OptionItem = () => {
  const { t } = useTranslation();

  const [loadingSkeletonCount, setLoadingSkeletonCount] = useState<boolean>(false);

  useEffect(() => {
    setLoadingSkeletonCount(true);
    setTimeout(() => {
      setLoadingSkeletonCount(false);
    }, 3000);
  }, []);

  const sortWith = [
    { value: "popular", label: t("user.product_category_page.popular") },
    { value: "top_sales", label: t("user.product_category_page.top_sell") },
    { value: "latest", label: t("user.product_category_page.latest") },
    { value: "low_high", label: t("user.product_category_page.low_high") },
    { value: "high_low", label: t("user.product_category_page.high_low") },
  ];

  return (
    <S.OptionItem>
      <div className="option_item">
        <div className="checkbox_div">
          <Swiper
            slidesPerView={3}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
            breakpoints={{
              320: {
                slidesPerView: 1.5,
              },
              480: {
                slidesPerView: 2.5,
              },
              768: {
                slidesPerView: 5,
              },
              992: {
                slidesPerView: 3,
              },
              1200: {
                slidesPerView: 3,
              },
              1400: {
                slidesPerView: 3,
              },
            }}
          >
            {rating.map((item: any): any => {
              return (
                <SwiperSlide key={item.id} className="swiper_slide">
                  <Checkbox className="checkbox">
                    <RatingItem value={item.value} />
                  </Checkbox>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {loadingSkeletonCount ? (
          <OptionSkeleton count={1} />
        ) : (
          <div className="sort">
            <p className="title">{t("user.search_page.sort_by")}</p>
            <div>
              <Space wrap>
                <Select defaultValue="popular" style={{ width: 150 }} options={sortWith} className="select" />
              </Space>
            </div>
          </div>
        )}
      </div>
    </S.OptionItem>
  );
};

export default OptionItem;
