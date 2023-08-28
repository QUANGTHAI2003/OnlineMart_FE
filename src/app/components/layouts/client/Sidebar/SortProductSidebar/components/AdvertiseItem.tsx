import { Button, Row, Space } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import AdvertiseSkeleton from "../skeletons/AdvertiseSkeleton";
import * as S from "../SortProductSidebar.styles";

interface IAdvertiseItem {
  image: string;
  title: string;
  brand: string;
  sale: string;
}

const AdvertiseItem: React.FC<IAdvertiseItem> = ({ image, title, brand, sale }) => {
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
        <AdvertiseSkeleton count={1} />
      ) : (
        <Row gutter={[8, 8]}>
          <S.AdvertiseItem>
            <div className="img">
              <img src={image} alt="Image_Advertise" />
            </div>
            <p className="title">{title}</p>
            <p className="finance">Financed by</p>
            <p className="brand">{brand}</p>
            <span className="sale">{sale}</span>

            <Space direction="vertical">
              <Space>
                <Button type="primary">{t("user.product_category_sidebar.see_more")}</Button>
              </Space>
            </Space>
          </S.AdvertiseItem>
        </Row>
      )}
    </div>
  );
};

export default AdvertiseItem;
