import {
  AccountAdress,
  AccountBell,
  AccountDiscount,
  AccountHeart,
  AccountOrder,
  AccountStar,
  AccountUser,
} from "@app/app/assets/icons/index";
import { AvatarImage } from "@app/app/components/Images";
import { useResponsive } from "@app/hooks";
import { useLogoutMutation } from "@app/store/slices/api/authApi";
import { logOut } from "@app/store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@app/store/store";
import { handleApiError, notifySuccess } from "@app/utils/helper";
import { useTranslation } from "react-i18next";

import AccountItem from "./AccountItem";
import * as S from "./AccountSidebar.styles";

const baseImage = import.meta.env.VITE_BASE_IMAGE_URL as string;

const AccountSidebar = ({ onSidebar }: any) => {
  const { t } = useTranslation();
  const { isTablet } = useResponsive();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.userState.user);

  const data = [
    {
      id: 1,
      icon: <AccountUser />,
      title: t("user.account_user.account_info"),
      url: "edit_profile",
    },
    {
      id: 2,
      icon: <AccountBell />,
      title: t("user.account_user.account_notification"),
      badge: true,
      url: "notifications",
    },
    {
      id: 3,
      icon: <AccountOrder />,
      title: t("user.account_user.account_purchase"),
      url: "orders",
    },
    {
      id: 4,
      icon: <AccountAdress />,
      title: t("user.account_user.account_address"),
      url: "address",
    },
    {
      id: 5,
      icon: <AccountHeart />,
      title: t("user.account_user.account_like"),
      url: "wishlist",
    },
    {
      id: 6,
      icon: <AccountStar />,
      title: t("user.account_user.account_rating"),
      url: "my_rating",
    },
    {
      id: 7,
      icon: <AccountDiscount />,
      title: t("user.account_user.account_voucher"),
      url: "voucher",
    },
  ];

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(logOut());

      notifySuccess("Successfully", "Logout successfully");
    } catch (err) {
      handleApiError(err);
    }
  };

  return (
    <div className="flex flex-col justify-center w-full md:block md:w-auto">
      <S.AccountSidebarStyle width={250} className="md:bg-white rounded-md shadow-gray-200 py-5">
        <div className="flex items-center px-6 py-2">
          <AvatarImage
            className="block md:w-12 md:h-12 w-16 h-16"
            src={`${baseImage}/${user?.avatar}`}
            size="large"
            alt={user?.full_name}
          />

          <div className="ml-2">
            <p className="text-xs py-px pl-1.5">{t("user.account_user.account_of")}</p>
            <p className="text-lg font-medium pl-1.5 line-clamp-1">{user?.full_name}</p>
          </div>
        </div>

        <ul className="flex flex-col justify-center">
          {data.map((item) => {
            return (
              <AccountItem
                key={item.id}
                title={item.title}
                icon={item.icon}
                url={item.url}
                onClickSidebar={onSidebar}
                badge={item.badge}
              />
            );
          })}
        </ul>
      </S.AccountSidebarStyle>
      {isTablet || (
        <S.ButtonStyle className="wrap-btn">
          <button className="wrap-btn__button" onClick={handleLogout}>
            Đăng Xuất
          </button>
        </S.ButtonStyle>
      )}
    </div>
  );
};

export default AccountSidebar;
