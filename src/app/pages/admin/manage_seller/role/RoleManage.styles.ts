import { Modal } from "antd";
import styled from "styled-components";

export const RoleManage = styled.div`
  .site_header {
    padding: 1.5rem;
    background: #fff;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
`;
export const ViewPermissions = styled(Modal)`
  display: flex;
  flex-wrap: wrap;

  .om-modal-body {
    padding-top: 1rem;
  }
  .permission_item {
    border-radius: 50px;
    line-height: 0;
    padding: 13px;
    margin-right: 5px;
    margin-bottom: 5px;
  }
`;
