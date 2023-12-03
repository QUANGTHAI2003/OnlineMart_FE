import ProductCardSale from "@app/app/components/clients/ProductCard/ProductCardSale";
import ProductCardSkeleton from "@app/app/components/clients/ProductCard/ProductCardSkeleton";
import { useGetProductFlashsaleQuery } from "@app/store/slices/api/user/productFlashsaleApi";
import { Button, Col, Row } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";

import * as S from "./SaleComponent.styles";

const SaleComponent = React.memo(() => {
  const { t } = useTranslation();

  const { data: productIndexData, isFetching } = useGetProductFlashsaleQuery();

  const number = 12;

  const initialProductCount = 18;

  const [productCount, setProductCount] = useState<number>(initialProductCount);

  const handleViewMore = () => {
    setProductCount((prevCount) => prevCount + initialProductCount);
  };

  return (
    <S.SalesStyle className="sale_product">
      <div className="body pt-2 text-center">
        {isFetching ? (
          <ProductCardSkeleton count={number} />
        ) : (
          <Row gutter={[8, 8]}>
            {productIndexData?.map((item: any) => (
              <Col key={uuidv4()} xs={{ span: 12 }} sm={{ span: 6 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 4 }}>
                <ProductCardSale
                  id={item.id}
                  slug={item.slug}
                  name={item.name}
                  price={item.current_price}
                  discountRate={item.discount_rate}
                  thumbnailUrl={item.thumbnail_url}
                />
              </Col>
            ))}
          </Row>
        )}

        {productIndexData && productCount < productIndexData.length && (
          <Button
            type="primary"
            size="large"
            loading={isFetching}
            ghost
            className="view_more mt-2"
            onClick={handleViewMore}
          >
            {t("user.product.view_more")}
          </Button>
        )}
      </div>
    </S.SalesStyle>
  );
});

export default SaleComponent;
