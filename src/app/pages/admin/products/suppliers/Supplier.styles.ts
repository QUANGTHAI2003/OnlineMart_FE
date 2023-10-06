import { Col, Form, Row } from "antd";
import styled from "styled-components";

export const Field = styled(Row).withConfig({
  shouldForwardProp: () => true,
})`
  .om-col {
    min-height: inherit !important;
  }
`;

export const AddressField = styled(Col).withConfig({
  shouldForwardProp: () => true,
})`
  .select-address {
    padding: 0 !important;
  }
  .location-type {
    margin-bottom: 5px !important;
  }
  .om-select {
    width: 100%;
  }
  .row-select {
    padding-top: 5px;
    margin-bottom: 0.75rem;
  }
`;

export const FormField = styled(Form.Item).withConfig({
  shouldForwardProp: () => true,
})`
  .om-form-item {
    width: 100% !important;
    margin-bottom: 40px !important;
  }
  .om-form-item-row {
    width: 100%;
    display: flex;
    align-items: flex-start !important;
    justify-content: center;
    flex-direction: column;
  }
  .om-form-item-label,
  .om-form-item-control {
    width: 100%;
  }
  .om-form-item-label {
    text-align: start !important;
  }
`;
