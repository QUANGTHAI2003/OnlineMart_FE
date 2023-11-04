import { DownOutlined, EditOutlined, LogoutOutlined, PlusCircleOutlined, UserOutlined } from "@ant-design/icons";
import avatarAdmin from "@app/app/assets/images/avatar_admin.png";
import { useLogoutMutation } from "@app/store/slices/api/authApi";
import { logOut } from "@app/store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@app/store/store";
import { notifyError, notifySuccess } from "@app/utils/helper";
import { Avatar, Button, Divider, Dropdown } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import * as S from "../AdminSuperMainHeader.styles";
import AccountSkeleton from "../skeletons/AccountSkeleton";

const AccountItem = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.userState.user);
  const dispatch = useAppDispatch();

  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(logOut());
      notifySuccess("Successfully", "Logout successfully");

      isLoading || navigate("./auth/signin");
    } catch (err) {
      notifyError("Logout failed", "Something went wrong");
    }
  };

  return (
    <div>
      {isLoading ? (
        <AccountSkeleton count={1} />
      ) : (
        <S.AccountItem>
          <Dropdown
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
                        <div className="name">{user?.full_name}</div>
                        <div className="email">{user?.email}</div>
                      </div>
                    </div>
                  </span>
                </li>

                <li className="li">
                  <span className="icon">
                    <UserOutlined />
                  </span>
                  <span>{t("admin_shop.header.profile")}</span>
                </li>
                <li className="li">
                  <span className="icon">
                    <EditOutlined />
                  </span>
                  <span>{t("admin_shop.header.change_password")}</span>
                </li>

                <li className="divider">
                  <Divider className="divider_item" />
                </li>

                <li className="li">
                  <span className="icon">
                    <PlusCircleOutlined />
                  </span>
                  <span>{t("admin_shop.header.add_another_account")}</span>
                </li>
                <button className="li outline-none border-none bg-transparent" onClick={handleLogout}>
                  <span className="icon">
                    <LogoutOutlined />
                  </span>
                  <span>{t("admin_shop.header.logout")}</span>
                </button>
              </S.AccountUl>
            )}
          >
            <Button onClick={(e) => e.preventDefault()} className="button account_button">
              <div className="button_item">
                <Avatar src={<img src={avatarAdmin} alt="avatar" />} className="avatar" />
                <div className="name">{user?.email}</div>
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
