import { Tabs } from "antd";
import styled from "styled-components";
export const NotificationItem = styled.li`
  padding: 8px 15px 5px;
  font-size: 28px;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  position: relative;
  color: rgb(102, 102, 102);
  z-index: 1;
`;

export const NotificationNoContent = styled.div`
  margin: 20px 0;
  text-align: center;
  padding: 40px 20px;
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
  font-size: 14px;
`;

export const TabsNav = styled(Tabs)`
  .om-tabs-nav {
    padding: 0 20px;
  }
`;
