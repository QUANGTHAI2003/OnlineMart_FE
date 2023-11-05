import { Form, Modal } from "antd";
import styled from "styled-components";

export const FormEVouncher = styled.section`
  .om-form-item-label {
    font-weight: bold;
  }
`;
export const ModalForm = styled(Modal).withConfig({
  shouldForwardProp: () => true,
})`
  .om-modal-content {
    padding: 25px 40px !important;
  }
`;
export const FormField = styled(Form.Item).withConfig({
  shouldForwardProp: () => true,
})`
  .om-form-item {
    margin-bottom: 12px !important;
  }
  .om-form-item-row {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 5px !important;
  }
  .om-form-item-control {
    width: 100%;
    flex: 0;
  }
`;
export const FormFieldRadio = styled(Form.Item).withConfig({
  shouldForwardProp: () => true,
})`
  .om-form-item {
    margin-bottom: 12px !important;
  }
  .om-form-item-row {
    display: flex;
    align-items: flex-start;
    gap: 1rem !important;
  }
`;
