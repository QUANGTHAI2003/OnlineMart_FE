import { Row } from "antd";
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

export const Statistical = styled.div`
  margin: 16px;
  padding: 24px;
  background-color: #fff;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const PrimaryIndex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .col {
    .export_excel {
      display: flex;
      justify-content: end;
      align-items: end;

      .button_export {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
      }
    }
    .date_value {
      display: flex;
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
  .select {
    display: flex;
    gap: 0.75rem;

    .select_item {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;

      .select_style {
        width: 170px;
      }
    }
  }
`;
