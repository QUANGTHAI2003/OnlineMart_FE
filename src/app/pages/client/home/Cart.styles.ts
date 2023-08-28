import styled from "styled-components";

export const CartFirst = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 99;
  .cart-label {
    background-color: #fff;
    padding: 9px 16px;
    border-radius: 4px;
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 13px;
    margin-bottom: 12px;
    display: grid;
    grid-template-columns: 398px 190px 130px 130px 30px;
    -webkit-box-align: center;
    align-items: center;
  }
  .remove-all {
    display: inline-block;
    position: relative;
    cursor: pointer;
    border-radius: 4px;
    background: rgb(255, 255, 255);
    color: rgb(36, 36, 36);
    z-index: 2;
    text-align: right;
    &:hover::before,
    &:hover::after {
      display: block;
    }
    &::after {
      content: "";
      width: 0px;
      height: 0px;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 5px solid rgb(36, 36, 36);
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -6px;
      z-index: 2;
      display: none;
    }
    &::before {
      content: "Xóa mục đã chọn";
      background: rgb(36, 36, 36);
      padding: 5px 10px;
      color: rgb(255, 255, 255);
      font-size: 13px;
      position: absolute;
      left: 50%;
      bottom: -30px;
      transform: translateX(-50%);
      width: 130px;
      text-align: center;
      border-radius: 4px;
      z-index: 2;
      display: none;
    }
  }
`;

export const CartItem = styled.div`
  display: flex;
  -webkit-box-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  align-items: center;
  margin: 0px -15px;
  .col-1 {
    width: 398px;
    padding: 0px 15px;
  }
  .col-2 {
    width: 190px;
    padding: 0px 15px;
  }
`;

export const Cart = styled.div`
  @media (max-width: 768px) {
    /* <= 767px */
    .cart {
      width: 100%;
      flex-direction: column-reverse;
    }
    .cart-content {
      width: 100%;
    }
    .cart-label {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      .remove-all::before {
        display: none;
      }
      .remove-all::after {
        display: none;
      }
    }
    .row {
      position: relative;
      flex-direction: column;
      align-items: flex-start;
      margin: 0 -15px;
      height: 110px;
      .col-1 {
        width: auto;
      }
      .col-2 {
        position: absolute;
        top: 45px;
        left: 95px;
        width: auto;
        margin-left: 20px;
      }
      .col-3 {
        position: absolute;
        top: 70px;
        left: 95px;
        width: auto;
        margin-left: 20px;
        margin-bottom: 10px;
      }
      .col-4 {
        display: none;
      }
      .col-5 {
        width: auto;
        margin: 0px 15px 0px auto;
        align-self: flex-end;
      }
    }
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    /*  768px to 1023px */
    .cart {
      width: 100%;
      flex-direction: column-reverse;
    }
    .cart-content {
      width: 100%;
    }
    .cart-label {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      .remove-all::before {
        display: none;
      }
      .remove-all::after {
        display: none;
      }
    }
    .row {
      position: relative;
      flex-direction: column;
      align-items: flex-start;
      margin: 0 -15px;
      height: 110px;
      .col-2 {
        position: absolute;
        top: 45px;
        left: 95px;
        width: auto;
        margin-left: 20px;
      }
      .col-3 {
        position: absolute;
        top: 70px;
        left: 95px;
        width: auto;
        margin-left: 20px;
        margin-bottom: 10px;
      }
      .col-4 {
        display: none;
      }
      .col-5 {
        width: auto;
        margin: 0px 15px 0px auto;
        align-self: flex-end;
      }
    }
  }
  @media (min-width: 1024px) and (max-width: 1279px) {
    /* 1024px to 1280px */
    .cart {
      width: 100%;
      flex-direction: column-reverse;
    }
    .cart-content {
      width: 100%;
    }
    .cart-label {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      .remove-all::before {
        display: none;
      }
      .remove-all::after {
        display: none;
      }
    }
    .row {
      position: relative;
      flex-direction: column;
      align-items: flex-start;
      margin: 0 -15px;
      height: 110px;
      .col-2 {
        position: absolute;
        top: 45px;
        left: 95px;
        width: auto;
        margin-left: 20px;
      }
      .col-3 {
        position: absolute;
        top: 70px;
        left: 95px;
        width: auto;
        margin-left: 20px;
        margin-bottom: 10px;
      }
      .col-4 {
        display: none;
      }
      .col-5 {
        width: auto;
        margin: 0px 15px 0px auto;
        align-self: flex-end;
      }
    }
  }
`;

export const TotalWithCoupon = styled.div`
  z-index: 100;
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  /* padding: initial !important; */
  /* .container-checkout {
    padding: 0 !important;
  } */
`;

export const Ticket = styled.div`
  .ticket {
    border: 1px solid #0d5cb6;
    border-radius: 4px;
    height: 24px;
    background: #f0f8ff;
    position: relative;

    .semicircle {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: rgb(255, 255, 255);
      position: absolute;
      top: 50%;
      transform: translateY(-50%) rotate(45deg);
    }
    .left {
      border-width: 1px;
      border-style: solid;
      border-color: rgb(13, 92, 182) rgb(13, 92, 182) rgb(255, 255, 255) rgb(255, 255, 255);
      left: -6px;
      transform: translateY(-50%) rotate(45deg);
    }
    .right {
      border-width: 1px;
      border-style: solid;
      border-color: rgb(255, 255, 255) rgb(255, 255, 255) rgb(13, 92, 182) rgb(13, 92, 182);
      right: -6px;
      transform: translateY(-50%) rotate(45deg);
    }
  }
`;
