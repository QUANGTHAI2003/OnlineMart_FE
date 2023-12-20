import { Can, PermissionsSwitch } from "@app/app/components/common/Permissions";
import { useGetAllRoleQuery } from "@app/store/slices/api/admin/roleApi";
import { useAddSellerMutation } from "@app/store/slices/api/admin/sellerApi";
import { handleApiError, isEntityError } from "@app/utils/helper";
import { Button, Col, Form, Input, Modal, Row, Select, Spin } from "antd";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const RegisterEmployess = ({ permissionList }: any) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);

  const { data: roles } = useGetAllRoleQuery();

  const [addSeller, { isLoading, error }] = useAddSellerMutation();

  const handleSubmit = async (fieldValues: any) => {
    try {
      const values = {
        ...fieldValues,
      };
      await addSeller(values).unwrap();
      !isLoading && handleCancel();
      form.resetFields();
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
      <PermissionsSwitch>
        <Can permissions={["Authorizations"]}>
          <Button type="primary" onClick={showModal}>
            {t("admin_shop.seller.link_register")}
          </Button>
        </Can>
        <Can>
          <Button disabled type="primary">
            {t("admin_shop.seller.link_register")}
          </Button>
        </Can>
      </PermissionsSwitch>

      <Modal
        title={t("admin_shop.seller.register.title")}
        open={open}
        width={700}
        centered
        onCancel={handleCancel}
        footer={null}
      >
        <Spin spinning={isLoading} className="p-5">
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
              <Col span={12}>
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
                  <Input size="middle" placeholder={t("admin_shop.seller.register.form.placeholder")} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label={t("admin_shop.seller.register.form.email")}
                  rules={[{ required: true }, { type: "email" }]}
                  hasFeedback
                  validateStatus={errorForm?.email && "error"}
                  help={errorForm?.email && errorForm?.email[0]}
                >
                  <Input size="middle" placeholder={t("admin_shop.seller.register.form.placeholder")} />
                </Form.Item>
              </Col>
              <Col span={12}>
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
                    options={permissionList?.map((item: any) => ({
                      value: item.id,
                      label: item.name,
                    }))}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
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

              <Col span={12}>
                <Form.Item
                  name="phone"
                  label={t("admin_shop.seller.register.form.phone")}
                  rules={[
                    {
                      required: true,
                    },
                    {
                      pattern: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
                    },
                  ]}
                  hasFeedback
                  validateStatus={errorForm?.phone && "error"}
                  help={errorForm?.phone && errorForm?.phone[0]}
                >
                  <Input size="middle" placeholder={t("admin_shop.seller.register.form.placeholder")} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="password"
                  label={t("admin_shop.seller.register.form.password")}
                  rules={[
                    {
                      required: true,
                    },
                    { min: 6 },
                    { max: 16 },
                  ]}
                  hasFeedback
                  validateStatus={errorForm?.password && "error"}
                  help={errorForm?.password && errorForm?.password[0]}
                >
                  <Input.Password size="middle" placeholder={t("admin_shop.seller.register.form.placeholder")} />
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

export default RegisterEmployess;
