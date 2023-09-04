import styled from "styled-components";

export const ProductItem = styled.div`
  .product-item {
    text-decoration: none;
    display: flex;
    position: relative;
    cursor: pointer;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    background: rgb(255, 255, 255);
    overflow: hidden;
    color: rgb(36, 36, 36);

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 20px;
      transform: scale(1.01);
    }
  }

  &.small {
    height: 100%;

    .price-discount {
      font-size: 16px;

      &__discount {
        font-size: 12px;
      }
    }

    .rating-star {
      .om-rate {
        font-size: 12px;
      }
    }

    .quantity {
      font-size: 10px;
    }

    .delivery-date {
      span {
        font-size: 12px;
      }
    }
  }
`;

export const ProductSale = styled.div`
  .deals__price__discount {
    position: absolute;
    top: 8px;
    left: 8px;
    padding: 2px;
    background: rgb(255, 219, 222);
    border-radius: 4px;
    color: rgb(255, 66, 78);
    font-weight: 700;
    font-size: 12px;
    line-height: 150%;
  }

  .deals__price {
    text-align: left;
    font-size: 20px;
    line-height: 24px;
    font-weight: 500;
    color: rgb(56, 56, 61);
    margin: 8px 0px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    white-space: nowrap;

    &.has-discount {
      color: rgb(255, 66, 78);
    }
  }

  .fire-icon {
    z-index: 10;
    position: absolute;
    width: 24px;
    height: 24px;
    bottom: 4px;
    left: 5px;
  }

  .deals__qty {
    background-color: rgb(255, 170, 175);
    color: rgb(255, 255, 255);
    border-radius: 10px;
    position: relative;
    display: flex;
    width: 100%;
    height: 24px;
  }

  .deals__progress {
    position: absolute;
    left: 0px;
    top: 0px;
    background-color: rgb(255, 66, 78);
    height: 24px;
    border-radius: 12px;
    min-width: 24px;
  }

  .deals__status {
    font-size: 14px;
    line-height: 16px;
    padding: 0px 0px 0px 6px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    position: absolute;
    text-align: center;
  }
`;

export const Thumbnail = styled.div`
  flex-shrink: 0;
  text-align: center;
  position: relative;
  width: 100%;
  padding-top: 100%;

  .blur-load {
    background-size: 10px;
    background-repeat: repeat;
    width: 100%;
    height: 100%;
  }

  > img {
    display: block;
    z-index: 2;
    object-fit: contain;
    width: 100%;
    height: 100%;
    transition: opacity 250ms ease-in-out 0s;
  }

  img {
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
  }
`;

export const Info = styled.div`
  min-height: 200px;
  display: flex;
  flex-direction: column;

  .info {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 4px 8px;
    gap: 4px;
    flex: 1 1 0%;

    p {
      display: inline-block;
      height: 16px;
      margin: 0px;
      padding: 1px 4px;
      background: rgb(245, 245, 250);
      border-radius: 1000px;
      color: rgb(100, 100, 109);
      font-size: 10px;
      font-weight: 700;
      line-height: 150%;
      text-transform: uppercase;
      z-index: 1;
    }
  }

  .price-discount {
    text-align: left;
    font-size: 18px;
    line-height: 150%;
    font-weight: 500;
    color: rgb(39, 39, 42);
    margin: 0px;
    display: flex;
    align-items: center;

    &__discount {
      display: inline-block;
      height: 18px;
      margin-left: 12px;
      padding: 0px 4px;
      background: rgb(245, 245, 250);
      border-radius: 1000px;
      color: rgb(39, 39, 42);
      font-size: 14px;
      font-weight: 500;
      line-height: 150%;
    }

    &.has-discount {
      color: rgb(255, 66, 78);
    }
  }

  .badge-under-price {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    font-weight: 300;
    font-size: 14px;
    line-height: 150%;
    min-height: 16px;
    width: 100%;
    gap: 4px;
    color: rgb(128, 128, 137);

    span {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      white-space: break-spaces;
      width: 100%;
    }
  }

  .have-variant {
    flex-direction: row;
    align-items: center;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 4px;

    .variant-item {
      align-items: center;
      border: 0.5px solid rgb(26, 148, 255);
      border-radius: 2px;
      padding: 2px 4px;
      display: flex;

      &-text {
        color: rgb(26, 148, 255);
        font-size: 10px;
        line-height: 12px;
        font-weight: 400;
      }
    }
  }
`;

export const ProductName = styled.div`
  height: 86px;

  .name {
    & > h3 {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      font-weight: 400;
      font-size: 14px;
      line-height: 150%;
      color: rgb(39, 39, 42);
      margin: 0px;
      word-break: break-word;
    }
  }

  .rating-star {
    line-height: 100%;

    .om-rate {
      font-size: 14px;
      display: flex;
      align-items: center;

      &-star {
        margin-inline-end: 2px;
      }
    }
  }

  .quantity {
    color: rgb(128, 128, 137);
    font-weight: 400;
    font-size: 12px;
    line-height: 150%;

    &.has-border {
      position: relative;
      margin-left: 4px;
      padding-left: 5px;

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0px;
        transform: translateY(-50%);
        width: 1px;
        height: 12px;
        background-color: rgb(235, 235, 240);
      }
    }
  }
`;

export const DeliveryInfo = styled.div`
  margin-inline: 8px;

  .delivery-date {
    display: flex;
    gap: 4px;
    border-top: 1px solid rgb(235, 235, 240);
    padding-top: 6px;
    padding-bottom: 8px;
    align-items: center;

    span {
      font-weight: 400;
      font-size: 14px;
      line-height: 150%;
      color: rgb(128, 128, 137);
      -webkit-box-orient: vertical;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      overflow: hidden;
      white-space: normal;
    }
  }
`;
