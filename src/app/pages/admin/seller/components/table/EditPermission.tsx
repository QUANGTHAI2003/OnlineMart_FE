import { useGetAllRoleQuery } from "@app/store/slices/api/admin/roleApi";
import { useUpdateSellerMutation } from "@app/store/slices/api/admin/sellerApi";
import { handleApiError, isEntityError, notifySuccess } from "@app/utils/helper";
import { Button, Col, Form, Input, Modal, Row, Select, Spin } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

interface IEditPermissionProps {
  data: any;
  permissions: any;
  isFetching: boolean;
  disabled?: boolean;
}
const EditPermission = ({ data, permissions, isFetching, disabled = false }: IEditPermissionProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);

  const { data: roles, isFetching: isFetchingRole } = useGetAllRoleQuery();
  const [updateSeller, { isLoading, error }] = useUpdateSellerMutation();

  useEffect(() => {
    form.setFieldsValue({
      name: data?.name,
      email: data?.email,
      phone: data?.phone,
      permissions: data?.permissions.map((item: any) => item.id),
      role: data?.roles.map((item: any) => item.id),
    });
  }, [data?.email, data?.name, data?.permissions, data?.phone, data?.roles, form]);

  const handleSubmit = async (fieldValues: any) => {
    try {
      const values = {
        ...fieldValues,
        phone: data?.phone,
        email: data?.email,
      };

      await updateSeller({
        id: data?.id,
        body: values,
      }).unwrap();

      notifySuccess("Update seller successfully");

      !isLoading && handleCancel();
    } catch (error) {
      handleApiError(error);
    }
  };

  const errorForm: any = useMemo(() => {
    const errorResult = error;

    if (isEntityError(errorResult)) {
      return errorResult.data.errors;
    }

    return null;
  }, [error]);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const validateMessages = {
    required: "${label} " + t("admin_shop.seller.register.form.validate_required"),
    types: {
      email: "${label} " + t("admin_shop.seller.register.form.validate_type"),
    },
    pattern: {
      mismatch: "${label} " + t("admin_shop.seller.register.form.validate_type"),
    },
    string: {
      min: "${label} " + t("admin_shop.seller.register.form.validate_min", { min: "${min}" }),
      max: "${label} " + t("admin_shop.seller.register.form.validate_max", { max: "${max}" }),
    },
  };

  return (
    <>
      <Button disabled={disabled} type="primary" ghost onClick={showModal}>
        {t("admin_shop.seller.table.edit")}
      </Button>
      <Modal
        title={t("admin_shop.seller.register.form.edit_permisions", {
          name: data?.name,
        })}
        open={open}
        width={700}
        centered
        onCancel={handleCancel}
        footer={null}
      >
        <Spin spinning={isFetching || isLoading} className="p-5">
          <Form
            form={form}
            name="register"
            onFinish={handleSubmit}
            validateMessages={validateMessages}
            autoComplete="off"
            layout="vertical"
            className="w-full p-4 border border-[#ebebf0] border-solid rounded-md"
          >
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="name"
                  label={t("admin_shop.seller.register.form.name")}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  hasFeedback
                  validateStatus={errorForm?.name && "error"}
                  help={errorForm?.name && errorForm?.name[0]}
                >
                  <Input
                    disabled
                    readOnly
                    size="middle"
                    placeholder={t("admin_shop.seller.register.form.placeholder")}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="permissions"
                  label={t("admin_shop.seller.register.form.permission")}
                  rules={[
                    {
                      required: true,
                      validator: (_, value) => {
                        if (value || form.getFieldValue("role")) {
                          return Promise.resolve();
                        }
                        return Promise.reject("You must select at least one of the two fields.");
                      },
                    },
                  ]}
                  hasFeedback
                  validateStatus={errorForm?.permissions && "error"}
                  help={errorForm?.permissions && errorForm?.permissions[0]}
                >
                  <Select
                    size="middle"
                    mode="multiple"
                    allowClear
                    placeholder={t("admin_shop.seller.register.form.placeholder_select")}
                    options={permissions?.map((item: any) => ({
                      value: item.id,
                      label: item.name,
                    }))}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="role"
                  label={t("admin_shop.seller.register.form.role")}
                  rules={[
                    {
                      required: true,
                      validator: (_, value) => {
                        if (value || form.getFieldValue("permissions")) {
                          return Promise.resolve();
                        }
                        return Promise.reject("You must select at least one of the two fields.");
                      },
                    },
                  ]}
                  hasFeedback
                  validateStatus={errorForm?.role && "error"}
                  help={errorForm?.role && errorForm?.role[0]}
                >
                  <Select
                    loading={isFetchingRole}
                    size="middle"
                    allowClear
                    mode="multiple"
                    placeholder={t("admin_shop.seller.register.form.placeholder_select")}
                    options={roles?.map((item: any) => ({
                      value: item.id,
                      label: item.name,
                    }))}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item className="mt-3">
              <Button loading={isLoading} htmlType="submit" block size="middle" type="primary">
                {t("admin_shop.seller.register.form.btn_submit")}
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </>
  );
};
export default EditPermission;
