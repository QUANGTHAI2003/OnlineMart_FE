import { LinkArrow } from "@app/app/assets/icons";
import { useResponsive } from "@app/hooks";
import { NavLink } from "react-router-dom";

import * as S from "./AccountSidebar.styles";

interface IAccountItem {
  icon?: any;
  title: string;
  url: string;
  onClickSidebar: any;
}

const AccountItem = ({ icon, title, url, onClickSidebar }: IAccountItem) => {
  const { isTablet } = useResponsive();

  return (
    <S.AccountItemLinkStyle className="flex flex-row items-center transition-all duration-200 cursor-pointer">
      <NavLink
        to={`/account/${url}`}
        onClick={onClickSidebar}
        className={`flex flex-row items-center gap-x-4 py-3 transition-all duration-200 cursor-pointer`}
      >
        {icon}
        <span className="text-sm text-[#4a4a4a] group-focus:text-white">{title}</span>
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
