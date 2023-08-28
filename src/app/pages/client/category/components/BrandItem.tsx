import { StarFilled } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import "swiper/css";
import "swiper/css/pagination";
import BrandSkeleton from "../skeletons/BrandSkeleton";

interface IBrandItem {
  image: string;
  title: string;
  brand: string;
  rate: number;
  detail: any;
}

const BrandItem: React.FC<IBrandItem> = ({ image, title, brand, rate, detail }) => {
  const { t } = useTranslation();

  const [loadingSkeletonCount, setLoadingSkeletonCount] = useState(false);

  useEffect(() => {
    setLoadingSkeletonCount(true);
    setTimeout(() => {
      setLoadingSkeletonCount(false);
    }, 3000);
  }, []);

  return (
    <div>
      {loadingSkeletonCount ? (
        <BrandSkeleton count={1} />
      ) : (
        <div className="product_category">
          <div className="img">
            <img src={image} alt={image} width={110} />
          </div>

          <div className="content">
            <p className="brand_title">{title}</p>
            <span className="content_col2">
              <p className="financed">{t("user.product_category_page.sponsored")}</p>
              <p className="brand">{brand}</p>
              <p className="rate">
                {rate}
                /5
                <StarFilled className="star" />
              </p>
            </span>

            <div className="thumbnail_div">
              {detail.map((item: any) => (
                <div className="thumbnail" key={item.id}>
                  <img src={item.thumbnail} alt="Thumbnail" />
                  <span className="sale">{item.sale}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandItem;
