import ProductCard from "@app/app/components/clients/ProductCard/ProductCard";
import ProductCardSkeleton from "@app/app/components/clients/ProductCard/ProductCardSkeleton";
import { Button, Row, TabsProps } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";

import data from "../data";
import * as S from "../Home.styles";

const tabData = [
  {
    id: 1,
    thumbnail: "https://salt.tikicdn.com/cache/w100/ts/personalish/f9/27/b5/3a8e2286a1c8fb91b67acc5ee35f82f0.png.webp",
    title: "Dành cho bạn",
  },
  {
    id: 2,
    thumbnail: "https://salt.tikicdn.com/cache/w100/ts/personalish/d4/de/6f/412a517a5b52d5312b66a47c088daa2e.png.webp",
    title: "Free shipping",
  },
  {
    id: 3,
    thumbnail: "https://salt.tikicdn.com/cache/w100/ts/personalish/f9/27/b5/3a8e2286a1c8fb91b67acc5ee35f82f0.png.webp",
    title: "Sản phẩm mới",
  },
  {
    id: 4,
    thumbnail: "https://salt.tikicdn.com/cache/w100/ts/personalish/f9/27/b5/3a8e2286a1c8fb91b67acc5ee35f82f0.png.webp",
    title: "Sản phẩm bán chạy",
  },
  {
    id: 5,
    thumbnail: "https://salt.tikicdn.com/cache/100x100/ts/upload/20/68/cf/6d4adbdbcd1c35b0a438a655d9a420d0.png.webp",
    title: "Sản phẩm giảm giá",
  },
];

interface IFixedHeader {
  isFixedHeader: string;
}

const ProductComponent: React.FC<IFixedHeader> = ({ isFixedHeader }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const itemData = tabData.map((item) => ({
    key: item.id.toString(),
    label: (
      <>
        <img src={item.thumbnail} alt="" />
        <span className="tab-text">{item.title}</span>
      </>
    ),
    children: (
      <>
        {loadingSkeletonCount ? (
          <ProductCardSkeleton count={18} />
        ) : (
          <Row gutter={[8, 8]}>
            {data.slice(0, productCount).map((item) => (
              <ProductCard
                key={uuidv4()}
                id={item.id}
                name={item.name}
                price={item.price}
                discountRate={item.discount_rate}
                quantitySold={item.quantity_sold}
                ratingAverage={item.rating_average}
                thumbnailUrl={item.thumbnail_url}
              />
            ))}
          </Row>
        )}

        {productCount < data.length && (
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
        <S.TabsStyle defaultActiveKey="1" items={items} animated={false} centered />
      </div>
    </S.ProductStyle>
  );
};

export default ProductComponent;
