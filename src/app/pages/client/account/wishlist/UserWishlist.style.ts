import { Rate } from "antd";
import styled from "styled-components";

export const UserWishListProduct = styled.div`
  margin-bottom: 1px;
  width: 100%;
  padding: 20px 25px;
  text-align: center;
  font-size: 14px;
  border-radius: 5px;
  background-color: white;
  .line {
    background-color: #e8e8e8;
    height: 100%;
    width: 1px;
    margin: 0 10px;
  }
  .left {
    width: 70% !important;
    margin: 0 0 0 16px;
  }
  .left > div:first-child {
    width: 30% !important;
  }
  .left > div:last-child {
    width: 70% !important;
  }
  @media screen and (max-width: 1024px) {
    padding: 10px 5px !important;
    img {
      width: 100% !important;
    }
    .left > div:last-child {
      margin-left: 12px !important;
    }
    .right > div {
      margin-right: 25px !important;
    }
    .line {
      margin: 0 4px;
    }
  }
  @media screen and (max-width: 768px) {
    padding: 10px 5px !important;
    img {
      width: 100% !important;
    }
    .left {
      margin: 0 !important;
    }
    .left > div:first-child {
      width: 30% !important;
    }
    .left > div:last-child {
      width: 70% !important;
      margin-left: 4px !important;
    }
    .right > div {
      margin-right: 8px !important;
    }
    .right > button > svg {
      font-size: 12px !important;
      display: block !important;
    }
    .line {
      margin: 0 4px;
    }
  }
`;

export const BoxShadow = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  background: rgba(39, 39, 42, 0.02);
  z-index: 5;
`;

export const ProductName = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  justify-content: flex-start;
  & > a {
    font-size: 14px;
    font-weight: 400;
    color: #000;
    line-height: 125%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    word-break: break-word;
    white-space: break-spaces;
    @media screen and (max-width: 768px) {
      font-size: 12px !important;
      & > div {
        margin-top: 2px !important;
      }
    }
  }
  @media screen and (max-width: 768px) {
    & > div {
      margin-top: 2px !important;
    }
    span {
      font-size: 10px !important;
    }
  }
  @media screen and (max-width: 414px) {
    span {
      font-size: 8px !important;
    }
  }
`;

export const UserWishListRate = styled(Rate).withConfig({
  shouldForwardProp: () => true,
})`
  margin-right: 5px;
  font-size: 14px;
  .om-rate-star:not(:last-child) {
    margin-inline-end: 4px;
  }
  @media screen and (max-width: 768px) {
    font-size: 10px !important;
  }
`;

export const UserWishListPrice = styled.div`
  font-size: 14px;
  line-height: 1.5;
  font-weight: 500;
  @media screen and (max-width: 414px) {
    font-size: 12px !important;
  }
`;

export const UserWishListPriceSale = styled.div`
  font-size: 13px;
  line-height: 1;
  color: #808098;
  font-weight: 400;
  @media screen and (max-width: 414px) {
    font-size: 10px !important;
  }
`;

export const UserWishListPriceSalePercent = styled.div`
  font-size: 13px;
  line-height: 1;
  color: #ff424e;
  font-weight: 400;
  @media screen and (max-width: 414px) {
    font-size: 10px !important;
  }
`;

export const UserWishListShopping = styled.a`
  background-color: #fdd835;
  padding: 10px 20px;
  font-size: 14px;
  color: #4a4a4a;
  border-radius: 5px;
  display: inline-block;
  margin: 0 auto;
  &:hover {
    color: #4a4a4a;
  }
`;
