import { Carousel } from "antd";
import styled from "styled-components";

export const ProductCardSale = styled.div`
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 20px;
    z-index: 1;
  }
`;

export const ImageFlash = styled.img`
  animation: 0.6s linear 0s infinite normal none running run;
  @keyframes run {
    50% {
      opacity: 0.3;
      transform: scale(1.3);
    }
  }
`;

export const CarouselCustomBanner = styled(Carousel).withConfig({
  shouldForwardProp: () => true,
})`
  @media screen and (max-width: 1024px) {
    .slick-track {
      padding: 12px;
      transform: none !important;
      width: 100% !important;
      background-color: rgb(255, 255, 255);
    }
    .slick-next,
    .slick-prev {
      display: none !important;
    }
    .slick-slide {
      width: 100% !important;
      margin-bottom: 8px !important;
      &:last-child {
        margin-bottom: 0px !important;
      }
    }
  }
  .slick-arrow {
    opacity: 0.5;
  }
  .slick-disabled {
    cursor: default !important;
    opacity: 0.5 !important;
  }
  &:hover {
    .slick-arrow {
      opacity: 1;
    }
  }
  .slick-prev {
    width: 32px;
    z-index: 1;
    left: 0;
    height: 56px;
  }
  .slick-next {
    width: 32px;
    z-index: 1;
    right: 0;
    height: 56px;
  }
`;

export const BannerImage = styled.div`
  flex-wrap: wrap;
  display: flex !important;
  width: 100%;
  img {
    @media screen and (max-width: 1024px) {
      height: 100% !important;
    }
    height: 400px;
  }
  .left {
    width: 33.3333%;
    padding-right: 8px;
    border-radius: 0.5rem;
    cursor: pointer;
    &:hover {
      opacity: 0.95;
    }
    @media screen and (max-width: 1024px) {
      padding-right: 4px !important;
    }
  }
  .right {
    width: 66.6667%;
    padding-left: 8px;
    border-radius: 0.5rem;
    cursor: pointer;
    &:hover {
      opacity: 0.95;
    }
    @media screen and (max-width: 1024px) {
      padding-left: 4px !important;
    }
  }
`;

export const CarouselCustomCoupon = styled(Carousel).withConfig({
  shouldForwardProp: () => true,
})`
  border-radius: 8px;
  .slick-arrow {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 8px !important;
    border-radius: 50% !important;
    width: 30px !important;
    height: 30px !important;
    cursor: pointer !important;
    background-color: rgb(255, 255, 255) !important;
  }
  .slick-prev {
    z-index: 1;
    top: 55%;
    left: 5px;
    color: rgb(1, 127, 255);
    &:hover {
      color: rgb(1, 127, 255);
    }
  }
  .slick-next {
    z-index: 1;
    top: 55%;
    right: 5px;
    color: rgb(1, 127, 255);
    &:hover {
      color: rgb(1, 127, 255);
    }
  }
  @media screen and (max-width: 1024px) {
    padding: 12px !important;
    .slick-track {
      width: 100% !important;
      display: flex !important;
    }
    .slick-slide {
      width: 25% !important;
      margin-right: 8px;
      &:last-child {
        margin-right: 0px !important;
      }
    }
  }
  @media screen and (max-width: 768px) {
    .slick-slide {
      width: 30% !important;
    }
  }
  @media screen and (max-width: 414px) {
    .slick-slide {
      width: 50% !important;
    }
  }
`;

export const CouponItem = styled.div`
  height: 100%;
  padding: 6px 6px;
  @media screen and (max-width: 1024px) {
    padding: 0 !important;
  }
  .coupon {
    position: relative;
    width: 100%;
    padding-bottom: calc(63.7931%);
    .coupon-background {
      width: 100%;
      height: 100%;
      filter: drop-shadow(rgba(0, 0, 0, 0.15) 0px 1px 3px);
      position: absolute;
    }
    .title {
      width: 100%;
      background: rgb(1, 127, 255);
      padding: 6px 12px;
      text-align: center;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      margin-bottom: 6px;
    }
    h4 {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      letter-spacing: 0px;
      margin: 0px;
      padding: 0px;
      font-size: 17px;
      font-weight: 500;
      line-height: 24px;
      max-height: 24px;
      color: rgb(255, 255, 255);
    }
    p {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      letter-spacing: 0px;
      margin: 0px;
      padding: 0px;
      font-size: 13px;
      font-weight: 400;
      line-height: 20px;
      max-height: 20px;
      color: rgb(120, 120, 120);
    }
  }
  .save-stamp {
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    width: 70px;
    height: 58px;
    object-fit: cover;
  }
  .btn-copy {
    position: absolute;
    bottom: 0px;
    display: flex;
    flex: 1 1 0%;
    height: 37%;
    align-items: center;
    button {
      font-size: 15px;
      font-weight: 500;
      cursor: pointer;
      background: rgb(255, 255, 255);
      color: rgb(1, 127, 255);
    }
  }
`;

export const SalesStyle = styled.div`
  & > section {
    border-radius: 0px !important;
  }
  .sale_product {
    @media screen and (max-width: 1024px) {
      background-size: cover;
      padding: 12px !important;
      min-height: auto !important;
      background-image: url("https://salt.tikicdn.com/cache/w600/ts/tmp/fc/30/22/f4698c2d33eb5f972cd624d2fa0be3c9.png.webp");
      & .header .count_down span {
        font-size: 12px !important;
        color: rgb(255, 66, 78);
        background-color: rgb(255, 255, 255);
      }
      & .header .count_down b {
        font-size: 12px !important;
        font-weight: 500 !important;
        color: rgb(255, 255, 255);
      }
      & .header-left {
        justify-content: space-between !important;
        width: 100% !important;
      }
      & .body {
        margin-top: 8px !important;
        background-color: #fff;
        padding: 0px !important;
        border-radius: 8px !important;
      }
      .swiper-slide {
        margin: 10px !important;
        width: 80px !important;
      }
      .deals__price__discount {
        top: 0px !important;
        border: 1px solid rgb(255, 66, 78);
        padding: 0 2px !important;
        left: 0px !important;
      }
      .deals__price {
        font-size: 12px;
        line-height: 16px;
        min-height: 16px;
        text-align: center;
        font-weight: 500;
        font-style: normal;
        margin: 8px 0px;
      }
      .deals__qty {
        height: 15px;
      }
      .deals__progress {
        height: 15px;
        width: 15% !important;
      }
      .fire-icon {
        height: 15px;
        width: 15px;
      }
      .deals__status {
        font-size: 10px !important;
        padding: 0px 0px 0px 15px !important;
      }
    }
  }

  .navigation {
    @media screen and (max-width: 1024px) {
      display: none;
    }
  }
`;
