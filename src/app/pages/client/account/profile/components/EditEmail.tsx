import ImgEmail from "@app/app/assets/images/email.png";
import { useUpdateUserMutation } from "@app/store/slices/api/userApi";
import { useAppSelector } from "@app/store/store";
import { isEntityError, notifyError, notifySuccess } from "@app/utils/helper";
import { Button, Form, Input, Modal } from "antd";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type FieldType = {
  email?: string;
};

const EditEmail = () => {
  const { t } = useTranslation();
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
      notifyError("Error", "Update email failed");
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

  return (
    <>
      <Button type="primary" ghost onClick={showModal}>
        {t("user.account_user_page.update")}
      </Button>
      <Modal
        title={t("user.account_user.account_information.edit_profile.title_email")}
        footer={null}
        centered
        open={open}
        onCancel={handleCancel}
      >
        <div className="p-4">
          <Form
            initialValues={{ email: user?.email }}
            onFinish={handleSubmit}
            autoComplete="off"
            layout="vertical"
            className="w-full p-4 border border-[#ebebf0] border-solid rounded-md"
          >
            <Form.Item<FieldType>
              label={t("user.account_user.account_information.edit_profile.label_email")}
              name="email"
              rules={[
                { required: true, message: t("user.account_user_page.valid.email_required") },
                { whitespace: true },
                { type: "email" },
              ]}
              hasFeedback
              validateStatus={errorForm?.email ? "error" : ""}
              help={errorForm?.email ? errorForm?.email[0] : ""}
            >
              <Input
                prefix={
                  <img
                    src={ImgEmail}
                    className="w-6 object-cover "
                    alt={t("user.account_user.account_information.edit_profile.placeholder_email")}
                  />
                }
                size="middle"
                placeholder={t("user.account_user.account_information.edit_profile.placeholder_email")}
              />
            </Form.Item>
            <Form.Item>
              <Button block size="middle" type="primary" htmlType="submit" loading={isLoading}>
                {t("user.account_user.account_information.edit_profile.button_change")}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default EditEmail;
