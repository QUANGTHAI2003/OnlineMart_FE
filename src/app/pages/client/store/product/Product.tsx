import ProductCard from "@app/app/components/clients/ProductCard/ProductCard";
import ProductCardSkeleton from "@app/app/components/clients/ProductCard/ProductCardSkeleton";
import data from "@app/app/pages/client/home/data";
import { formatShortenNumber } from "@app/utils/helper";
import { Button, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";

import * as S from "./Product.styles";
import Sidebar from "./Sidebar";
import SortBy from "./SortBy";

const Products = () => {
  const { t } = useTranslation();
  const initialProductCount = 18;
  const [productCount, setProductCount] = useState(initialProductCount);
  const [loadingSkeletonCount, setLoadingSkeletonCount] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleViewMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setProductCount((prevCount) => prevCount + initialProductCount);
      setIsLoading(false);
    }, 1000);
  };
  useEffect(() => {
    setLoadingSkeletonCount(true);
    setTimeout(() => {
      setLoadingSkeletonCount(false);
    }, 5000);
  }, []);
  return (
    <S.ContainerAllProduct>
      {/*  sidebar categories */}
      <Sidebar />
      <S.MainProduct>
        <>
          <div className="header-title">
            {t("user.seller.all_products.title")}
            <span>
              {formatShortenNumber(data.length)}
              {t("user.seller.all_products.results")}
            </span>
          </div>
          {/* sort products */}
          <SortBy />
          {loadingSkeletonCount ? (
            <ProductCardSkeleton count={18} />
          ) : (
            <Row gutter={[8, 8]}>
              {data.slice(0, productCount).map((item) => (
                <Col key={uuidv4()} className="gutter-row" xs={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 4 }}>
                  <ProductCard
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    discountRate={item.discount_rate}
                    quantitySold={item.quantity_sold}
                    ratingAverage={item.rating_average}
                    thumbnailUrl={item.thumbnail_url}
                  />
                </Col>
              ))}
            </Row>
          )}
          {productCount < data.length && (
            <Button
              type="primary"
              size="large"
              loading={isLoading}
              ghost
              className="view_more"
              onClick={handleViewMore}
            >
              {t("user.product.view_more")}
            </Button>
          )}
        </>
      </S.MainProduct>
    </S.ContainerAllProduct>
  );
};

export default Products;
