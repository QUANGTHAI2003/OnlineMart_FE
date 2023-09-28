import { DownOutlined, EditOutlined, LogoutOutlined, PlusCircleOutlined, UserOutlined } from "@ant-design/icons";
import avatarAdmin from "@app/app/assets/images/avatar_admin.png";
import { Divider, Button, Avatar, Dropdown } from "antd";
import type { MenuProps } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "../AdminMainHeader.styles";
import AccountSkeleton from "../skeletons/AccountSkeleton";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: "3",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
];

const AccountItem = () => {
  const { t } = useTranslation();

  const [loadingSkeletonCount, setLoadingSkeletonCount] = useState<boolean>(false);

  useEffect(() => {
    setLoadingSkeletonCount(true);
    setTimeout(() => {
      setLoadingSkeletonCount(false);
    }, 3000);
  }, []);

  return (
    <div>
      {loadingSkeletonCount ? (
        <AccountSkeleton count={1} />
      ) : (
        <S.AccountItem>
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            dropdownRender={() => (
              <S.AccountUl className="ul">
                <li className="li info">
                  <span>
                    <div className="flex_info">
                      <div className="avatar">
                        <Avatar className="avatar_cicle" src={<img src={avatarAdmin} alt="avatar" />} />
                      </div>
                      <div className="content">
                        <div className="name">Nguyễn Hoàng Lịchrrrrrrrrreeeeeee</div>
                        <div className="email">nguyenhoanglich1661@gmail.comppppppggg</div>
                      </div>
                    </div>
                  </span>
                </li>

                <li className="li">
                  <span>
                    <a href="ff">
                      <span className="icon">
                        <UserOutlined />
                      </span>
                      <span>{t("admin_shop.header.profile")}</span>
                    </a>
                  </span>
                </li>
                <li className="li">
                  <span>
                    <a href="ff">
                      <span className="icon">
                        <EditOutlined />
                      </span>
                      <span>{t("admin_shop.header.change_password")}</span>
                    </a>
                  </span>
                </li>

                <li className="divider">
                  <Divider className="divider_item" />
                </li>

                <li className="li">
                  <span>
                    <a href="ff">
                      <span className="icon">
                        <PlusCircleOutlined />
                      </span>
                      <span>{t("admin_shop.header.add_another_account")}</span>
                    </a>
                  </span>
                </li>
                <li className="li">
                  <span>
                    <a href="ff">
                      <span className="icon">
                        <LogoutOutlined />
                      </span>
                      <span>{t("admin_shop.header.logout")}</span>
                    </a>
                  </span>
                </li>
              </S.AccountUl>
            )}
          >
            <Button onClick={(e) => e.preventDefault()} className="button account_button">
              <div className="button_item">
                <Avatar src={<img src={avatarAdmin} alt="avatar" />} className="avatar" />
                <div className="name">nguyenhoanglich1661@gmail.com</div>
                <DownOutlined className="icon" />
              </div>
            </Button>
          </Dropdown>
        </S.AccountItem>
      )}
    </div>
  );
};

export default AccountItem;
