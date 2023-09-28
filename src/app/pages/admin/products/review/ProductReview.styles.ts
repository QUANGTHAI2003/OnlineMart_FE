import { Col, Drawer, Tabs } from "antd";
import styled from "styled-components";

export const ProductReview = styled.main`
  .breadcrum {
    margin-bottom: 16px;
  }
  .header {
    padding: 1.5rem 1.5rem 0 1.5rem;
    background: #fff;
  }

  .article {
    .tab_rating {
      .navbarRating {
        .adminTabs {
          padding: 0.75rem 1.5rem 0;
          background-color: #fff;

          .om-tabs-nav {
            .om-tabs-tab {
              border: none !important;
              margin: 3px 0 !important;
              position: relative !important;
              cursor: pointer;
              background: none !important;
            }
            .om-tabs-tab:after {
              content: "" !important;
              position: absolute !important;
              bottom: -5px;
              height: 4px !important;
              width: 100% !important;
              left: 0;
              background-color: #1890ff;
              transition: all 0.3s;
              transition-timing-function: ease-out;
              transform: scaleX(0);
            }
            .om-tabs-tab:hover:after {
              transform: scaleX(1);
            }
            .om-tabs-tab:active:after {
              transform: scaleX(1);
              content: "" !important;
              position: absolute !important;
              bottom: -5px;
              height: 4px !important;
              width: 100% !important;
              left: 0;
              background-color: #1890ff;
              transition: all 0.3s;
              transition-timing-function: ease-out;
            }
          }
        }
      }
    }

    .tabContent {
      padding: 16px 16px 0;
    }
  }

  :where(.css-dev-only-do-not-override-14mi6y0).om-tabs-top > .om-tabs-nav {
    margin: 0px;
  }
  :where(.css-dev-only-do-not-override-14mi6y0).om-tabs-top > .om-tabs-nav::before {
    position: none !important;
    right: 0;
    left: 0;
    border-bottom: none !important;
    content: "";
  }
`;
export const SiteHeader = styled.section`
  .main_title {
    .title {
      margin-bottom: 1rem;
    }
  }
  .main_content {
    .content {
      .container {
        border: 1px solid #91d5ff;
        background-color: #e6f7ff;
        padding: 12px 16px;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
        display: flex;

        .left_container {
          .suggestion {
            .try_create {
              color: #262626;
              font-size: 14px;
              font-weight: 400;
              line-height: 22px;
              margin: 0 5px;
            }
          }
        }

        .see_more {
          border: 1px solid #1890ff;
          background-color: initial;
          padding: 6px 12px;
          align-items: center;
          flex-direction: row;
          justify-content: center;
          display: flex;
          cursor: pointer;
          border-radius: 2px;

          .detail {
            color: #1890ff;
            font-size: 14px;
            font-weight: 400;
            line-height: 22px;
            margin-right: 5px;
          }
          .icon {
            color: rgb(24, 144, 255);
          }
        }
      }
    }
  }
`;
export const Filter = styled(Col)`
  margin: 16px;

  .form_item {
    margin-bottom: 0.75rem;
    .row_radio {
      display: flex;
      gap: 1rem;
      border: none;
    }

    :where(.css-dev-only-do-not-override-14mi6y0).om-radio-button-wrapper:first-child:last-child {
      background: #f5f5f5;
      border: none;
    }
    :where(.css-dev-only-do-not-override-14mi6y0).om-radio-button-wrapper:first-child:last-child:focus-within {
      background: #e6f7ff;
    }

    .om-radio {
      .om-radio-inner {
        width: 0;
        height: 0;
      }
    }
    .om-radio-wrapper:hover {
      color: #1890ff;
      background: #e6f7ff;
    }
  }
  .row_filtering {
    .filtering {
      display: flex;
      align-items: center;
    }
    .rating_type {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;

      .rating_type_item {
        display: flex;
        align-items: center;
        padding: 1px 5px 1px 15px;
        border: 1px solid rgb(24, 144, 255);
        background-color: #e6f7ff;
        border-radius: 50px;

        .content {
          display: flex;
          gap: 0.25rem;
        }
        .break_rating_type {
          width: auto;
          height: auto;
          border: none;
        }
      }
      .delete_all {
        display: flex;
        align-items: center;

        .delete_button {
          padding: 0.5rem;
          border: none;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }

  @media only screen and (max-width: 768px) {
    .row_filtering {
      .filtering {
        font-weight: 500;
        padding: 10px 0;
      }
    }
  }
`;
export const TableComponent = styled(Col)`
  margin: 16px;
`;
export const AdminTabs = styled(Tabs).withConfig({
  shouldForwardProp: () => true,
})``;
export const FilterDropdownStyle = styled.section`
  min-width: 280px;
  max-width: 380px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 12px;
  border-radius: 2px;
  background: rgb(255, 255, 255);

  .header {
    padding: 16px;
    border-bottom: 1px solid rgb(240, 240, 240);
  }

  .content {
    padding: 16px 20px;
    min-height: 200px;
    max-height: 300px;
    overflow: auto;
  }

  .footer {
    padding: 16px;
    border-top: 1px solid rgb(217, 217, 217);

    &-default {
      display: grid;
      grid-template-columns: repeat(2, minmax(0px, 1fr));
      column-gap: 12px;
    }
  }
`;
export const DrawerStyle = styled(Drawer).withConfig({
  shouldForwardProp: () => true,
})`
  .om-drawer-close {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    display: block;
    padding: 20px;
    color: rgba(0, 0, 0, 0.45);
    font-weight: 700;
    font-size: 16px;
    font-style: normal;
    line-height: 1;
    text-align: center;
    text-transform: none;
    text-decoration: none;
    background: transparent;
    border: 0;
    outline: 0;
    cursor: pointer;
    transition: color 0.3s;
    text-rendering: auto;
  }

  .om-drawer-body {
    padding: 16px 24px;

    .checkbox_group {
      width: 100%;
    }
    .radio_group {
      width: 100%;
    }
    .range_picker {
      width: 100%;
    }
  }
`;
