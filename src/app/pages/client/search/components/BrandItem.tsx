import { StarFilled } from "@ant-design/icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import BrandSkeleton from "../skeletons/BrandSkeleton";
import * as S from "../UserSearch.styles";

interface IBrandItem {
  image: string;
  title: string;
  brand: string;
  rate: number;
  detail: any;
  coupon: string;
  certificate: string;
}

const BrandItem: React.FC<IBrandItem> = ({ image, title, brand, rate, detail, coupon, certificate }) => {
  const { t } = useTranslation();

  const [loadingSkeletonCount, setLoadingSkeletonCount] = useState<boolean>(false);

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
        <S.BrandItem>
          <div className="content">
            <Col className="left_brand">
              <div className="main_brand">
                <div className="image_div">
                  <img src={image} alt="Img" />
                </div>
                <div className="content_div">
                  <p className="title">{title}</p>
                  <div className="store_name">
                    <p className="financed">{t("user.search_page.financed")}</p>
                    <p className="brand">{brand}</p>
                    <div className="official">
                      <FontAwesomeIcon icon={faCheck} />
                      <span>{certificate}</span>
                    </div>
                    <p className="rate">
                      {`${rate}/5`}
                      <StarFilled className="star_icon" />
                    </p>
                  </div>
                </div>
              </div>
            </Col>

            <Col className="right_brand">
              <div className="thumbnail_brand">
                {detail.map((item: any) => (
                  <div key={item.id} className="thumbnail_div">
                    <img src={item.thumbnail} alt="Img" />
                    <span className="sale_thumbnail">{item.sale_thumbnail}</span>
                  </div>
                ))}
              </div>

              <div className="see_more">
                <p className="coupon">{coupon}</p>
                <Space wrap className="button">
                  <Button type="primary">{t("user.search_page.see_more")}</Button>
                </Space>
              </div>
            </Col>
          </div>
        </S.BrandItem>
      )}
    </div>
  );
};

export default BrandItem;
