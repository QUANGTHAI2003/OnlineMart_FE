import Sider from "antd/es/layout/Sider";
import styled from "styled-components";

export const AccountSidebarStyle = styled(Sider)`
  @media screen and (max-width: 768px) {
    background-color: #fff !important;
    width: 100% !important;
    max-width: 100% !important;
  }
`;

export const AccountItemLinkStyle = styled.li`
  a {
    padding: 0 20px;
    width: 100%;
  }

  &:is(:hover, :active) a {
    background-color: rgb(235, 235, 240);
  }

  @media screen and (min-width: 768px) {
    .active {
      background-color: rgb(235, 235, 240);
      color: rgb(0, 0, 0);
    }
  }

  .link__arrow {
    color: rgb(168, 168, 168);
  }

  svg {
    display: flex;
  }
`;

export const ButtonStyle = styled.div`
  padding: 8px 16px;
  margin-top: 10px;

  > button {
    color: rgb(27, 168, 255);
    background: rgb(255, 255, 255);
    border: 1px solid rgb(27, 168, 255);
    height: 44px;
    width: 100%;
    box-shadow: none;
    font-size: 15px;
    font-weight: 500;
    border-radius: 2px;
  }
`;
