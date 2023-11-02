import { UploadOutlined } from "@ant-design/icons";
import { Form, Upload, UploadFile, UploadProps } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "../ProductCreate.styles";

import { ProductOptionPrice, ProductTableVariants } from ".";

const { Dragger } = Upload;

const ProductOptions = ({ form }: any) => {
  const { t } = useTranslation();

  const [isVariant, setIsVariant] = useState<boolean>(true);
  const [currentVariantValues, setCurrentVariantValues] = useState<any>({});
  const [, setFile] = useState<UploadFile>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const props: UploadProps = {
    onRemove: () => {
      setFile(undefined);
    },
    beforeUpload: (file) => {
      setFile(file);

      return false;
    },
    listType: "picture-card",
  };

  const propsMultiple: UploadProps = {
    multiple: true,
    accept: ".jpg,.jpeg,.png,.webp,.mp4",
    onRemove: (file: any) => {
      const index = fileList.indexOf(file);
      const newFileList: any = fileList.slice();
      newFileList.splice(index, 1);

      return setFileList(newFileList);
    },
    beforeUpload: () => {
      return false;
    },
    onChange: (info) => {
      const listFiles = info.fileList;
      console.log(listFiles);

      setFileList(listFiles);
    },
    fileList: fileList,
    listType: "picture-card",
  };

  const normFile = (e: any) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }
    return e?.file;
  };

  return (
    <S.ProductOptionsStyle>
      <S.ProductVariantStyle>
        <ProductOptionPrice
          form={form}
          isVariant={isVariant}
          setIsVariant={setIsVariant}
          setCurrentVariantValues={setCurrentVariantValues}
        />
      </S.ProductVariantStyle>
      {isVariant && (
        <S.ProductSectionWrapper>
          <div className="title">{t("admin_shop.product.create.option.label.variant_operation")}</div>
          {<ProductTableVariants form={form} currentVariantValues={currentVariantValues} />}
        </S.ProductSectionWrapper>
      )}
      <S.ProductSectionWrapper>
        <div className="title">{t("admin_shop.product.create.option.label.images")}</div>
        <Form.Item
          label={t("admin_shop.product.create.option.label.product_image")}
          name="product_image"
          rules={[
            {
              required: true,
              message: t("admin_shop.product.create.option.rules.product_image_required"),
            },
          ]}
          valuePropName="file"
          getValueFromEvent={normFile}
        >
          <Dragger {...props} accept=".jpg,.jpeg,.png,.webp">
            <p className="om-upload-drag-icon">
              <UploadOutlined />
            </p>
            <p className="om-upload-text">{t("admin_shop.product.create.option.label.click_drag_upload")}</p>
            <p className="om-upload-hint">{t("admin_shop.product.create.option.label.image_limit")}</p>
          </Dragger>
        </Form.Item>
        <Form.Item
          label={t("admin_shop.product.create.option.label.gallery_images")}
          name="gallery_images"
          valuePropName="fileList"
          getValueFromEvent={(e) => {
            return e?.fileList;
          }}
        >
          <Dragger {...propsMultiple}>
            <p className="om-upload-drag-icon">
              <UploadOutlined />
            </p>
            <p className="om-upload-text">{t("admin_shop.product.create.option.label.click_drag_upload")}</p>
            <p className="om-upload-hint">{t("admin_shop.product.create.option.label.image_limit")}</p>
          </Dragger>
        </Form.Item>
      </S.ProductSectionWrapper>
    </S.ProductOptionsStyle>
  );
};

export default ProductOptions;
