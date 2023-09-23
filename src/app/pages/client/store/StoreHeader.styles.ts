import { Tabs } from "antd";
import styled from "styled-components";

interface IStylePropsHeader {
  $background?: string;
}
export const StoreContainer = styled.div`
  padding: 0 15px;
  @media screen and (max-width: 1024px) {
    padding: 0 !important;
  }
`;

export const StoreHeader = styled.div<IStylePropsHeader>`
  max-height: 155px;
  height: 150px;
  margin-bottom: -55px;
  background-image: url(${(props) => props.$background});
  background-size: cover;
  z-index: 1;
  .overlay-header {
    inset: 0px;
    background-color: rgb(36, 36, 36);
    opacity: 0.5;
    pointer-events: none;
    z-index: -3;
  }
  .header-wrapper {
    padding-left: 24px;
    padding-top: 20px;
    -webkit-box-align: center;
    @media screen and (max-width: 1024px) {
      margin-right: 16px;
      padding: 20px 0 0 16px !important;
      justify-content: space-between;
    }
  }
  .seller-logo {
    width: 64px;
    img {
      max-width: 100%;
      border-radius: 100%;
    }
  }
`;

export const StoreInfo = styled.div`
  padding-left: 15px;
  -webkit-box-pack: center;
  .store-name {
    color: rgb(255, 255, 255);
    line-height: 24px;
    font-size: 17px;
    font-weight: initial;
    margin: 0px;
  }
  .store-badge {
    -webkit-box-align: center;
    margin-right: 24px;
    img {
      height: 16px;
      width: 64px;
      margin-right: 10px;
    }
  }
  .store-info {
    -webkit-box-align: center;
  }
  .line {
    width: 1px;
    height: 8px;
    margin-top: 4px;
    margin-right: 8px;
    margin-left: 8px;
    background-color: rgba(255, 255, 255, 0.7);
  }
  @media screen and (max-width: 1024px) {
    width: 100%;
    padding-left: 6px !important;
  }
`;

export const TextInfo = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 20px;
  .text-res {
    @media screen and (max-width: 1024px) {
      display: none !important;
    }
  }
`;

export const StoreAction = styled.div`
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  padding-left: 24px;
  margin-left: 24px;
  -webkit-box-align: center;
  .om-btn-dashed {
    border: 1px solid #fff;
    background: transparent;
    color: #fff;
  }
  @media screen and (max-width: 1024px) {
    margin: 0 !important;
    padding: 0 !important;
    border-left: none !important;
    .om-btn {
      text-align: center;
      justify-content: center;
      height: auto !important;
      padding: 6px !important;
      font-size: 12px !important;
      font-weight: 500 !important;
      & > div {
        display: none !important;
      }
    }
  }
`;

export const StoreTabs = styled(Tabs).withConfig({
  shouldForwardProp: () => true,
})`
  z-index: 2;
  width: 100%;
  .om-tabs-nav {
    margin-bottom: 25px;
    width: 100%;
    &:before {
      border-bottom: 1px solid transparent;
    }
    @media screen and (max-width: 1024px) {
      padding: 0 !important;
      .om-tabs-nav-wrap {
        margin: 0 !important;
      }
      .om-tabs-nav-operations {
        display: none !important;
      }
    }
  }
  .om-tabs-tab {
    padding: 16px 0 8px 0 !important;
    color: white;
    margin: 0 0 0 2rem !important;
    @media screen and (max-width: 1024px) {
      margin: 0 16px !important;
      padding: 12px 0px !important;
    }
    .om-tabs-tab-btn {
      transition: color 0.1s ease-in 0s;
    }
    &.om-tabs-tab-active .om-tabs-tab-btn {
      color: #0a68ff;
    }
  }
  .om-tabs-extra-content {
    flex: 1;
  }
  .om-tabs-ink-bar {
    background-color: #0a68ff;
    padding: 2px 0;
    border-radius: 8px;
  }
`;
