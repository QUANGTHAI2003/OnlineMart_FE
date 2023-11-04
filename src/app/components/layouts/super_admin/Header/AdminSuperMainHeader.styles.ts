import { Drawer, Modal } from "antd";
import styled from "styled-components";

export const Header = styled.div`
  display: flex !important;
  justify-content: space-between;

  @media only screen and (max-width: 992px) {
    .header_right > .om-btn {
      .text-base {
        display: none;
      }
    }
  }
`;
export const HeaderRight = styled.div`
  width: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0 0.85rem;
  padding-right: 24px;
`;
export const AccountItem = styled.div`
  .button {
    display: flex;
    align-items: center;
  }
  .account_button {
    padding: 4px;
    border-radius: 50px;

    .button_item {
      display: flex;

      .avatar {
        width: 24px;
        height: 24px;
      }
      .name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 95px;
        margin: 0 2px 0 5px;
      }
      .icon {
        font-size: 11px;
        padding: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  @media only screen and (max-width: 992px) {
    .account_button {
      .button_item {
        .name {
          display: none;
        }
      }
    }
  }
`;
export const AccountUl = styled.ul`
  list-style-type: none;
  background-color: #fff;
  background-clip: padding-box;
  border-radius: 2px;
  outline: none;
  box-shadow:
    0 -3px 3px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 9px 28px -80px rgba(0, 0, 0, 0.05);
  position: relative;
  min-width: 176px;
  top: 13px;
  padding: 4px 0;
  overflow: hidden;

  .li {
    padding: 8px 16px;

    .icon {
      margin-right: 8px;
    }
  }
  .li:hover {
    background-color: #f5f5f5;
    cursor: pointer;
  }
  .divider {
    padding: 5px 16px;

    .divider_item {
      margin: 0;
    }
  }
  .info {
    .flex_info {
      display: flex;
      width: 100%;

      .avatar {
        display: flex;
        align-items: center;

        .avatar_cicle {
          width: 42px;
          height: 42px;

          img {
            width: 100%;
          }
        }
      }
      .content {
        margin-left: 5px;
        font-size: 14px;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.85);

        .name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 200px;
          font-weight: 700;
        }
        .email {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 225px;
          font-weight: 400;
        }
      }
    }
  }
`;
export const NotificationItem = styled.div`
  .badge_notify {
    .button_notify {
      border-radius: 50%;
      width: 32px;
      min-height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;

      .anticon {
        .icon {
          font-size: 15px;
        }
      }
    }
    .om-badge-count {
      background: #ffc400;
      color: #333;
    }
  }
`;
export const DrawerNotify = styled(Drawer).withConfig({
  shouldForwardProp: () => true,
})`
  .om-drawer-header {
    .om-drawer-header-title {
      flex-direction: row-reverse;

      .om-drawer-title {
        .notifyTitleContainer {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;

          .notifyTitle {
            font-weight: 600;
            font-size: 16px;
            line-height: 24px;
            color: #000;
          }
          .notifyAction {
            display: flex;
            align-items: center;
            gap: 0.7rem;

            .notifyViewDetail {
              display: flex;
              gap: 0.35rem;
              font-style: normal;
              font-weight: 400;
              font-size: 14px;
              line-height: 22px;
              color: #1890ff;

              .icon {
                font-size: 14px;
              }
            }
            .divider {
              .om-divider {
                height: 0.9rem;
                border-left: 1px solid rgba(0, 0, 0, 0.06);
              }
              .divider_item {
                margin: 0;
              }
            }
          }
        }
      }
    }
  }
  .om-drawer-body {
    padding: 12px;

    .notifyItem {
      display: flex;
      flex-direction: row;
      padding: 16px 12px;
      border-bottom: 1px solid #f0f0f0;
      cursor: pointer;
      gap: 16px;

      .thumbnail {
        width: 56px;
        height: 56px;
        border-radius: 8px;
        vertical-align: middle;
      }
      .notifyContent {
        white-space: pre-wrap;
        display: flex;
        flex-direction: column;
        gap: 2px;

        .title {
          color: #8c8c8c;
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          line-height: 22px;

          .title_item {
            max-width: 85%;
          }
          .aintSeenTitle {
            color: #000;
            display: flex;
            align-items: center;
            gap: 1rem;
          }
          .badge {
            width: 12px;
            height: 12px;
            display: flex;

            .om-badge-status-warning {
              width: 100%;
              height: 100%;
            }
          }
          .badge_disable {
            display: none;
          }
        }
        .subTitle {
          color: #8c8c8c;
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
        }
        .time {
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 20px;
        }
      }
    }
    .notifyItem:hover {
      .notifyContent {
        .title,
        .subTitle,
        .aintSeenTitle {
          color: #1890ff;
          transition: all 0.1s ease-in-out;
        }
      }
    }
  }
`;
export const ChatPlatformItem = styled.div`
  .chat_button {
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
  }
`;
export const ModalChatPlatform = styled(Modal).withConfig({
  shouldForwardProp: () => true,
})`
  .om-modal-content {
    width: 400px;
    height: 545px;
    bottom: 60px;
    left: 28rem;
  }

  .divider {
    margin: 0;
  }
`;
