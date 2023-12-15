import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Form, Image, Modal, Upload, UploadFile, UploadProps } from "antd";
import { RcFile } from "antd/es/upload";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "../ProductEdit.styles";

import { ProductOptionPrice, ProductTableVariants } from ".";

const { Dragger } = Upload;

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const getBase64Multiple = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const ProductOptions = ({ form }: any) => {
  const { t } = useTranslation();

  const [isVariant, setIsVariant] = useState<boolean>(false);
  const [currentVariantValues, setCurrentVariantValues] = useState<any>({});
  const [, setFile] = useState<UploadFile>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [imageUrl, setImageUrl] = useState<string>();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    const isVariant = form.getFieldValue("isVariant");
    setIsVariant(isVariant);
  }, [form]);

  const props: UploadProps = {
    onRemove: () => {
      setFile(undefined);
    },
    beforeUpload: () => {
      return false;
    },
    onChange: (info) => {
      getBase64(info.file as RcFile, (url) => {
        setImageUrl(url);
      });
    },
    accept: ".jpg,.jpeg,.png,.webp",
    listType: "picture",
    showUploadList: false,
  };

  useEffect(() => {
    const image = form.getFieldValue("product_image");
    setImageUrl(image);
  }, [form]);

  useEffect(() => {
    const gallery = form.getFieldValue("gallery_images");
    const defaultFileListGallery = gallery?.map((image: any, index: number) => ({
      uid: index,
      name: image,
      status: "done",
      url: image,
    }));

    setFileList(defaultFileListGallery);
  }, [form]);

  const propsMultiple: UploadProps = {
    multiple: true,
    accept: ".jpg,.jpeg,.png,.webp",
    beforeUpload: () => {
      return false;
    },
    onRemove: (file: UploadFile) => {
      const index = fileList.indexOf(file);
      const newFileList: any = fileList.slice();
      newFileList.splice(index, 1);

      return setFileList(newFileList);
    },
    onPreview: async (file: UploadFile) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64Multiple(file.originFileObj as RcFile);
      }

      setPreviewImage(file.url || (file.preview as string));
      setPreviewOpen(true);
    },
    onChange: ({ fileList: newFileList }) => {
      setFileList(newFileList);
    },
    listType: "picture-card",
    fileList,
  };

  const handleCancel = () => setPreviewOpen(false);

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
          <ProductTableVariants form={form} currentVariantValues={currentVariantValues} />
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
        >
          <Dragger {...props}>
            {imageUrl ? (
              <Image height={300} src={imageUrl} preview={false} />
            ) : (
              <>
                <p className="om-upload-drag-icon">
                  <UploadOutlined />
                </p>
                <p className="om-upload-text">{t("admin_shop.product.create.option.label.click_drag_upload")}</p>
                <p className="om-upload-hint">{t("admin_shop.product.create.option.label.image_limit")}</p>
              </>
            )}
          </Dragger>
        </Form.Item>
        <Form.Item label={t("admin_shop.product.create.option.label.gallery_images")} name="gallery_images">
          <Upload {...propsMultiple}>
            {fileList?.length >= 8 ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Modal
          className="min-w-[700px] max-w-[900px] w-min"
          open={previewOpen}
          title={"Image"}
          centered
          footer={null}
          onCancel={handleCancel}
        >
          <img className="w-full" src={previewImage} alt={previewImage} />
        </Modal>
      </S.ProductSectionWrapper>
    </S.ProductOptionsStyle>
  );
};

export default ProductOptions;
