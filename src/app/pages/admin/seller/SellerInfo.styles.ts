import { Modal, Row } from "antd";
import styled from "styled-components";

export const SellerInfoHeader = styled.div`
  background-color: #fff;
  padding: 24px !important;
  .title {
    font-size: 20px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }
`;

export const SellerInfoBody = styled.div`
  margin: 24px;
  .om-card-body {
    padding: 12px !important;
  }
`;

export const RowCustom = styled(Row).withConfig({
  shouldForwardProp: () => true,
})`
  @media screen and (max-width: 1204px) {
    width: 100% !important;
    flex-direction: column !important;
    .om-col {
      width: 100% !important;
      max-width: 100% !important;
    }
  }
`;

export const TableComponent = styled.div`
  .om-table-cell {
    padding: 8px !important;
  }
  .text-editor {
    font-weight: 400;
    color: rgb(140, 140, 140);
  }
  .permission_item {
    border-radius: 50px;
    line-height: 0;
    padding: 13px;
    margin-right: 5px;
    margin-bottom: 5px;
  }
`;

export const ModalPermission = styled(Modal).withConfig({
  shouldForwardProp: () => true,
})`
  .om-modal-body {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 0.5rem;
    margin-top: 1rem;
    place-content: center;
  }

  .permission_item {
    border-radius: 50px;
    line-height: 0;
    padding: 13px;
  }
`;

export const FilterTypeSpace = styled.div`
  @media screen and (max-width: 1204px) {
    width: 100% !important;
    flex-direction: column !important;
    .om-space-item,
    .om-select,
    .om-btn {
      width: 100% !important;
    }
  }
`;

export const SortDataItemStyle = styled.div`
  .sort-item {
    display: flex;
    align-items: center;
    border-radius: 30px;
    font-size: 14px;
    color: rgb(38, 38, 38);
    line-height: 22px;
    border: 1px solid rgb(24, 144, 255);
    box-sizing: border-box;
    position: relative;
    padding: 4px 15px;
    margin: 0;
    background: rgb(230, 247, 255);

    > span {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      max-width: 250px;
      transition: all 0.3s ease-in-out;
    }

    .om-close-circle {
      color: rgb(105, 192, 255);
      font-size: 14px;
      display: flex;
      align-items: center;
      margin-left: 8px;
      cursor: pointer;
    }

    &:hover {
      > span {
        max-width: fit-content;
        transition: all 0.3s ease-in-out;
      }
    }
  }
`;

export const FilterDropdownStyle = styled.section`
  min-width: 200px;
  max-width: 280px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 12px;
  border-radius: 2px;
  background: rgb(255, 255, 255);

  .header {
    padding: 16px;
    border-bottom: 1px solid rgb(240, 240, 240);
  }

  .content {
    padding: 16px 20px;
    min-height: 160px;
    max-height: 200px;
    overflow-x: auto;
  }

  .om-checkbox-group-item {
    width: 100%;
    margin-bottom: 12px;
    font-size: 16px !important;
  }

  .footer {
    padding: 16px;
    border-top: 1px solid rgb(217, 217, 217);

    &-default {
      display: grid;
      grid-template-columns: repeat(2, minmax(0px, 1fr));
      column-gap: 12px;
    }
  }
`;
