import ModalSelect from "@app/app/components/clients/SelectAddress/ModalSelect";
import { PriceItem, SpreadPriceItem } from "@app/app/components/layouts/client/Sidebar/SortProductSidebar/components";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Space } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 as uuidv4 } from "uuid";

import CheckboxSortItem from "../../category/components/CheckboxSortItem";
import RatingItem from "../../category/components/RatingItem";
import MainSortSkeleton from "../skeletons/MainSortSkeleton";
import * as S from "../UserSearch.styles";

import { OptionItem, SortItem } from ".";

const rating = [
  {
    id: 1,
    content: "Từ 1 sao",
    value: 1,
  },
  {
    id: 2,
    content: "Từ 4 sao",
    value: 4,
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
    lowest: 2000,
    best: 2000,
  },
  {
    id: 2,
    lowest: 20000,
    best: 200000,
  },
  {
    id: 3,
    lowest: 2000645645600,
    best: 200787400500,
  },
  {
    id: 4,
    lowest: 2000645645600,
    best: 200787400500,
  },
  {
    id: 5,
    lowest: 2000645645600,
    best: 200787400500,
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
      {
        id: 8,
        name: "256GB",
      },
      {
        id: 9,
        name: "512GB",
      },
      {
        id: 10,
        name: "1TB",
      },
      {
        id: 11,
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
        name: "Đỏ555555555555555",
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
  {
    id: 3,
    title: "Công ty phát hành",
    values: [
      {
        id: 1,
        name: "Alphabooks",
      },
      {
        id: 2,
        name: "1980 Books",
      },
      {
        id: 3,
        name: "NXB Trẻ",
      },
      {
        id: 4,
        name: "Alpha Books",
      },
      {
        id: 5,
        name: "First News - Trí Việt",
      },
      {
        id: 6,
        name: "Thái Hà",
      },
      {
        id: 7,
        name: "Nhã Nam",
      },
      {
        id: 8,
        name: "MCBOOKS",
      },
      {
        id: 9,
        name: "Saigon Books",
      },
    ],
  },
];

const MainSortItem = () => {
  const { t } = useTranslation();

  const [loadingSkeletonCount, setLoadingSkeletonCount] = useState<boolean>(false);

  useEffect(() => {
    setLoadingSkeletonCount(true);
    setTimeout(() => {
      setLoadingSkeletonCount(false);
    }, 3000);
  }, []);

  const [open, setOpen] = useState<boolean>(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <S.MainSortItem>
      <div className="sort_item">
        <div className="main_item">
          <Swiper
            slidesPerView={1.5}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              480: {
                slidesPerView: 1.25,
              },
              768: {
                slidesPerView: 1.25,
              },
              992: {
                slidesPerView: 1.5,
              },
              1200: {
                slidesPerView: 1.25,
              },
              1400: {
                slidesPerView: 1.5,
              },
            }}
          >
            {variant.map((item: any): any => {
              return (
                <SwiperSlide key={uuidv4()} className="swiper_slide">
                  <SortItem sortData={item} />
                </SwiperSlide>
              );
            })}
          </Swiper>

          {loadingSkeletonCount ? (
            <MainSortSkeleton count={1} />
          ) : (
            <div className="left_brand">
              <div className="left_brand_item">
                <Button onClick={showDrawer} className="button">
                  <FontAwesomeIcon icon={faFilter} className="icon" />
                  <p className="title_all">{t("user.search_page.all")}</p>
                </Button>
              </div>
            </div>
          )}
        </div>

        <S.DrawerItem
          title={t("user.product_category_page.filter")}
          placement="right"
          onClose={onClose}
          open={open}
          footer={
            <Space className="w-full justify-center py-3">
              <Button onClick={onClose} className="w-[160px] h-9">
                {t("user.product_category_page.reset")}
              </Button>
              <Button type="primary" onClick={onClose} className="w-[160px] h-9">
                {t("user.product_category_page.apply")}
              </Button>
            </Space>
          }
        >
          <div className="address-btn">
            <p className="address_title">{t("user.product_category_page.address")}</p>
            <ModalSelect />
          </div>

          <div className="rating_div">
            <p className="rating_title">{t("user.product_category_page.rate")}</p>
            <div>
              <Space direction="vertical">
                <Space wrap>
                  {rating.map((item) => {
                    return <RatingItem key={uuidv4()} value={item.value} />;
                  })}
                </Space>
              </Space>
            </div>
          </div>

          <div className="price_div flex flex-col gap-2">
            <p className="price_title">{t("user.product_category_page.price")}</p>
            <div className="flex flex-row flex-wrap gap-2">
              {price.map((item) => {
                return <PriceItem key={uuidv4()} min={item.lowest} max={item.best} />;
              })}
            </div>
            <div className="spread_price flex flex-col gap-2">
              <p className="spread_title">{t("user.product_category_page.range")}</p>
              <SpreadPriceItem />
            </div>
          </div>

          <div className="checkbox_sort_div">
            <Space direction="vertical">
              {variant.map((item: any): any => {
                return <CheckboxSortItem key={uuidv4()} sortData={item} />;
              })}
            </Space>
          </div>
        </S.DrawerItem>
      </div>

      <div className="option_item">
        <OptionItem />
      </div>
    </S.MainSortItem>
  );
};

export default MainSortItem;
