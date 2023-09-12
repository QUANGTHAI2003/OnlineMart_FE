import { Checkbox, Form } from "antd";
import { styled } from "styled-components";

export const Layout = styled.div`
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 1.25rem;
  margin-top: 0.75rem;
  @media screen and (max-width: 427.98px) {
    display: flex;
    flex-direction: column;
    padding: 0.75rem;
  }
`;
export const FormItem = styled(Form.Item).withConfig({
  shouldForwardProp: () => true,
})`
  .om-row {
    margin-top: -5px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    @media screen and (max-width: 574.98px) {
      gap: 0.25rem;
    }
  }
  .om-form-item-explain-error,
  .om-form-item {
    margin-bottom: 5px;
  }
  .om-form-item-label .location-type {
    min-width: 150px;
    display: flex;
    justify-content: flex-start;
    @media screen and (max-width: 574.98px) {
      padding-bottom: 0;
    }
  }
  .om-form-item-label {
    min-width: 150px;
    display: flex;
    justify-content: flex-start;
    @media screen and (max-width: 574.98px) {
      margin-bottom: -8px;
    }
  }
  .om-form-item-control {
    margin-top: 0;
  }
  .om-col .om-form-item-control-input {
    width: 100%;
  }
`;

export const AddressStyle = styled.div`
  .select-address {
    padding: 0px !important;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
  }
  .row-select {
    width: 100%;
    transition: all 0.2s;
    margin-top: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 574.98px) {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.25rem;
    }
  }
  .om-select {
    max-width: 490px;
    margin-bottom: 0px !important;
  }
  .location-type {
    width: 200px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
  }
  .location-type::before {
    display: inline-block;
    margin-inline-end: 4px;
    color: #ff4d4f;
    font-size: 14px;
    font-family: SimSun, sans-serif;
    line-height: 1;
    content: "*";
  }
`;
// className="text-sm md:pl-[150px] sm:pl-0 antialiased"
export const FormCheckBox = styled(Checkbox).withConfig({
  shouldForwardProp: () => true,
})`
  font-size: 0.8rem;
  padding-left: 150px;
  @media screen and (max-width: 573.98px) {
    padding-left: 0px;
  }
`;
