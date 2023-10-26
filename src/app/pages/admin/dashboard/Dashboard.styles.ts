import { Card, Row } from "antd";
import styled from "styled-components";

export const SellerProfile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1.5rem 1.5rem 0 1.5rem;

  .seller_title {
    margin: 0;
    display: flex;
    justify-content: center;
    text-align: center;
  }
  .profile_box {
    display: flex;
    justify-content: center;
    gap: 1rem;
    width: 100%;

    .box_item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;
      background-color: #fff;
      border-radius: 6px;
      padding: 15px;
      text-align: center;
      width: 155px;

      &:hover {
        cursor: pointer;
        box-shadow: rgba(24, 144, 255, 0.8) 0px 0px 6px;
      }
      .site_header {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 0.45rem;
        margin-bottom: 0.5rem;

        .icon {
          padding: 12px;
          border-radius: 100%;
          font-size: 16px;
          width: 18px;
          height: 18px;
          color: rgba(0, 0, 0, 0.85);
          background-color: #f5f5f5;
        }
        .title {
        }
      }
      .description {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;

        .caption {
          word-spacing: 1.5px;
          line-height: 1.4rem;
          color: #475569;
        }
        .link {
          font-weight: 500;
          word-spacing: 1.5px;
          line-height: 1.4rem;
        }
      }
      .status {
        color: #22c55e;
      }
    }
  }

  @media screen and (max-width: 992px) {
    .profile_box {
      flex-wrap: wrap;
    }
  }
  @media screen and (max-width: 768px) {
    .seller_title {
      font-size: 18px;
    }
    .profile_box {
      .box_item {
        width: 100%;
      }
    }
  }
`;

export const BusinessResults = styled.div`
  padding: 2rem 1.5rem;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  .biz_result_box {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    border-radius: 14px;
    padding: 0.75rem 1.25rem 1.25rem 1.25rem;
    color: #fff;

    .top_box {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title {
        line-height: 30px;
      }
      .ellipsis {
        border: none;
        padding-right: 0;
      }
    }
    .bottom_box {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .icon_box {
        .icon {
          font-size: 45px;
        }
      }
      .content {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 0.25rem;

        .value {
          font-size: 25px;
          font-weight: 500;
        }
        .today {
          font-size: 12px;
        }
      }
    }
  }

  @media screen and (max-width: 992px) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .biz_result_box {
      width: 45%;

      .top_box {
        .title {
          font-size: 18px;
        }
      }
      .bottom_box {
        .icon_box {
          .icon {
            font-size: 60px;
          }
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    .biz_result_box {
      width: 100%;
    }
  }
`;

export const MainContent = styled(Row)`
  margin: 1.5rem;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  flex-grow: 1;

  .col_content {
    flex: 1;
    width: 100%;
  }
  .right_col {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const DualChart = styled.div`
  background-color: #fff;
  border-radius: 6px;
  padding: 30px 50px;

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
      width: 100% !important;
      height: 100% !important;
    }
  }

  @media screen and (max-width: 768px) {
    .content_chart {
      .chart {
        height: 250px !important;
      }
    }
  }
`;

export const RecentActivities = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #fff;
  padding: 1.15rem 1rem;
  border-radius: 6px;

  .site_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .content {
    .recent_box {
      border-bottom: 1px solid #e4e4e7;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 0;
      gap: 0.25rem;

      &:last-child {
        border-bottom: none;
      }

      .box_recent_left {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;

        .avatar {
          width: 35px;
          height: 35px;
        }
        .info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          width: 102px;

          .name {
            font-weight: 700;
            font-size: 13px;
            padding-bottom: 1px;
          }
          .active_time {
            font-size: 11px;
            color: #737373;
          }
        }
      }
      .box_recent_right {
        text-align: right;
        font-size: 11px;
        font-weight: 500;
        line-height: 15px;
        padding-right: 1.5px;
        color: #71717a;
      }
    }
  }
`;

export const OrdersPending = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 6px;

  .site_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;

    .right_header {
      .options_value {
        color: #6b7280;
      }
    }
  }
  .content {
    border-top: 1px solid #e5e5e5;
    display: flex;
    justify-content: center;
    align-items: center;

    .order_pending_box:not(:last-child) .pending_box_item {
      border-right: 1px dashed #e5e5e5;
    }
    .order_pending_box {
      padding: 1.25rem 0;
      text-align: center;
      width: 100%;

      &:hover {
        background-color: #f0f9ff;
      }

      .pending_box_item {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;

        .icon_box {
          .icon {
            padding: 0.85rem;
            border-radius: 100%;
            background-color: #f0f9ff;
            font-size: 18px;
            color: #3b82f6;
          }
        }
        .title {
          color: #182537;
          font-size: 13px;
        }
        .value {
          color: #182537;
          font-weight: 500;
        }
      }
    }
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
      width: 550px;
      height: 250px !important;
    }
  }
  @media screen and (max-width: 768px) {
    .card_title {
      .left_title {
        .left_thumbnail {
          display: none;
        }
        .label {
          .main_title {
            .tooltip {
              display: none;
            }
          }
        }
      }
    }
    .column_chart {
      .chart {
        width: 350px;
        height: 200px !important;
      }
    }
  }
`;
