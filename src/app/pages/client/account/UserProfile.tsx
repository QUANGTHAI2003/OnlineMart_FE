import { EditOutlined } from "@ant-design/icons";
import { IconFacebook } from "@app/app/assets/icons";
import avatarImg from "@app/app/assets/images/10.png";
import googleImg from "@app/app/assets/images/google.png";
import { faEnvelope, faEye, faImage, faLock, faPhone, faShield, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { MenuProps, RadioChangeEvent } from "antd";
import { Button, Col, DatePicker, Dropdown, Image, Input, Radio, Row, Space, Upload } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const UserProfile = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <>
      <div className="text-xl mb-3">{t("user.account_user_page.account_information")}</div>
      {/* Content */}
      <Row className="bg-[#ffffff] p-5 rounded-lg border-solid border-2 border-[#f5f5fa]">
        {/* Left */}
        <Col span={12} className="w-1/2">
          <div className="mb-3 text-base text-[#64646d]">{t("user.account_user_page.my_profile")}</div>
          <Row className="w-full">
            <Col className="w-3/12">
              <div className="relative cursor-pointer">
                <Dropdown menu={{ items }} placement="bottom" arrow={{ pointAtCenter: true }}>
                  <Image
                    src={avatarImg}
                    alt="avatar.png"
                    preview={false}
                    className="w-28 rounded-full border-solid border-4 border-[#c2e1ff]"
                  />
                </Dropdown>
                <Space direction="vertical" className="absolute bottom-1 right-4 z-10">
                  <EditOutlined className="w-4 h-4 bg-[#64646d] p-1 rounded-full text-white" />
                </Space>
              </div>
              <p className="text-sm mt-7 text-[#333333]">{t("user.account_user_page.birthday")}</p>
              <p className="text-sm my-10 text-[#333333]">{t("user.account_user_page.gender")}</p>
            </Col>

            <Col className="w-3/4 px-5 py-3">
              <div className="mb-7">
                <div className="flex items-center mb-7">
                  <p className="w-2/5 text-[#333333]">{t("user.account_user_page.name")}</p>
                  <Input placeholder={t("user.account_user_page.name_placeholder")} />
                </div>
                <div className="flex items-center mb-8">
                  <p className="w-2/5 text-[#333333]">{t("user.account_user_page.nickname")}</p>
                  <Input placeholder={t("user.account_user_page.nickname_placeholder")} />
                </div>
              </div>
              <div className="mb-7">
                <Space className="w-full" direction="vertical">
                  <DatePicker className="w-full" />
                </Space>
              </div>
              <div className="mb-7">
                <Radio.Group onChange={onChangeRadio} value={value}>
                  <Radio value={1}>{t("user.account_user_page.male")}</Radio>
                  <Radio value={2}>{t("user.account_user_page.female")}</Radio>
                  <Radio value={3}>{t("user.account_user_page.other_gender")}</Radio>
                </Radio.Group>
              </div>
              <Space wrap>
                <Button className="px-5" type="primary">
                  {t("user.account_user_page.save")}
                </Button>
              </Space>
            </Col>
          </Row>
        </Col>

        {/* Right */}
        <Col span={12} className="w-1/2 border-solid border border-s-[#f5f5fa] border-[#fff] pl-5">
          <div>
            <p className="text-base text-[#64646d] mt-3">{t("user.account_user_page.phone_email")}</p>
            <div className="flex place-content-between items-center py-4">
              <div className="flex items-center">
                <div className="mr-3 text-lg">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div className="text-sm text-[#38383d] mx-1">
                  <p className="mb-1.5">{t("user.account_user_page.phone")}</p>
                  <p>0359874563</p>
                </div>
              </div>
              <div>
                <Space className="site-button-ghost-wrapper" wrap>
                  <Button type="primary" ghost>
                    {t("user.account_user_page.update")}
                  </Button>
                </Space>
              </div>
            </div>

            <div className="flex place-content-between items-center py-4">
              <div className="flex items-center">
                <div className="mr-3 text-lg">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div className="text-sm text-[#38383d] mx-1">
                  <p className="mb-1.5">{t("user.account_user_page.email")}</p>
                  <p>nguyenhoanglich1661@gmail.com</p>
                </div>
              </div>

              <div>
                <Space className="site-button-ghost-wrapper" wrap>
                  <Button type="primary" ghost>
                    {t("user.account_user_page.update")}
                  </Button>
                </Space>
              </div>
            </div>
          </div>

          <div>
            <p className="text-base text-[#64646d] mt-3">{t("user.account_user_page.security")}</p>
            <div className="flex place-content-between items-center py-4">
              <div className="flex items-center">
                <div className="mr-3 text-lg">
                  <FontAwesomeIcon icon={faLock} />
                </div>
                <div className="text-sm text-[#38383d] mx-1">
                  <p className="mb-1.5">{t("user.account_user_page.change_password")}</p>
                </div>
              </div>

              <div>
                <Space className="site-button-ghost-wrapper" wrap>
                  <Button type="primary" ghost>
                    {t("user.account_user_page.update")}
                  </Button>
                </Space>
              </div>
            </div>

            <div className="flex place-content-between items-center py-4">
              <div className="flex items-center">
                <div className="mr-3 text-lg">
                  <FontAwesomeIcon icon={faShield} />
                </div>
                <div className="text-sm text-[#38383d] mx-1">
                  <p className="mb-1.5">{t("user.account_user_page.pin")}</p>
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

          <div>
            <p className="text-base text-[#64646d] mt-3">{t("user.account_user_page.social_network")}</p>
            <div className="flex place-content-between items-center py-4">
              <div className="flex items-center">
                <div className="mr-3 text-lg">
                  <IconFacebook />
                </div>
                <div className="text-sm text-[#38383d] mx-1">
                  <p className="mb-1.5">Facebook</p>
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

            <div className="flex place-content-between items-center py-4">
              <div className="flex items-center">
                <div className="mr-3 text-lg">
                  <img src={googleImg} alt="Google" width="22" />
                </div>
                <div className="text-sm text-[#38383d] mx-1">
                  <p className="mb-1.5">Google</p>
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
        </Col>
      </Row>
    </>
  );
};

export default UserProfile;
