import ChatGPT from "@app/app/components/clients/Chat/ChatGPT/ChatGPT";
import ModalSelect from "@app/app/components/clients/SelectAddress/ModalSelect";
import { useResponsive } from "@app/hooks";
import { useLayoutEffect, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { ProductComponent, SaleComponent } from "./components";
import { dataSlide } from "./data";
import * as S from "./Home.styles";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Home = () => {
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { isTablet } = useResponsive();

  useLayoutEffect(() => {
    const handleScroll = () => {
      const productListComponent = document.getElementById("productList");
      if (productListComponent) {
        const productListComponentTop = productListComponent.getBoundingClientRect().top;
        if (productListComponentTop <= 0) {
          setIsHeaderFixed(true);
        }
        if (productListComponentTop > 0) {
          setIsHeaderFixed(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHeaderFixed]);

  return (
    <S.HomeStyle className="flex flex-col gap-4" isfixed={isHeaderFixed.toString()}>
      <S.BannerStyle>
        <div className="banner-left">
          <Swiper
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            slidesPerView={1.1}
            centeredSlides={true}
            spaceBetween={10}
            grabCursor={true}
            loop={true}
            navigation={true}
            modules={[Autoplay, Navigation, Pagination]}
            breakpoints={{
              768: {
                slidesPerView: 1,
                spaceBetween: 0,
              },
            }}
          >
            {dataSlide.map((item) => (
              <SwiperSlide key={item.id}>
                <img className="w-full h-full rounded-lg" src={item.imgSlide} alt="" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="banner-right">
          <img
            src="https://salt.tikicdn.com/cache/w750/ts/tikimsp/05/b9/f2/4ed9b73d43570b221e321bec587627e2.png.webp"
            className="w-full h-full"
            alt=""
          />
        </div>
      </S.BannerStyle>
      {isTablet || (
        <S.SelectAddressStyle>
          <ModalSelect />
        </S.SelectAddressStyle>
      )}
      <SaleComponent />
      {/* <SpecialCategory /> */}
      <ProductComponent isFixedHeader={isHeaderFixed.toString()} />
      <ChatGPT />
      {/* <ModalSelect /> */}
      {/* <ProductComponent /> */}
      {/* {true && <ProductCardSkeleton />} */}
    </S.HomeStyle>
  );
};

export default Home;
