import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useUpdateUserMutation } from "@app/store/slices/api/userApi";
import { useAppSelector } from "@app/store/store";
import { handleApiError, isEntityError, notifySuccess } from "@app/utils/helper";
import { Button, Form, Input, Modal } from "antd";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type FieldType = {
  new_password: string;
  confirm_password: string;
};

const EditPassword = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [open, setOpen] = useState<boolean>(false);

  const user = useAppSelector((state) => state.userState.user);
  const [updateUser, { isLoading, error }] = useUpdateUserMutation();

  const handleSubmit = async (fieldValues: FieldType) => {
    const values = {
      password: fieldValues.new_password,
      id: user?.id,
    };

    try {
      await updateUser(values).unwrap();
      setTimeout(() => {
        setOpen(false);
      }, 200);

      form.resetFields();

      notifySuccess("Successfully", "Update password successfully");
    } catch (err) {
      handleApiError(err);
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
    form.resetFields();
  };

  return (
    <>
      <Button type="primary" ghost onClick={showModal}>
        {t("user.account_user_page.update")}
      </Button>
      <Modal
        title={t("user.account_user.account_information.edit_profile.title_password")}
        footer={null}
        centered
        open={open}
        onCancel={handleCancel}
      >
        <div className="p-5">
          <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            autoComplete="off"
            className="w-full p-4 border border-[#ebebf0] border-solid rounded-md"
          >
            <Form.Item
              label={t("user.account_user.account_information.edit_profile.new_password")}
              name="new_password"
              rules={[{ required: true, message: t("user.account_user_page.valid.password_new_required") }, { min: 6 }]}
              hasFeedback
              validateStatus={errorForm?.new_password && "error"}
              help={errorForm?.new_password && errorForm?.new_password[0]}
            >
              <Input.Password
                size="middle"
                placeholder={t("user.account_user.account_information.edit_profile.placeholder_new_password")}
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>
            <Form.Item
              label={t("user.account_user.account_information.edit_profile.enter_new_password")}
              name="confirm_password"
              dependencies={["new_password"]}
              rules={[
                { required: true, message: t("user.account_user_page.valid.password_new_confirm_required") },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("new_password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(t("user.account_user_page.valid.password_new_confirm_match"));
                  },
                }),
              ]}
              hasFeedback
              validateStatus={errorForm?.confirm_password && "error"}
              help={errorForm?.confirm_password && errorForm?.confirm_password[0]}
            >
              <Input.Password
                size="middle"
                placeholder={t("user.account_user.account_information.edit_profile.placeholder_enter_new_password")}
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>
            <Form.Item>
              <Button block size="large" htmlType="submit" type="primary" loading={isLoading}>
                {t("user.account_user.account_information.edit_profile.button_change")}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default EditPassword;
