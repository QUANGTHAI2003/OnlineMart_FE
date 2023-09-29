import styled from "styled-components";

export const DiscountTab = styled.div`
  padding: 8px 0;
  display: flex;
  gap: 15px 20px;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  @media screen and (max-width: 1023.98px) {
    gap: 0 20px;
  }
`;

export const DiscountTicket = styled.svg`
  width: 100%;
`;
export const DiscountFrame = styled.div`
  @media screen and (min-width: 1024px) {
    width: 28rem;
  }
  @media screen and (max-width: 768px) {
    width: 22rem;
  }
  @media screen and (max-width: 374.98px) {
    width: 19rem;
  }
`;

export const DiscountImage = styled.div`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  @media screen and (min-width: 1024px) {
    width: 4rem;
  }
  @media screen and (max-width: 768px) {
    width: 3.5rem;
  }
  @media screen and (max-width: 375px) {
    width: 3rem;
  }
`;

export const DiscountName = styled.div`
  position: absolute;
  width: fit-content;
  top: 1rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  @media screen and (min-width: 1024px) {
    left: 9rem;
    gap: 8rem;
  }
  @media screen and (max-width: 768px) {
    top: 1.5rem;
    left: 7rem;
    gap: 4rem;
  }
  @media screen and (max-width: 375px) {
    left: 7rem;
    gap: 3rem;
  }
`;

export const DiscountPeriod = styled.div`
  position: absolute;
  @media screen and (min-width: 1024px) {
    left: 9rem;
    bottom: 1rem;
  }
  @media screen and (max-width: 768px) {
    left: 7rem;
    bottom: 1.5rem;
  }

  @media screen and (max-width: 375px) {
    left: 7rem;
    bottom: 1.5rem;
  }
`;
