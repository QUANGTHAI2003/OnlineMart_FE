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
      padding: 1rem;

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
export const UserProfileLeft = styled(Col).withConfig({
  shouldForwardProp: () => true,
})`
  .myProfile_title {
    margin-bottom: 1rem;
    font-size: 1rem;
    line-height: 1.5rem;
    color: #64646d;
  }

  .avatar {
    position: relative;
    cursor: pointer;
    width: fit-content;

    .img {
      border-radius: 9999px;
      border: 4px solid #c2e1ff;
      width: 100%;
      height: 100% !important;
    }

    .om-image-mask {
      border-radius: 9999px;
    }

    .om-space {
      position: absolute;
      bottom: 10px;
      right: 10px;
      z-index: 10;
      cursor: pointer;

      .editOutline {
        background: #64646d;
        padding: 0.25rem;
        border-radius: 100%;
        color: #fff;

        > svg {
          padding: 3px;
        }
      }
    }
  }

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
`;
export const UserProfileRight = styled(Col).withConfig({
  shouldForwardProp: () => true,
})`
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
    border-top: 2px solid #f5f5fa;
    padding-top: 8px;
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
