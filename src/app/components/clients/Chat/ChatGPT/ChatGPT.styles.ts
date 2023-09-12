import { Modal } from "antd";
import styled from "styled-components";

export const ChatIconWrapperStyle = styled.section`
  position: fixed;
  display: flex;
  bottom: 0px;
  right: 16px;
  flex-direction: column;
  align-items: flex-end;
  z-index: 99999;
  overflow: hidden;
  pointer-events: none;
  opacity: 1;

  .chat-icon {
    pointer-events: auto;

    > img {
      cursor: pointer;
      filter: drop-shadow(rgba(40, 40, 43, 0.16) 0px 2px 8px);
      border-radius: 50%;
    }
  }
`;

export const ChatGptStyle = styled(Modal).withConfig({
  shouldForwardProp: () => true,
})`
  right: 20px !important;
  bottom: 20px !important;
  margin: 0;
  margin-left: auto !important;

  .chat-infinity {
    height: 100%;
  }

  .om-modal-content {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 16px;
    background-color: rgb(255, 255, 255);
    border-radius: 8px;
    overflow: hidden;
    padding-bottom: 0px !important;
  }

  .om-modal-wrap {
    z-index: 999999 !important;
  }

  .om-modal-body {
    position: relative;
    height: 400px;
    overflow: hidden auto;
    display: flex;
    flex-direction: column;
    flex: 1 1 0%;
    will-change: transform;
    transform: translateZ(0px);
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
      width: 0;
    }
  }

  .chatgpt-item {
    &:first-child {
      margin-top: 12px;
    }

    &:hover .chat-icon svg,
    & .chat-icon:hover svg {
      width: 100%;
      transition: width 0.3s ease-in 0s;
    }
  }

  .chat-avatar {
    min-width: 40px;
    width: 40px;
    min-height: 40px;
    height: 40px;
    border-radius: 50%;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    text-align: center;
    -webkit-box-pack: center;
    justify-content: center;
    color: rgb(39, 39, 42);
    margin-right: 8px;
  }

  .chat-card {
    display: flex;
    align-items: flex-start;
    column-gap: 8px;
  }

  .chat-text {
    background: rgb(245, 245, 250);
    border-radius: 16px;
    padding: 8px 12px;
    margin-right: 4px;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    color: rgb(39, 39, 42);
    overflow: hidden;
    position: relative;
    word-break: break-word;

    p {
      padding: 0px;
      word-break: break-word;
      overflow-wrap: break-word;
      white-space: pre-wrap;
    }
  }

  .chat-icon {
    max-width: 30px;
    min-width: 20px;

    svg {
      width: 0;
      transition: width 0.3s ease-out 0s;
    }

    &:hover {
      stroke: #0b74e5;
    }
  }

  .scroll-down {
    margin-top: -64px;
    width: 32px;
    min-width: 32px;
    height: 32px;
    min-height: 32px;
    transition: all 0.3s ease 0s;
    cursor: pointer;
    position: sticky;
    z-index: 99;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
    opacity: 1;
    display: inline-block;
    background-color: transparent;
    border: none;
    outline: none;
  }

  .is-typing {
    position: sticky;
    bottom: 0px;
    left: 0;

    .dots {
      width: 26px;
      height: 7px;
      background:
        radial-gradient(circle closest-side, #737373 90%, #0000) 0% 50%,
        radial-gradient(circle closest-side, #737373 90%, #0000) 50% 50%,
        radial-gradient(circle closest-side, #737373 90%, #0000) 100% 50%;
      background-size: calc(100% / 3) 100%;
      background-repeat: no-repeat;
      animation: dots-zcf63l 1.2s infinite linear;
    }

    @keyframes dots-zcf63l {
      33% {
        background-size:
          calc(100% / 3) 0%,
          calc(100% / 3) 100%,
          calc(100% / 3) 100%;
      }

      50% {
        background-size:
          calc(100% / 3) 100%,
          calc(100% / 3) 0%,
          calc(100% / 3) 100%;
      }

      66% {
        background-size:
          calc(100% / 3) 100%,
          calc(100% / 3) 100%,
          calc(100% / 3) 0%;
      }
    }
  }
`;

export const ChatGptHeaderStyle = styled.section`
  width: 100%;
  border-bottom: 1px solid rgb(235, 235, 240);
  padding-bottom: 12px;
`;

export const ChatGptFooterStyle = styled.section<any>`
  background-color: rgb(255, 255, 255);
  border-top: 1px solid rgb(235, 235, 240);
  gap: 8px;
  padding: 12px 0;
  width: 100%;

  .input-message {
    display: flex;
    align-items: center;
    width: 100%;
    position: relative;

    input {
      padding: 8px 48px 8px 16px;
      width: 100%;
      font-size: 14px;
      line-height: 21px;
      color: rgb(39, 39, 42);
      border: 1px solid rgb(221, 221, 227);
      resize: none;
      border-radius: 20px;
      outline: 0px;
      appearance: none;
      height: 40px;
      min-height: 40px;
      caret-color: rgb(10, 104, 255);
    }

    .input-chat-end {
      cursor: pointer;
      user-select: none;
      position: absolute;
      background: rgba(0, 0, 0, 0.05);
      border-radius: 16px;
      width: 32px;
      height: 32px;
      right: 4px;
      top: 50%;
      transform: translateY(-50%);
      display: inline-flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      background-color: ${(props) => {
        return props.$background ? "rgb(10, 104, 255)" : "rgb(255, 255, 255)";
      }};
      cursor: ${(props) => {
        return props.$background ? "pointer" : "not-allowed";
      }};

      path {
        fill: ${(props) => {
          return props.$background && "rgb(255, 255, 255)";
        }};
      }
    }
  }
  .about-us {
    font-size: 12px;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: 0em;
    text-align: center;
    color: rgb(128, 128, 137);
    margin-top: 12px;
  }
`;

// export const ChatGptContentStyle = styled.section<any>``;
