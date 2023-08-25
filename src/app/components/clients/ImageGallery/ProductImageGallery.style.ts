import styled from "styled-components";

export const ImageGallery = styled.div`
  cursor: pointer;
  overflow: hidden;
  border-radius: 5px;
  position: relative;
  height: 64px;
  transition: all 0.5s linear;
  flex: 1;

  &.active {
    border: 1px solid rgb(13, 92, 182);
  }
  .overlay {
    position: absolute;
    top: 0px;
    left: 0px;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 9px;
    color: rgb(255, 255, 255);
    font-size: 11px;
    line-height: 16px;
    font-weight: 300;
    text-align: center;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.6);
  }
`;
