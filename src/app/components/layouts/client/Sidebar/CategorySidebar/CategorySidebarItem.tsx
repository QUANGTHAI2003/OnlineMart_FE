import { ICategory } from "@app/types/categories.types";
import { Link } from "react-router-dom";

import * as S from "./CategorySidebar.styles";

interface ICategorySidebarItem {
  categoryItem: ICategory;
}

const CategorySidebarItem = ({ categoryItem }: ICategorySidebarItem) => {
  const { id, name, slug, thumbnail_url } = categoryItem;
  return (
    <Link
      to={`category/${slug}/${id}`}
      className="hover:bg-[#27272a1f] hover:ease-in transition-all duration-[30ms] active:bg-[#27272a3d] flex py-[7px] px-[10px] items-center rounded-[8px] cursor-pointer"
    >
      <div className="basis-[32px] height-[32px] me-[8px] line-[0]">
        <img src={thumbnail_url} alt={name} width={32} height={32} />
      </div>
      <p className="text-[14px] text-[#27272A] font-[400] leading-[150%]">{name}</p>
    </Link>
  );
};

const LoadingSkeleton = ({ count }: any) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <a href="#/" key={index} className="flex py-[7px] px-[10px] items-center rounded-[8px] cursor-pointer">
          <div className="basis-[32px] height-[32px] me-[8px] line-[0]">
            <S.avatarCategoryLoading></S.avatarCategoryLoading>
          </div>
          <S.titleCategoryLoading></S.titleCategoryLoading>
        </a>
      ))}
    </>
  );
};
CategorySidebarItem.LoadingSkeleton = LoadingSkeleton;
export default CategorySidebarItem;
