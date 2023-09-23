import DealFlashIcon from "@app/app/assets/images/store/dealFlashIcon.svg";
import ImagePriceShockRes from "@app/app/assets/images/store/price-shock-res.svg";
import ImagePriceShock from "@app/app/assets/images/store/price-shock.svg";
import ImageTodayRes from "@app/app/assets/images/store/today-res.svg";
import ImageToday from "@app/app/assets/images/store/today.svg";
import ProductCardSale from "@app/app/components/clients/ProductCard/ProductCardSale";
import ProductCardSkeleton from "@app/app/components/clients/ProductCard/ProductCardSkeleton";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 as uuidv4 } from "uuid";
import * as SC from "./Store.styles";

import * as S from "@app/app/pages/client/home/Home.styles";
import CountdownComponent from "@app/app/pages/client/home/components/CountdownComponent";
import data from "@app/app/pages/client/home/data";

import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const StockToday = React.memo(() => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const imageResponsive = windowWidth <= 1024;
  const number = 6;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  });

  return (
    <SC.SalesStyle>
      <S.SalesStyle className="sale_product">
        <div className="header">
          <div className="header-left">
            <div className="flex items-center">
              <img
                width={imageResponsive ? "66" : ""}
                src={imageResponsive ? ImagePriceShockRes : ImagePriceShock}
                alt="flash deal"
              />
              <SC.ImageFlash src={DealFlashIcon} alt="flash deal" height="28" />
              <img
                width={imageResponsive ? "84" : ""}
                src={imageResponsive ? ImageTodayRes : ImageToday}
                alt="flash deal"
              />
            </div>
            <div>
              <a href="#a" title="Xem tất cả Deal Hot">
                <CountdownComponent />
              </a>
            </div>
          </div>
          <div className="navigation">
            <Link title="Xem tất cả Deal Hot" to="?t=product">
              {t("user.seller.see_all")}
            </Link>
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
                {data?.map((item: any) => (
                  <SwiperSlide key={uuidv4()}>
                    <SC.ProductCardSale>
                      <ProductCardSale
                        id={item.id}
                        name={item.name}
                        price={item.price}
                        discountRate={item.discount_rate}
                        thumbnailUrl={item.thumbnail_url}
                      />
                    </SC.ProductCardSale>
                  </SwiperSlide>
                ))}
              </div>
            )}
          </Swiper>
        </div>
      </S.SalesStyle>
    </SC.SalesStyle>
  );
});

export default StockToday;
