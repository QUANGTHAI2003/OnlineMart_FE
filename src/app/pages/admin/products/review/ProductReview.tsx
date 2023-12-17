import { AdminBreadcrumb } from "@app/app/components/common/Breadcrumb/Breadcrumb";
import { useGetReviewQuery } from "@app/store/slices/api/admin/reviewApi";
import { Card } from "antd";
import { useTranslation } from "react-i18next";

import { Filter, FilterComponent, SiteHeaderItem, TableComponent, TabRating } from "./components";
import { searchType } from "./data";
import * as S from "./ProductReview.styles";

const ProductPreview = () => {
  const { t } = useTranslation();
  const { data: reviewList, isFetching } = useGetReviewQuery();

  return (
    <S.ProductReview>
      <div className="header">
        <div className="breadcrum">
          <AdminBreadcrumb />
        </div>

        <div className="site_header">
          <SiteHeaderItem />
        </div>
      </div>

      <div className="article">
        <div className="tab_rating">
          <TabRating reviewList={reviewList} />
        </div>

        <S.Filter span={24}>
          <Card>
            <FilterComponent searchTypeData={searchType(t)} />
            <Filter />
          </Card>
        </S.Filter>

        <TableComponent reviewList={reviewList} isFetching={isFetching} />
      </div>
    </S.ProductReview>
  );
};

export default ProductPreview;
