import { Button, Modal } from "antd";
import styled from "styled-components";

export const ButtonStyle = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: transparent;
  border: none;
  outline: none;
  box-shadow: none;

  img {
    width: 20px;
    height: 20px;
    margin-right: 4px;
  }

  > h4 {
    margin: 0px;
    display: block;
    color: rgb(128, 128, 137);
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    padding-right: 4px;
  }

  .address {
    text-decoration: underline;
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgb(39, 39, 42);
  }
`;

export const ModalSelect = styled(Modal)`
  .om-modal-content {
    background-color: rgb(248, 248, 248);
  }

  .om-modal-header,
  .om-modal-body {
    background-color: #fff;
  }

  .om-modal-header {
    margin-bottom: 2px;

    .om-modal-title {
      font-size: 20px;
      text-align: center;
      padding: 12px 0;
    }
  }

  .om-modal-body {
    padding: 24px 30px;
    background-color: rgb(255, 255, 255);
    border-radius: 0px 0px 4px 4px;

    @media only screen and (max-width: 568px) {
      padding: 24px 15px;
    }

    .description {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.54);
      line-height: 1.43;
    }
  }
  .om-modal-close {
    cursor: pointer;
    position: absolute;
    width: 24px;
    height: 24px;
    top: -10px;
    right: -11px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: rgb(150, 150, 150) -1px 1px 1px;

    &:hover {
      background-color: #fff;
      box-shadow: rgb(150, 150, 150) -1px 1px 1px;
    }
  }

  .om-radio-wrapper {
    padding: 10px 0;
  }

  .row-select {
    display: flex;
    align-items: baseline;
    justify-content: space-between;

    .om-select {
      width: 220px;
    }

    @media only screen and (max-width: 568px) {
      flex-direction: column;
      align-items: flex-start;

      .om-select {
        width: 100%;
      }
    }
  }

  .om-modal-footer {
    text-align: center;

    .om-btn {
      cursor: pointer;
      width: 296px;
      height: 40px;
      color: #fff;
      font-weight: 300;
      text-transform: uppercase;
      border: none;
      outline: none;
      border-radius: 4px;
      background-color: rgb(255, 66, 78);

      &:hover {
        color: #fff;
        opacity: 0.8;
      }

      @media only screen and (max-width: 568px) {
        width: 100%;
      }
    }
  }
`;
