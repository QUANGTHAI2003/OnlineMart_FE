import { Col, Row } from "antd";
import styled from "styled-components";

export const RowStyled = styled(Row).withConfig({
  shouldForwardProp: () => true,
})`
  @media screen and (max-width: 1024px) {
    padding: 0 !important;
    align-items: normal !important;
    background-color: transparent !important;
    flex-direction: column !important;
    & .om-row > .review {
      flex-direction: column-reverse !important;
    }
    & > .om-col {
      max-width: 100% !important;
    }
  }
`;
export const Percent = styled.div`
  color: rgb(0, 153, 0);
  font-size: 32px;
  text-align: center;
  line-height: 40px;
  margin-top: 16px;
  @media screen and (max-width: 1024px) {
    margin-top: 0px !important;
  }
`;

export const Info = styled(Col)`
  padding-left: 35px;
  border-left: 1px solid rgb(242, 242, 242);
  background-color: #fff;
  .store-info {
    font-size: 13px;
    color: rgb(120, 120, 120);
    line-height: 20px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
  }
  .store-des {
    font-size: 13px;
    color: rgb(36, 36, 36);
    line-height: 20px;
  }
  @media screen and (max-width: 1024px) {
    padding: 0 !important;
    border: none !important;
    background-color: transparent !important;
    margin-top: 10px !important;
    .bg-res {
      background-color: #fff !important;
    }
  }
`;
