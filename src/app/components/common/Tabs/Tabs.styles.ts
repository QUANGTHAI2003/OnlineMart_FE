import { Tabs } from "antd";
import styled from "styled-components";

export const AdminTabs = styled(Tabs).withConfig({
  shouldForwardProp: () => true,
})`
  margin: 0px;
  padding: 0px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  line-height: 1.5715;
  list-style: none;
  display: flex;

  .om-tabs-tab {
    background: rgb(245, 245, 245) !important;
    border: 1px solid rgb(217, 217, 217) !important;
    padding: 10px 24px !important;

    &:not(:first-child) {
      margin-left: 4px !important;
    }

    &.om-tabs-tab-active {
      border-top: 2px solid rgb(24, 144, 255) !important;
      border-bottom: none !important;
      background-color: #fff !important;
    }
  }
`;
