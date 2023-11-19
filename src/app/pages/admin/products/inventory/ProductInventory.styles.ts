import { Drawer } from "antd";
import styled from "styled-components";

export const SiteHeader = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #fff;
`;

export const ToolBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #fff;
  padding: 1rem 1.5rem;
  border-bottom-left-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
  font-weight: 500;
  font-size: 14px;

  .other_manage {
    font-size: 14px;

    &:hover {
      cursor: pointer;
      color: rgb(0, 136, 255);
    }

    .divider {
      background-color: #d3d5d7;
      width: 1px;
      height: 18px;
      top: 0;
    }
  }

  .box_item {
    padding: 0.25rem 0.75rem;
    .link {
      color: #333;
    }
    .print_icon {
      color: rgb(163, 168, 175);
      font-size: 16px;
    }

    &:hover .link {
      cursor: pointer;
      color: rgb(0, 136, 255);
    }
  }
`;

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
    .checkbox_group {
      width: 100%;
    }
    .radio_group {
      width: 100%;
    }
    .range_picker {
      width: 100%;
    }
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
