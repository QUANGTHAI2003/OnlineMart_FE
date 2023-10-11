import { InboxOutlined } from "@ant-design/icons";
import SelectOrCreate from "@app/app/components/common/Select/SelectOrCreate";
import { useAddCategoryMutation } from "@app/store/slices/api/categoryApi";
import { isEntityError, notifySuccess } from "@app/utils/helper";
import { Button, Col, Form, Input, Radio, RadioChangeEvent, Row, Upload, UploadFile } from "antd";
import Checkbox, { CheckboxChangeEvent } from "antd/es/checkbox";
import type { UploadProps } from "antd/es/upload/interface";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { SelectCategory } from "../create/components";

import * as S from "./Category.styles";

const { Dragger } = Upload;

const CreateCategory = ({ data, setIsModalOpen }: any) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [value, setValue] = useState(1);
  const [, setFile] = useState<UploadFile>();
  const [checked, setChecked] = useState(false);

  const [addCategory, { isLoading, error }] = useAddCategoryMutation();

  const onChangeRadio = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const props: UploadProps = {
    onRemove: () => {
      setFile(undefined);
    },
    beforeUpload: (file) => {
      setFile(file);

      return false;
    },
  };

  const handleSubmit = async (fieldValues: any) => {
    try {
      const { name, children_category, image, status, meta_title, meta_keywords, meta_description } = fieldValues;
      const formData = new FormData();
      formData.append("name", name);
      formData.append("parent_id", children_category.selectedValue.at(-1));
      formData.append("status", status);
      formData.append("shop_id", "1");
      formData.append("thumbnail_url", image);
      if (checked) {
        formData.append("meta_title", meta_title);
        formData.append("meta_keywords", meta_keywords);
        formData.append("meta_description", meta_description);
      }
      await addCategory(formData).unwrap();
      notifySuccess("Added category", "Successfully");
      setIsModalOpen(false);
      form.resetFields();
    } catch (err) {
      console.log("Error = ", err);
    }
  };

  const errorForm: any = useMemo(() => {
    const errorResult = error;

    if (isEntityError(errorResult)) {
      return errorResult.data.errors;
    }

    return null;
  }, [error]);

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.file;
  };

  const onChangeCheckBox = (e: CheckboxChangeEvent) => {
    setChecked(e.target.checked);
  };

  return (
    <Form
      form={form}
      autoComplete="off"
      initialValues={{
        status: "1",
      }}
      onFinish={handleSubmit}
      onFinishFailed={(error) => {
        console.log({ error });
      }}
    >
      <Row gutter={16} justify="space-between">
        <Col span={checked ? 12 : 24}>
          <S.FormField
            name="name"
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
            name="children_category"
            label="Danh mục cha"
            rules={[
              {
                required: true,
                message: "Danh mục cha không được để trống",
              },
            ]}
            validateStatus={errorForm?.parent_id ? "error" : ""}
            help={errorForm?.parent_id && errorForm?.parent_id[0]}
          >
            <SelectCategory optionsSelect={data} />
          </S.FormField>

          <S.FormField
            name="image"
            label={t("admin_shop.categories.image_label")}
            // rules={[
            //   {
            //     required: true,
            //     message: t("admin_shop.categories.image_err"),
            //   },
            // ] }
            valuePropName="file"
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
            <Radio.Group onChange={onChangeRadio} value={value}>
              <Radio value="1" checked>
                {t("admin_shop.categories.show_status")}
              </Radio>
              <Radio value="0">{t("admin_shop.categories.hide_status")}</Radio>
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
            <S.FormField name="meta_title" label={t("admin_shop.categories.meta_title")} rules={[{ min: 6 }]}>
              <Input placeholder={t("admin_shop.categories.name")} />
            </S.FormField>

            <S.FormField name="meta_keywords" label={t("admin_shop.categories.meta_keyword")}>
              <SelectOrCreate
                isMultiple
                onSelected={(value: any) => {
                  form.setFieldsValue({ meta_keywords: value });
                }}
                placeholder={t("admin_shop.categories.meta_keyword")}
              />
            </S.FormField>

            <S.FormField name="meta_description" label={t("admin_shop.categories.meta_desc")} rules={[{ min: 6 }]}>
              <Input.TextArea rows={3} />
            </S.FormField>
          </Col>
        )}
      </Row>

      <S.FormField className="text-right">
        <Button size="large" loading={isLoading} type="primary" htmlType="submit">
          {t("admin_shop.categories.button_form")}
        </Button>
      </S.FormField>
    </Form>
  );
};

export default CreateCategory;
