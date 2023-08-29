import ProductCard from "@app/app/components/clients/ProductCard/ProductCard";
import ProductCardSkeleton from "@app/app/components/clients/ProductCard/ProductCardSkeleton";
import { Button, Col, Row, TabsProps } from "antd";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { productTab } from "../data";
import * as S from "../Home.styles";

interface IFixedHeader {
  isFixedHeader: string;
}

const ProductComponent: React.FC<IFixedHeader> = ({ isFixedHeader }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const nagigate = useNavigate();

  const initialProductCount = 18;
  const paramFilterName = "tab";
  const inititalTab = productTab.tabs[0].slug;

  const [productCount, setProductCount] = useState<number>(initialProductCount);
  const [tabFiltered, setTabFiltered] = useState<any>((): any => {
    const params = queryString.parse(location.search);
    return String(params?.[paramFilterName] || inititalTab);
  });

  const [loadingSkeletonCount, setLoadingSkeletonCount] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleViewMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setProductCount((prevCount) => prevCount + initialProductCount);
      setIsLoading(false);
    }, 1000);
  };

  const handleChangeTab = (key: string) => {
    setTabFiltered(key);
    const queryParams = queryString.stringify({ [paramFilterName]: key || inititalTab });
    nagigate({ search: queryParams });
  };

  useEffect(() => {
    const params = queryString.parse(location.search);
    setTabFiltered(params?.[paramFilterName] || inititalTab);
  }, [inititalTab, location.search]);

  useEffect(() => {
    setLoadingSkeletonCount(true);
    setTimeout(() => {
      setLoadingSkeletonCount(false);
    }, 5000);
  }, []);

  const itemData = productTab.tabs.map((productTabData: any) => ({
    key: productTabData?.slug,
    label: (
      <>
        <img src={productTabData?.icon} alt={productTabData?.title} />
        <span className="tab-text">{productTabData?.title}</span>
      </>
    ),
    children: (
      <>
        {loadingSkeletonCount ? (
          <ProductCardSkeleton count={18} />
        ) : (
          <Row gutter={[8, 8]}>
            {productTabData?.items?.slice(0, productCount).map((item: any) => (
              <Col key={uuidv4()} xs={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 4 }}>
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

        {productCount < productTabData?.items?.length && (
          <Button type="primary" size="large" loading={isLoading} ghost className="view_more" onClick={handleViewMore}>
            {t("user.product.view_more")}
          </Button>
        )}
      </>
    ),
  }));

  const items: TabsProps["items"] = itemData;

  return (
    <S.ProductStyle isfixed={isFixedHeader}>
      <div className="header" id="productList">
        <h2>{t("user.product.suggestions")}</h2>
        <S.TabsStyle
          defaultActiveKey={inititalTab}
          activeKey={tabFiltered}
          items={items}
          animated={false}
          centered
          onChange={handleChangeTab}
        />
      </div>
    </S.ProductStyle>
  );
};

export default ProductComponent;
