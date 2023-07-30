import Img from "@app/app/assets/images/avatarCategorySidebar.webp";
import ImgSell from "@app/app/assets/images/selling.webp";
import Sider from "antd/es/layout/Sider";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import CategorySidebarItem from "./CategorySidebarItem";

const CategorySidebarData = [
  {
    id: 1,
    title: "Đồ Chơi - Mẹ & Bé",
    image: Img,
  },
  {
    id: 2,
    title: "Đồ Chơi - Mẹ & Bé Dinh chi nguyen",
    image: Img,
  },
  {
    id: 3,
    title: "Đồ Chơi - Mẹ & Bé",
    image: Img,
  },
  {
    id: 4,
    title: "Đồ Chơi - Mẹ & Bé",
    image: Img,
  },
];

const CategorySidebar = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { t } = useTranslation();
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoadingSkeleton(false);
    }, 5 * 1000);
  }, []);
  return (
    <Sider className="bg-[#f5f5fa]">
      <div>
        <div className="bg-white rounded-[8px] flex flex-col py-[12px] px-[8px] relative mb-[16px]">
          <div className="mb-[8px] ps-[12px] font-[700] text-[14px] text-[#27272A] line-[150%]">
            {t("user.sidebar.sidebar_name")}
          </div>
          {loadingSkeleton &&
            CategorySidebarData.map((item) => {
              return <CategorySidebarItem.LoadingSkeleton key={item.id} />;
            })}
          {!loadingSkeleton &&
            CategorySidebarData.map((item) => {
              return <CategorySidebarItem key={item.id} title={item.title} image={item.image} />;
            })}
        </div>
        <div className="bg-white rounded-[8px] flex flex-col py-[12px] px-[8px] relative mb-[16px]">
          <a
            href="#/"
            className="hover:bg-[#27272a1f] hover:ease-in transition-all duration-[30ms] active:bg-[#27272a3d] flex py-[7px] px-[10px] items-center rounded-[8px] cursor-pointer"
          >
            <div className="basis-[32px] height-[32px] me-[8px] line-[0]">
              <img src={ImgSell} alt="Bán hàng cùng OM" width={32} height={32} />
            </div>
            <p className="text-[14px] text-[#27272A] font-[400] leading-[150%]">{t("user.sidebar.sell")}</p>
          </a>
        </div>
      </div>
    </Sider>
  );
};
export default CategorySidebar;
