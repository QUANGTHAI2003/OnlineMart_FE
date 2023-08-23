import { Avatar, Popover } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import AccountMenuSkeleton from "./AccountMenuSkeleton";

interface IAccount {
  name: string;
  avatar: string;
}
const AccountMenu: React.FC<IAccount> = ({ name, avatar }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3 * 1000);
  }, []);

  const content = (
    <div className="flex flex-col w-fit items-start gap-1.5 mx-[-12px]">
      <a
        href="#/"
        className="w-full text-black px-3 py-1.5 text-base hover:bg-[#f5f5f5] hover:text-blue-600 transition-all duration-200 ease-linear"
      >
        {t("user.account_menu.profile")}
      </a>
      <a
        href="#/"
        className="w-full text-black px-3 py-1.5 text-base hover:bg-[#f5f5f5] hover:text-blue-600  transition-all duration-200 ease-linear"
      >
        {t("user.account_menu.my_order")}
      </a>
      <a
        href="#/"
        className="w-full text-black px-3 py-1.5 text-base hover:bg-[#f5f5f5] hover:text-blue-600  transition-all  duration-200 ease-linear"
      >
        {t("user.account_menu.logout")}
      </a>
    </div>
  );
  return (
    <Popover
      content={content}
      trigger="hover"
      placement="bottom"
      autoAdjustOverflow={true}
      className=" flex items-center p-1 w-fit h-[32px]"
    >
      {loading && <AccountMenuSkeleton />}
      {!loading && (
        <div className="flex items-center">
          <Avatar className="block" src={avatar} size="small" style={{ marginRight: 11 }} />
          <span className="text-base whitespace-nowrap">{name}</span>
        </div>
      )}
    </Popover>
  );
};

export default AccountMenu;
