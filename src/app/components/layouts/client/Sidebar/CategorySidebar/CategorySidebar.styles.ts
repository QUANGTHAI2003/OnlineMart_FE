import Sider from "antd/es/layout/Sider";
import styled from "styled-components";

export const avatarCategoryLoading = styled.div`
  background-color: #e2e5e7;
  width: 32px;
  height: 32px;
  background-image: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0));
  background-size: 40px 100%;
  background-repeat: no-repeat;
  background-position: left -40px top 0;
  animation: shine 1.5s ease infinite;
  @keyframes shine {
    to {
      background-position: right -40px top 0;
    }
  }
`;

export const titleCategoryLoading = styled.p`
  border-radius: 8px;
  height: 21px;
  width: 100%;
  background-color: #e2e5e7;
  background-image: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0));
  background-size: 40px 100%;
  background-repeat: no-repeat;
  background-position: left -40px top 0;
  animation: shine 1.5s ease infinite;
  @keyframes shine {
    to {
      background-position: right -40px top 0;
    }
  }
`;

export const SidebarStyle = styled(Sider)`
  position: sticky !important;
  top: 16px;
  max-height: 100vh;

  .sidebar {
    overflow-y: auto;
    max-height: calc(100vh - 100px);

    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;
