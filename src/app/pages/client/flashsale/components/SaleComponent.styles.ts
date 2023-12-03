import styled from "styled-components";

export const SalesStyle = styled.section`
  width: 100%;
  margin-right: 0px;
  /* padding: 12px 16px; */
  background-color: rgb(255, 255, 255);
  border-radius: 8px;
  overflow: hidden;
  min-height: 242px;

  > .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .header-left {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      cursor: pointer;

      .title {
        margin-right: 12px;
        font-weight: 700;
        font-size: 16px;
        line-height: 150%;
        color: rgb(39, 39, 42);
      }
    }

    a {
      color: rgb(11, 116, 229);
      text-decoration: none;
    }

    .count_down {
      color: rgb(120, 120, 120);
      font-size: 15px;
      display: flex;
      align-items: center;

      span {
        font-size: 15px;
        font-weight: 500;
        line-height: 1.6;
        margin: 0px 4px;
        padding: 0px 3px;
        background-color: rgb(255, 66, 78);
        border-radius: 4px;
        color: white;
      }

      b {
        font-weight: 700;
        font-size: 20px;
        line-height: 16px;
      }
    }
  }

  .navigation a {
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
    color: rgb(10, 104, 255);

    .icon-more {
      width: 24px;
      margin-top: -1px;
      margin-left: 8px;
    }
  }
`;
