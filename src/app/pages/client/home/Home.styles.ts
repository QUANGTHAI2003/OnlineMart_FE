import { Tabs } from "antd";
import styled from "styled-components";

interface IFixedHeader {
  isfixed: string;
}

export const BannerStyle = styled.section`
  display: flex;
  width: 100%;
  -webkit-box-pack: justify;
  justify-content: space-between;
  border-radius: 4px;
  overflow: hidden;
  column-gap: 16px;

  .banner-left {
    display: flex;
    height: auto;
    background: rgb(255, 255, 255);
    border-radius: 12px;
    overflow: hidden;
    flex-basis: 75%;
  }

  .banner-right {
    display: flex;
    flex-wrap: wrap;
    height: 240px;
    background: rgb(148, 191, 255);
    border-radius: 8px;
    overflow: hidden;
    flex-basis: 25%;
  }

  @media screen and (min-width: 1400px) {
    .banner-left,
    .banner-right {
      height: 280px;
    }
  }

  @media only screen and (max-width: 992px) {
    .banner-left {
      flex-basis: 100%;
      border-radius: 6;
    }

    .banner-right {
      display: none;
    }
  }

  .swiper-pagination-bullet {
    display: inline-block;
    width: 24px;
    height: 2px;
    border-radius: unset;
    padding: 0px;
    background-color: rgba(255, 255, 255, 0.5);
    outline: none;
    border: none;
    opacity: 1;

    &-active {
      background-color: rgb(255, 255, 255);
    }
  }

  @media screen and (max-width: 768px) {
    border-radius: unset;

    .banner-left {
      border-radius: unset;
    }
  }
`;

export const SelectAddressStyle = styled.section`
  width: 100%;
  margin-right: 0px;
  padding: 12px 16px;
  background-color: rgb(255, 255, 255);
  border-radius: 8px;
  overflow: hidden;
`;

export const SalesStyle = styled.section`
  width: 100%;
  margin-right: 0px;
  padding: 12px 16px;
  background-color: rgb(255, 255, 255);
  border-radius: 8px;
  overflow: hidden;
  min-height: 242px;

  > .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .header-left {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      cursor: pointer;

      .title {
        margin-right: 12px;
        font-weight: 700;
        font-size: 16px;
        line-height: 150%;
        color: rgb(39, 39, 42);
      }
    }

    a {
      color: rgb(11, 116, 229);
      text-decoration: none;
    }

    .count_down {
      color: rgb(120, 120, 120);
      font-size: 15px;
      display: flex;
      align-items: center;

      span {
        font-size: 15px;
        font-weight: 500;
        line-height: 1.6;
        margin: 0px 4px;
        padding: 0px 3px;
        background-color: rgb(255, 66, 78);
        border-radius: 4px;
        color: white;
      }

      b {
        font-weight: 700;
        font-size: 20px;
        line-height: 16px;
      }
    }
  }

  .navigation a {
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
    color: rgb(10, 104, 255);

    .icon-more {
      width: 24px;
      margin-top: -1px;
      margin-left: 8px;
    }
  }
`;

export const ProductStyle = styled.section<IFixedHeader>`
  background: rgb(245, 245, 250);
  border-radius: 8px;

  .header {
    width: 100%;
    top: 0px;
    z-index: 997;
    transition: all 1s ease 0s;
    padding-top: ${(props) => {
      return props.isfixed == "true" ? "32px" : "0";
    }};
    opacity: 1;
    display: flex;
    background: rgb(245, 245, 250);
    flex-direction: column;

    h2 {
      color: rgb(39, 39, 42);
      display: flex;
      padding: 12px 16px;
      background-color: white;
      flex: 1 1 0%;
      font-weight: 600;
      font-size: 16px;
      line-height: 150%;
      text-transform: unset;
      border-radius: 8px 8px 0px 0px;
      position: ${(props) => {
        return props.isfixed == "true" ? "fixed !important" : "initial !important";
      }};
      top: ${(props) => {
        return props.isfixed == "true" ? "0" : "initial";
      }};
      margin-top: ${(props) => {
        return props.isfixed == "true" ? "16px" : "0";
      }};
      width: 100%;
      top: 0;
      z-index: 9999;
      opacity: 1;
      transition: all 1s ease 0s;
    }
  }

  .view_more {
    width: 240px;
    margin-top: 12px;
    left: 50%;
    transform: translateX(-50%);
  }

  .om-row {
    padding-top: ${(props) => {
      return props.isfixed == "true" ? "130px" : "0";
    }};
  }
`;

export const TabsStyle = styled(Tabs)`
  .om-tabs-nav-list {
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;

    .om-tabs-tab {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: white;
      cursor: pointer;
      min-height: 78px;
      padding: 8px 4px;
      margin: 0;
      border-bottom: 1px solid rgb(235, 235, 240);
      transition: all 0.3s ease 0s;

      &.om-tabs-tab-active {
        background: rgba(0, 96, 255, 0.05);
        padding: 8px 4px;
        border-bottom-color: rgb(10, 104, 255);

        .tab-text {
          color: rgb(10, 104, 255);
        }
      }

      &:hover {
        background: rgba(128, 128, 137, 0.12);
      }

      &-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-shrink: 0;
      }
    }

    img {
      width: 40px;
      height: 40px;
    }

    .tab-text {
      color: rgb(128, 128, 137);
      font-weight: 400;
      font-size: 12px;
      line-height: 150%;
      padding-top: 4px;
      text-align: center;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      display: -webkit-box;
      word-break: break-word;
    }
  }

  .om-tabs-nav-operations {
    display: none !important;
  }
`;

export const HomeStyle = styled.section<IFixedHeader>`
  .om-tabs-nav-wrap {
    position: ${(props) => {
      return props.isfixed == "true" ? "fixed !important" : "initial !important";
    }};

    padding-top: ${(props) => {
      return props.isfixed == "true" ? "64px" : "0";
    }};
    width: -webkit-fill-available;
    top: 0;
    z-index: 999;
    opacity: 1;
    transition: all 1s ease 0s;
    background: rgb(245, 245, 250);
  }
`;
