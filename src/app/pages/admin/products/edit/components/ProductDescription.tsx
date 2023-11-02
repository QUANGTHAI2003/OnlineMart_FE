import RichText from "@app/app/components/common/Form/RichText";
import AdminUpload from "@app/app/components/common/Upload/AdminUpload";
import { Form } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "../ProductEdit.styles";

// const props: UploadProps = {
//   name: "file",
//   multiple: true,
//   action: "http://localhost/api/adminshop/files",
//   onChange(info) {
//     const { status } = info.file;
//     if (status !== "uploading") {
//       console.log(info.file, info.fileList);
//     }
//     if (status === "done") {
//       message.success(`${info.file.name} file uploaded successfully.`);
//     } else if (status === "error") {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },
//   onDrop(e) {
//     console.log("Dropped files", e.dataTransfer.files);
//   },
//   onRemove: (file) => {
//     console.log("remove file", file);
//   },
//   progress: {
//     strokeColor: {
//       "0%": "#108ee9",
//       "100%": "#87d068",
//     },
//     format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
//   },
// };

const ProductDescription = ({ form }: any) => {
  const { t } = useTranslation();
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    const description = form.getFieldValue("description");
    setDescription(description);
  }, [description, form, setDescription]);

  const handleGetValue = (e: any) => {
    return e;
  };

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
        getValueFromEvent={handleGetValue}
      >
        <RichText onChange={(content: any) => form.setFieldsValue({ description: content })} initValue={description} />
      </Form.Item>
    </S.ProductSectionWrapper>
  );
};

export default ProductDescription;
