import { Spin } from "antd";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const CustomLoading: React.FC = () => {
  return (
    <StyledContainer>
      <Spin size="large" />
    </StyledContainer>
  );
};

export default CustomLoading;
