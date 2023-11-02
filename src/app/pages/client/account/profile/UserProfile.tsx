import { EditOutlined } from "@ant-design/icons";
import facebookImg from "@app/app/assets/images/facebook.png";
import googleImg from "@app/app/assets/images/google.png";
import { useDeleteUserAvatarMutation, useUpdateUserMutation } from "@app/store/slices/api/userApi";
import { useAppSelector } from "@app/store/store";
import { formatDate, isEntityError, notifyError, notifySuccess } from "@app/utils/helper";
import { faEnvelope, faEye, faLock, faPhone, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { MenuProps, RadioChangeEvent, UploadProps } from "antd";
import { Button, Col, DatePicker, Dropdown, Form, Image, Input, message, Radio, Row, Space, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import EditEmail from "./components/EditEmail";
import EditPassword from "./components/EditPassword";
import EditPhone from "./components/EditPhone";
import * as S from "./UserProfile.styles";

type FieldType = {
  name?: string;
  nickname?: string;
  gender?: string;
  birthday?: any;
};

const baseImage = import.meta.env.VITE_BASE_IMAGE_URL as string;
const baseUrl = import.meta.env.VITE_API_BASE_URL as string;
const acceptedAvatar = ["image/png", "image/jpg", "image/jpeg", "image/gif", "image/svg", "image/webp"];
const acceptedSize = 1024 * 1024 * 2; // 2MB

const UserProfile = () => {
  const { t } = useTranslation();

  const [value, setValue] = useState<number>(1);
  const [visible, setVisible] = useState<boolean>(false);

  const user = useAppSelector((state) => state.userState.user);

  const [updateUser, { isLoading, error }] = useUpdateUserMutation(user);
  const [deleteUserAvatar] = useDeleteUserAvatarMutation();

  const onChangeRadio = (e: RadioChangeEvent) => {
    const radioValue = e.target?.value;
    setValue(radioValue);
  };

  const onFinish = async (fieldValues: FieldType) => {
    const values = {
      ...fieldValues,
      birthday: fieldValues["birthday"] ? fieldValues["birthday"].format("YYYY-MM-DD") : "",
      id: user.id,
    };

    try {
      await updateUser(values).unwrap();
      notifySuccess("Successfully", "Update user information successfully");
    } catch (err) {
      notifyError("Error", "Update user information failed");
    }
  };

  const handleDeleteAvatar = async () => {
    try {
      await deleteUserAvatar(user.id).unwrap();
      notifySuccess("Successfully", "Delete avatar successfully");
    } catch (err) {
      notifyError("Error", "Delete avatar failed");
    }
  };

  const errorForm: any = useMemo(() => {
    const errorResult = error;

    if (isEntityError(errorResult)) {
      return errorResult.data.errors;
    }

    return null;
  }, [error]);

  const props: UploadProps = {
    name: "avatar",
    method: "PATCH",
    accept: acceptedAvatar.join(","),
    showUploadList: false,
    action: `${baseUrl}/api/user/${user?.id}`,
    beforeUpload: (file) => {
      if (!acceptedAvatar.includes(file.type)) {
        message.error(`${file.name} is not a valid image file`);
      }

      const isLt2M = file.size < acceptedSize;

      if (!isLt2M) {
        message.error("Image must smaller than 2MB");
      }

      return acceptedAvatar.includes(file.type) && isLt2M;
    },
    onChange(info) {
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const items: MenuProps["items"] = [
    {
      key: 1,
      label: (
        <ImgCrop rotationSlider aspectSlider showReset resetText="reset" showGrid cropShape="round">
          <Upload {...props}>
            <FontAwesomeIcon icon={faEye} className="mr-3 text-[#b6b6be]" />
            {t("user.account_user_page.avatar_update")}
          </Upload>
        </ImgCrop>
      ),
    },
    {
      key: 2,
      label: (
        <div role="button" tabIndex={0} onClick={handleDeleteAvatar} onKeyDown={handleDeleteAvatar}>
          <FontAwesomeIcon icon={faTrashCan} className="mr-3 text-[#b6b6be]" />
          {t("user.account_user_page.avatar_delete")}
        </div>
      ),
    },
  ];

  const initialValues = {
    full_name: user.full_name,
    user_name: user.user_name,
    birthday: formatDate(user.birthday),
    gender: user.gender,
  };

  return (
    <S.UserProfile>
      <div className="main_title">{t("user.account_user_page.account_information")}</div>
      <Row className="row_userProfile">
        <div className="myProfile_title">{t("user.account_user_page.my_profile")}</div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          initialValues={initialValues}
          onFinish={onFinish}
          autoComplete="off"
          className="content_profile"
        >
          <S.UserProfileLeft>
            <Row className="row_profile">
              <Col xs={24} sm={24} md={24} lg={5} xl={6} className="col_leftProfile">
                <div className="avatar">
                  <Image
                    src={`${baseImage}/${user?.avatar}`}
                    alt={user?.full_name}
                    width={120}
                    height={120}
                    preview={{
                      visible: visible,
                      onVisibleChange: (value) => {
                        setVisible(value);
                      },
                    }}
                    fallback={`https://ui-avatars.com/api/?name=${user?.full_name}&background=random&rounded=true&size=120`}
                    className="img object-cover"
                  />
                  <Dropdown trigger={["click"]} menu={{ items }} placement="bottom" arrow={{ pointAtCenter: true }}>
                    <Space direction="vertical" className="avatar_space">
                      <EditOutlined className="editOutline" />
                    </Space>
                  </Dropdown>
                </div>
              </Col>

              <Col xs={24} sm={24} md={24} lg={19} xl={18} className="col_rightProfile">
                <Row gutter={[0, 12]}>
                  <Col span={24}>
                    <Form.Item
                      label={t("user.account_user_page.name")}
                      name="full_name"
                      hasFeedback
                      rules={[
                        { required: true, message: t("user.account_user_page.valid.name_required") },
                        { whitespace: true },
                        { min: 2 },
                      ]}
                      validateStatus={errorForm?.full_name && "error"}
                      help={errorForm?.full_name && errorForm?.full_name[0]}
                    >
                      <Input
                        size="middle"
                        className="w-full"
                        placeholder={t("user.account_user_page.name_placeholder")}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      label={t("user.account_user_page.nickname")}
                      name="user_name"
                      hasFeedback
                      rules={[{ whitespace: true }, { min: 3 }, { max: 20 }]}
                      validateStatus={errorForm?.user_name && "error"}
                    >
                      <Input
                        size="middle"
                        className="w-full"
                        placeholder={t("user.account_user_page.nickname_placeholder")}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>

              <Col className="col_bottomProfile">
                <Row justify="start" gutter={[0, 12]}>
                  <Col span={24}>
                    <Form.Item
                      label={t("user.account_user_page.birthday")}
                      name="birthday"
                      hasFeedback
                      labelCol={{ span: 6 }}
                      labelAlign="left"
                      validateStatus={errorForm?.birthday && "error"}
                      help={errorForm?.birthday && errorForm?.birthday[0]}
                    >
                      <DatePicker size="middle" className="date-picker w-full" format="DD/MM/YYYY" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label={t("user.account_user_page.gender")}
                      name="gender"
                      labelCol={{ span: 6 }}
                      labelAlign="left"
                      hasFeedback
                    >
                      <Radio.Group onChange={onChangeRadio} value={value}>
                        <Radio value="0">{t("user.account_user_page.male")}</Radio>
                        <Radio value="1">{t("user.account_user_page.female")}</Radio>
                        <Radio value="2">{t("user.account_user_page.other_gender")}</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item>
                      <Button loading={isLoading} className="px-5" type="primary" htmlType="submit">
                        {t("user.account_user_page.save")}
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
          </S.UserProfileLeft>

          <S.UserProfileRight>
            <div className="phoneEmail profileRight_item">
              <p className="title_item">{t("user.account_user_page.phone_email")}</p>
              <div className="gap_phoneEmail">
                <div className="content_item">
                  <div className="info_item">
                    <FontAwesomeIcon icon={faPhone} className="icon" />
                    <div className="detail_info_item">
                      <p>{t("user.account_user_page.phone")}</p>
                      <p>{user.phone || "Vui lòng cập nhật số điện thoại"}</p>
                    </div>
                  </div>
                  <div className="update">
                    <Space className="site-button-ghost-wrapper" wrap>
                      <EditPhone />
                    </Space>
                  </div>
                </div>

                <div className="content_item email_item">
                  <div className="info_item email_item_info">
                    <FontAwesomeIcon icon={faEnvelope} className="icon" />
                    <div className="detail_info_item">
                      <p>{t("user.account_user_page.email")}</p>
                      <p className="email_address">{user.email || "Vui lòng cập nhật địa chỉ email"}</p>
                    </div>
                  </div>
                  <div className="update">
                    <Space className="site-button-ghost-wrapper" wrap>
                      <EditEmail />
                    </Space>
                  </div>
                </div>
              </div>
            </div>

            <div className="security profileRight_item">
              <p className="title_item">{t("user.account_user_page.security")}</p>
              <div className="content_item">
                <div className="info_item">
                  <FontAwesomeIcon icon={faLock} className="icon" />
                  <div className="detail_info_item">
                    <p>{t("user.account_user_page.change_password")}</p>
                  </div>
                </div>
                <div>
                  <Space className="site-button-ghost-wrapper" wrap>
                    <EditPassword />
                  </Space>
                </div>
              </div>
            </div>

            <div className="network profileRight_item">
              <p className="title_item">{t("user.account_user_page.social_network")}</p>
              <div className="content_item">
                <div className="info_item">
                  <img src={facebookImg} alt="Facebook" className="icon social_icon" />
                  <div className="detail_info_item">
                    <p>Facebook</p>
                  </div>
                </div>
                <div>
                  <Space className="site-button-ghost-wrapper" wrap>
                    <Button type="primary" ghost>
                      {t("user.account_user_page.connect")}
                    </Button>
                  </Space>
                </div>
              </div>

              <div className="content_item">
                <div className="info_item">
                  <img src={googleImg} alt="Google" className="icon social_icon" />
                  <div className="detail_info_item">
                    <p>Google</p>
                  </div>
                </div>
                <div>
                  <Space>
                    <Button type="text" disabled className="text-blue-500 bg-[#f5f5fa]">
                      {t("user.account_user_page.connected")}
                    </Button>
                  </Space>
                </div>
              </div>
            </div>
          </S.UserProfileRight>
        </Form>
      </Row>
    </S.UserProfile>
  );
};

export default UserProfile;
