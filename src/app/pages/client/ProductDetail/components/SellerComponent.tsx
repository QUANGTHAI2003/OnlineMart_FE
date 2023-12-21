import { RatingStar } from "@app/app/assets/icons";
import { useGetUserFolowQuery } from "@app/store/slices/api/user/userFolowApi";
import { useAppSelector } from "@app/store/store";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import * as S from "../ProductDetail.styles";

import { SellerSkeleton } from ".";

interface ISellerProps {
  sellerData: any;
  isLoading: boolean;
  shop_id: any;
}

const SellerComponent: React.FC<ISellerProps> = ({ sellerData, isLoading, shop_id }) => {
  const [isFollow, setIsFollow] = useState<boolean>(false);
  const baseImage = import.meta.env.VITE_BASE_IMAGE_URL as string;
  const user_id = useAppSelector((state) => state.userState.user)?.id;
  const { data: userFolowData } = useGetUserFolowQuery({ user_id: parseInt(user_id), shop_id: parseInt(shop_id) });
  const { t } = useTranslation();

  const handleFollowSeller = () => {
    setIsFollow(!isFollow);
  };
  useEffect(() => {
    if (userFolowData) {
      setIsFollow(true);
    }
  }, [isFollow, userFolowData]);
  return (
    <S.SellerStyle>
      {isLoading ? (
        <SellerSkeleton />
      ) : (
        <div className="current-seller">
          <div className="seller-widget">
            <div className="seller-info">
              <Link className="flex items-start" to={`/store/${sellerData?.id}`}>
                <img className="logo" src={`${baseImage}/${sellerData.avatar}`} alt={sellerData?.name} />
                <div className="ml-3">
                  <span className="seller-name">
                    <span>{sellerData?.name}</span>
                    <img
                      className="badge-img"
                      src="https://salt.tikicdn.com/ts/upload/e8/6a/e3/7f998ef1eb5ab0536aac53f02a698c8a.png"
                      alt="seller-badge"
                    />
                  </span>
                </div>
              </Link>
            </div>
            <div className="seller-detail">
              <div className="item review">
                <div className="title">
                  <span>{`${4} / 5`}</span>
                  <RatingStar />
                </div>
                <div className="sub-title">2.6k+</div>
              </div>
              <div className="border-left"></div>
              <div className="item normal">
                <div className="title">
                  <span>7.2k+</span>
                </div>
                <div className="sub-title">{t("user.product_detail.follow")}</div>
              </div>
              <div className="border-left"></div>
              <div className="item chat">
                <div className="title">
                  <span>96%</span>
                </div>
                <div className="sub-title">{t("user.product_detail.reply")}</div>
              </div>
            </div>
            <div className="seller-action">
              <a className="action" href="/cua-hang/happy-phone?source_screen=product_detail&amp;source_engine=organic">
                <img
                  src="https://salt.tikicdn.com/ts/upload/49/27/ff/d735c33edfdc6cf6aeb6e183bec28869.png"
                  alt="view-store"
                />
                <span className="line-clamp-1">{t("user.product_detail.view_shop")}</span>
              </a>
              <div
                onClick={handleFollowSeller}
                onKeyDown={handleFollowSeller}
                role="button"
                className={`action follow ${isFollow ? "active" : ""}`}
                tabIndex={0}
              >
                {isFollow ? (
                  <img
                    src="https://salt.tikicdn.com/ts/upload/89/e2/8d/d2da0103748f7e02fcd979f532d1c2af.png"
                    alt="follow-store"
                  />
                ) : (
                  <img
                    src="https://salt.tikicdn.com/ts/upload/5b/bf/3c/eeda00767e26b5873030e44f951441c4.png"
                    alt="follow-store"
                  />
                )}
                <span className="line-clamp-1">
                  {isFollow ? t("user.product_detail.followed") : t("user.product_detail.follow")}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </S.SellerStyle>
  );
};

export default SellerComponent;
