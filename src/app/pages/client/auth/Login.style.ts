import { Checkbox, Tabs } from "antd";
import styled from "styled-components";

export const Login = styled.div`
  transform: scale(0.9);
  transform-origin: top left;
`;

export const CustomTabs = styled(Tabs).withConfig({
  shouldForwardProp: () => true,
})`
  .om-tabs-nav {
    width: 460px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 768px) {
      width: 100%; /* Đảm bảo rằng chiều rộng là 100% ở màn hình 768px */
      .om-tabs-nav-wrap {
        justify-content: center; /* Can giữa .om-tabs-nav-wrap */
      }
    }

    .om-tabs-nav-wrap {
      background-color: rgba(10, 104, 255, 0.12);
      border-radius: 16px;

      .om-tabs-nav-list {
        width: 100%;
        .om-tabs-ink-bar {
          display: none;
        }
      }
      .om-tabs-tab-active {
        margin: 8px;
        border-radius: 12px;
        background-color: #0a68ff;

        .om-tabs-tab-btn {
          color: white !important;
        }
      }
      .om-tabs-tab {
        justify-content: center;
        width: 50%;
      }
    }
  }
`;

export const LoginForm = styled.div`
  @media (min-width: 414px) {
    width: 90%;
    margin: auto !important;
  }
  @media (max-width: 414px) {
    max-width: 75%;
  }

  h1 {
    font-weight: 100;
    color: white;
    text-align: center;
    padding-bottom: 10px;
    border-bottom: 1px solid rgb(79, 98, 148);
  }
`;
export const ImageLoginUser = styled.div`
  width: 58.333333%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 414px) {
    display: none;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;
export const Form = styled.div`
  height: 100vh;
  @media (max-width: 768px) {
    .max-width-form {
      justify-content: center;
    }
  }

  @media (min-width: 414px) {
    display: flex;
    justify-content: center;
    .max-width-form {
      width: 100%;
    }
    .user-form {
      margin-left: 0;
    }
    .om-tabs-nav {
      width: 90% !important;
      margin: auto;
      margin-bottom: 20px;
    }
  }
`;
export const ChangePass = styled.div`
  @media screen and (min-width: 414px) and (max-width: 768px) {
    .change-form {
      width: 100% !important;
    }
  }
`;
export const Otp = styled.div`
  .Otp {
    margin-top: 10%;
    text-align: center;
  }

  .Otp-logo {
    height: 40vmin;
  }

  .Otp-header {
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
  }

  .Otp-link {
    color: #09d3ac;
  }

  .otpContainer {
    margin: 3% auto;
  }

  .otpInput {
    width: 3rem !important;
    height: 3rem;
    margin: 0 0.3rem;
    font-size: 2rem;
    text-align: center;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.3);
  }
  @media screen and (min-width: 414px) and (max-width: 768px) {
    .button-otp {
      width: 60% !important;
    }
  }
`;
export const StyledCheckbox = styled(Checkbox)`
  align-items: center;
`;

export const SignUpForm = styled.div`
  @media (min-width: 414px) {
    width: 90%;
    margin: auto !important;
  }
  @media (max-width: 414px) {
    max-width: 75%;
  }
  form {
    max-width: 100%;
    margin: 0 auto;
  }

  p {
    color: #bf1650;
  }

  p::before {
    display: inline;
  }

  input:disabled {
    opacity: 0.4;
  }

  .Otp {
    max-width: 600px;
    margin: 0 auto;
  }
`;
