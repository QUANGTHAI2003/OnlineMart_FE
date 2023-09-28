import { AdminBreadcrumb } from "@app/app/components/common/Breadcrumb/Breadcrumb";
import { useDebounce } from "@app/hooks";
import { Card } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Filter, FilterComponent, SiteHeaderItem, TableComponent, TabRating } from "./components";
import * as S from "./ProductReview.styles";
import {
  AdminBreadcrumbSkeleton,
  FilterComponentSkeleton,
  FilterSkeleton,
  SiteHeaderSkeleton,
  TableComponentSkeleton,
  TabRatingSkeleton,
} from "./skeletons";

const searchType = (t: any) => {
  return [
    { value: "title", label: t("admin_shop.product.review.table_cpn.title") },
    { value: "reviewer", label: t("admin_shop.product.review.table_cpn.reviewer") },
    { value: "seller_reply", label: t("admin_shop.product.review.table_cpn.seller_replies") },
    { value: "sku", label: t("admin_shop.product.review.table_cpn.sku") },
    { value: "rating", label: t("admin_shop.product.review.table_cpn.rating") },
  ];
};

const ProductPreview = () => {
  const { t } = useTranslation();

  const [loadingSkeletonCount, setLoadingSkeletonCount] = useState<boolean>(false);
  useEffect(() => {
    setLoadingSkeletonCount(true);
    setTimeout(() => {
      setLoadingSkeletonCount(false);
    }, 3000);
  }, []);

  const [searchValue, setSearchValue] = useState<string>("");
  const [selectSearchType, setSelectSearchType] = useState<string>(searchType(t)[0].value);
  const debouncedSearchValue = useDebounce(searchValue, 300);

  return (
    <S.ProductReview>
      <div className="header">
        <div className="breadcrum">
          {loadingSkeletonCount ? <AdminBreadcrumbSkeleton count={1} /> : <AdminBreadcrumb />}
        </div>

        <div className="site_header">
          {loadingSkeletonCount ? <SiteHeaderSkeleton count={1} /> : <SiteHeaderItem />}
        </div>
      </div>

      <div className="article">
        <div className="tab_rating">{loadingSkeletonCount ? <TabRatingSkeleton count={1} /> : <TabRating />}</div>

        <S.Filter span={24}>
          <Card>
            {loadingSkeletonCount ? (
              <FilterComponentSkeleton count={1} />
            ) : (
              <FilterComponent
                setSearchValue={setSearchValue}
                setSelectSearchType={setSelectSearchType}
                searchTypeData={searchType(t)}
              />
            )}
            {loadingSkeletonCount ? <FilterSkeleton count={1} /> : <Filter />}
          </Card>
        </S.Filter>

        {loadingSkeletonCount ? (
          <TableComponentSkeleton count={1} />
        ) : (
          <TableComponent searchValue={debouncedSearchValue} searchType={selectSearchType} />
        )}
      </div>
    </S.ProductReview>
  );
};

export default ProductPreview;
