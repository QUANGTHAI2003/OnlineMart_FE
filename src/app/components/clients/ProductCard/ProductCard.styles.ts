import styled from "styled-components";

export const ProductItem = styled.div`
  > a {
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

    > * {
      width: 100%;
    }

    &:hover {
      box-shadow: rgb(0 0 0 / 8%) 0px 2px 4px 0px;
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

  > img {
    display: block;
    z-index: 2;
  }

  img {
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;

  .info {
    display: flex;
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
    font-weight: 500;
    color: rgb(39, 39, 42);
    margin-bottom: 4px;
    display: flex;
    -webkit-box-align: center;
    align-items: flex-end;

    .price-discount__discount {
      display: inline-block;
      margin-left: 8px;
      padding: 0px 6px;
      background: rgb(245, 245, 250);
      border-radius: 1000px;
      color: rgb(39, 39, 42);
      font-size: 16px;
      font-weight: 500;
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
`;

export const ProductName = styled.div`
  height: 86px;

  .name {
    & > h3 {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      white-space: break-spaces;
      font-weight: 400;
      font-size: 16px;
      color: rgb(39, 39, 42);
      margin: 0px;
      word-break: break-word;
      line-height: 125%;
    }
  }

  .rating-star {
    line-height: 100%;

    .om-rate {
      font-size: 13px;

      &-star {
        margin-inline-end: 2px;
      }
    }
  }

  .quantity {
    color: rgb(128, 128, 137);
    font-weight: 400;
    font-size: 12px;

    &.has-border {
      position: relative;
      margin-left: 6px;
      padding-left: 8px;

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
  .delivery-info {
    display: flex;
    gap: 4px;
    border-top: 1px solid rgb(235, 235, 240);
    padding-top: 6px;
    padding-bottom: 8px;

    span {
      font-weight: 400;
      font-size: 16px;
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
