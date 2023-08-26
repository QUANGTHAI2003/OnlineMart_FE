import { NavLink } from "react-router-dom";

import * as S from "./AccountSidebar.styles";

interface IAccountItem {
  icon?: any; //?: truyền vào hay k cg đc
  title: string; //k có ?: bắt buộc truyền
  url: string;
  onClickSidebar: any;
}

const AccountItem = ({ icon, title, url, onClickSidebar }: IAccountItem) => {
  return (
    <S.AccountItemLinkStyle className="flex flex-row items-center transition-all duration-200 cursor-pointer">
      <NavLink
        to={`/account/${url}`}
        onClick={onClickSidebar}
        className={`flex flex-row items-center gap-x-4 py-3 transition-all duration-200 cursor-pointer`}
      >
        {icon}
        <span className="text-sm text-[#4a4a4a] group-focus:text-white">{title}</span>
      </NavLink>
    </S.AccountItemLinkStyle>
  );
};

export default AccountItem;
