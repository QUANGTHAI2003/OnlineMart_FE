import { Rate } from "antd";
import styled from "styled-components";

export const UserWishListRate = styled(Rate)`
  margin-right: 5px;
  font-size: 14px;
  .om-rate-star:not(:last-child) {
    margin-inline-end: 4px;
  }
`;

export const UserWishListProduct = styled.div`
  margin-bottom: 1px;
  width: 100%;
  text-align: center;
  font-size: 14px;
  border-radius: 5px;
  background-color: white;
`;

export const UserWishListPrice = styled.div`
  font-size: 14px;
  line-height: 1.5;
  font-weight: 500;
`;

export const UserWishListPriceSale = styled.div`
  font-size: 13px;
  line-height: 1;
  color: #808098;
  font-weight: 400;
`;

export const UserWishListPriceSalePercent = styled.div`
  font-size: 13px;
  line-height: 1;
  color: #ff424e;
  font-weight: 400;
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
