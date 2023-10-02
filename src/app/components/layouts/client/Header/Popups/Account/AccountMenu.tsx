import { AvatarImage } from "@app/app/components/Images";
import { useLogoutUserMutation } from "@app/store/slices/api/authApi";
import { logOut } from "@app/store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@app/store/store";
import { notifyError, notifySuccess } from "@app/utils/helper";
import { Popover } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import AccountMenuSkeleton from "./AccountMenuSkeleton";

const baseImage = import.meta.env.VITE_BASE_IMAGE_URL as string;

const AccountMenu: React.FC = () => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);

  const user = useAppSelector((state) => state.userState.user);
  const dispatch = useAppDispatch();

  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logOut());

      notifySuccess("Successfully", "Logout successfully");
    } catch (err) {
      notifyError("Logout failed", "Something went wrong");
    }
  };

  useEffect(() => {
    user && setLoading(false);
  }, [user]);

  const content = (
    <div className="flex flex-col w-48 items-start gap-1.5 mx-[-12px]">
      <Link
        to="account"
        className="w-full text-black px-3 py-1.5 text-base hover:bg-[#f5f5f5] hover:text-blue-600 transition-all duration-200 ease-linear"
      >
        {t("user.account_menu.profile")}
      </Link>
      <Link
        to="account/orders"
        className="w-full text-black px-3 py-1.5 text-base hover:bg-[#f5f5f5] hover:text-blue-600  transition-all duration-200 ease-linear"
      >
        {t("user.account_menu.my_order")}
      </Link>
      <button
        onClick={handleLogout}
        className="w-full text-black px-3 py-2 cursor-pointer text-left text-base border-none bg-transparent hover:bg-[#f5f5f5] hover:text-blue-600 transition-all duration-200 ease-linear"
      >
        {t("user.account_menu.logout")}
      </button>
    </div>
  );
  return (
    <Popover
      content={content}
      trigger="hover"
      placement="bottom"
      autoAdjustOverflow={true}
      className="flex items-center p-1 w-fit h-[32px]"
    >
      {loading && <AccountMenuSkeleton />}
      {!loading && (
        <div className="flex items-center">
          <AvatarImage src={`${baseImage}/${user?.avatar}`} alt={user?.full_name} size="small" className="mr-3" />
          <span className="text-base whitespace-nowrap">{user?.user_name || user?.full_name}</span>
        </div>
      )}
    </Popover>
  );
};

export default AccountMenu;
