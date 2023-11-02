import { UploadOutlined } from "@ant-design/icons";
import { Upload, UploadProps } from "antd";
import { ReactNode } from "react";

const { Dragger } = Upload;

interface IAdminUpload {
  uploadType?: string[];
  uploadIcon?: ReactNode;
  isMultiple?: boolean;
  uploadText?: string;
  uploadDesc?: string;
}

const AdminUpload: React.FC<IAdminUpload> = (
  { isMultiple = false, uploadIcon = <UploadOutlined />, uploadText, uploadDesc, uploadType },
  uploadProps: UploadProps
) => {
  const props: UploadProps = {
    multiple: isMultiple,
    accept: uploadType?.join(","),
    listType: "picture-card",
    progress: {
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
    beforeUpload: () => false,
    ...uploadProps,
  };

  return (
    <Dragger {...props}>
      <p className="om-upload-drag-icon">{uploadIcon}</p>
      {uploadText && <p className="om-upload-text">{uploadText}</p>}
      {uploadDesc && <p className="om-upload-hint">{uploadDesc}</p>}
    </Dragger>
  );
};

export default AdminUpload;
