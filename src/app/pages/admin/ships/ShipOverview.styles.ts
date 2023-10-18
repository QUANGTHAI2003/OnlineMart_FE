import styled from "styled-components";

export const ShipOverviewHeader = styled.div`
  background-color: white;
  padding: 24px !important;
  .title {
    font-size: 20px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }
`;

export const ShipOverviewContent = styled.div`
  margin: 24px;
  border-radius: 6px;
  .title-bar {
    font-size: 16px;
    font-weight: 600;
    color: #000;
    margin-bottom: 10px;
  }
  .header {
    padding: 10px 24px;
    line-height: 30px;
    border-radius: inherit;
    border-bottom: 1px solid #ebebeb;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    .title {
      font-size: 14px;
      font-weight: 500;
      color: #686868;
    }
    .description {
      font-size: 14px;
      color: #686868;
      font-weight: 400;
    }
  }
  .body {
    padding: 20px;
  }
`;

export const ShipOverviewItem = styled.div`
  width: 33.333%;
  background-color: white;
  gap: 24px;
  padding: 0 24px 0 0;
  .item {
    border: 1px solid #ebebeb;
    border-radius: 6px;
    padding: 20px 15px;
    height: 125px;
    margin-bottom: 24px;
    display: flex;
    row-gap: 10px;
    flex-direction: column;
    align-items: center;
    svg {
      fill: #686868;
      width: 32px;
      height: 32px;
    }
    .status {
      font-size: 14px;
      font-weight: 400;
      color: #686868;
    }
    a {
      font-size: 16px;
      font-weight: 600;
    }
  }
`;
