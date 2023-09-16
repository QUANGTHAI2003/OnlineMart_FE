import ProductCard from "@app/app/components/clients/ProductCard/ProductCard";
import ProductCardSkeleton from "@app/app/components/clients/ProductCard/ProductCardSkeleton";
import data from "@app/app/pages/client/home/data";
import viewProduct from "@app/app/pages/client/home/dataViewedProduct";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 as uuidv4 } from "uuid";

import { PaginateItem } from "../category/components";

import { BrandItem, MainSortItem, PosterItem } from "./components";
import * as S from "./UserSearch.styles";

const brand = [
  {
    id: 1,
    image: "https://salt.tikicdn.com/ts/tka/84/4c/af/6ce88a2f6b7c7a4f617c38952e528517.png",
    title: "Coupon đến 80K khi mua bánh trung thu Kinh Đô",
    brand: "Kinh Đô Official Store",
    rate: 3.5,
    coupon: "Giảm 15K",
    certificate: "OFFICIAL",
    detail: [
      {
        id: 1,
        thumbnail: "https://salt.tikicdn.com/cache/280x280/ts/product/ca/2a/4e/245294cb99f4aa528cac191a33e6b41f.png",
        sale_thumbnail: "-15%",
      },
      {
        id: 2,
        thumbnail: "https://salt.tikicdn.com/cache/280x280/ts/product/ca/2a/4e/245294cb99f4aa528cac191a33e6b41f.png",
        sale_thumbnail: "-15%",
      },
      {
        id: 3,
        thumbnail: "https://salt.tikicdn.com/cache/280x280/ts/product/ca/2a/4e/245294cb99f4aa528cac191a33e6b41f.png",
        sale_thumbnail: "-15%",
      },
    ],
  },
];
const poster = [
  {
    id: 1,
    image_url: "https://salt.tikicdn.com/ts/tka/38/59/43/c9063112ea614eab15e0f0a4a20e33ff.png",
  },
];

const UserSearch = () => {
  const { t } = useTranslation();

  const [loadingSkeletonCount, setLoadingSkeletonCount] = useState<boolean>(false);
  useEffect(() => {
    setLoadingSkeletonCount(true);
    setTimeout(() => {
      setLoadingSkeletonCount(false);
    }, 3000);
  }, []);

  return (
    <S.UserSearch>
      <div className="content">
        {brand.map((item) => (
          <BrandItem
            key={item.id}
            image={item.image}
            title={item.title}
            brand={item.brand}
            rate={item.rate}
            coupon={item.coupon}
            certificate={item.certificate}
            detail={item.detail}
          />
        ))}

        <MainSortItem />

        <div>
          {loadingSkeletonCount ? (
            <ProductCardSkeleton count={18} />
          ) : (
            <Row gutter={[8, 8]}>
              {data.map((item) => (
                <Col key={item.id} xs={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 4 }}>
                  <ProductCard
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    discountRate={item.discount_rate}
                    quantitySold={item.quantity_sold}
                    ratingAverage={item.rating_average}
                    thumbnailUrl={item.thumbnail_url}
                  />
                </Col>
              ))}
            </Row>
          )}
        </div>

        <PaginateItem />

        <S.Swiper>
          <span className="title">{t("user.search_page.viewed_products")}</span>
          {loadingSkeletonCount ? (
            <ProductCardSkeleton count={6} />
          ) : (
            <Row className="row_product">
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
                    slidesPerView: 2,
                  },
                  480: {
                    slidesPerView: 2,
                  },
                  600: {
                    slidesPerView: 3,
                  },
                  768: {
                    slidesPerView: 4,
                  },
                  992: {
                    slidesPerView: 4,
                  },
                  1200: {
                    slidesPerView: 5,
                  },
                  1400: {
                    slidesPerView: 5,
                  },
                }}
              >
                {viewProduct.map((item) => (
                  <SwiperSlide className="brand_content" key={uuidv4()}>
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
              </Swiper>
            </Row>
          )}
        </S.Swiper>
      </div>

      <div className="poster">
        {poster.map((item) => (
          <PosterItem key={item.id} image_url={item.image_url} />
        ))}
      </div>
    </S.UserSearch>
  );
};

export default UserSearch;
