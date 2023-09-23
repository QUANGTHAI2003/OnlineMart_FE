import styled from "styled-components";

export const SidebarCategories = styled.div`
  background: rgb(255, 255, 255);
  width: 200px;
  height: max-content;
  border-radius: 4px 0px 0px 4px;
  .title {
    margin: 0px 0px 0px 20px;
    line-height: 20px;
    color: rgb(36, 36, 36);
    font-size: 16px;
    padding: 18px 0px 10px;
    font-weight: 600;
  }
  @media screen and (max-width: 1024px) {
    width: 100% !important;
    margin: 8px 0px;
    overflow: hidden;
    padding: 16px;
    .title {
      padding: 0px !important;
      margin: 0px !important;
    }
  }
`;

export const CategoriesFull = styled.div`
  .item-row {
    padding: 4px 25px 4px 20px;
    cursor: pointer;
    &:hover {
      background: rgb(245, 245, 250);
    }
    .item {
      font-size: 13px;
      color: rgb(36, 36, 36);
      padding: 5px 0px;
      line-height: 17px;
      display: block;
    }
  }
`;

export const CategoriesRes = styled.div`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 8px;
  .item {
    display: block;
    height: 56px;
    width: calc(50% - 4px);
    background-color: rgba(36, 36, 36, 0.05);
    border-radius: 4px;
    margin: 0px 0px 8px;
    text-decoration: none;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
  }
  .thumbnail-item {
    position: relative;
    img {
      width: 56px;
      height: auto;
      mix-blend-mode: multiply;
    }
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
`;

export const Categories = styled.div`
  .item-row {
    padding: 4px 25px 4px 20px;
    cursor: pointer;
    &:hover {
      background: rgb(245, 245, 250);
    }
    .item {
      font-size: 13px;
      color: rgb(36, 36, 36);
      padding: 5px 0px;
      line-height: 17px;
      display: block;
    }
  }
  @media screen and (max-width: 1024px) {
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 8px;
  }
  .item-inner {
    display: block;
    height: 56px;
    width: calc(50% - 4px);
    background-color: rgba(36, 36, 36, 0.05);
    border-radius: 4px;
    margin: 0px 0px 8px;
    text-decoration: none;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    padding: 0;
    .thumbnail-item {
      position: relative;
      img {
        width: 56px;
        height: auto;
        mix-blend-mode: multiply;
      }
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
  }
`;
