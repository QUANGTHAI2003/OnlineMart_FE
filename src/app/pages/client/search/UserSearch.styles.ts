import { Drawer, Row, Space } from "antd";
import styled from "styled-components";

export const UserSearch = styled(Row)`
  padding: 25px;
  display: flex;
  align-items: start;

  .content {
    width: 80%;
  }

  .poster {
    margin-left: 1.4rem;
    width: 18%;
    position: sticky;
    top: 20px;

    img {
      width: 100%;
      border-radius: 6px;
    }
  }

  @media only screen and (max-width: 768px) {
    .content {
      width: 100%;
    }
    .poster {
      display: none;
    }
  }
  @media only screen and (max-width: 992px) {
    .content {
      width: 100%;
    }
    .poster {
      display: none;
    }
  }
  @media only screen and (max-width: 1200px) {
    .poster {
      width: 17%;
    }
  }
  @media only screen and (max-width: 1400px) {
  }
`;
export const PosterItem = styled.div``;
export const BrandItem = styled(Row)`
  .content {
    display: flex;
    border-radius: 4px;
    background: #fff;
    margin-bottom: 20px;
    max-width: 100%;
    width: 100%;
  }
  .content:hover {
    box-shadow: rgba(40, 40, 43, 0.1) 0px 4px 8px;
    transition: all 0.3s linear 0s;
    cursor: pointer;
  }

  .left_brand {
    display: flex;
    justify-content: space-between;
    width: 55%;

    .main_brand {
      display: flex;
      align-items: center;
      width: 100%;

      .image_div {
        width: 120px;
        height: 120px;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 70%;
          border: 1px solid rgb(235, 235, 240);
          border-radius: 4px;
        }
      }
      .content_div {
        .title {
          font-size: 24px;
          line-height: 32px;
          color: #38383d;
          font-weight: 400;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 290px;
          margin-bottom: 8px;
        }

        .store_name {
          display: flex;
          justify-content: center;
          align-items: center;

          .financed {
            font-size: 16px;
            line-height: 24px;
            color: #a6a6b0;
            font-weight: 400;
            margin-right: 6px;
          }
          .brand {
            font-size: 16px;
            line-height: 24px;
            color: #38383d;
            font-weight: 400;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 155px;
          }
          .official {
            border-radius: 2px;
            height: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 9px;
            color: #fff;
            font-weight: 500;
            padding: 8px 7px;
            background-image: linear-gradient(to right bottom, #0965ea, #1b90fd);
            margin: 0 8px;

            span {
              margin-left: 3px;
            }
          }
          .rate {
            font-size: 14px;
            line-height: 20px;
            color: #808089;
            font-weight: 400;

            .star_icon {
              color: #fdd835;
              margin-left: 3px;
            }
          }
        }
      }
    }
  }

  .right_brand {
    padding: 5px 0;
    width: 45%;
    display: flex;
    justify-content: center;
    align-items: center;

    .thumbnail_brand {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-right: 15px;
      width: 950px;

      .thumbnail_div {
        width: 100%;
        position: relative;
        margin-right: 8px;
        height: fit-content;

        img {
          width: 100%;
          background-size: cover;
          object-fit: contain;
          border: 1px solid rgb(235, 235, 240);
          border-radius: 6px;
        }
        .sale_thumbnail {
          position: absolute;
          top: 6px;
          right: 6px;
          background: #ff424e;
          font-size: 12px;
          color: #fff;
          font-weight: 500;
          padding: 2px 5px;
          border-radius: 4px;
          border: 1px solid #fff;
        }
      }
    }

    .see_more {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border-left: 1px dashed rgb(221, 221, 227);
      width: 100%;
      padding: 10px;

      .coupon {
        font-size: 16px;
        line-height: 24px;
        color: #0b74e5;
        font-weight: 500;
      }
      .button {
        margin: 8px 0;
      }
    }
  }

  @media only screen and (max-width: 320px) {
    .content {
      width: 100%;
      flex-direction: column;

      .left_brand {
        width: 100%;

        .image_div {
          width: 30%;
        }
        .content_div {
          width: 70%;

          .title {
            max-width: 150px !important;
          }
          .store_name {
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            .official {
              margin: 5px 0;
            }
          }
        }
      }

      .right_brand {
        display: none;
      }
    }
  }
  @media only screen and (max-width: 480px) {
    .content {
      width: 100%;
      flex-direction: column;

      .left_brand {
        width: 100%;

        .content_div {
          .title {
            max-width: 250px !important;
          }
          .store_name {
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            .official {
              margin: 5px 0;
            }
          }
        }
      }

      .right_brand {
        width: 100%;
        padding: 10px 20px;

        .thumbnail_brand {
          max-width: 80%;
          justify-content: start;

          .thumbnail_div {
            max-width: 25% !important;

            img {
              width: 100%;
            }
            .sale_thumbnail {
              top: 3px;
              right: 3px;
              font-size: 6px;
            }
          }
        }
        .see_more {
          width: auto;
          align-items: end;
          border-left: 1px dashed rgb(221, 221, 227);
          padding-left: 25px;

          .coupon {
            display: none;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 768px) {
    .content {
      width: 100%;
      flex-direction: column;

      .left_brand {
        width: 100%;

        .content_div {
          .title {
            max-width: 350px;
          }
        }
      }

      .right_brand {
        width: 100%;
        padding: 10px 20px;

        .thumbnail_brand {
          max-width: 80%;
          justify-content: start;

          .thumbnail_div {
            max-width: 15%;

            img {
              width: 100%;
            }
            .sale_thumbnail {
              top: 4px;
              right: 4px;
              font-size: 10px;
            }
          }
        }
        .see_more {
          width: auto;
          align-items: end;
          border-left: 1px dashed rgb(221, 221, 227);
          padding-left: 25px;

          .coupon {
            display: none;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 992px) {
  }
  @media only screen and (max-width: 1200px) {
  }
  @media only screen and (max-width: 1400px) {
  }
`;
export const MainSortItem = styled.div`
  margin-bottom: 20px;
  background: #fff;
  border-radius: 4px;

  .main_item {
    display: flex;
    align-items: center;

    .mySwiper {
      width: 85%;

      .swiper_slide {
        width: auto !important;
      }
      .swiper-button-prev,
      .swiper-button-next {
        box-shadow: none !important;
        background-image: linear-gradient(to left, #fff, (255, 255, 255, 0.1)) !important;
        backdrop-filter: blur(10px);
        padding: 20px 20px 0 20px !important;
        margin: 0 -13px;
        top: 0px;
        border-radius: 0% !important;
        width: auto;
        height: 100% !important;
        color: #333;
        /* opacity: 0.9; */
      }
      .swiper-button-prev::after,
      .swiper-button-next::after {
        font-size: 15px !important;
      }
      .swiper-button-prev.swiper-button-disabled,
      .swiper-button-next.swiper-button-disabled {
        opacity: 0;
      }
    }

    .left_brand {
      width: 15%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px 0 0 0;

      .left_brand_item {
        display: flex;
        justify-content: center;
        align-items: center;
        border-left: 1.5px solid rgb(235, 235, 240);
        width: 100%;
      }
      .button {
        display: flex;
        justify-content: center;
        align-items: center;

        .title_all {
          margin-left: 5px;
        }
      }
    }
  }

  @media only screen and (max-width: 320px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;

    .sort_item {
      .main_item {
        .mySwiper {
          display: none;
        }
        .left_brand {
          padding: 0;
          padding-left: 20px;

          .left_brand_item {
            border: none;
            justify-content: start;

            .title_all {
              display: inline;
            }
          }
        }
      }
    }
  }
  @media only screen and (max-width: 480px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;

    .main_item {
      .mySwiper {
        display: none;
      }
      .left_brand {
        padding: 0;
        padding-left: 20px;

        .left_brand_item {
          border: none;
          justify-content: start;

          .title_all {
            display: inline;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 768px) {
    .button {
      .title_all {
        display: none;
      }
    }
  }
  @media only screen and (max-width: 992px) {
  }
  @media only screen and (max-width: 1200px) {
  }
  @media only screen and (max-width: 1400px) {
  }
`;
export const SortItem = styled.div`
  padding: 15px 0 10px 20px;
  width: auto;

  .right_brand {
    display: flex;
    flex-direction: column;
    width: 100%;

    .title {
      font-size: 12px;
      line-height: 18px;
      color: #808089;
      font-weight: 400;
      margin-bottom: 3px;
    }
    .value {
      display: flex;
      border-right: 2px solid rgb(235, 235, 240);
      padding-right: 20px;

      .item_value {
        margin-right: 7px;

        .name {
          font-size: 14px;
          color: #27272a;
          font-weight: 400;
          border-radius: 20px;
        }
        .name:hover {
          background: rgba(81, 81, 88, 0.12);
          border: 1px solid rgba(0, 0, 0, 0.15);
        }
      }
      .dropdown {
        border: 1px solid rgba(0, 0, 0, 0.15);
        padding: 10px;
        border-radius: 100%;
        line-height: 0px;
        cursor: pointer;
        background: #fff;

        .om-space-item {
          width: 100% !important;
        }
      }
      .dropdown:hover {
        background: rgba(81, 81, 88, 0.12);
      }
    }
  }

  .feature_btn {
    .om-space-item {
      flex: 1;
    }
    .om-space-item {
      width: 100% !important;
    }
  }
`;
export const OptionItem = styled.div`
  border-top: 1px solid rgb(235, 235, 240);
  padding: 10px 25px 10px 0px;
  width: auto;

  .option_item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0 5px 20px;
  }

  .checkbox_div {
    max-width: 75%;

    :where(.css-dev-only-do-not-override-14mi6y0).om-rate {
      font-size: 12px;
      margin-right: 5px;
    }
    :where(.css-dev-only-do-not-override-14mi6y0).om-rate .om-rate-star:not(:last-child) {
      margin-inline-end: 2px;
    }
    .checkbox {
      padding-right: 10px;
      border-right: 1px solid rgb(235, 235, 240);
      width: 100%;

      .rating_item {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .mySwiper {
      width: 100%;

      .swiper-wrapper {
        padding: 5px 0;
      }

      .swiper_slide {
        width: auto !important;
        margin-right: 15px;
      }
      .swiper-button-prev,
      .swiper-button-next {
        box-shadow: none !important;
        background-image: linear-gradient(to left, #fff, (255, 255, 255, 0.1)) !important;
        backdrop-filter: blur(10px);
        padding: 1px 20px 0 20px !important;
        margin: 0 -15px;
        top: 0px;
        border-radius: 0% !important;
        width: auto;
        height: 100% !important;
        color: #333;
      }
      .swiper-button-prev::after,
      .swiper-button-next::after {
        font-size: 15px !important;
      }
      .swiper-button-prev.swiper-button-disabled,
      .swiper-button-next.swiper-button-disabled {
        opacity: 0;
      }
    }
  }

  .sort {
    width: 25%;
    display: flex;
    justify-content: end;
    align-items: center;
    border-left: 1px solid rgb(235, 235, 240);

    .title {
      margin-right: 6px;
    }
  }

  @media only screen and (max-width: 320px) {
    .checkbox_div {
      display: none;
    }
    .sort {
      .title {
        display: none;
      }
      .select {
        width: 100% !important;
      }
    }
  }
  @media only screen and (max-width: 480px) {
    .checkbox_div {
      display: none;
    }
    .sort {
      width: 40% !important;
      .title {
        display: none;
      }
      .select {
        max-width: 100% !important;
      }
    }
  }
  @media only screen and (max-width: 768px) {
    .checkbox_div {
      display: none;
    }
    .sort {
      border: none;
      justify-content: start;
      .title {
        display: none;
      }
      .select {
        max-width: 100% !important;
      }
    }
  }
  @media only screen and (max-width: 992px) {
  }
  @media only screen and (max-width: 1200px) {
    .checkbox_div {
      max-width: 70%;
    }
    .sort {
      width: 30%;
    }
  }
  @media only screen and (max-width: 1400px) {
  }
`;
export const SortDrawer = styled.div`
  .button {
    border-right: 2px solid #f5f5f5;
    border-left: none;
    border-top: none;
    border-bottom: none;
    padding-right: 10px;
    padding-left: 0;
    border-radius: 0;
    margin-right: 10px;
  }
  .om-drawer-body .address-btn button {
    margin-left: -20px !important;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 315px;
  }

  @media only screen and (max-width: 1400px) {
    display: none;
  }
  @media only screen and (max-width: 1200px) {
    display: none;
  }
  @media only screen and (max-width: 992px) {
    display: none;
  }
  @media only screen and (max-width: 768px) {
    display: contents;
    .sort_with {
      display: contents;
    }
    .icon {
      margin-right: 5px;
    }
  }
  @media only screen and (max-width: 480px) {
    display: contents;
    .sort_with {
      display: contents;
    }
    .icon {
      margin-right: 5px;
    }
  }
  @media only screen and (max-width: 320px) {
    display: contents;
    .sort_with {
      display: contents;
    }
    .icon {
      margin-right: 5px;
    }
  }
`;
export const DrawerItem = styled(Drawer)`
  .address-btn {
    border-bottom: 1px solid #f5f5f5;
    padding-bottom: 10px;
  }
  .address-btn .address_title {
    font-size: 16px;
    line-height: 24px;
    color: #38383d;
    font-weight: 500;
  }
  .address-btn button {
    margin-left: -20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 315px;
  }
  .address-btn .address {
    font-weight: 400;
  }

  .rating_div {
    padding: 15px 0;
    border-bottom: 1px solid #f5f5f5;
  }
  .rating_div .rating_title {
    font-size: 16px;
    color: #38383d;
    font-weight: 500;
    margin-bottom: 10px;
  }
  .rating {
    background: rgb(245, 245, 250);
    border-radius: 4px;
  }
  .rating button {
    background: none;
    border: none;
  }
  .rating .rating_content {
    font-size: 12px;
  }
  .rating .star_icon {
    color: #ffc300;
    font-size: 12px;
  }

  .price_div {
    padding: 15px 0;
    border-bottom: 1px solid #f5f5f5;
  }
  .price_div .price_title {
    font-size: 16px;
    color: #38383d;
    font-weight: 500;
    margin-bottom: 5px;
  }
  .price_div .price {
    width: 48.5%;
  }
  .price_div button {
    background: rgb(245, 245, 250);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: rgb(56, 56, 61);
    height: 45px;
    width: 154px;
    border-radius: 4px;
    border: none;
  }
  .price_div button > svg {
    margin: 0 5px;
  }

  .price_div .spread_price {
    margin-top: 15px;
  }
  .price_div .spread_price .spread_title {
    font-size: 13px;
    line-height: 15px;
    margin: 10px 0px 10px;
    color: rgb(36, 36, 36);
  }
  .price_div .spread_price .input_number_space .input_number {
    width: 145px;
  }
  .price_div .spread_price .input_spread .apply {
    display: none;
  }

  .checkbox_sort_div .checkbox_sort .title {
    font-size: 16px;
    color: #38383d;
    font-weight: 500;
    margin: 15px 0 10px 0;
  }
  .checkbox_sort .button {
    background: rgb(245, 245, 250);
    border: none;
    height: 45px;
    width: 48.5%;
  }
  .checkbox_sort .button > span {
    font-size: 13px;
  }
  .checkbox_sort .button_div {
    padding: 5px 0 15px;
    border-bottom: 1px solid #f5f5f5;
  }
`;
export const Swiper = styled.div`
  background: #fff;
  margin: 30px 0;
  padding: 15px 0;

  .swiper-pagination {
    display: none;
  }
  .title {
    padding-left: 20px;
    font-size: 20px;
    line-height: 30px;
    color: #333;
    font-weight: 400;
  }
  .row_product {
    margin-top: 15px;
  }
  .product_item:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 20px;
  }
  .swiper-button-prev,
  .swiper-button-next {
    padding: 20px;
    color: #333;
  }
`;

export const FeatureBtn = styled(Space)`
  .om-space-item {
    flex: 1;
  }
`;
