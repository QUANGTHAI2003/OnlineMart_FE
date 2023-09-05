import styled from "styled-components";

export const ListItem = styled.div`
  .hide {
    display: block;
    max-height: 0;
    transition: max-height 0.5s ease-in-out 0s;
    overflow: hidden;
  }

  .expanded {
    display: block;
    max-height: 1000px;
    transition: max-height 0.5s ease-in-out 0s;
    overflow: hidden;
  }
  .arrow-animation {
    transform: rotate(-180deg);
    transition-duration: 0.5s;
  }
`;
