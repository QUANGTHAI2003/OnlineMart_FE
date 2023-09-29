import ImgSell from "@app/app/assets/images/selling.webp";
import { useGetCategoryRootQuery } from "@app/store/slices/api/categoryApi";
import { ICategory } from "@app/types/categories.types";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import * as S from "./CategorySidebar.styles";
import CategorySidebarItem from "./CategorySidebarItem";

const CategorySidebar = () => {
  const { t } = useTranslation();

  const { data, isFetching } = useGetCategoryRootQuery();

  return (
    <S.SidebarStyle className="bg-transparent" width={230}>
      <div className="sidebar bg-white rounded-lg flex flex-col py-3 px-2 relative mb-4">
        <div className="mb-2 ps-3 font-bold text-sm text-[#27272A] leading-normal">
          {t("user.sidebar.sidebar_name")}
        </div>
        {isFetching && <CategorySidebarItem.LoadingSkeleton count={8} />}
        {!isFetching &&
          data?.map((categoryItem: ICategory) => {
            return <CategorySidebarItem key={categoryItem.id} categoryItem={categoryItem} />;
          })}
      </div>
      <div className="bg-white rounded-md flex flex-col py-3 px-2 relative mb-4">
        <Link
          to="/admin/shop"
          className="hover:bg-[#27272a1f] hover:ease-in transition-all duration-100 active:bg-[#27272a3d] flex p-2 items-center rounded-md cursor-pointer"
        >
          <div className="basis-8 height-8 me-2">
            <img src={ImgSell} alt="Bán hàng cùng OM" width={32} height={32} />
          </div>
          <p className="text-sm text-[#27272A] leading-normal">{t("user.sidebar.sell")}</p>
        </Link>
      </div>
    </S.SidebarStyle>
  );
};
export default CategorySidebar;
