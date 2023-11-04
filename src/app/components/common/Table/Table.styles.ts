import { Table } from "antd";
import styled from "styled-components";

export const AdminTable = styled(Table).withConfig({
  shouldForwardProp: () => true,
})``;
export const SuperAdminTable = styled(Table).withConfig({
  shouldForwardProp: () => true,
})``;
