import { Breadcrumb as AntBreadcrumb } from "antd";
import styled from "styled-components";
export const { Item } = AntBreadcrumb;

export const BreadcrumbItem = styled(Item)``;
export const Breadcrumb = styled(AntBreadcrumb).withConfig({
  shouldForwardProp: () => true,
})``;
