import { Col } from "antd";
import { styled } from "styled-components";

export const UserProfile = styled.div`
  .main_title {
    font-size: 1.25rem;
    line-height: 1.75rem;
    margin-bottom: 0.75rem;
  }
  .row_userProfile {
    background: #fff;
    padding: 1.25rem;
    border-radius: 0.5rem;

    .content_profile {
      display: flex;
    }
  }

  @media only screen and (max-width: 480px) {
    .row_userProfile {
      padding: 7px;

      .myProfile_title {
        padding: 0.75rem;
      }
    }
  }
  @media only screen and (max-width: 992px) {
    .row_userProfile {
      .content_profile {
        display: flex;
        flex-direction: column;
      }
    }
  }
`;
export const UserProfileLeft = styled(Col)`
  width: 50%;

  .myProfile_title {
    margin-bottom: 1rem;
    font-size: 1rem;
    line-height: 1.5rem;
    color: #64646d;
  }
  .row_profile {
    width: 100%;
    display: flex !important;
    align-items: center !important;
    flex-wrap: wrap;
    padding: 20px;

    .col_leftProfile {
      .avatar {
        position: relative;
        cursor: pointer;
        width: 100%;

        .img {
          border-radius: 9999px;
          border: 4px solid #c2e1ff;
          width: 100%;
          height: 100% !important;
        }

        .om-image-mask {
          border-radius: 9999px;
        }

        .avatar_space {
          position: absolute;
          bottom: 0.25rem;
          right: 6px;
          z-index: 10;
          cursor: pointer;

          .editOutline {
            width: 20px;
            background: #64646d;
            padding: 0.25rem;
            border-radius: 100%;
            color: #fff;
          }
        }
      }
    }
    .col_rightProfile {
      width: 70%;
      display: grid;
      row-gap: 2rem;

      .input_name {
        display: flex;
        align-items: center;

        .name_lable {
          width: 40%;
          color: #333;
        }
      }
      .input_nickname {
        display: flex;
        align-items: center;

        .nickname_lable {
          width: 40%;
          color: #333;
        }
      }
    }
    .col_bottomProfile {
      width: 100%;
      display: grid;
      row-gap: 2rem;
      margin-top: 0.75rem;

      .input_date {
        display: flex;
        align-items: center;

        .date_lable {
          width: 40%;
          color: #333;
        }
      }
      .input_gender {
        display: flex;
        align-items: center;

        .gender_lable {
          width: 29%;
          color: #333;
        }
        .radio_group {
          .radioGroup_item {
            display: flex;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 992px) {
    width: 100%;

    .col_leftProfile {
      .avatar {
        .om-image {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }

        .avatar_space {
          display: none;
        }
      }
    }
  }
  @media only screen and (max-width: 1200px) {
    .col_leftProfile {
      width: 100% !important;
      display: flex;
      justify-content: center;

      .avatar_space {
        bottom: 0rem !important;
        right: 0.25rem !important;
        z-index: 100 !important;
      }
    }
    .col_rightProfile {
      width: 100% !important;
    }
    .col_bottomProfile {
      .input {
        display: flex;
        flex-direction: column;
        align-items: start !important;
      }
    }
  }
  @media only screen and (max-width: 1400px) {
    .row_profile {
      .col_rightProfile {
        .input {
          display: flex;
          flex-direction: column;
          align-items: start;
          row-gap: 0.5rem;
        }
      }
    }
  }
`;
export const UserProfileRight = styled(Col)`
  width: 50%;
  padding: 20px;
  display: grid;
  row-gap: 2.5rem;

  .phoneEmail {
    display: grid;

    .gap_phoneEmail {
      display: grid;
      row-gap: 1.75rem;
    }
    .email_item {
      max-width: 100%;

      .email_item_info {
        width: 75%;

        .email_address {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          height: 20px;
        }
      }
    }
  }
  .security {
    display: grid;
  }
  .network {
    display: grid;
  }

  .profileRight_item {
    display: grid;
    row-gap: 1rem;
  }
  .title_item {
    font-size: 1rem;
    line-height: 1.5rem;
    color: #64646d;
  }
  .content_item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .info_item {
      display: flex;
      align-items: center;
      column-gap: 0.25rem;

      .icon {
        font-size: 1.125rem;
        margin: 0.75rem 0.75rem 0.75rem 0;
      }
      .social_icon {
        width: 25px;
        margin-right: 0.5rem;
      }
      .detail_info_item {
        font-size: 0.875rem;
        line-height: 1.25rem;
        color: #38383d;
        display: grid;
        row-gap: 0.25rem;
      }
    }
  }

  @media only screen and (max-width: 480px) {
    .phoneEmail {
      .email_item {
        .email_item_info {
          width: 55% !important;
        }
      }
    }
  }
  @media only screen and (max-width: 768px) {
    width: 100% !important;
  }
  @media only screen and (max-width: 992px) {
    width: 100%;
    border-top: 1.5px solid #f5f5fa;
  }
  @media only screen and (max-width: 1400px) {
    .phoneEmail {
      .email_item {
        .email_item_info {
          width: 65%;
        }
      }
    }
  }
`;
