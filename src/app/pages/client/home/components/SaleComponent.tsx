import ProductCardSale from "@app/app/components/clients/ProductCard/ProductCardSale";
import ProductCardSkeleton from "@app/app/components/clients/ProductCard/ProductCardSkeleton";
import { useGetProductFlashsaleQuery } from "@app/store/slices/api/user/productFlashsaleApi";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 as uuidv4 } from "uuid";

import * as S from "../Home.styles";

import { CountdownComponent } from ".";

import "swiper/css";
import "swiper/css/navigation";

const SaleComponent = React.memo(() => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(true);

  const { data: productFlashsaleData } = useGetProductFlashsaleQuery();

  const number = 6;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  });

  return (
    <S.SalesStyle className="sale_product">
      <div className="header">
        <div className="header-left">
          <p className="title">{t("user.product.good_price_today")}</p>
          <div>
            <a href="a" title="Xem tất cả Deal Hot">
              <CountdownComponent />
            </a>
          </div>
        </div>
        <div className="navigation">
          <a title="Xem tất cả Deal Hot" href="flash_sale">
            {t("user.product.view_more")}
            <img
              className="icon-more"
              src="https://salt.tikicdn.com/ts/upload/d8/38/d3/4bef23fec35f9fbfa1757d30184ddb9c.png"
              alt="icon-more"
            />
          </a>
        </div>
      </div>
      <div className="body pt-3">
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
            <div>
              {productFlashsaleData?.map((item: any) => (
                <SwiperSlide key={uuidv4()}>
                  <ProductCardSale
                    id={item.id}
                    slug={item.slug}
                    name={item.name}
                    price={item.current_price}
                    discountRate={item.discount_rate}
                    thumbnailUrl={item.thumbnail_url}
                  />
                </SwiperSlide>
              ))}
              ;
            </div>
          )}
        </Swiper>
      </div>
    </S.SalesStyle>
  );
});

export default SaleComponent;
