import * as S from "./CategorySidebar.styles";

interface ICategorySidebarItem {
  title: string;
  image: string;
}

const CategorySidebarItem = ({ title, image }: ICategorySidebarItem) => {
  return (
    <a
      href="#/"
      className="hover:bg-[#27272a1f] hover:ease-in transition-all duration-[30ms] active:bg-[#27272a3d] flex py-[7px] px-[10px] items-center rounded-[8px] cursor-pointer"
    >
      <div className="basis-[32px] height-[32px] me-[8px] line-[0]">
        <img src={image} alt={title} width={32} height={32} />
      </div>
      <p className="text-[14px] text-[#27272A] font-[400] leading-[150%]">{title}</p>
    </a>
  );
};

const LoadingSkeleton = () => {
  return (
    <a href="#/" className="flex py-[7px] px-[10px] items-center rounded-[8px] cursor-pointer">
      <div className="basis-[32px] height-[32px] me-[8px] line-[0]">
        <S.avatarCategoryLoading></S.avatarCategoryLoading>
      </div>
      <S.titleCategoryLoading></S.titleCategoryLoading>
    </a>
  );
};
CategorySidebarItem.LoadingSkeleton = LoadingSkeleton;
export default CategorySidebarItem;
