import { Select } from "antd";
import styled from "styled-components";

export interface ISelectProps {
  width?: number | string;
}

export const SelectStyle = styled(Select).withConfig({
  shouldForwardProp: (prop) => !["width"].includes(prop),
})<ISelectProps>`
  width: ${({ width }) => width || "100%"};
`;
