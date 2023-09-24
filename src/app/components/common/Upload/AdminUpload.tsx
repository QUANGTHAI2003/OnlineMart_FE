import { UploadOutlined } from "@ant-design/icons";
import { Upload, UploadProps, message } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import { ReactNode, useState } from "react";

const { Dragger } = Upload;

interface IAdminUpload {
  uploadUrl?: string;
  uploadType?: string[];
  uploadIcon?: ReactNode;
  isMultiple?: boolean;
  uploadText?: string;
  uploadDesc?: string;
  onUpload?: () => void;
}

const AdminUpload: React.FC<IAdminUpload> = (
  {
    isMultiple = false,
    uploadIcon = <UploadOutlined />,
    uploadText,
    uploadDesc,
    uploadType,
    // onUpload,
  },
  uploadProps: UploadProps
) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // const handleUpload = () => {
  //   const formData = new FormData();
  //   fileList.forEach((file) => {
  //     formData.append("files[]", file as RcFile);
  //   });

  //   setUploading(true);
  //   fetch("http://localhost:8080/api/adminshop/files", {
  //     method: "POST",
  //     body: formData,
  //   })
  //     .then((res) => res.json())
  //     .then(() => {
  //       setFileList([]);
  //       message.success("upload successfully.");
  //     })
  //     .catch(() => {
  //       message.error("upload failed.");
  //     })
  //     .finally(() => {
  //       setUploading(false);
  //       if (onUpload) {
  //         onUpload();
  //       }
  //     });
  // };

  const props: UploadProps = {
    multiple: isMultiple,
    accept: uploadType?.join(","),
    listType: "picture-card",
    fileList,
    beforeUpload: (file) => {
      if (uploadType?.includes(file.type)) {
        setFileList([...fileList, file]);
      } else {
        message.error(`${file.name} file type is not allowed.`);
      }
    },
    onRemove: (file: UploadFile) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    progress: {
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
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
