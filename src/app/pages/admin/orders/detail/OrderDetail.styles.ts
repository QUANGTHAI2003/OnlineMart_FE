import { Link } from "react-router-dom";
import styled from "styled-components";

export const OrderDetailHeader = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: white;
  padding: 24px;
`;

export const BackLinK = styled(Link).withConfig({
  shouldForwardProp: () => true,
})`
  color: #747c87;
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 24px;
  font-weight: 500;
`;

export const OrderDetailBox = styled.div`
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
  background-color: white;
  .name_user {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid #e8e8e8;
  }
  h6.phone_user {
    color: #000;
  }
  .title_pay {
    font-size: 16px;
    font-weight: 600;
    padding-bottom: 16px;
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    align-items: center;
  }
  .pay_price {
    display: flex;
    margin-top: 16px;
    justify-content: space-between;
    align-items: center;
    background-color: #f2f9ff;
    padding: 12px;
    p {
      font-size: 14px;
      font-weight: 400;
    }
  }
  .icon-circle {
    color: #0088ff;
    margin-right: 10px;
  }
`;

export const OrderEditorSeller = styled.div`
  margin-top: 4px;
  display: flex;
  align-items: center;
  padding: 8px 0;
  p {
    width: 25%;
    padding-right: 10px;
    position: relative;
    &::after {
      position: absolute;
      right: 0;
      top: 0;
      content: ":";
    }
  }
`;

export const OrderDetailInfo = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: 16px;
  p {
    font-size: 14px;
  }
  & > p:first-child {
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const OrderDetailTotalPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 6px 0;
  padding-bottom: 6px;
  border-bottom: 1px solid #f0f0f0;
`;

export const OrderDetailExport = styled.div`
  table,
  th,
  td {
    border: 1px solid black;
    text-align: center;
    font-size: 14px;
  }
  table {
    width: 100%;
  }
  @media print {
    display: block !important;
  }
  @page {
    size: portrait;
  }
  display: none;
  .header {
    padding: 20px 0;
    border-bottom: 1px solid #000;
  }
`;

export const TotalPrice = styled.div`
  border-bottom: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  padding: 10px 0;
`;
