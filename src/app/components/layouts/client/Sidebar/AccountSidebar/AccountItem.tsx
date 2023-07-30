import {styled} from "styled-components";

interface IAccountItem {
  icon?: any; //?: truyền vào hay k cg đc
  title: string; //k có ?: bắt buộc truyền
}

const AccountItemLink = styled.a`
  svg {
    display: flex;
  }
`;

const AccountItem = ({ icon, title }: IAccountItem) => {
  return (
    <AccountItemLink
      href="#d"
      className="flex flex-row items-center py-3 hover:bg-slate-200 active:bg-blue-600/50 group focus:bg-blue-600/25 transition-all duration-200 cursor-pointer"
    >
      <div className="basis-3/12 text-xl pl-3 ml-5 fill-[#4a4a4a] place-self-center group-focus:fill-white">{icon}</div>
      <p className="text-sm text-[#4a4a4a] group-focus:text-white">{title}</p>
    </AccountItemLink>
  );
};

export default AccountItem;
