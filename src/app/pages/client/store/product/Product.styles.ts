import styled from "styled-components";

export const ContainerAllProduct = styled.div`
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 1024px) {
    flex-direction: column !important;
  }
`;

export const MainProduct = styled.div`
  width: calc(100% - 200px);
  border-left: 1px solid rgb(245, 245, 250);
  overflow: hidden;
  .header-title {
    line-height: 28px;
    font-size: 20px;
    color: rgb(26, 15, 15);
    background: rgb(255, 255, 255);
    height: 48px;
    padding: 10px 41px 10px 16px;
    span {
      color: rgb(120, 120, 120);
    }
  }
  @media screen and (max-width: 1024px) {
    width: 100% !important;
    .header-title {
      display: none;
    }
    .om-row {
      padding: 0 8px !important;
    }
  }
  .view_more {
    width: 240px;
    margin-top: 12px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

// sort products
export const SortBy = styled.div`
  width: 100%;
  padding: 10px 0 10px 8px;
  margin: 0 0 8px 0;
  background: rgb(255, 255, 255);
  border-bottom: 1px solid rgb(245, 245, 250);
  @media screen and (max-width: 1024px) {
    padding: 10px 15px !important;
    .om-radio-group {
      display: flex;
      justify-content: space-between;
      align-content: center;
    }
    .om-radio-wrapper {
      margin: 0 !important
     }
  }
`;
