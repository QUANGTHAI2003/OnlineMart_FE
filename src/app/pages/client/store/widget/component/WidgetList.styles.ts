import styled from "styled-components";

export const Widget = styled.div`
  border-radius: 4px;
  padding: 12px 16px;
  .title {
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
    color: rgb(36, 36, 36);
    display: flex;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    div {
      font-size: 20px;
      font-weight: 500;
      line-height: 28px;
      @media screen and (max-width: 1024px) {
        font-size: 16px;
        font-weight: 400;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    a.link-review {
      font-size: 15px;
      line-height: 24px;
      color: rgb(11, 116, 229);
      text-decoration: none;
      @media screen and (max-width: 1024px) {
        font-size: 14px;
        font-weight: 400;
      }
    }
  }
`;

export const WidgetContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  & > div {
    -webkit-box-flex: 1;
    flex-grow: 1;
  }
  .widget {
    display: flex;
    overflow: hidden;
    flex-direction: row;
    -webkit-box-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    align-items: center;
    @media screen and (max-width: 1024px) {
      -webkit-box-align: center;
      flex-wrap: wrap !important;
      gap: 9px;
      & > a:not(:last-child) {
        margin-right: 0 !important;
      }
    }
    & > a:not(:last-child) {
      margin-right: 16px;
    }
    .widget-item {
      width: 25%;
      cursor: pointer;
      @media screen and (max-width: 1024px) {
        flex: 1 1 48%;
        max-width: 49%;
        height: 56px;
      }
      &:hover {
        box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 20px;
        z-index: 1;
      }
    }
  }
  & > a.widget-item {
    width: 33.3333%;
    margin-left: 16px;
    display: flex;
    position: relative;
    border: 1px solid transparent;
    cursor: pointer;
    align-items: flex-start;
    padding-bottom: 16px;
    height: auto;
    z-index: 0;
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 20px;
      z-index: 1;
    }
    div.selling {
      width: 100%;
      display: flex;
      flex-wrap: nowrap;
      color: rgb(36, 36, 36);
      & > div:not(:last-child) {
        margin-right: 16px;
      }
    }
    .thumbnail-item {
      position: relative;
      min-width: 32%;
    }
    .name-item {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      word-break: break-word;
      height: 32px;
      & > h3 {
        font-size: 13px;
        font-weight: 400;
        line-height: 16px;
        color: rgb(56, 56, 61);
      }
    }
    .rating {
      flex-direction: row;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      height: 18px;
    }
    .text-rating {
      color: rgb(128, 128, 137);
      font-size: 12px;
      font-weight: 400;
      margin-right: 2px;
      margin-top: 2px;
    }
    .line {
      background-color: rgb(235, 235, 240);
      width: 1px;
      height: 10px;
      margin-left: 2px;
      margin-right: 6px;
    }
    .percent {
      font-size: 12px;
      color: rgb(128, 128, 137);
      line-height: 16px;
    }
    .has-discount {
      color: rgb(255, 66, 78) !important;
    }
    .discount {
      font-size: 16px;
      line-height: 22px;
      font-weight: 600;
      color: rgb(56, 56, 61);
    }
    .percent-discount {
      padding: 0px 2px;
      line-height: 16px;
      font-size: 12px;
      font-weight: 500;
      margin-left: 4px;
      color: rgb(255, 66, 78);
      margin-top: 3px;
    }
    .line-badge {
      background-color: rgb(235, 235, 240);
      height: 1px;
      width: 100%;
      margin-bottom: 8px;
    }
    .ship-text {
      color: rgb(128, 128, 137);
      font-size: 12px;
      line-height: 16px;
      font-weight: 400;
      text-align: left;
    }
  }
`;

export const WidgetItem = styled.div`
  display: flex;
  height: 100%;
  -webkit-box-align: center;
  align-items: center;
  border-radius: 4px;
  overflow: hidden;
  background-color: rgb(245, 245, 250);
  flex-wrap: nowrap;
  .thumbnail-item {
    position: relative;
    width: 40%;
    div {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0px;
      left: 0px;
      background: rgba(39, 39, 42, 0.01);
      z-index: 5;
    }
  }
  .name-item {
    font-size: 14px;
    font-weight: 500;
    color: rgb(36, 36, 36);
    margin-left: 12px;
    text-transform: capitalize;
    @media screen and (max-width: 1024px) {
      margin: 0 8px !important;
      font-weight: normal !important;
    }
  }
  @media screen and (max-width: 1024px) {
    .thumbnail-item {
      width: auto;
      height: 100%;
      img {
        width: 56px !important;
        mix-blend-mode: multiply;
        height: auto !important;
        object-fit: contain !important;
      }
    }
    div > div {
      display: none !important;
    }
  }
`;
