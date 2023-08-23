import {
  AccountAdress,
  AccountBell,
  AccountDiscount,
  AccountHeart,
  AccountOrder,
  AccountStar,
  AccountUser,
} from "@app/app/assets/icons/index";
import Sider from "antd/es/layout/Sider";
import { useTranslation } from "react-i18next";

import AccountItem from "./AccountItem";

const AccountSidebar = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { t } = useTranslation();
  const data = [
    {
      id: 1,
      icon: <AccountUser />,
      title: t("user.account_user.account_info"),
      url: "edit_profile",
    },
    {
      id: 1,
      icon: <AccountBell />,
      title: t("user.account_user.account_notification"),
      url: "notifications",
    },
    {
      id: 2,
      icon: <AccountOrder />,
      title: t("user.account_user.account_purchase"),
      url: "orders",
    },
    {
      id: 3,
      icon: <AccountAdress />,
      title: t("user.account_user.account_address"),
      url: "address",
    },
    {
      id: 4,
      icon: <AccountHeart />,
      title: t("user.account_user.account_like"),
      url: "wishlist",
    },
    {
      id: 5,
      icon: <AccountStar />,
      title: t("user.account_user.account_rating"),
      url: "my_rating",
    },
    {
      id: 6,
      icon: <AccountDiscount />,
      title: t("user.account_user.account_voucher"),
      url: "voucher",
    },
  ];

  return (
    <Sider width={230} className="bg-white rounded-md shadow-gray-200 py-5">
      <div className="flex px-6 py-2">
        <div className="">
          <img className="rounded-full w-10" src="src/app/assets/images/10.png" alt="ggg" />
        </div>

        <div className="ml-2">
          <p className="text-xs py-px pl-1.5">{t("user.account_user.account_of")}</p>
          <p className="text-xl font-medium pl-1.5">Hoàng Lịch</p>
        </div>
      </div>

      {data.map((item) => {
        return <AccountItem key={item.id} title={item.title} icon={item.icon} url={item.url} />;
      })}
    </Sider>
  );
};

export default AccountSidebar;
