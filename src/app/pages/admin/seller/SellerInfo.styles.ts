import { Modal, Row, Space } from "antd";
import styled from "styled-components";

export const SellerInfoHeader = styled.div`
  background-color: #fff;
  padding: 16px !important;
  .title {
    font-size: 20px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }
`;

export const SellerInfoBody = styled.div`
  margin: 12px;
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
  text-align: center;
  margin: 20px 0 !important;
}
`;

export const FilterTypeSpace = styled(Space).withConfig({
  shouldForwardProp: () => true,
})`
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
