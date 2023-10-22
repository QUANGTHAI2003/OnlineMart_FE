import { Divider } from "antd";
import styled from "styled-components";

export const SpaceLine = styled(Divider).withConfig({
  shouldForwardProp: () => true,
})`
  margin: 12px 0 !important;
`;

export const Progress = styled.div`
  .activeLabel {
    color: rgb(48, 191, 120);
    font-weight: bold;
  }
  .indicator {
    width: 100%;
    height: 8px;
  }
`;
export const DescProgress = styled.div`
  --total-g-by-level: calc(4px * 5);
  --w: calc((100% - 20px) / 6);
  --offset: calc(((var(--w) * 6) + var(--total-g-by-level)) - (var(--w) / 2));
  background-color: rgb(205, 243, 228);
  border-radius: 8px;
  padding: 6px 16px;
  font-size: 12px;
  margin-top: 13px;
  line-height: 20px;
  position: relative;
`;

export const ArrowProgress = styled.div`
  width: 0px;
  height: 0px;
  position: absolute;
  top: -6px;
  left: calc(var(--offset) - 6px);
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid rgb(205, 243, 228);
`;
