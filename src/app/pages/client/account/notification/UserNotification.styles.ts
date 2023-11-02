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
  @media screen and (max-width: 1024px) {
    padding-right: 10px !important;
    padding-left: 10px !important;
  }
`;

export const NotificationNoContent = styled.div`
  margin: 20px 0;
  text-align: center;
  padding: 40px 20px;
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
  font-size: 14px;
`;

export const ContentNoti = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.65rem;

  & > div:first-child {
    width: 60%;
  }
  .content_item {
    font-size: 14px;
    font-weight: 400;
    color: #666;
    line-height: 25px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    word-break: break-word;
    white-space: break-spaces;
  }

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: end;
    row-gap: 10px;
    & > div:first-child {
      width: 100%;
    }
    .date {
      margin-left: 15px;
    }
  }
`;

export const TabsNav = styled(Tabs).withConfig({
  shouldForwardProp: () => true,
})`
  .om-tabs-nav,
  .om-tabs-content-holder {
    padding: 0 25px;
  }
  @media screen and (max-width: 1024px) {
    margin-left: 0 !important;
    .om-tabs-nav,
    .om-tabs-content-holder {
      padding: 0 10px;
    }
    .om-tabs-tab {
      margin-left: 10px !important;
      &:first-child {
        margin-left: 0 !important;
      }
    }
    .content-noti {
      padding: 0 !important;
      margin-bottom: 10px !important;
    }
    .text-noti {
      margin: 10px 0 !important;
      font-size: 10px !important;
    }
    .order-btn {
      font-size: 12px !important;
      padding: 5px 7px !important;
    }
  }
`;
