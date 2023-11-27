import ModalSelect from "@app/app/components/clients/SelectAddress/ModalSelect";
import { PriceItem, SpreadPriceItem } from "@app/app/components/layouts/client/Sidebar/SortProductSidebar/components";
import { useResponsive, useSyncToURL } from "@app/hooks";
import { useAppSelector } from "@app/store/store";
import { formatCurrency } from "@app/utils/helper";
import { faCircleXmark, faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Pagination, Radio, Space } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import * as S from "../ProductCategory.styles";

import CheckboxSortItem from "./CheckboxSortItem";
import RatingItem from "./RatingItem";

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

const SortPaginateItem = ({ onPageChange, pageSize, total, current }: any) => {
  const { t } = useTranslation();
  const syncToURL = useSyncToURL();
  const navigate = useNavigate();

  const { isTablet } = useResponsive();

  const sortWith = [
    { value: "top_sales", label: t("user.product_category_page.top_sell") },
    { value: "popular", label: t("user.product_category_page.popular") },
    { value: "latest", label: t("user.product_category_page.latest") },
    { value: "low_high", label: t("user.product_category_page.low_high") },
    { value: "high_low", label: t("user.product_category_page.high_low") },
  ];

  const sortPrice = useAppSelector((state) => {
    const price = state?.sortSidebar?.price;

    const minPrice = price?.min_price;
    const averagePrice = price?.average_price;
    const maxPrice = price?.max_price;

    if (price) {
      return [
        {
          id: 1,
          min: 0,
          max: minPrice,
        },
        {
          id: 2,
          min: minPrice,
          max: averagePrice,
        },
        {
          id: 3,
          min: averagePrice,
          max: maxPrice,
        },
        {
          id: 4,
          min: maxPrice,
          max: 1000000000000,
        },
      ];
    }

    return [];
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const queryParams: Record<string, string> = {};

  for (const [key, value] of searchParams.entries()) {
    queryParams[key] = value;
  }

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleSort = (value: string) => {
    const newQueryParams = { ...queryParams };
    newQueryParams.sort = value;
    syncToURL(newQueryParams);
  };

  const handleDeleteAllSort = () => {
    setOpen(false);
    navigate(".", { replace: true });
  };

  const handleDeleteSort = (key: string, value?: string) => {
    const newQueryParams = { ...queryParams };

    if (value !== undefined) {
      const arrayQueryParam = (newQueryParams[key] || "").split(",");

      const index = arrayQueryParam.indexOf(value.toString()); // 1

      if (index !== -1) {
        arrayQueryParam.splice(index, 1);
      }

      newQueryParams[key] = arrayQueryParam.join(",");

      if (newQueryParams[key].trim() === "") {
        delete newQueryParams[key];
      }
    } else {
      console.log({ key });

      delete newQueryParams[key];
    }

    navigate(`?${new URLSearchParams(newQueryParams).toString()}`, { replace: true });
  };

  useEffect(() => {
    const shopParam = searchParams.get("shop");
    const supplierParam = searchParams.get("supplier");

    if (shopParam === "" || shopParam === null) {
      searchParams.delete("shop");
      navigate(`?${searchParams.toString()}`, { replace: true });
    } else if (supplierParam === "" || supplierParam === null) {
      searchParams.delete("supplier");
      navigate(`?${searchParams.toString()}`, { replace: true });
    }
  }, [navigate, searchParams]);

  return (
    <S.SortPaginateItemMain>
      <S.SortPaginateItem>
        <Space>
          <FontAwesomeIcon icon={faFilter} />
          <p className="sort_with">{t("user.product_category_page.sort_by")}</p>
          <Radio.Group
            defaultValue={sortWith[0].value}
            buttonStyle="solid"
            onChange={(e) => handleSort(e.target.value)}
          >
            {sortWith.map((item, index) => {
              return (
                <Radio.Button key={index} value={item.value}>
                  {item.label}
                </Radio.Button>
              );
            })}
          </Radio.Group>
        </Space>

        <div className="paginate">
          <Pagination
            simple
            defaultCurrent={1}
            current={current}
            pageSize={pageSize}
            total={total}
            onChange={onPageChange}
          />
        </div>
      </S.SortPaginateItem>

      <S.FilterItem>
        {!isTablet && (
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
                  <Button onClick={handleDeleteAllSort} className="w-[160px] h-9">
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
                        return <RatingItem key={item.id} value={item.value} />;
                      })}
                    </Space>
                  </Space>
                </div>
              </div>

              <div className="price_div flex flex-col gap-2">
                <p className="price_title">{t("user.product_category_page.price")}</p>
                <div className="flex flex-row flex-wrap gap-2">
                  {sortPrice.map((item) => {
                    return <PriceItem key={item.id} min={item.min} max={item.max} />;
                  })}
                </div>
                <div className="spread_price flex flex-col gap-2">
                  <p className="spread_title">{t("user.product_category_page.range")}</p>
                  <SpreadPriceItem />
                </div>
              </div>

              <div className="checkbox_sort_div">
                <Space direction="vertical" className="w-full">
                  {otherSort.map((item: any): any => {
                    return <CheckboxSortItem key={item.id} sortData={item} />;
                  })}
                </Space>
              </div>
            </S.DrawerItem>
          </S.SortDrawer>
        )}

        <Space direction="vertical" className="overflow-x-auto button_spread_price">
          <Space>
            {Object.entries(queryParams)
              .filter(([key]) => key !== "page" && key !== "sort")
              .map(([key, value], index) => {
                let buttonText = "";
                let buttons: any = [];

                switch (key) {
                  case "price": {
                    const [minPrice, maxPrice] = value.split(",");
                    if (parseInt(minPrice) === 0) {
                      buttonText = `Dưới ${formatCurrency(parseInt(maxPrice))}`;
                    } else if (parseInt(maxPrice) === 1000000000000) {
                      buttonText = `Trên ${formatCurrency(parseInt(minPrice))}`;
                    } else {
                      buttonText = `${formatCurrency(parseInt(minPrice))} ${t(
                        "user.product_category_page.to"
                      )} ${formatCurrency(parseInt(maxPrice))}`;
                    }
                    break;
                  }
                  case "rating":
                    buttonText = `Từ ${value} sao`;
                    break;
                  case "shop":
                  case "supplier": {
                    const sortId = value.split(",");
                    console.log({ sortId });

                    // const sortData = otherSort.find((item: any) => item.slug === key);
                    // const sortValues = sortData?.values || [];
                    // const sortNames = sortValues
                    //   .filter((item: any) => sortId.includes(item.id.toString()))
                    //   .map((item: any) => item.name);

                    // Create a button for each name
                    buttons = sortId.map((id: string, buttonIndex: number) => {
                      const buttonName = otherSort
                        .find((item: any) => item.slug === key)
                        ?.values.find((item: any) => item.id === parseInt(id))?.name;

                      return (
                        <Button key={id + buttonIndex} type="primary" ghost className="btn_click">
                          <p className="btn_click_price cursor-default">{buttonName}</p>
                          <FontAwesomeIcon
                            icon={faCircleXmark}
                            className="icon"
                            onClick={() => handleDeleteSort(key, id)}
                          />
                        </Button>
                      );
                    });

                    break;
                  }
                  case "sort":
                    break;
                  default:
                    buttonText = `${key}: ${value}`;
                }

                if (buttons.length === 0) {
                  buttons.push(
                    <Button key={index} type="primary" ghost className="btn_click">
                      <p className="btn_click_price cursor-default">{buttonText}</p>
                      <FontAwesomeIcon icon={faCircleXmark} className="icon" onClick={() => handleDeleteSort(key)} />
                    </Button>
                  );
                }

                return buttons;
              })}
          </Space>
        </Space>

        {Object.entries(queryParams).length > 0 && (
          <Space className="delete_all_space">
            <Button type="text" className="delete_all" onClick={handleDeleteAllSort}>
              {t("user.product_category_page.delete_all")}
            </Button>
          </Space>
        )}
      </S.FilterItem>
    </S.SortPaginateItemMain>
  );
};

export default SortPaginateItem;
