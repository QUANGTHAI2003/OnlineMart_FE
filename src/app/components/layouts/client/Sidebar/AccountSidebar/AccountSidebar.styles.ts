import Sider from "antd/es/layout/Sider";
import styled from "styled-components";

export const AccountSidebarStyle = styled(Sider)``;

export const AccountItemLinkStyle = styled.li`
  a {
    padding-left: 20px;
    width: 100%;
  }

  &:hover a {
    background-color: rgb(235, 235, 240);
  }

  @media screen and (min-width: 768px) {
    .active {
      background-color: rgb(235, 235, 240);
      color: rgb(0, 0, 0);
    }
  }

  svg {
    display: flex;
  }
`;
