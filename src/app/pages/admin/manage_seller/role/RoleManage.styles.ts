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
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 0.5rem;
    margin-top: 1rem;
  }
  .permission_item {
    border-radius: 50px;
    line-height: 0;
    padding: 13px;
  }
`;
