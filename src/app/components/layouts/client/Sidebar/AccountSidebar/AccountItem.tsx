import { LinkArrow } from "@app/app/assets/icons";
import { useResponsive } from "@app/hooks";
import { useAppSelector } from "@app/store/store";
import { Badge } from "antd";
import { NavLink } from "react-router-dom";

import * as S from "./AccountSidebar.styles";

interface IAccountItem {
  icon?: any;
  title: string;
  url: string;
  onClickSidebar: any;
  badge?: boolean;
}

const AccountItem = ({ icon, title, url, onClickSidebar, badge }: IAccountItem) => {
  const { isTablet } = useResponsive();
  const { notificationCount } = useAppSelector((state) => state.isNotify);

  return (
    <S.AccountItemLinkStyle className="flex flex-row items-center transition-all duration-200 cursor-pointer">
      <NavLink
        to={`/account/${url}`}
        onClick={onClickSidebar}
        className={`flex justify-between items-center py-4 transition-all duration-200 cursor-pointer`}
      >
        <div className="flex flex-row items-center gap-x-4">
          {icon}
          <span className="text-sm text-[#4a4a4a] group-focus:text-white">{title}</span>
        </div>

        <div>{badge && notificationCount > 0 && <Badge dot></Badge>}</div>
        {isTablet || (
          <div className="ml-auto">
            <LinkArrow />
          </div>
        )}
      </NavLink>
    </S.AccountItemLinkStyle>
  );
};

export default AccountItem;
