import { Tabs } from "antd";
import styled from "styled-components";

export const TextGray = styled.div`
  color: #808089;
`;
export const BorderButton = styled.div`
  border: 1px solid #0b76e9;
  color: #0b76e9;
  background-color: white;
`;
export const SearchBar = styled.div`
  background-color: #f5f5fa;
  height: 70px;
  align-items: center !important;
  justify-content: center !important;
  display: flex;
`;
export const CustomTabs = styled(Tabs)`
  .om-tabs-nav {
    background-color: white;
    margin-bottom: 0 !important;
  }
`;
export const OrderItem = styled.div`
  border-radius: 4px;
  font-size: 13px;
  margin-bottom: 20px;
  padding: 16px;
  background: white;
  .order-header {
    border-bottom: 1px solid rgb(235, 235, 240);
    padding-bottom: 12px;
    color: rgb(128, 128, 137);
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    .main-status {
      padding-bottom: 12px;
      color: rgb(128, 128, 137);
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      &::before {
        content: "";
        display: block;
        background: url(https://frontend.tikicdn.com/_desktop-next/static/img/account/block.png) center center / 20px
          20px no-repeat;
        width: 20px;
        height: 20px;
        float: left;
        margin: 0px 6px 0px 0px;
      }
    }
    .order-info {
      cursor: pointer;
    }
    .price {
      min-width: 120px;
      -webkit-box-pack: end;
      justify-content: flex-end;
      display: flex;
    }
  }
  .product {
    display: flex;
    flex-direction: row;
    padding: 16px 0px;
    border-bottom: 1px solid rgb(235, 235, 240);
    -webkit-box-pack: justify;
    justify-content: space-between;
    .product-img {
      flex-shrink: 0;
      width: 80px;
      height: 80px;
      border-radius: 4px;
      border: 0.5px solid rgb(238, 238, 238);
      background-repeat: no-repeat;
      background-size: 90%;
      background-position: center center;
      position: relative;
      span {
        font-size: 12px;
        line-height: 16px;
        font-weight: 400;
        color: rgb(128, 128, 137);
        text-align: center;
        position: absolute;
        width: 28px;
        height: 28px;
        background-color: rgb(235, 235, 240);
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        right: 0px;
        bottom: 0px;
        border-top-left-radius: 10px;
      }
    }
    .product-info {
      margin: 0px 12px;
      display: flex;
      flex-direction: column;
      .store {
        margin-top: 4px;
        span {
          color: rgb(128, 128, 137);
          font-size: 12px;
          font-weight: 400;
          line-height: 16px;
          &::before {
            content: "";
            display: block;
            background: url(https://frontend.tikicdn.com/_desktop-next/static/img/account/store.png) center center /
              16px 16px no-repeat;
            width: 16px;
            height: 16px;
            float: left;
            margin: 2px 6px 0px 0px;
          }
        }
      }
    }
  }
  .order-footer {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 12px;
    width: 100%;
    .total-money {
      font-size: 17px;
      display: flex;
      margin-bottom: 12px;
      .title {
        font-weight: 300;
        color: rgb(128, 128, 137);
        margin-right: 8px;
      }
      .total {
        font-weight: 400;
        color: rgb(56, 56, 61);
      }
    }
    .button-group {
      display: flex;
      -webkit-box-pack: justify;
      justify-content: space-between;
      div {
        padding: 12px 8px;
        height: 36px;
        border-radius: 4px;
        border: 1px solid rgb(11, 116, 229);
        font-size: 14px;
        font-weight: 400;
        line-height: 1.4;
        color: rgb(11, 116, 229);
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        cursor: pointer;
        margin-left: 8px;
      }
    }
  }
`;
