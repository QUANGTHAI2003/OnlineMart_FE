import { Drawer } from "antd";
import styled from "styled-components";

export const HomeStyle = styled.section`
  .om-tabs-nav-wrap {
    width: -webkit-fill-available;
    top: 0;
    z-index: 999;
    opacity: 1;
    transition: all 1s ease 0s;
    background: rgb(245, 245, 250);
  }
  .title {
    font-size: 20px;
    line-height: 23px;
    color: #38383d;
    font-weight: 400;
    padding: 15px 0 15px 25px;
    background: #fff;
  }

  .om-pagination-options {
    display: none;
  }
`;
export const ProductCategory = styled.div`
  width: 100%;
  padding: 0 15px;
  background: #fff;

  .swiper {
    padding: 10px;
  }
  .swiper-wrapper {
    padding-bottom: 30px;
  }
  .swiper-button-prev,
  .swiper-button-next {
    font-size: 20px;
    padding: 30px 18px;
    background-color: #c3c3c3 !important;
    border-radius: 0% !important;
    color: #fff;
    opacity: 0.7;
    top: 78px;
  }
  .swiper-button-prev:hover,
  .swiper-button-next:hover {
    background: #828282 !important;
  }
  .swiper-button-next {
    border-top-left-radius: 6px !important;
    border-bottom-left-radius: 6px !important;
    margin-right: 0 !important;
  }
  .swiper-button-prev {
    border-top-right-radius: 6px !important;
    border-bottom-right-radius: 6px !important;
  }

  .title {
    width: 100%;
  }
  .product_category {
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    display: flex;
  }
  .img {
    padding: 20px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    background: #f9ece9;
  }
  .img img {
    border-radius: 8px;
    border: 2px solid rgb(235, 235, 240);
  }
  .content {
    padding: 10px 15px;
  }
  .content .brand_title {
    font-size: 20px;
    line-height: 30px;
    color: #38383d;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 290px;
    margin-bottom: 8px;
  }
  .content .content_col2 {
    display: flex;
    margin-bottom: 12px;
  }
  .content .financed {
    font-size: 14px;
    line-height: 20px;
    color: #808089;
    font-weight: 400;
  }
  .content .brand {
    font-size: 14px;
    line-height: 20px;
    color: #27272a;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 160px;
    margin: 0 5px;
  }
  .content .rate {
    font-size: 14px;
    line-height: 20px;
    color: #808089;
    font-weight: 400;
  }
  .content .star {
    color: #ffc300;
    margin: 0 4px;
  }
  .content .thumbnail_div {
    display: flex;
  }
  .content .thumbnail {
    width: 64px;
    position: relative;
    cursor: pointer;
    margin-right: 10px;
  }
  .content .thumbnail img {
    width: 64px;
    border-radius: 4px;
    background-size: cover;
    object-fit: contain;
    border-radius: 4px;
    border: 1px solid rgb(235, 235, 240);
  }
  .content .thumbnail_div .sale {
    position: absolute;
    bottom: 4px;
    right: 2px;
    font-size: 10px;
    line-height: 12px;
    color: white;
    background-color: rgb(255, 66, 78);
    border-radius: 4px;
    text-align: center;
    font-weight: 700;
    padding: 2px;
  }

  @media only screen and (max-width: 380px) {
    .content .brand_title {
      max-width: 120px !important;
      margin: 0;
    }
    .content_col2 {
      display: flex;
      flex-direction: column;
      margin-bottom: 5px !important;
    }
    .content_col2 .financed {
      font-size: 11px;
    }
    .content_col2 .brand {
      margin: 0;
      max-width: 100px !important;
    }
    .content .rate {
      font-size: 12px;
    }
    .content .thumbnail {
      width: 50px;
    }
    .content .thumbnail img {
      width: 50px;
    }
    .content .thumbnail_div .sale {
      font-size: 8px;
      padding: 2px;
    }
  }
  @media only screen and (max-width: 480px) {
    .content .brand_title {
      max-width: 160px;
      margin: 0;
    }
    .content_col2 {
      display: flex;
      flex-direction: column;
      margin-bottom: 5px !important;
    }
    .content_col2 .financed {
      font-size: 11px;
    }
    .content_col2 .brand {
      margin: 0;
      max-width: 130px;
    }
    .content .rate {
      font-size: 12px;
    }
    .content .thumbnail {
      width: 50px;
    }
    .content .thumbnail img {
      width: 50px;
    }
    .content .thumbnail_div .sale {
      font-size: 8px;
      padding: 2px;
    }
  }
  @media only screen and (max-width: 768px) {
    .content_col2 .financed {
      font-size: 11px;
    }
    .content .rate {
      font-size: 12px;
    }
  }
`;
export const SortPaginateItemMain = styled.div`
  margin-bottom: 7px;
`;
export const SortPaginateItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  border: 1px solid rgb(242, 242, 242);
  background: #fff;

  @media only screen and (max-width: 992px) {
    .paginate {
      display: none;
    }
    .sort_with {
      display: none;
    }
  }
  @media only screen and (max-width: 768px) {
    display: none;
  }
  @media only screen and (max-width: 480px) {
    display: none;
  }
  @media only screen and (max-width: 320px) {
    display: none;
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
export const DrawerItem = styled(Drawer).withConfig({
  shouldForwardProp: () => true,
})`
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
export const FilterItem = styled.div`
  padding: 10px 30px;
  background: #fff;
  display: flex;
  align-items: center;

  .button_spread_price {
    max-width: 100%;

    &::-webkit-scrollbar {
      width: 0;
      height: 100%;
    }
  }

  .btn_click {
    border-radius: 30px;
    display: flex;
    align-items: center;
    background: #f0f8ff;
  }
  .to {
    margin: 0 5px;
  }
  .icon {
    font-size: 19px;
    margin-left: 10px;
    color: #1a94ff;
  }
  .delete_all {
    margin: 0 8px;
    font-size: 13px;
    color: #0b74e5;
    line-height: 17px;
    font-weight: 500;
    border-radius: 30px;
    border: 1px solid #0b74e5;
  }
  .delete_all:hover {
    color: #0b74e5 !important;
  }
`;
