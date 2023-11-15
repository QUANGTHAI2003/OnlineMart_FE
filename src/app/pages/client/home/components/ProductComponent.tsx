import ProductCard from "@app/app/components/clients/ProductCard/ProductCard";
import ProductCardSkeleton from "@app/app/components/clients/ProductCard/ProductCardSkeleton";
import { useGetAllProductQuery } from "@app/store/slices/api/user/productApi";
import { Button, Col, Row } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";

import * as S from "../Home.styles";
interface IFixedHeader {
  isFixedHeader: string;
}

const ProductComponent: React.FC<IFixedHeader> = ({ isFixedHeader }) => {
  const { t } = useTranslation();

  const { data: productIndexData, isLoading: isLoadingProduct } = useGetAllProductQuery();
  console.log(productIndexData);

  const initialProductCount = 18;

  const [productCount, setProductCount] = useState<number>(initialProductCount);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleViewMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setProductCount((prevCount) => prevCount + initialProductCount);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <S.ProductStyle isfixed={isFixedHeader}>
      {isLoadingProduct || isLoading ? (
        <ProductCardSkeleton count={18} />
      ) : (
        <Row gutter={[8, 8]}>
          {productIndexData?.map((item: any) => (
            <Col key={uuidv4()} xs={{ span: 12 }} sm={{ span: 6 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 4 }}>
              <ProductCard
                id={item.id}
                name={item.name}
                slug={item.slug}
                ratingAverage={item.rating}
                price={item.current_price}
                quantitySold={item.sold_count}
                discountRate={item.discount_rate}
                thumbnailUrl={item.thumbnail_url}
                type={item.type}
                variant_name={item.variant_name}
              />
            </Col>
          ))}
        </Row>
      )}

      {productIndexData && productCount < productIndexData.length && (
        <Button type="primary" size="large" loading={isLoading} ghost className="view_more" onClick={handleViewMore}>
          {t("user.product.view_more")}
        </Button>
      )}
    </S.ProductStyle>
  );
};

export default ProductComponent;
