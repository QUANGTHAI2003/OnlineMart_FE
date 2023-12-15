import styled from "styled-components";

export const ProductCreateStyle = styled.main`
  min-height: 100vh;

  .form-with-bold-label .om-form-item-label {
    > label {
      display: block;
      font-weight: 700;
    }
  }

  @media screen and (max-width: 992px) {
    .om-steps-item-content {
      width: 0;
      min-height: 64px !important;
    }
  }

  .om-steps-item-title {
    font-weight: bold;
    width: 100%;
  }
`;

export const CreatePlaceStyle = styled.section`
  margin: 24px;

  .expand-collapse {
    color: rgb(24, 144, 255);
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.3s ease 0s;
  }
`;

export const ProductCollapsed = styled.section`
  .om-collapse {
    border: none;
    background-color: transparent;
  }

  .om-collapse-item {
    border-radius: 4px !important;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    margin-bottom: 16px;
  }
`;

export const FeatureButtonStyle = styled.section`
  position: -webkit-sticky;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 10;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.5);
  padding: 16px;
  text-align: right;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  border-radius: 4px;

  > * {
    margin-left: 16px;
    margin-bottom: 0 !important;
  }
`;

export const ProductSectionWrapper = styled.section`
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 42px 12px 12px 12px;
  position: relative;
  margin: 32px 0;

  .title {
    color: #8c8c8c;
    font-size: 18px;
    font-weight: bold;
    background-color: #fff;
    position: absolute;
    top: -16px;
    left: 24px;
    padding: 0 12px;
  }
`;

export const DropdownSelectStyle = styled.section`
  .search-input {
    border-bottom: 1px solid #d9d9d9;
    padding: 12px;
    margin-bottom: 4px;
  }
  .feature-btn {
    border-top: 1px solid #d9d9d9;
    padding: 12px;
    margin-top: 4px;
  }
`;

export const ProductDescriptionStyle = styled.section``;

export const ProductOptionsStyle = styled.section`
  .note-icon {
    color: rgb(24, 144, 255);
    margin-right: 4px;
  }

  .om-table .om-form-item {
    margin-bottom: 0 !important;
  }
`;

export const ProductVariantStyle = styled.section`
  background-color: #e6f7ff;
  margin-top: 0;
  padding: 12px;
  margin-bottom: 48px;

  .variant-btn {
    border-color: rgb(24, 144, 255);
    color: rgb(24, 144, 255);
    height: 100%;
    display: flex;
    align-items: baseline;

    > span:last-child {
      white-space: normal;
      word-wrap: break-word;
    }
  }
`;

export const ProductUploadVariantsStyle = styled.section`
  margin-top: 32px;

  .title {
    font-size: 16px;
    font-weight: bold;
    color: #aaa;
    margin-bottom: 8px;
  }
`;

export const ProductMassUploadStyle = styled.section`
  background-color: #e6f7ff;
  margin-top: 0;
  padding: 12px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  margin-bottom: 16px;
`;
