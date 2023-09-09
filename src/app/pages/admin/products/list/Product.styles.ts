import { Drawer, Row } from "antd";
import styled from "styled-components";

export const SearchStyle = styled.section``;

export const FilterDropdownStyle = styled.section`
  min-width: 280px;
  max-width: 380px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 12px;
  border-radius: 2px;
  background: rgb(255, 255, 255);

  .header {
    padding: 16px;
    border-bottom: 1px solid rgb(240, 240, 240);
  }

  .content {
    padding: 16px 20px;
    min-height: 200px;
    max-height: 300px;
    overflow: auto;
  }

  .footer {
    padding: 16px;
    border-top: 1px solid rgb(217, 217, 217);

    &-default {
      display: grid;
      grid-template-columns: repeat(2, minmax(0px, 1fr));
      column-gap: 12px;
    }
  }
`;

export const TableStyle = styled.section`
  margin-top: 24px;

  h3 {
    font-weight: bold;
    font-size: 18px;
  }

  .om-card-actions {
    height: 58px !important;
  }
`;

export const TableCellProductStyle = styled(Row).withConfig({
  shouldForwardProp: () => true,
})`
  .thumbnail {
    margin-right: 12px;
    width: 64px;
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
  }

  .name {
    width: 212px;
    display: block;
    color: inherit;
    line-height: 1.5em;
    max-height: 3em;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 180px;
    overflow-wrap: anywhere;
  }

  .om-typography {
    color: #8c8c8c;
    font-size: 12px;
    white-space: nowrap;
  }
`;

export const DrawerStyle = styled(Drawer).withConfig({
  shouldForwardProp: () => true,
})`
  .om-drawer-close {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    display: block;
    padding: 20px;
    color: rgba(0, 0, 0, 0.45);
    font-weight: 700;
    font-size: 16px;
    font-style: normal;
    line-height: 1;
    text-align: center;
    text-transform: none;
    text-decoration: none;
    background: transparent;
    border: 0;
    outline: 0;
    cursor: pointer;
    transition: color 0.3s;
    text-rendering: auto;
  }

  .om-drawer-body {
    padding: 16px 24px;
  }
`;

export const SortDataItemStyle = styled.div`
  .sort-item {
    display: flex;
    align-items: center;
    border-radius: 30px;
    font-size: 14px;
    color: rgb(38, 38, 38);
    line-height: 22px;
    border: 1px solid rgb(24, 144, 255);
    box-sizing: border-box;
    position: relative;
    padding: 4px 15px;
    margin: 0;
    background: rgb(230, 247, 255);

    > span {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      max-width: 250px;
    }

    .om-close-circle {
      color: rgb(105, 192, 255);
      font-size: 14px;
      display: flex;
      align-items: center;
      margin-left: 8px;
      cursor: pointer;
    }
  }
`;
