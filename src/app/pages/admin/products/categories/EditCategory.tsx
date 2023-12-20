import { InboxOutlined } from "@ant-design/icons";
import SelectOrCreate from "@app/app/components/common/Select/SelectOrCreate";
import { useGetCategoryByIdQuery, useUpdateCategoryMutation } from "@app/store/slices/api/categoryApi";
import { handleApiError } from "@app/utils/helper";
import { Button, Col, Form, Input, Radio, RadioChangeEvent, Row, Upload, UploadFile, UploadProps } from "antd";
import Checkbox, { CheckboxChangeEvent } from "antd/es/checkbox";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { SelectCategory } from "../create/components";

import * as S from "./Category.styles";

const { Dragger } = Upload;

const baseImageUrl = import.meta.env.VITE_BASE_IMAGE_URL + "/";

const EditCategory = ({ id, dataCategory }: any) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { data } = useGetCategoryByIdQuery(id, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });
  const [updateCategory] = useUpdateCategoryMutation();

  const [value, setValue] = useState(1);
  const [checked, setChecked] = useState(false);
  const [file, setFile] = useState<UploadFile>({
    uid: "-1",
    name: data?.name,
    status: "done",
    url: baseImageUrl + data?.thumbnail_url,
  });

  const handleSubmit = async (fieldValues: any) => {
    try {
      const { name, children_category, status, image, meta_title, meta_keywords, meta_description } = fieldValues;
      const formData = new FormData();
      formData.append("name", name);
      formData.append("parent_id", children_category.selectedValue.at(-1));
      formData.append("status", status);
      formData.append("thumbnail_url", image);
      if (checked) {
        formData.append("meta_title", meta_title);
        formData.append("meta_keywords", meta_keywords);
        formData.append("meta_description", meta_description);
      }

      await updateCategory({ formData, id }).unwrap();
    } catch (err) {
      handleApiError(err);
    }
  };

  const onChangeRadio = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const onChangeCheckBox = (e: CheckboxChangeEvent) => {
    setChecked(e.target.checked);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.file;
  };

  const props: UploadProps = {
    fileList: [file],
    onRemove: () => {
      setFile({
        uid: "-1",
        name: "",
        status: "done",
        url: "",
      });
    },
    beforeUpload: (newFile) => {
      if (newFile.uid !== file.uid) {
        setFile({
          uid: newFile.uid,
          name: newFile.name,
          status: "done",
          url: baseImageUrl + newFile.name,
        });
      }

      return false;
    },
  };

  useEffect(() => {
    const metaKeywords = data?.meta_keywords?.split(",");

    const isSeo =
      data?.meta_title || data?.meta_description || data?.meta_keywords ? setChecked(true) : setChecked(false);

    form.setFieldsValue({
      name: data?.name,
      children_category: data?.parent_id_all,
      status: data?.status,
      meta_title: data?.meta_title,
      meta_keywords: metaKeywords,
      meta_description: data?.meta_description,
      seo: isSeo,
    });
  }, [data, form]);

  return (
    <Form form={form} autoComplete="off" onFinish={handleSubmit}>
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
          >
            <SelectCategory optionsSelect={dataCategory} />
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
          <Col span={12}>
            <S.FormField name="meta_title" label={t("admin_shop.categories.meta_title")} rules={[{ min: 6 }]}>
              <Input placeholder={t("admin_shop.categories.name")} />
            </S.FormField>

            <S.FormField name="meta_keywords" label={t("admin_shop.categories.meta_keyword")}>
              <SelectOrCreate
                isMultiple
                initValue={data?.meta_keywords?.split(",")}
                onSelected={(value: any) => {
                  form.setFieldsValue({ meta_keywords: value });
                }}
                placeholder={t("admin_shop.categories.meta_keyword")}
              />
            </S.FormField>

            <S.FormField name="meta_description" label={t("admin_shop.categories.meta_desc")} rules={[{ min: 6 }]}>
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

export default EditCategory;
