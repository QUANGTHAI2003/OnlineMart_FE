import ModalSelect from "@app/app/components/clients/SelectAddress/ModalSelect";
import { useAppSelector } from "@app/store/store";
import Sider from "antd/es/layout/Sider";
import { useTranslation } from "react-i18next";

import { AdvertiseItem, CategoryItem, CheckboxSortItem, PriceItem, RatingItem, SpreadPriceItem } from "./components";
import * as S from "./SortProductSidebar.styles";

const rating = [
  {
    id: 1,
    value: 5,
  },
  {
    id: 2,
    value: 4,
  },
  {
    id: 3,
    value: 3,
  },
];

const advertise = [
  {
    id: 1,
    image: "https://vcdn.tikicdn.com/ts/seller/bd/32/e8/f5f85603a21639b0329dda4fa756072f.jpg",
    title: "GIẢM 80% ĐÓN NĂM HỌC MỚI",
    brand: "Deli Official Store",
    sale: "Giảm 20K",
  },
  {
    id: 2,
    image: "https://vcdn.tikicdn.com/ts/seller/89/9e/7d/e292d266ae6cde91c045c23e97ad05de.jpg",
    title: "GIẢM 80% ĐÓN NĂM HỌC MỚI",
    brand: "Deli Official Store",
    sale: "Giảm 20K",
  },
];

const SortProductSidebar = () => {
  const { t } = useTranslation();

  const childrenCategory = useAppSelector((state) => state.sortSidebar.category) || [];
  const sortPrice = useAppSelector((state) => {
    const price = state?.sortSidebar?.price;

    if (!price) {
      return [];
    }

    const { min_price, average_price, max_price } = price;

    return [
      { id: 1, min: 0, max: min_price },
      { id: 2, min: min_price, max: average_price },
      { id: 3, min: average_price, max: max_price },
      { id: 4, min: max_price, max: 1000000000000 },
    ];
  });
  const sortShop = useAppSelector((state) => state.sortSidebar.shop) || [];
  const sortSupplier = useAppSelector((state) => state.sortSidebar.supplier) || [];

  const otherSort: any = [
    {
      id: 1,
      title: "Shop",
      slug: "shop",
      values: [...sortShop],
    },
    {
      id: 2,
      title: "Supplier",
      slug: "supplier",
      values: [...sortSupplier],
    },
  ];

  return (
    <S.ProductCategory>
      <Sider width={200} className="sider">
        <S.CategoryItem>
          <h3 className="title">{t("user.product_category_sidebar.product_category")}</h3>
          {childrenCategory.map((item: any) => {
            return <CategoryItem key={item.id} id={item.id} name={item.name} slug={item.slug} />;
          })}
        </S.CategoryItem>

        <div className="address-btn">
          <ModalSelect />
        </div>

        <S.RatingItem>
          <h3 className="title">{t("user.product_category_sidebar.rating")}</h3>
          {rating.map((item) => {
            return <RatingItem key={item.id} value={item.value} />;
          })}
        </S.RatingItem>

        <S.PriceItem>
          <h3 className="title">{t("user.product_category_sidebar.price")}</h3>
          {sortPrice.map((item: any) => {
            return <PriceItem key={item.id} min={item.min} max={item.max} />;
          })}

          <p className="spread_title">{t("user.product_category_sidebar.range")}</p>
          <SpreadPriceItem />
        </S.PriceItem>

        <S.CheckboxSortItem>
          {otherSort.map((item: any): any => {
            return <CheckboxSortItem key={item.id} sortData={item} />;
          })}
        </S.CheckboxSortItem>
      </Sider>

      <S.Advertise>
        {advertise.map((item) => {
          return (
            <AdvertiseItem key={item.id} image={item.image} title={item.title} brand={item.brand} sale={item.sale} />
          );
        })}
      </S.Advertise>
    </S.ProductCategory>
  );
};

export default SortProductSidebar;
