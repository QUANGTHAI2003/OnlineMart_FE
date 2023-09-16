import { EditOutlined } from "@ant-design/icons";
import facebookImg from "@app/app/assets/icons/facebook.png";
import googleImg from "@app/app/assets/icons/google.png";
import avatarImg from "@app/app/assets/images/10.png";
import { faEnvelope, faEye, faImage, faLock, faPhone, faShield, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { MenuProps, RadioChangeEvent } from "antd";
import { Button, Col, DatePicker, Dropdown, Form, Image, Input, Radio, Row, Space, Upload } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import EditEmail from "./components/EditEmail";
import EditPassword from "./components/EditPassword";
import EditPhone from "./components/EditPhone";
import * as S from "./UserProfile.styles";

const onFinish = (fieldValues: any) => {
  const values = {
    ...fieldValues,
    "date-picker": fieldValues["date-picker"] ? fieldValues["date-picker"].format("DD-MM-YYYY") : "",
  };

  console.log(values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  name?: string;
  nickname?: string;
  gender?: string;
  date?: Date;
};

const UserProfile = () => {
  const { t } = useTranslation();

  const [value, setValue] = useState(1);
  const onChangeRadio = (e: RadioChangeEvent) => {
    const radioValue = e.target?.value;
    setValue(radioValue);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Upload>
          <FontAwesomeIcon icon={faImage} className="mr-3 text-[#b6b6be]" />
          {t("user.account_user_page.avatar_see")}
        </Upload>
      ),
    },
    {
      key: "2",
      label: (
        <Upload>
          <FontAwesomeIcon icon={faEye} className="mr-3 text-[#b6b6be]" />
          {t("user.account_user_page.avatar_update")}
        </Upload>
      ),
    },
    {
      key: "3",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          <FontAwesomeIcon icon={faTrashCan} className="mr-3 text-[#b6b6be]" />
          {t("user.account_user_page.avatar_delete")}
        </a>
      ),
    },
  ];

  return (
    <S.UserProfile>
      <div className="main_title">{t("user.account_user_page.account_information")}</div>
      <Row className="row_userProfile">
        <div className="myProfile_title">{t("user.account_user_page.my_profile")}</div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true, gender: 1 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="content_profile"
        >
          <S.UserProfileLeft>
            <Row gutter={[0, 0]} className="row_profile">
              <Col xs={24} sm={24} md={24} lg={5} xl={6} className="col_leftProfile">
                <div className="avatar">
                  <Dropdown menu={{ items }} placement="bottom" arrow={{ pointAtCenter: true }}>
                    <Image src={avatarImg} alt="avatar.png" preview={false} className="img" />
                  </Dropdown>
                  <Space direction="vertical" className="avatar_space">
                    <EditOutlined className="editOutline" />
                  </Space>
                </div>
              </Col>

              <Col xs={24} sm={24} md={24} lg={19} xl={18} className="col_rightProfile">
                <Row gutter={[0, 12]}>
                  <Col span={24}>
                    <Form.Item<FieldType>
                      name="name"
                      rules={[
                        { required: true, message: t("user.account_user_page.valid.name_required") },
                        { whitespace: true },
                        { min: 2 },
                      ]}
                      hasFeedback
                      label={t("user.account_user_page.name")}
                    >
                      <Input className="w-full" placeholder={t("user.account_user_page.name_placeholder")} />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item<FieldType>
                      name="nickname"
                      rules={[{ whitespace: true }, { min: 3 }, { max: 20 }]}
                      hasFeedback
                      label={t("user.account_user_page.nickname")}
                    >
                      <Input className="w-full" placeholder={t("user.account_user_page.nickname_placeholder")} />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>

              <Col className="col_bottomProfile">
                <Row justify="start" gutter={[0, 12]}>
                  <Col span={24}>
                    <Form.Item<FieldType>
                      name="date-picker"
                      hasFeedback
                      label={t("user.account_user_page.birthday")}
                      labelCol={{ span: 6 }}
                      labelAlign="left"
                    >
                      <DatePicker className="date-picker w-full" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item<FieldType>
                      name="gender"
                      // rules={[{ required: true, message: t("user.account_user_page.valid.gender_required") }]}
                      label={t("user.account_user_page.gender")}
                      labelCol={{ span: 6 }}
                      labelAlign="left"
                    >
                      <Radio.Group
                        onChange={onChangeRadio}
                        value={value}
                        className="radioGroup_item radio_group"
                        // defaultValue={1}
                      >
                        <Radio value={1}>{t("user.account_user_page.male")}</Radio>
                        <Radio value={2}>{t("user.account_user_page.female")}</Radio>
                        <Radio value={3}>{t("user.account_user_page.other_gender")}</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item className="save_button">
                      <Button className="px-5" type="primary" htmlType="submit">
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
                      <p>0359874563</p>
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
                      <p className="email_address">nguyenhoanglich1661@gmail.comgggggggggggggtttttttteeeeeee</p>
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

              <div className="content_item">
                <div className="info_item">
                  <FontAwesomeIcon icon={faShield} className="icon" />
                  <div className="detail_info_item">
                    <p>{t("user.account_user_page.pin")}</p>
                  </div>
                </div>
                <div>
                  <Space className="site-button-ghost-wrapper" wrap>
                    <Button type="primary" ghost>
                      {t("user.account_user_page.setting")}
                    </Button>
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
