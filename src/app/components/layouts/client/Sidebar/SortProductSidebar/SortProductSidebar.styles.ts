import { Space } from "antd";
import styled from "styled-components";

export const ProductCategory = styled.aside`
  width: 200px;

  .sider {
    background: white;
    padding: 15px 15px 0 15px;
    border-radius: 7px 0 7px 7px;
  }
  .address-btn {
    padding: 10px 0;
    border-bottom: 1px solid #f5f5fa;
  }
  .address-btn button {
    margin-left: -20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 210px;
  }
`;
export const CategoryItem = styled.div`
  border-bottom: 1px solid #f5f5fa;

  .title {
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #38383d;
  }
  .category p {
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    color: #38383d;
    padding-bottom: 12px;
  }
  .category p:hover {
    color: #808089;
    cursor: pointer;
  }
`;
export const RatingItem = styled.div`
  padding: 15px 0;
  border-bottom: 1px solid #f5f5fa;

  .title {
    margin-bottom: 13px;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #38383d;
  }
  .rating {
    font-size: 13px;
  }
  .rating ul {
    font-size: 12px;
    margin: 0 10px 8px 0;
  }
  :where(.css-dev-only-do-not-override-14mi6y0).om-rate .om-rate-star:not(:last-child) {
    margin-inline-end: 3px;
  }
`;
export const PriceItem = styled.div`
  padding: 15px 0;
  border-bottom: 1px solid #f5f5fa;

  .title {
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #38383d;
  }
  .spread_title {
    font-size: 12px;
    line-height: 14px;
    color: #808089;
    font-weight: 450;
    margin: 15px 0 10px 0;
  }
  .price {
    margin-bottom: 4px;
  }
  .price button {
    border-radius: 99px;
    background: #eeeeee;
    color: #38383d;
    font-size: 12px;
    line-height: 16px;
    font-weight: 400;
    border: none;
    padding: 0 10px;
  }
  .arrow {
    margin: 0 6px;
    color: #38383d;
  }
`;
export const SpreadPriceItem = styled(Space)`
  width: 100%;
  text-align: center;

  .om-space-item {
    width: 100%;
  }
  .om-input-number-handler-wrap {
    display: none;
  }
  .input_number {
    width: 74px;
  }
`;
export const Apply = styled(Space)`
  margin: 10px 0;
  width: 100%;

  .om-space-item {
    width: 100%;
  }
  .om-space-item button {
    width: 100%;
  }
`;
export const CheckboxSortItem = styled.div`
  .checkbox_sort {
    padding-bottom: 15px;
    border-bottom: 1px solid #f5f5fa;
  }
  .title {
    font-size: 14px;
    line-height: 20px;
    color: #38383d;
    font-weight: 500;
    padding: 12px 0;
  }
  .content {
    margin: 0 0 12px 0;
  }
  .name {
    font-size: 12px;
    line-height: 16px;
    color: #38383d;
    font-weight: 400;
  }
  .button {
    font-size: 12px;
    line-height: 16px;
    color: #0b74e5;
    font-weight: 500;
    border: none;
    background: none;
    cursor: pointer;
  }
`;
export const Advertise = styled.div`
  margin: 5px 0;
`;
export const AdvertiseItem = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding-bottom: 20px;
  border-radius: 7px;

  .img {
    width: 200px;
    height: 200px;
    padding: 20px;
    background-image: linear-gradient(
      89.9deg,
      rgba(208, 246, 255, 1) 0.1%,
      rgba(255, 237, 237, 1) 47.9%,
      rgba(255, 255, 231, 1) 100.2%
    );
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 7px 7px 0 0;
    border-bottom: 1px solid #f5f5fa;
  }
  .img img {
    width: 80%;
    border-radius: 7px;
  }
  .title {
    font-size: 18px;
    line-height: 27px;
    color: #38383d;
    font-weight: 500;
    text-align: center;
    max-width: 160px;
    margin-top: 15px;
    margin-bottom: 17px;
    display: block;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .finance {
    font-size: 12px;
    line-height: 18px;
    color: #808089;
    font-weight: 400;
  }
  .brand {
    font-size: 12px;
    line-height: 18px;
    color: #27272a;
    font-weight: 400;
  }
  .sale {
    font-size: 14px;
    line-height: 20px;
    color: #0060ff;
    font-weight: 500;
    margin: 15px 0 8px 0;
  }
`;
