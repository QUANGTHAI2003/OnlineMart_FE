import { Card, Row } from "antd";
import styled from "styled-components";

export const SiteHeader = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #fff;
`;

export const ReportTime = styled(Row)`
  display: flex;
  gap: 1rem 0;
  margin: 1rem;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 6px;

  .report_title {
    display: flex;
  }
  .range_presets {
    .range_btn {
      border-radius: 0;
    }
    .range_btn.selected {
      color: #1890ff;
    }
  }
  .custom_picker {
    .range_picker {
      width: 100%;
    }
  }
`;

export const Statistical = styled.div`
  margin: 16px;
  padding: 24px;
  background-color: #fff;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const DateComparison = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .date_compare {
    display: flex;
    gap: 1rem;

    .date_value {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;

      .compare {
        font-size: 12px;
        font-weight: 500;
        color: #fb7185;
        padding: 0 0.5rem;
      }
      .numdays {
        color: #fb7185;
        font-weight: 500;
      }
    }
  }
  .export_excel {
    .button_export {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
    }
  }

  @media screen and (max-width: 992px) {
    .date_compare {
      flex-direction: column;
    }
  }
  @media screen and (max-width: 768px) {
    .date_compare {
      .date_value {
        flex-direction: column;
        align-items: start;
      }
    }
  }
`;

export const SlickList = styled.div`
  width: 100%;

  .mySwiper {
    .carousel_item {
      border: 1px solid rgb(217, 217, 217);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border-radius: 6px;
      overflow: hidden;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        top: -1px;
        left: 0;
        right: 0;
        height: 1px;
        background-color: var(--fill-color);
        z-index: 1;
      }

      &.selected {
        &::before {
          height: 7px;
        }
      }

      .radio_button {
        height: 100%;
        width: 100%;
        padding: 10px 25px;
        border: none;

        .site_header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .content {
          display: flex;
          align-items: center;
          margin-top: 5px;
        }
        .percent {
          display: flex;
          gap: 0.25rem;
          color: #84cc16;
          margin-top: 5px;

          .value {
            font-weight: 600;
          }
        }
      }
    }

    .swiper-button-prev,
    .swiper-button-next {
      box-shadow: none !important;
      background-image: linear-gradient(to left, #fff, (255, 255, 255, 0.1)) !important;
      backdrop-filter: blur(10px);
      padding: 30px;
      margin: 35px -9px;
      top: 0px;
      border-radius: 0% !important;
      width: auto;
      height: 40% !important;
      color: #737373;
      opacity: 0.9;
    }
    .swiper-button-prev::after,
    .swiper-button-next::after {
      font-size: 18px !important;
      border: #e2e8f0 1px solid;
      padding: 10px 15px;
      border-radius: 100px;
    }
    .swiper-button-prev:hover::after,
    .swiper-button-next:hover::after {
      border: #99f6e4 1px solid;
      transition: all 0.2s ease-in-out;
      color: #99f6e4;
    }
    .swiper-button-prev.swiper-button-disabled,
    .swiper-button-next.swiper-button-disabled {
      opacity: 0;
    }
  }
`;

export const PieChartContainer = styled(Row)`
  margin: 1rem;
  display: flex;
  gap: 1rem;
  flex-grow: 1;

  .chart_col {
    flex: 1;
  }
`;

export const PieChart = styled(Card)`
  background-color: #fff;
  border-radius: 6px;
  width: 100%;

  .card_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 24px 0;

    .left_title {
      display: flex;
      gap: 0.75rem;

      .left_thumbnail {
        width: 46px;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 100%;
        }
      }
      .label {
        display: flex;
        flex-direction: column;

        .main_title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .sub_title {
          display: flex;
          gap: 0.5rem;
          font-size: 13px;
          font-weight: 500;
          color: #595959;
        }
      }
    }
    .right_title {
      .see_more {
        font-size: 14px;
        font-weight: 400;
        color: #268ced;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.4rem;
        margin: 0;
      }
    }
  }
  .column_chart {
    .chart {
      width: 426px;
      height: 296px;
    }
  }

  @media screen and (max-width: 992px) {
    .column_chart {
      .chart {
        width: 90% !important;
        height: 300px !important;
      }
    }
  }
`;
