import ImgPhone from "@app/app/assets/images/phone.png";
import { useUpdateUserMutation } from "@app/store/slices/api/userApi";
import { useAppSelector } from "@app/store/store";
import { handleApiError, isEntityError, notifySuccess } from "@app/utils/helper";
import { Button, Form, Input, Modal } from "antd";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type FieldType = {
  phone?: string;
};

const EditPhone = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [open, setOpen] = useState<boolean>(false);

  const user = useAppSelector((state) => state.userState.user);

  const [updateUser, { isLoading, error }] = useUpdateUserMutation();

  const handleSubmit = async (fieldValues: FieldType) => {
    const values = {
      ...fieldValues,
      id: user?.id,
    };

    try {
      await updateUser(values).unwrap();
      setTimeout(() => {
        setOpen(false);
      }, 200);
      notifySuccess("Successfully", "Update email successfully");
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
    <div className="flex flex-col">
      <Button type="primary" ghost onClick={showModal}>
        {t("user.account_user_page.update")}
      </Button>
      <Modal
        title={t("user.account_user.account_information.edit_profile.title_phone")}
        footer={null}
        centered
        open={open}
        onCancel={handleCancel}
        confirmLoading={isLoading}
      >
        <div className="p-5">
          <Form
            form={form}
            name="phone"
            initialValues={{ phone: user?.phone }}
            onFinish={handleSubmit}
            autoComplete="off"
            className="w-full p-4 border border-[#ebebf0] border-solid rounded-md"
            layout="vertical"
          >
            <Form.Item<FieldType>
              name="phone"
              label={t("user.account_user.account_information.edit_profile.label_phone")}
              rules={[
                { required: true, message: t("user.account_user_page.valid.phone_required") },
                {
                  pattern: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
                  message: t("user.account_user_page.valid.phone_pattern"),
                },
              ]}
              hasFeedback
              validateStatus={errorForm?.phone && "error"}
              help={errorForm?.phone && errorForm?.phone[0]}
            >
              <Input
                prefix={
                  <img
                    src={ImgPhone}
                    className="w-6 object-cover"
                    alt={t("user.account_user.account_information.edit_profile.placeholder_phone")}
                  />
                }
                size="large"
                placeholder={t("user.account_user.account_information.edit_profile.placeholder_phone")}
              />
            </Form.Item>
            <Form.Item>
              <Button size="middle" block type="primary" htmlType="submit" loading={isLoading}>
                {t("user.account_user.account_information.edit_profile.button_change")}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default EditPhone;
