import { Layout } from "antd";
import styled from "styled-components";

export const AccountLayoutStyle = styled(Layout)`
  @media screen and (max-width: 768px) {
    max-width: 100%;

    > aside {
      max-width: 100% !important;
      flex: 1 !important;
    }
  }
`;
