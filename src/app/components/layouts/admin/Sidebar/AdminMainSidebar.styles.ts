import styled from "styled-components";

export const LogoStyle = styled.div`
  height: 64px;
  position: relative;
  line-height: 64px;
  padding-left: 24px;
  transition: all 0.3s;
  background: #002140;
  overflow: hidden;

  img {
    display: inline-block;
    vertical-align: middle;
    height: 32px;
  }

  h1 {
    color: #fff;
    display: inline-block;
    vertical-align: middle;
    font-size: 20px;
    margin: 0 0 0 12px;
    font-weight: 600;
  }
`;

export const SearchStyle = styled.div`
  padding: 12px 9px 0;
  margin-bottom: 12px;

  .om-input-group-wrapper {
    border-radius: 50px !important;
    border-color: #000c17 !important;
    background-color: #000c17 !important;

    .om-input-group-addon {
      border: none;
      color: #fff;
    }
  }

  .om-input {
    border: 0;
    color: #fff;
    padding-left: 10px !important;
    border-radius: 50px;
    border-color: #000c17;
    background-color: #000c17;
    font-size: 13px;

    &::placeholder {
      color: #bfbfbf;
    }
  }
`;
