import RichText from "@app/app/components/common/Form/RichText";
import AdminUpload from "@app/app/components/common/Upload/AdminUpload";
import { Form, UploadProps, message } from "antd";
import { useTranslation } from "react-i18next";

import * as S from "../ProductCreate.styles";

const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "http://localhost/api/adminshop/files",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
  onRemove: (file) => {
    console.log("remove file", file);
  },
  progress: {
    strokeColor: {
      "0%": "#108ee9",
      "100%": "#87d068",
    },
    format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
  },
};

const ProductDescription = ({ form }: any) => {
  const { t } = useTranslation();

  return (
    <S.ProductSectionWrapper>
      <div className="title">{t("admin_shop.product.create.important_info")}</div>
      <Form.Item
        label={t("admin_shop.product.create.description.label.product_video")}
        name="video"
        valuePropName="fileList"
        getValueFromEvent={(e) => e && e.fileList}
      >
        <AdminUpload
          onUpload={() => form.setFieldsValue({ video: props.fileList })}
          uploadText={t("admin_shop.product.create.description.placeholder.upload_video")}
          uploadDesc={t("admin_shop.product.create.description.placeholder.video_limit")}
          uploadType={["video/mp4", "video/mkv"]}
        />
      </Form.Item>
      <Form.Item
        label={t("admin_shop.product.create.description.label.product_desc")}
        name="description"
        rules={[
          {
            required: true,
            message: t("admin_shop.product.create.description.rules.product_desc_required"),
          },
        ]}
      >
        <RichText onChange={(content: any) => form.setFieldsValue({ description: content })} />
      </Form.Item>
    </S.ProductSectionWrapper>
  );
};

export default ProductDescription;