import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import ProductCard from "@app/app/components/clients/ProductCard/ProductCard";
import ProductCardSkeleton from "@app/app/components/clients/ProductCard/ProductCardSkeleton";
import data from "@app/app/pages/client/home/data";
import { Col, Row } from "antd";
import { useEffect, useLayoutEffect, useState } from "react";
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { BrandItem, PaginateItem, SortPaginateItem } from "./components";
import * as S from "./ProductCategory.styles";

const brand = [
  {
    id: 1,
    image: "https://vcdn.tikicdn.com/ts/seller/34/76/7d/7eda394c8a13b95ac991734d3653ce9d.jpg",
    title: "Fashivin quần áo thể thaogggggggggggggggggggggggg",
    brand: "Fashivin quần áo thể thao",
    rate: 3,
    detail: [
      {
        id: 1,
        thumbnail: "https://salt.tikicdn.com/cache/280x280/ts/product/40/b7/1d/fc5fb12af2775bc6071e5d8ad5dd6a54.jpg",
        sale: "-32%",
      },
      {
        id: 2,
        thumbnail: "https://vcdn.tikicdn.com/ts/seller/34/76/7d/7eda394c8a13b95ac991734d3653ce9d.jpg",
        sale: "-123",
      },
    ],
  },
  {
    id: 2,
    image: "https://vcdn.tikicdn.com/ts/seller/9b/e7/45/7699dcf1905f8cd216cd66af6dffc4a0.jpg",
    title: "Fashivin quần áo thể thao",
    brand: "Fashivin quần áo thể thao",
    rate: 3,
    detail: [
      {
        id: 1,
        thumbnail: "https://salt.tikicdn.com/cache/280x280/ts/product/40/b7/1d/fc5fb12af2775bc6071e5d8ad5dd6a54.jpg",
        sale: "-32%",
      },
    ],
  },
  {
    id: 3,
    image: "https://vcdn.tikicdn.com/ts/seller/9a/cf/9d/26fb9c56ea90791f06619d2badd566ed.jpg",
    title: "Fashivin quần áo thể thao",
    brand: "Fashivin quần áo thể thao",
    rate: 3,
    detail: [
      {
        id: 1,
        thumbnail: "https://salt.tikicdn.com/cache/280x280/ts/product/40/b7/1d/fc5fb12af2775bc6071e5d8ad5dd6a54.jpg",
        sale: "-32%",
      },
    ],
  },
  {
    id: 4,
    image: "https://vcdn.tikicdn.com/ts/seller/a6/dc/47/38e9c0805496581791e4f4c3754b878e.jpg",
    title: "Fashivin quần áo thể thao",
    brand: "Fashivin quần áo thể thao",
    rate: 3,
    detail: [
      {
        id: 1,
        thumbnail: "https://salt.tikicdn.com/cache/280x280/ts/product/40/b7/1d/fc5fb12af2775bc6071e5d8ad5dd6a54.jpg",
        sale: "-32%",
      },
      {
        id: 2,
        thumbnail: "https://salt.tikicdn.com/cache/280x280/ts/product/40/b7/1d/fc5fb12af2775bc6071e5d8ad5dd6a54.jpg",
        sale: "-32%",
      },
    ],
  },
];

const ProductCategory = () => {
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);

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

  const [loadingSkeletonCount, setLoadingSkeletonCount] = useState(false);
  useEffect(() => {
    setLoadingSkeletonCount(true);
    setTimeout(() => {
      setLoadingSkeletonCount(false);
    }, 3000);
  }, []);

  return (
    <S.HomeStyle className="flex flex-col" isfixed={isHeaderFixed.toString()}>
      <p className="title">{"Men's Fashion"}</p>
      <S.ProductCategory>
        <Swiper
          slidesPerView={1} //min-width
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
          {brand.map((item: any): any => {
            return (
              <SwiperSlide className="brand_content" key={item.id}>
                <BrandItem
                  image={item.image}
                  title={item.title}
                  brand={item.brand}
                  rate={item.rate}
                  detail={item.detail}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </S.ProductCategory>

      <SortPaginateItem />

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
      <PaginateItem />
    </S.HomeStyle>
  );
};

export default ProductCategory;
