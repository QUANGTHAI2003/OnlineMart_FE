import { Tabs } from "antd";
import { styled } from "styled-components";

export const Tab = styled(Tabs).withConfig({
  shouldForwardProp: () => true,
})``;

export const FlashSaleImg = styled.div`
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-transform: uppercase;
  display: inline-block;
  background: url(https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/flashsale/fb1088de81e42c4e538967ec12cb5caa.png)
    50% no-repeat;
  background-size: contain;
`;
