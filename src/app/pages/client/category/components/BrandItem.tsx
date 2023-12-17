import { StarFilled } from "@ant-design/icons";
import { baseImageUrl } from "@app/utils/helper";
import { Image } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

import BrandSkeleton from "../skeletons/BrandSkeleton";

interface IBrandItem {
  avatar: string;
  name: string;
  supplier: string;
  rate: number;
  isFetching: boolean;
  slug: string;
}

const BrandItem: React.FC<IBrandItem> = ({ avatar, name, supplier, rate, isFetching, slug }) => {
  const { t } = useTranslation();

  return (
    <div>
      {isFetching ? (
        <BrandSkeleton count={1} />
      ) : (
        <Link to={`/store/${slug}`} target="_blank">
          <div className="product_category items-center">
            <div className="img">
              <Image
                src={`${baseImageUrl}/${avatar}`}
                preview={false}
                width={110}
                height={110}
                alt="svsv"
                className="object-cover"
              />
            </div>
            <div className="content">
              <p className="brand_title">{name}</p>
              <span className="content_col2">
                <p className="financed">{t("user.product_category_page.sponsored")}</p>
                <p className="brand">{supplier}</p>
                <p className="rate">
                  {rate}
                  /5
                  <StarFilled className="star" />
                </p>
              </span>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default BrandItem;
