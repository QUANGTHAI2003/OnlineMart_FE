import styled from "styled-components";

export const SalesReport = styled.div`
  .site_header {
    background-color: #fff;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const StatisticalChart = styled.div`
  padding: 1.25rem 1.5rem;

  .chart_row {
    width: 100%;
    display: flex;
    flex-grow: 1;
    gap: 1.25rem;

    .chart_col {
      flex: 1;
      width: 100%;
      background-color: #fff;
      border-radius: 6px;
      padding: 24px;

      .chart_item {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
      .header_chart {
        border-bottom: 1px solid #e8eaeb;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 1.25rem;

        .left_header_chart {
          .title {
            margin: 0;
          }
          .options_value {
            font-size: 14px;
            color: #747c87;
          }
        }
        .right_header_chart {
          margin: 0;
          font-weight: 700;
          color: #0088ff;
        }
      }
      .content_chart {
        display: flex;
        justify-content: center;
        align-items: center;

        .chart {
          width: 426px !important;
          height: 296px !important;
        }
      }
      .content_select {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;

export const OrderStatus = styled.div`
  display: flex;
  gap: 1.25rem;
  padding: 0 1.5rem 1.5rem 1.5rem;

  .status_item {
    background-color: #fff;
    width: 33.3%;
    border-radius: 6px;
    padding: 15px 20px 20px 20px;

    .icon {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .meta_title {
        display: flex;
        gap: 0.25rem;
      }
      .options_sort {
        padding: 6px 15px;
        color: black;
        border-radius: 6px;
        transition: all 0.3s;

        &:hover {
          background-color: #e2e8f0;
        }
      }
    }
    .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;

      .sort_content {
        font-size: 14px;
        color: #747c87;
      }
      .price_content {
        margin: 0;
        font-weight: 700;
        color: #0088ff;
        padding: 0;
      }
    }
  }

  @media screen and (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .status_item {
      width: 45%;
    }
  }

  @media screen and (max-width: 576px) {
    .status_item {
      width: 100%;
    }
  }
`;
