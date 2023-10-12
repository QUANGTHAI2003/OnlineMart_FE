import styled from "styled-components";

export const SiteHeader = styled.div`
  padding: 1.5rem 1.5rem 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #fff;
`;

export const TableComponent = styled.div`
  margin: 1rem;
  padding: 24px;
  background-color: #fff;
  border-radius: 6px;
`;

export const SettingUpQRPrint = styled.div`
  margin: 1rem;

  .setting_row {
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    gap: 1.1rem;

    .setting_left,
    .setting_right {
      flex: 1;
      width: 100%;
    }
    .setting_left {
      padding: 24px;
      background-color: #fff;
      border-radius: 6px;

      .qrcode_item {
        .qrcode {
          border: 1.25px dashed black;
          padding: 1.5rem;
          border-radius: 6px;
          display: flex;
          gap: 1rem;
        }
      }
      .note {
        padding-top: 20px;
      }
    }
    .setting_right {
      padding: 24px;
      background-color: #fff;
      border-radius: 6px;

      .tem_item {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;

        .muibox {
          border: 1px dashed #d3d5d7;
          border-radius: 6px;
          padding: 10px;
        }
      }
    }
  }
  .footer_qr {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding: 1.5rem;
    margin-top: 1rem;
    background-color: #fff;
    border-radius: 6px;
  }
`;

export const FilterComponent = styled.div`
  margin: 16px;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 6px;

  .select_filter {
    width: 100%;
  }

  &:not(.om-select-focused) .select-item {
    display: none;
  }
`;

export const SelectItem = styled.div`
  display: flex;
  justify-content: space-between;

  &:hover:not(.disabled) {
    .left_item {
      .name {
        color: rgb(0, 136, 255);
      }
    }
    .right_item {
      .retail_price {
        color: rgb(0, 136, 255);
      }
    }
  }
  .left_item {
    display: flex;
    align-items: center;

    img {
      width: 50px;
      border-radius: 4px;
      margin: 15px;
    }
    .name {
      font-size: 1rem;
    }
    .product_code {
      font-size: 0.75rem;
      color: #bdc3c7;
      font-weight: 500;
    }
  }
  .right_item {
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: center;
    padding-right: 1rem;

    .bottom_content {
      display: flex;
      align-items: center;

      .divider {
        width: 1.5px;
        background-color: #bdc3c7;
      }
      .bottom_content_item {
        display: flex;
        gap: 0.25rem;

        .bottom_content_item_label {
          color: #bdc3c7;
        }
        .bottom_content_item_value {
          color: rgb(0, 136, 255);
        }
      }
    }
  }
`;
