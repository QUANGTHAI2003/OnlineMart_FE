import { InboxOutlined } from "@ant-design/icons";
import SelectOrCreate from "@app/app/components/common/Select/SelectOrCreate";
import { Button, Col, Form, Input, Radio, RadioChangeEvent, Row, Upload, UploadProps, message } from "antd";
import Checkbox, { CheckboxChangeEvent } from "antd/es/checkbox";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SelectCategory } from "../create/components";
import * as S from "./Category.styles";

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
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
};

const CreateCategory = () => {
  const { t } = useTranslation();

  const [value, setValue] = useState(1);

  const onChangeRadio = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const [checked, setChecked] = useState(false);

  const onChangeCheckBox = (e: CheckboxChangeEvent) => {
    console.log("checked = ", e.target.checked);
    setChecked(e.target.checked);
  };

  return (
    <Form
      autoComplete="off"
      onFinish={(values) => {
        console.log({ values });
      }}
      onFinishFailed={(error) => {
        console.log({ error });
      }}
    >
      <Row justify="space-between">
        <Col span={checked ? 12 : 24}>
          <S.FormField
            name={"name_child"}
            label={t("admin_shop.categories.name_label")}
            rules={[
              {
                required: true,
                message: t("admin_shop.categories.name_err"),
              },
            ]}
          >
            <Input />
          </S.FormField>

          <S.FormField
            name={"name"}
            label="Danh mục cha"
            rules={[
              {
                required: true,
                message: "Danh mục cha không được để trống",
              },
            ]}
          >
            <SelectCategory onChange={(value: any) => console.log(value)} />
          </S.FormField>

          <S.FormField
            name="image"
            label={t("admin_shop.categories.image_label")}
            rules={[
              {
                required: true,
                message: t("admin_shop.categories.image_err"),
              },
            ]}
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
            </Dragger>
          </S.FormField>

          <S.FormFieldRadio name="status" label="Trạng thái">
            <Radio.Group defaultValue={1} onChange={onChangeRadio} value={value}>
              <Radio value={1} checked>
                {t("admin_shop.categories.show_status")}
              </Radio>
              <Radio value={2}>{t("admin_shop.categories.hide_status")}</Radio>
            </Radio.Group>
          </S.FormFieldRadio>

          <S.FormField>
            <Checkbox checked={checked} onChange={onChangeCheckBox} value>
              SEO
            </Checkbox>
          </S.FormField>
        </Col>
        {checked && (
          <Col span={11}>
            <S.FormField name="title" label={t("admin_shop.categories.meta_title")} rules={[{ min: 6 }]}>
              <Input placeholder={t("admin_shop.categories.name")} />
            </S.FormField>

            <S.FormField name="keyword" label={t("admin_shop.categories.meta_keyword")}>
              <SelectOrCreate placeholder={t("admin_shop.categories.meta_keyword")} />
            </S.FormField>

            <S.FormField name="description" label={t("admin_shop.categories.meta_desc")} rules={[{ min: 6 }]}>
              <TextArea rows={3} />
            </S.FormField>
          </Col>
        )}
      </Row>

      <S.FormField className="text-right">
        <Button size="large" type="primary" htmlType="submit">
          {t("admin_shop.categories.button_form")}
        </Button>
      </S.FormField>
    </Form>
  );
};

export default CreateCategory;
