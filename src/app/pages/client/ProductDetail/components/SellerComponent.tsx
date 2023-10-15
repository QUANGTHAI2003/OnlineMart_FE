import { RatingStar } from "@app/app/assets/icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import * as S from "../ProductDetail.styles";

import { SellerSkeleton } from ".";

interface ISellerProps {
  sellerData: any;
  isLoading: boolean;
}

const SellerComponent: React.FC<ISellerProps> = ({ sellerData, isLoading }) => {
  const [isFollow, setIsFollow] = useState<boolean>(false);

  const { t } = useTranslation();

  const handleFollowSeller = () => {
    setIsFollow(!isFollow);
  };

  return (
    <S.SellerStyle>
      {isLoading ? (
        <SellerSkeleton />
      ) : (
        <div className="current-seller">
          <div className="seller-widget">
            <div className="seller-info">
              <Link className="flex items-start" to={`/cua-hang/${sellerData?.id}`}>
                <img className="logo" src={sellerData?.avatar} alt={sellerData?.name} />
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
                  <span>{`${sellerData?.rating} / 5`}</span>
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
          <div className="seller-warranty">
            <div className="warranty-item">
              <span className="itemLeft">Thời gian bảo hành</span>
              <span data-view-id="pdp_view_warranty_info_button" className="itemRight">
                18 Tháng
              </span>
            </div>
            <div className="warranty-item">
              <span className="itemLeft">Hình thức bảo hành</span>
              <span data-view-id="pdp_view_warranty_info_button" className="itemRight">
                Điện tử
              </span>
            </div>
            <div className="warranty-item">
              <span className="itemLeft">Nơi bảo hành</span>
              <span data-view-id="pdp_view_warranty_info_button" className="itemRight">
                Bảo hành chính hãng
              </span>
            </div>
            <div className="warranty-item">
              <span className="itemLeft">Hướng dẫn bảo hành</span>
              <span data-view-id="pdp_view_warranty_info_button" className="text-link itemRight">
                Xem chi tiết
              </span>
            </div>
          </div>
          <div className="customer-benerfit">
            <div className="benefit-item">
              <img
                alt="compensation-icon"
                src="https://salt.tikicdn.com/ts/upload/2c/48/44/720434869e103b03aaaf1a104d91ad25.png"
                height="32"
                width="32"
              />
              <span>
                Hoàn tiền
                <br />
                <b>111%</b>
                <br />
                nếu hàng giả
              </span>
            </div>
            <div className="benefit-item">
              <img
                alt="compensation-icon"
                src="https://salt.tikicdn.com/ts/upload/4b/a1/23/1606089d5423e5cba05e3820ad39708e.png"
                height="32"
                width="32"
              />
              <span>
                Mở hộp
                <br />
                kiểm tra
                <br />
                nhận hàng
              </span>
            </div>
            <div className="benefit-item">
              <img
                alt="compensation-icon"
                src="https://salt.tikicdn.com/ts/upload/63/75/6a/144ada409519d72e2978ad2c61bc02a7.png"
                height="32"
                width="32"
              />
              <span>
                Đổi trả trong
                <br />
                <b>7 ngày</b>
                <br />
                nếu sp lỗi.
              </span>
            </div>
          </div>
        </div>
      )}
    </S.SellerStyle>
  );
};

export default SellerComponent;
