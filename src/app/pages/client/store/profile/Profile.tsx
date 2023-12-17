import ImageBio from "@app/app/assets/images/store/bio.png";
import ImageFollow from "@app/app/assets/images/store/followIcon.png";
import ImageInfo from "@app/app/assets/images/store/info.png";
import ImageProductNew from "@app/app/assets/images/store/product-new.png";
import ImageStartIcon from "@app/app/assets/images/store/start.png";
import TimeNew from "@app/app/assets/images/store/time-new.png";
import { useAppSelector } from "@app/store/store";
import { formatShortenNumber } from "@app/utils/helper";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Popover, Row } from "antd";
import { useTranslation } from "react-i18next";

import * as S from "./Profile.styles";

const Profile: React.FC<any> = (shopData) => {
  console.log(shopData?.shopData?.product);
  const { t } = useTranslation();

  const information = useAppSelector((state) => state.shopInformation.information) || {};
  const founded_year = new Date(information.created_at).getFullYear().toString();

  const totalRating = shopData?.shopData?.review.reduce((acc: any, review: any) => acc + review.rating, 0);
  const reviewCount = shopData?.shopData?.review.length;

  let averageRating = totalRating / reviewCount;
  averageRating = averageRating > 5 ? 5 : averageRating;

  return (
    <div className="rounded-lg">
      <S.RowStyled className="items-center p-4 bg-white">
        <Col className="bg-white py-4" span={12}>
          <Row className="items-center">
            <Col span={12} className="review flex flex-col items-center text-center">
              <div className="flex flex-row flex-wrap items-center">
                <span className="mr-1 text-lg">{t("user.seller.info.cancellation_rate")}</span>
                <Popover
                  placement="bottom"
                  color="#0a68ff"
                  content={<p className="p-0 text-white">{t("user.seller.info.cancel_des")}</p>}
                >
                  <div className="ml-1">
                    <img src={ImageInfo} className="object-cover" alt="IMG" width="12" />
                  </div>
                </Popover>
              </div>
              <S.Percent>0 %</S.Percent>
            </Col>
            <Col span={12} className="review flex flex-col items-center text-center">
              <div className="flex flex-row flex-wrap items-center">
                <span className="mr-1 text-lg">{t("user.seller.info.return_rate")}</span>
                <Popover
                  placement="bottom"
                  color="#0a68ff"
                  content={<p className="p-0 text-white">{t("user.seller.info.return_des")}</p>}
                >
                  <div className="ml-1">
                    <img src={ImageInfo} className="object-cover" alt="IMG" width="12" />
                  </div>
                </Popover>
              </div>
              <S.Percent>0 %</S.Percent>
            </Col>
          </Row>
        </Col>
        <S.Info span={12}>
          <Row className="bg-res w-full p-4">
            <Col lg={{ span: 8 }} xs={{ span: 12 }} className="store-info">
              <img src={TimeNew} alt="bio" width="20" />
              <span className="store-info w-full ml-1 ">{t("user.seller.info.members")}</span>
            </Col>
            <Col lg={{ span: 16 }} xs={{ span: 12 }} className="store-des">
              {founded_year}
            </Col>
          </Row>
          <Row className="w-full p-4">
            <Col lg={{ span: 8 }} xs={{ span: 12 }} className="store-info">
              <img src={ImageProductNew} alt="bio" width="20" />
              <span className="store-info w-full ml-1 ">{t("user.seller.info.product")}</span>
            </Col>
            <Col lg={{ span: 16 }} xs={{ span: 12 }} className="store-des">
              {formatShortenNumber(shopData?.shopData?.product?.length)}
            </Col>
          </Row>
          <Row className="bg-res w-full p-4">
            <Col lg={{ span: 8 }} sm={{ span: 12 }} className="store-info">
              <img src={ImageBio} alt="bio" width="20" />
              <span className="store-info w-full ml-1 ">{t("user.seller.info.store")}</span>
            </Col>
            <Col lg={{ span: 16 }} sm={{ span: 12 }} className="xs:mt-2 lg:mt-0">
              {t("user.seller.info.buy") + information.name + t("user.seller.info.reputation")}
            </Col>
          </Row>
          <Row className="w-full p-4">
            <Col lg={{ span: 8 }} xs={{ span: 12 }} className="store-info">
              <FontAwesomeIcon icon={faStar} />
              <span className="store-info w-full ml-1 ">{t("user.seller.info.assess")}</span>
            </Col>
            <Col lg={{ span: 16 }} xs={{ span: 12 }} className="store-des flex items-center">
              <span>{`${averageRating} / 5`}</span>
              <img src={ImageStartIcon} alt="start" width="20" />
              <span className="ml-1">{`(${formatShortenNumber(shopData?.shopData?.review.length)})`}</span>
            </Col>
          </Row>
          <Row className="bg-res w-full p-4">
            <Col lg={{ span: 8 }} xs={{ span: 12 }} className="store-info">
              <img src={ImageFollow} alt="bio" width="20" />
              <span className="store-info w-full ml-1 ">{t("user.seller.info.follow")}</span>
            </Col>
            <Col lg={{ span: 16 }} xs={{ span: 12 }} className="store-des">
              {formatShortenNumber(shopData?.shopData?.followed)}
            </Col>
          </Row>
        </S.Info>
      </S.RowStyled>
    </div>
  );
};

export default Profile;
