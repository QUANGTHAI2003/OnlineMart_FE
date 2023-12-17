import { Anchor, Card, Form, Modal, Upload } from "antd";
import styled from "styled-components";

export const MainContent = styled.div`
  margin: 16px 16px 0;
  .header {
    padding: 12px 24px;
    background-color: #fff;
  }

  .store_name {
    font-size: 20px;
    line-height: 28px;
    font-weight: 600;
    color: rgb(24, 144, 255);
    margin-right: 8px;
  }

  .divider {
    width: 1px;
    background: rgb(217, 217, 217);
  }

  .copy_id {
    color: rgb(89, 89, 89);
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
  }

  .body {
    margin: 0 auto 40px;
  }
`;

export const ShopInfoCard = styled(Card).withConfig({
  shouldForwardProp: () => true,
})`
  .om-card-head-title {
    padding: 16px 0;
  }

  .om-card-body {
    padding: 0;
  }
`;

export const ShopSettingCard = styled(Card).withConfig({
  shouldForwardProp: () => true,
})`
  .om-card-head-title {
    padding: 16px 0;
  }

  .om-card-body {
    padding: 24px !important;
  }
`;

export const AnchorAccount = styled(Anchor).withConfig({
  shouldForwardProp: () => true,
})`
  background-color: #fff;
  .om-anchor-link {
    padding-inline: 0 !important;
    padding: 8px 16px !important;
    white-space: initial !important;
  }
  .om-anchor-link-title {
    white-space: initial !important;
  }
`;

export const FormField = styled(Form.Item).withConfig({
  shouldForwardProp: () => true,
})`
  label {
    align-items: baseline !important;
    height: auto !important;
  }
  .om-form-item {
    margin-bottom: 12px !important;
  }
  .om-form-item-label {
    white-space: initial !important;
  }
  .om-form-item-row {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 5px !important;
  }
  .om-form-item-control {
    width: 100%;
    flex: 0;
  }
`;

export const FeatureButtonStyle = styled.section`
  position: -webkit-sticky;
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
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

export const ModalProfileImage = styled(Modal).withConfig({
  shouldForwardProp: () => true,
})`
  .om-modal-content {
    padding: 0;
  }

  .om-modal-header {
    padding: 16px 24px;
    border-bottom: 1px solid #f0f0f0;
  }

  .om-modal-body {
    padding: 24px;
  }

  .om-modal-footer {
    margin: 0;
    border-top: 1px solid #f0f0f0;
    padding: 16px 24px;
  }
`;

export const UploadAvatarShop = styled(Upload).withConfig({
  shouldForwardProp: () => true,
})`
  .om-upload-select {
    width: 200px !important;
    height: 190px !important;
  }
  .om-image {
    height: 100% !important;
  }
`;
