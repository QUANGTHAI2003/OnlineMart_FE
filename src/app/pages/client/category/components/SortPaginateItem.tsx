import ModalSelect from "@app/app/components/clients/SelectAddress/ModalSelect";
import { PriceItem, SpreadPriceItem } from "@app/app/components/layouts/client/Sidebar/SortProductSidebar/components";
import { formatCurrency } from "@app/utils/helper";
import { faCircleXmark, faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pagination, Select, Button, Space } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "../ProductCategory.styles";
import SortPaginateSkeleton from "../skeletons/SortPaginateSkeleton";

import CheckboxSortItem from "./CheckboxSortItem";
import RatingItem from "./RatingItem";

const rating = [
  {
    id: 1,
    content: "Từ 1 sao",
  },
  {
    id: 2,
    content: "Từ 4 sao",
  },
  {
    id: 3,
    content: "Từ 5 sao",
  },
  {
    id: 4,
    content: "Từ 5 sao",
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
    lowest: formatCurrency(2000645645600),
    best: formatCurrency(200787400500),
  },
  {
    id: 4,
    lowest: formatCurrency(2000645645600),
    best: formatCurrency(200787400500),
  },
  {
    id: 5,
    lowest: formatCurrency(2000645645600),
    best: formatCurrency(200787400500),
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

const SortPaginateItem = () => {
  const { t } = useTranslation();

  const [loadingSkeletonCount, setLoadingSkeletonCount] = useState(false);
  useEffect(() => {
    setLoadingSkeletonCount(true);
    setTimeout(() => {
      setLoadingSkeletonCount(false);
    }, 3000);
  }, []);

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const sortWith = [
    { value: "popular", label: t("user.product_category_page.popular") },
    { value: "top_sales", label: t("user.product_category_page.top_sell") },
    { value: "latest", label: t("user.product_category_page.latest") },
    { value: "low_high", label: t("user.product_category_page.low_high") },
    { value: "high_low", label: t("user.product_category_page.high_low") },
  ];

  return (
    <S.SortPaginateItemMain>
      {loadingSkeletonCount ? (
        <SortPaginateSkeleton count={1} />
      ) : (
        <div>
          <S.SortPaginateItem>
            <S.Sort>
              <FontAwesomeIcon icon={faFilter} />
              <p className="sort_with">{t("user.product_category_page.sort_by")}</p>
              <Select className="select" defaultValue="popular" style={{ width: 160 }} options={sortWith} />
            </S.Sort>

            <div className="paginate">
              <Pagination simple defaultCurrent={2} total={50} />
            </div>
          </S.SortPaginateItem>

          <S.FilterItem>
            <S.SortDrawer>
              <Button onClick={showDrawer} className="button">
                <FontAwesomeIcon icon={faFilter} className="icon" />
                <p className="sort_with">{t("user.product_category_page.sort_by")}</p>
              </Button>

              <S.DrawerItem
                title={t("user.product_category_page.filter")}
                placement="right"
                onClose={onClose}
                open={open}
                footer={
                  <Space className="w-fu justify-center py-3">
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
                          return <RatingItem key={item.id} content={item.content} />;
                        })}
                      </Space>
                    </Space>
                  </div>
                </div>

                <div className="price_div flex flex-col gap-2">
                  <p className="price_title">{t("user.product_category_page.price")}</p>
                  <div className="flex flex-row flex-wrap gap-2">
                    {price.map((item) => {
                      return <PriceItem key={item.id} lowest={item.lowest} best={item.best} />;
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
                      return <CheckboxSortItem key={item.id} sortData={item} />;
                    })}
                  </Space>
                </div>
              </S.DrawerItem>
            </S.SortDrawer>

            <Space direction="vertical" className="overflow-x-auto button_spread_price">
              <Space>
                <Button type="primary" ghost className="btn_click">
                  <p className="btn_click_price">
                    200.000đ
                    <span className="to">{t("user.product_category_page.to")}</span>
                    20.000.000đ
                  </p>
                  <FontAwesomeIcon icon={faCircleXmark} className="icon" />
                </Button>
                <Button type="primary" ghost className="btn_click">
                  <p className="btn_click_price">
                    200.000đ
                    <span className="to">{t("user.product_category_page.to")}</span>
                    20.000.000đ
                  </p>
                  <FontAwesomeIcon icon={faCircleXmark} className="icon" />
                </Button>
                <Button type="primary" ghost className="btn_click">
                  <p className="btn_click_price">
                    200.000đ
                    <span className="to">{t("user.product_category_page.to")}</span>
                    20.000.000đ
                  </p>
                  <FontAwesomeIcon icon={faCircleXmark} className="icon" />
                </Button>
                <Button type="primary" ghost className="btn_click">
                  <p className="btn_click_price">
                    200.000đ
                    <span className="to">{t("user.product_category_page.to")}</span>
                    20.000.000đ
                  </p>
                  <FontAwesomeIcon icon={faCircleXmark} className="icon" />
                </Button>
              </Space>
            </Space>

            <Space className="delete_all_space">
              <Button type="text" className="delete_all">
                {t("user.product_category_page.delete_all")}
              </Button>
            </Space>
          </S.FilterItem>
        </div>
      )}
    </S.SortPaginateItemMain>
  );
};

export default SortPaginateItem;
