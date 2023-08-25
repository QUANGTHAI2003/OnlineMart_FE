import styled from "styled-components";

export const DescriptionStyles = styled.div`
  .group {
    background-color: #fff;
    border-radius: 4px;

    > h2 {
      color: rgb(51, 51, 51);
      font-size: 20px;
      font-weight: 400;
      line-height: 32px;
      padding: 8px 16px;
      text-transform: capitalize;
      display: flex;
      -webkit-box-pack: justify;
      justify-content: space-between;
      -webkit-box-align: center;
      align-items: center;
      margin: 0px;
    }

    .toggle-content-view:not(.expanded) {
      overflow: hidden;
      height: 500px;
    }

    .less #gradient {
      position: absolute;
      bottom: 0px;
      left: 0px;
      width: 100%;
      height: 200px;
      background-image: linear-gradient(rgba(255, 255, 255, 0), rgb(255, 255, 255));
    }

    .btn-more {
      cursor: pointer;
      display: block;
      width: 229px;
      height: 39px;
      margin: 10px auto 0px;
      color: rgb(24, 158, 255);
      font-size: 13px;
      font-weight: 400;
      text-align: center;
      border: 1px solid rgb(24, 158, 255);
      border-radius: 4px;
    }
  }

  @media screen and (max-width: 1080px) {
    .left {
      width: 100%;

      .content {
        width: 100% !important;

        img {
          width: 100%;
          object-fit: contain;
        }
      }
    }

    .right {
      display: none;
    }
  }
`;
