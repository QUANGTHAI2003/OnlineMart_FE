import styled from "styled-components";

const mobileGroupBtn = "150px";

export const DetailPageStyle = styled.section`
  @media screen and (max-width: 768px) {
    margin-bottom: calc(${mobileGroupBtn} - 16px);
  }
`;

export const ProductDetailStyle = styled.section`
  display: flex;
  background-color: #fff;
  border-radius: 4px;

  @media screen and (max-width: 1080px) {
    flex-direction: column;
    padding: 0 50px;

    .main-thumbnail {
      width: 100% !important;
    }
  }

  @media screen and (max-width: 768px) {
    padding: 0 20px;
  }

  .seperate {
    margin: 0px 12px;
    width: 1px;
    background: rgb(242, 242, 242);
    flex-shrink: 0;
  }

  .product-content {
    flex: 1 1 0%;
    font-size: 16px;
  }

  .body {
    display: flex;
    padding: 0px 24px 0px 0px;

    @media screen and (max-width: 768px) {
      flex-direction: column;
      padding: 0;
    }
  }
`;

export const HeaderStyle = styled.div`
  padding: 16px 28px 16px 0px;
  position: relative;

  .brand {
    display: flex;
    margin-top: 8px;

    h6 {
      margin: 0px;
      color: rgb(36, 36, 36);
      font-size: 13px;
      font-weight: 400;
      line-height: 20px;

      a {
        font-size: 13px;
        line-height: 20px;
        color: rgb(13, 92, 182);
      }
    }
  }

  .title {
    margin: 0px 0px 4px;
    color: rgb(36, 36, 36);
    font-size: 24px;
    font-weight: 300;
    line-height: 32px;
    word-break: break-word;
  }

  .below-title {
    display: flex;
    align-items: center;
    margin-top: 4px;
    justify-content: space-between;

    .om-rate-star {
      margin-inline-end: 4px;
    }

    .number {
      display: block;
      cursor: pointer;
      margin-left: 8px;
      color: rgb(120, 120, 120);
      font-size: 15px;
      line-height: 24px;
      background-color: transparent;
      border: none;
      outline: none;
    }

    .below-title-seperate {
      width: 1px;
      height: 12px;
      background-color: rgb(199, 199, 199);
      margin-left: 8px;
      margin-right: 8px;
    }

    .quantity-sold {
      font-size: 15px;
      line-height: 24px;
      color: rgb(120, 120, 120);
    }
  }
`;

export const ProductInfoStyle = styled.div`
  flex: 1 1 0%;
  padding-right: 12px;

  @media screen and (max-width: 768px) {
    padding: 0;
  }

  .price-and-icon {
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    background-color: rgb(250, 250, 250);
    padding: 0px 16px 12px;

    &.no-background {
      background: none;
    }
  }

  .product-price {
    padding-top: 12px;
    display: flex;
    align-items: flex-end;
    color: rgb(56, 56, 61);

    &.has-discount {
      color: rgb(255, 66, 78);
    }

    &__current-price {
      font-size: 32px;
      line-height: 40px;
      margin-right: 8px;
      font-weight: 500;
    }

    &__list-price {
      color: rgb(128, 128, 137);
      text-decoration: line-through;
      font-size: 14px;
      line-height: 20px;
    }

    &__discount-rate {
      font-weight: 500;
      margin-left: 4px;
      color: rgb(255, 66, 78);
      margin-top: 3px;
      line-height: 18px;
      font-size: 14px;
      padding: 0px 4px;
    }

    &.hot-deal {
      display: flex;
      -webkit-box-pack: justify;
      justify-content: space-between;
      background: linear-gradient(100deg, rgb(255, 66, 78), rgb(253, 130, 10));
      color: rgb(255, 255, 255);
      padding: 4px 16px 6px;
      margin: 0px -16px;
      border-radius: 4px;
    }

    > .flash-sale-price > span {
      font-size: 32px;
      font-weight: bold;
      line-height: 40px;
    }

    .flash-sale-price .list-price {
      color: rgba(255, 255, 255, 0.5);
      text-decoration: line-through;
      margin-right: 8px;
    }

    .sale > span {
      font-size: 13px;
      line-height: 20px;
    }

    > .flash-sale-countdown {
      margin-top: 2px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      > span {
        font-size: 13px;
        line-height: 20px;
      }

      .time {
        color: rgb(255, 66, 78);
        display: flex;

        > span {
          border-radius: 4px;
          background: white;
          padding: 2px;
          font-size: 11px;
          line-height: 13px;
          display: flex;
        }

        .colon {
          margin-right: 9px;
          position: relative;

          &:after {
            color: white;
            content: ":";
            position: absolute;
            right: -6px;
            z-index: 2;
            top: -2px;
            font-size: 11px;
            line-height: 16px;
          }
        }
      }

      .status {
        margin-top: 6px;
      }
    }
  }
`;

export const VariantStyle = styled.div`
  .option-text {
    color: rgb(142, 142, 142);
    font-size: 13px;
    line-height: 20px;
    font-weight: 400;
    margin: 0px;
    padding-right: 20px;

    span {
      color: rgb(36, 36, 36);
      font-weight: 500;
    }
  }

  .option-figure {
    margin: 2px 0;
    width: 38px;
    height: 38px;

    > img {
      width: 100%;
    }
  }

  .option-label {
    position: relative;
    -webkit-line-clamp: 3;
    text-align: left;
    text-overflow: ellipsis;
    vertical-align: middle;
    overflow: hidden;
    line-height: 16px;
    margin: 6px 8px;
    max-width: 100px;
  }

  .om-radio-button-wrapper {
    height: 100%;
    background-color: rgb(242, 242, 242);
    border-radius: 4px !important;
    border: none;
    border: 1px solid transparent;
    transition: border-color 0.3s ease;

    &:before {
      display: none;
    }

    > span:not(.om-radio-button) {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    &-checked {
      border: 1px solid rgb(13, 92, 182);
      background-color: rgb(229, 242, 255);
      .selected-indicator {
        display: block !important;
        position: absolute;
        top: -1px;
        right: -1px;
      }
    }

    &:hover {
      border: 1px solid rgb(13, 92, 182);
      background-color: rgb(229, 242, 255);
      .selected-indicator {
        margin: -1px;
        display: block !important;
        position: absolute;
        top: -1px;
        right: -1px;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .om-radio-button-wrapper {
      flex: 1;
    }
  }

  .selected-indicator {
    display: none;
  }
`;

export const DeliveryStyle = styled.div`
  background-color: rgb(255, 255, 255);
  margin: 16px 0px 0px;
  border-top: 1px solid rgb(242, 242, 242);

  .select-address-btn {
    width: 100%;
    height: 100%;
    padding: 12px 0px;
    justify-content: flex-start;
  }

  .shipping-info {
    margin-bottom: 12px;

    &__inner {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    &__item {
      border: 1px solid rgb(238, 238, 238);
      border-radius: 12px;
      padding: 8px;
      position: relative;
      z-index: 1;
      font-size: 13px;
      line-height: 20px;
      color: rgb(120, 120, 120);
      flex: 1 1 0%;

      &.only-item {
        width: 100%;
        max-width: 100%;
        margin: 0px;
      }

      &__header {
        display: flex;
        align-items: center;
        height: 20px;
        font-size: 14px;

        .divider {
          content: " ";
          width: 1px;
          height: 8px;
          margin: 0px 4px;
          background-color: rgb(235, 235, 240);
        }

        &__highlight {
          color: rgb(0, 171, 86);
          font-weight: 500;
        }
      }

      &__fee {
        display: flex;
        margin-bottom: 2px;

        &_name {
          color: rgb(56, 56, 61);
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;

          > span {
            color: #808089;
          }
        }
      }
    }
  }

  .plus-content {
    font-size: 14px;
    line-height: 150%;
    padding-left: 4px;

    sup {
      top: -0.5em;
    }
  }
`;

export const AddToCartStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 0px 0px;
  padding: 16px 0px;
  border-top: 1px solid rgb(242, 242, 242);

  .quantity-input-wrapper {
    font-size: 15px;
    line-height: 1.6;
    margin: 0px 0px 10px;
  }

  .group-input {
    display: flex;
    align-items: center;
    margin-top: 8px;

    button,
    input {
      height: 30px;
      color: rgb(36, 36, 36);
      font-size: 14px;
      text-align: center;
      outline: none;
      box-shadow: none !important;
      transition:
        border-color 0.15s ease-in-out 0s,
        box-shadow 0.15s ease-in-out 0s;
    }

    .om-btn {
      cursor: pointer;
      width: 30px;
      height: 100%;
      background-color: rgb(255, 255, 255);
      border: 1px solid rgb(236, 236, 236);

      &:active {
        box-shadow: none !important;
      }

      &:hover {
        background-color: rgb(236, 236, 236) !important;
      }

      &:first-child {
        border-right: none;
        border-radius: 4px 0px 0px 4px;
        padding: 4px;
      }

      &:last-child {
        border-left: none;
        border-radius: 0px 4px 4px 0px;
        padding: 4px;
      }
    }

    .om-input-number {
      border-radius: 0;
      border: 1px solid rgb(236, 236, 236);
    }
  }

  .group-button {
    margin-top: 16px;
    flex: 1 1 0%;
    display: flex;

    .om-btn {
      cursor: pointer;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      min-width: 190px;
      width: 100%;
      max-width: 300px;
      height: 48px;
      font-size: 15px;
      line-height: 24px;
      font-weight: 500;
      text-transform: capitalize;
      border: none;
      border-radius: 4px;
      outline: none;

      &.add-to-cart {
        color: rgb(255, 255, 255);
        background-color: rgb(255, 57, 69);

        &.disabled {
          background-color: rgb(236, 236, 236);
          color: rgb(142, 142, 142);
          cursor: not-allowed;
        }

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    position: fixed;
    bottom: 0;
    border-top: 1px solid rgb(239, 239, 239);
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    background: white;
    margin-left: -20px;
    z-index: 1000;
    padding: 16px 30px;
    min-height: ${mobileGroupBtn};

    .quantity-input-wrapper {
      display: flex;
      align-items: center;
      column-gap: 12px;
    }

    .group-button {
      .om-btn {
        max-width: 100%;
      }
    }
  }
`;

export const SellerStyle = styled.div`
  padding-bottom: 20px;
  width: 240px;

  @media screen and (max-width: 768px) {
    width: 100%;
    margin-top: 16px;

    .seller-action {
      column-gap: 16px;

      > * {
        flex: 1;
      }
    }
  }

  .current-seller {
    border-radius: 4px;
    box-shadow:
      rgb(242, 242, 242) 1px 1px 0px 0px inset,
      rgb(242, 242, 242) -1px -1px 0px 0px inset;
  }

  .seller-widget {
    .seller-info {
      display: flex;
      flex-direction: column;
      padding: 8px 12px;

      .logo {
        border-radius: 50%;
        overflow: hidden;
        object-fit: contain;
        width: 44px;
      }

      .seller-name {
        margin: 0px 0px 2px;
        font-size: 15px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.6;
        letter-spacing: normal;
        color: rgb(36, 36, 36);

        > span {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }

        .badge-img {
          width: 54px;
          height: 14px;
          object-fit: contain;
        }
      }
    }

    .seller-detail {
      display: flex;
      min-height: 39px;

      .item {
        display: flex;
        flex-direction: column;
        flex: 1 1 0%;
        align-items: center;

        > * {
          text-align: center;
        }

        > .title {
          display: flex;
          -webkit-box-align: center;
          align-items: center;

          > span {
            font-size: 15px;
            font-weight: 500;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.6;
            letter-spacing: normal;
          }
        }

        .sub-title {
          font-size: 11px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.45;
          letter-spacing: normal;
          color: rgb(120, 120, 120);
        }
      }

      .border-left {
        align-self: center;
        width: 1px;
        height: 16px;
        background-color: rgb(242, 242, 242);
      }
    }

    .seller-action {
      display: flex;
      align-items: center;
      column-gap: 8px;
      padding: 12px;
      justify-content: space-between;

      .action {
        display: flex;
        flex: 1;
        padding: 6px 9px;
        align-items: center;
        border-radius: 4px;
        border: 1px solid rgb(13, 92, 182);
        cursor: pointer;

        > img {
          width: 20px;
          height: 20px;
        }

        > span {
          font-size: 13px;
          font-weight: 500;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.54;
          letter-spacing: normal;
          color: rgb(13, 92, 182);
          margin-left: 4px;
        }

        &.follow {
          padding: 6px 11.3px;

          &.active {
            background-color: rgb(229, 242, 255);
            border: none;
            padding: 6px 7px;
          }
        }
      }
    }
  }
  .seller-warranty {
    font-size: 13px;
    line-height: 20px;
    padding: 8px 12px;
    border-top: 1px solid rgb(242, 242, 242);

    .warranty-item {
      display: flex;
      justify-content: space-between;
      padding: 12px 0px 0px;
      flex-wrap: wrap;

      &:first-child {
        padding: 0px;
      }

      .itemLeft {
        color: rgb(120, 120, 120);
        flex-shrink: 0;
        margin-right: 16px;
      }
    }
  }

  .customer-benerfit {
    display: flex;
    padding: 8px;
    border-top: 1px solid rgb(242, 242, 242);

    .benefit-item {
      background: white;
      display: flex;
      flex-direction: column;
      flex: 1 0 30%;
      align-items: center;

      > img {
        height: 32px;
        width: 32px;
      }

      > span {
        text-align: center;
        font-size: 13px;
        line-height: 20px;
        margin-top: 8px;

        b {
          font-weight: 500;
        }
      }
    }
  }
`;

export const ProductDetailInfoStyle = styled.section`
  display: flex;

  .left {
    flex: 1 1 0%;

    .group {
      background-color: #fff;
      border-radius: 4px;

      &:not(:last-child) {
        margin-bottom: 16px;
      }

      > h2 {
        color: rgb(51, 51, 51);
        font-size: 20px;
        font-weight: 400;
        line-height: 32px;
        padding: 8px 16px;
        text-transform: capitalize;
        display: flex;
        -webkit-box-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        align-items: center;
        margin: 0px;
      }

      .content {
        width: 920px;
        padding: 0px 16px 16px;
        display: inline-block;
        color: rgb(36, 36, 36);
        text-align: justify;
        border-radius: 4px;

        table {
          max-width: 100%;
          border-collapse: collapse;
          border-spacing: 0px;
          line-height: 21px;
          width: 100% !important;

          tr {
            font-size: 13px;
            border-bottom: 0px;

            td {
              padding: 10px 15px;

              &:first-child {
                width: 220px;
                vertical-align: top;
                color: rgb(79, 79, 79);
                font-size: 13px;
                font-weight: 500;
                background: rgb(239, 239, 239);
              }

              &:last-child {
                flex: 1 1 0%;
                border-right: 0px;
              }
            }

            &:nth-child(odd) {
              background-color: rgb(250, 250, 250);
            }
          }
        }
      }

      .toggle-content-view:not(.expanded) {
        overflow: hidden;
        max-height: 500px;
      }

      .less #gradient {
        position: absolute;
        bottom: 0px;
        left: 0px;
        width: 100%;
        height: 200px;
        background-image: linear-gradient(rgba(255, 255, 255, 0), rgb(255, 255, 255));
      }

      .btn-more {
        cursor: pointer;
        display: block;
        width: 229px;
        height: 39px;
        margin: 10px auto 0px;
        color: rgb(24, 158, 255);
        font-size: 13px;
        font-weight: 400;
        text-align: center;
        border: 1px solid rgb(24, 158, 255);
        border-radius: 4px;
      }
    }
  }

  .right {
    width: 300px;
    margin-left: 20px;
  }

  @media screen and (max-width: 1080px) {
    .left {
      width: 100%;

      .content {
        width: 100% !important;

        img {
          width: 100%;
          object-fit: contain;
        }
      }
    }

    .right {
      display: none;
    }
  }
`;

export const CustomerReview = styled.section`
  word-break: break-word;
  opacity: 1;
  color: rgb(36, 36, 36);
  min-height: auto;
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
  padding-bottom: 16px;

  .customer-reviews {
    &__heading {
      font-size: 20px;
      line-height: 32px;
      font-weight: 500;
      text-transform: capitalize;
      padding: 25px 47px 30px 47px;
    }

    &__inner {
      padding-bottom: 16px;
    }

    &__top {
      display: flex;
      column-gap: 16px;
      padding: 0px 48px;

      @media screen and (max-width: 768px) {
        flex-direction: column !important;
      }
    }
  }

  .review-rating {
    flex-basis: 335px;
    flex-shrink: 0;
    margin: 0px 0px 32px;

    @media screen and (max-width: 1280px) {
      flex-basis: unset;
    }

    &__summary {
      display: flex;
      align-items: center;
    }

    &__detail {
      margin: 12px 0px 0px;

      .progress-bar {
        width: 138px;
        height: 6px;
        background-color: rgb(245, 245, 250);
        position: relative;
        z-index: 1;
        margin: 0px 8px;
        border-radius: 99em;

        > div {
          position: absolute;
          left: 0px;
          top: 0px;
          bottom: 0px;
          background-color: #0a68ff;
          border-radius: 99em;
        }
      }
    }

    &__point {
      font-size: 32px;
      line-height: 40px;
      font-weight: 700;
      white-space: nowrap;
      margin: 0px 16px 0px 0px;
    }

    &__total {
      line-height: 20px;
      margin-top: 1px;
      font-size: 13px;
      font-weight: 400;
      color: rgb(128, 128, 137);
    }

    &__level {
      display: flex;
      margin: 4px 0px;
      -webkit-box-align: center;
      align-items: center;

      .om-rate {
        font-size: 14px;
      }
    }
  }

  .review-images {
    &__heading {
      margin: 0px 0px 16px;
      font-size: 17px;
      line-height: 24px;
      font-weight: 500;
    }

    &__item {
      width: 120px;
      height: 120px;
      cursor: pointer;

      @media screen and (max-width: 1080px) {
        width: 100px;
        height: 100px;
      }
    }

    .overlay {
      background-color: rgba(36, 36, 36, 0.7);
      font-size: 17px;
      font-weight: 500;
      position: absolute;
      inset: 0px;
      line-height: 120px;
      text-align: center;
      color: rgb(255, 255, 255);
      border-radius: 4px;
    }
  }

  .filter-review {
    display: flex;
    margin-bottom: 20px;

    @media screen and (max-width: 768px) {
      flex-direction: column !important;
      row-gap: 8px;
    }

    &__label {
      flex-shrink: 0;
      font-size: 15px;
      line-height: 24px;
      margin: 0px 16px 0px 0px;
      padding-top: 4px;
      color: rgb(56, 56, 61);
      font-weight: 400;
    }

    &__inner {
      flex-grow: 1;
      display: flex;
      flex-wrap: wrap;
    }

    &__item {
      height: 32px;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      padding: 6px 15px;
      border-radius: 100px;
      color: rgb(56, 56, 61);
      margin: 0px 12px 12px 0px;
      cursor: pointer;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      user-select: none;
      border: 1px solid #cbd5e1;

      &.active {
        background: rgb(240, 248, 255);
        border: 1px solid rgb(26, 148, 255);

        .filter-review__check {
          display: block;
        }
      }
    }

    &__check {
      display: none;
      width: 18px;
      height: 18px;
      margin-right: 5px;
    }
  }
`;

export const CommentStyle = styled.section`
  .review-comment {
    padding: 32px 48px;
    display: flex;
    border-top: 1px solid rgb(242, 242, 242);

    &__user {
      flex-basis: 335px;
      flex-shrink: 0;

      @media screen and (max-width: 1280px) {
        flex-basis: 280px;
      }

      @media screen and (max-width: 1080px) {
        flex-basis: 200px;
      }

      &-inner {
        display: flex;
        align-items: center;
      }

      &-info {
        margin: 12px 0px 0px;
        color: rgb(128, 128, 137);
        display: flex;
        align-items: center;
        font-size: 13px;
        font-weight: 400;
        line-height: 20px;

        > img {
          width: 20px;
          height: 20px;
          margin: 0px 8px 0px 0px;
        }

        > span {
          color: rgb(56, 56, 61);
          margin-left: 4px;
        }
      }

      &-avatar {
        margin: 0px 12px 0px 0px;
        width: 48px;
        height: 48px;
        background-size: cover;
        border-radius: 50%;
        position: relative;
        z-index: 1;
      }

      &-name {
        font-size: 15px;
        line-height: 24px;
        font-weight: 600;
        text-transform: capitalize;
      }

      &-date {
        font-size: 13px;
        line-height: 20px;
        color: rgb(128, 128, 137);
      }
    }

    &__rating-title {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      margin: 0px 0px 4px;
    }

    &__rating {
      flex-shrink: 0;

      .om-rate {
        font-size: 16px;

        li {
          margin-inline-end: 4px;
        }
      }
    }

    &__title {
      margin: 0px 0px 0px 12px;
      font-size: 15px;
      line-height: 24px;
      font-weight: 500;
      color: rgb(36, 36, 36);
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }

    &__seller-name-attributes {
      display: flex;
      align-items: center;
      margin-top: 7px;
      margin-bottom: 15px;
    }

    &__seller-name {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      font-size: 13px;
      font-weight: 400;
      line-height: 20px;
      color: rgb(0, 171, 86);
    }

    &__check-icon {
      display: block;
      width: 14px;
      height: 14px;
      background-color: rgb(0, 171, 86);
      border-radius: 50%;
      position: relative;
      z-index: 1;
      margin: 0px 6px 0px 0px;

      &::before {
        content: "";
        width: 6px;
        height: 3px;
        border-left: 1px solid rgb(255, 255, 255);
        border-bottom: 1px solid rgb(255, 255, 255);
        position: absolute;
        display: block;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -70%) rotate(-45deg);
      }
    }

    &__content {
      font-size: 13px;
      font-weight: 400;
      line-height: 20px;
      margin: 0px 0px 8px;
      white-space: pre-wrap;
    }

    &__images {
      display: flex;
      flex-wrap: wrap;
      margin: 0px -6px;
    }

    &__image {
      width: 100px;
      height: 100px;
      border-radius: 4px;
      background-size: cover;
      background-position: center center;
      margin: 0px 6px 8px;
      cursor: pointer;

      @media screen and (max-width: 1280px) {
        width: 130px;
        height: 130px;
      }

      @media screen and (max-width: 1080px) {
        width: 100px;
        height: 100px;
      }
    }

    &__created-date {
      font-size: 13px;
      line-height: 20px;
      margin: 0px 0px 16px;
      color: rgb(128, 128, 137);
    }

    &__attributes {
      font-size: 13px;
      line-height: 20px;
      color: rgb(128, 128, 137);
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      margin-bottom: 2px;

      &--item {
        position: relative;

        &:first-child > span {
          padding-left: 0px;
        }

        > span {
          display: inline-block;
          padding: 0px 8px 0px 10px;

          &:before {
            content: "";
            height: 2px;
            width: 2px;
            background-color: rgb(128, 128, 137);
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 0px;
            margin: -1px 0px 0px;
          }
        }
      }
    }

    &__time-line {
      position: relative;
    }

    &__thank {
      font-size: 14px;
      color: rgb(11, 116, 229);
      font-weight: 500;
      border-radius: 4px;
      cursor: pointer;
      user-select: none;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    &__reply {
      display: flex;
      align-items: center;
      gap: 7px;
      padding: 8px 16px;
      font-size: 14px;
      border-radius: 4px;
      color: rgb(11, 116, 229);
      font-weight: 500;
      cursor: pointer;
      user-select: none;
    }

    &__count {
      margin: 16px 0px 0px;
      color: rgb(11, 116, 229);
      display: inline-block;
      cursor: pointer;
      font-weight: 500;
    }

    &__icon-more {
      width: 20px;
      height: 20px;
      margin: 0px 8px 0px 0px;
      display: inline-block;
      vertical-align: middle;
      position: relative;
      top: -2px;

      &.expanded {
        transform: scaleX(-1) rotate(270deg);
      }
    }
  }

  .wrapper-rating-attribute {
    margin-bottom: 8px;
  }

  .rating-attribute {
    display: flex;
    align-items: flex-start;
    margin-bottom: 4px;

    &:last-child {
      margin-bottom: 0px;
    }

    svg {
      margin-right: 7px;
      min-width: 16px;
      min-height: 17px;
    }
  }

  .rating-attribute__attributes {
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    color: rgb(128, 128, 137);
  }

  .user-avatar {
    border-radius: 50%;
    overflow: hidden;
    width: inherit;
    height: inherit;

    &.has-character {
      position: relative;
      padding-top: 100%;
      background-color: rgb(242, 242, 242);

      img {
        display: none;
      }

      span {
        position: absolute;
        inset: 0px;
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        font-size: 100%;
        font-weight: 500;
        color: rgb(153, 153, 153);
      }
    }
  }

  .review-sub-comment {
    margin: 8px 0px 0px;
    display: flex;

    @media screen and (max-width: 568px) {
      flex-direction: column !important;
    }

    &__avatar-thumb {
      width: 32px;
      height: 32px;
      background-size: cover;
      margin: 0px 8px 0px 0px;
      border-radius: 50%;
      min-width: 32px;
    }

    &__inner {
      display: flex;
      gap: 5px;
      padding: 10px 12px;
      border: 1px solid rgb(242, 242, 242);
      background-color: #f5f5fa;
      border-radius: 12px;
      -webkit-box-flex: 1;
      flex-grow: 1;
    }

    &__avatar {
      display: flex;
      -webkit-box-align: center;
      align-items: center;

      &-name {
        font-size: 14px;
        line-height: 20px;
        font-weight: 500;
        text-transform: capitalize;
      }

      &-date {
        color: rgb(128, 128, 137);
        position: relative;
        z-index: 1;
        font-size: 13px;
        line-height: 20px;
        font-weight: 400;
      }
    }

    &__check-icon {
      display: block;
      width: 9px;
      height: 9px;
      background-color: rgb(11, 116, 229);
      border-radius: 50%;
      position: relative;
      z-index: 1;
      margin: 0px 0px 0px 4px;

      &::before {
        content: "";
        width: 4px;
        height: 2px;
        border-left: 1px solid rgb(255, 255, 255);
        border-bottom: 1px solid rgb(255, 255, 255);
        position: absolute;
        display: block;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -70%) rotate(-45deg);
      }
    }

    &__content {
      font-size: 13px;
      line-height: 20px;
      margin: 4px 0px 0px;
      font-weight: 100;
    }
  }

  .customer-reviews__pagination {
    text-align: right;
    padding: 0 48px;
  }

  .om-pagination {
    &-item {
      border-radius: 50%;
      border: none;

      &-active {
        background-color: rgb(24, 158, 255);

        &:hover {
          > a {
            color: #fff;
          }
        }

        > a {
          color: #fff;
        }
      }
    }
  }

  .reply-comment {
    margin: 12px 0px;
    transition: height 0.3s ease 0s;
    display: none;

    &.expanded {
      display: block;
    }

    &__outer {
      display: flex;
      align-items: center;
    }

    &__avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-size: cover;
      background-position: center center;
      flex-shrink: 0;
      margin: 0px 8px 0px 0px;

      > img {
        display: block;
        border-radius: 50%;
        background-color: rgb(242, 242, 242);
      }
    }

    &__wrapper {
      position: relative;
      z-index: 1;
      -webkit-box-flex: 1;
      flex-grow: 1;

      > div {
        min-height: 40px;
      }
    }

    &__input {
      border: 1px solid rgb(238, 238, 238);
      padding: 10px 40px 10px 12px;
      border-radius: 12px;
      width: 100%;
      height: 40px;
      outline: 0px;
      font-size: 13px;
      line-height: 20px;
      resize: none;
      overflow: hidden;
    }

    &__submit {
      position: absolute;
      z-index: 1;
      width: 17px;
      right: 12px;
      bottom: 16.5px;
      cursor: pointer;
    }
  }
`;
