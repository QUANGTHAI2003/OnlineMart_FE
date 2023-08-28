import ModalSelect from "@app/app/components/clients/SelectAddress/ModalSelect";
import { formatCurrency } from "@app/utils/helper";
import Sider from "antd/es/layout/Sider";
import { useTranslation } from "react-i18next";

import { AdvertiseItem, CategoryItem, CheckboxSortItem, PriceItem, RatingItem, SpreadPriceItem } from "./components";
import * as S from "./SortProductSidebar.styles";

const categories = [
  {
    id: 1,
    content: "Điện thoại Smartphone",
  },
  {
    id: 2,
    content: "Máy tính bảng",
  },
  {
    id: 3,
    content: "Máy đọc sách",
  },
  {
    id: 4,
    content: "Điện thoại phổ thông",
  },
  {
    id: 5,
    content: "Điện thoại bàn",
  },
];

const rating = [
  {
    id: 1,
    content: "Từ 1 sao",
    value: 1,
  },
  {
    id: 2,
    content: "Từ 4 sao",
    value: 4.75,
  },
  {
    id: 3,
    content: "Từ 5 sao",
    value: 5,
  },
];

const price = [
  {
    id: 1,
    lowest: formatCurrency(2000),
    best: formatCurrency(2000),
  },
  {
    id: 2,
    lowest: formatCurrency(20000),
    best: formatCurrency(200000),
  },
  {
    id: 3,
    lowest: formatCurrency(200000),
    best: formatCurrency(20000500),
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

const variant: any = [
  {
    id: 1,
    title: "ROM",
    values: [
      {
        id: 1,
        name: "32GB",
      },
      {
        id: 2,
        name: "64GB",
      },
      {
        id: 3,
        name: "128GB",
      },
      {
        id: 4,
        name: "256GB",
      },
      {
        id: 5,
        name: "512GB",
      },
      {
        id: 6,
        name: "1TB",
      },
      {
        id: 7,
        name: "2TB",
      },
    ],
  },
  {
    id: 2,
    title: "Màu sắc",
    values: [
      {
        id: 1,
        name: "Đỏ",
      },
      {
        id: 2,
        name: "Cam",
      },
      {
        id: 3,
        name: "Vàng",
      },
      {
        id: 4,
        name: "Lục",
      },
      {
        id: 5,
        name: "Lam",
      },
      {
        id: 6,
        name: "Chàm",
      },
      {
        id: 7,
        name: "Tím",
      },
    ],
  },
];

const SortProductSidebar = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { t } = useTranslation();

  return (
    <S.ProductCategory>
      <Sider width={200} className="sider">
        <S.CategoryItem>
          <h3 className="title">{t("user.product_category_sidebar.product_category")}</h3>
          {categories.map((item) => {
            return <CategoryItem key={item.id} content={item.content} />;
          })}
        </S.CategoryItem>

        <div className="address-btn">
          <ModalSelect />
        </div>

        <S.RatingItem>
          <h3 className="title">{t("user.product_category_sidebar.rating")}</h3>
          {rating.map((item) => {
            return <RatingItem key={item.id} content={item.content} value={item.value} />;
          })}
        </S.RatingItem>

        <S.PriceItem>
          <h3 className="title">{t("user.product_category_sidebar.price")}</h3>
          {price.map((item) => {
            return <PriceItem key={item.id} lowest={item.lowest} best={item.best} />;
          })}

          <p className="spread_title">{t("user.product_category_sidebar.range")}</p>
          <SpreadPriceItem />
        </S.PriceItem>

        <S.CheckboxSortItem>
          {variant.map((item: any): any => {
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
