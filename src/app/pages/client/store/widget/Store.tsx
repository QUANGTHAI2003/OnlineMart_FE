import { CouponStoreBackground, CouponStoreSaved } from "@app/app/assets/icons";
import ImageNext from "@app/app/assets/images/store/next.png";
import ImagePrev from "@app/app/assets/images/store/prev.png";
import { dataCoupon, dataSeller } from "@app/app/pages/client/store/data";
import { formatVNCurrency } from "@app/utils/helper";
import { notificationController } from "@app/utils/notification";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import StockToday from "./StockToday";
import * as S from "./Store.styles";
import Widget from "./Widget";

const Store = () => {
  const { t } = useTranslation();
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const handleCopy = () => {
    if (!isCopied) {
      setIsCopied(true);
      notificationController.success({
        message: t("user.seller.save_coupon"),
        description: t("user.seller.coupon_desc"),
      });
    }
  };
  const dividedBanners = [];
  const banner = dataSeller.banners;
  for (let i = 0; i < banner?.length; i += 2) {
    dividedBanners.push(banner?.slice(i, i + 2));
  }
  return (
    <>
      <StockToday />
      <S.CarouselCustomBanner
        className="mt-4"
        dots={false}
        autoplay={true}
        infinite={false}
        arrows
        prevArrow={<img src={ImagePrev} alt="prev icon" />}
        nextArrow={<img src={ImageNext} alt="prev icon" />}
      >
        {dividedBanners.map((slide) => (
          <div key={uuidv4()}>
            <S.BannerImage>
              {slide.map((item: any, itemIndex: number) => (
                <a href="#a" key={uuidv4()} className={itemIndex === 0 ? "left" : "right"}>
                  <img className="rounded-lg object-cover" width="100%" height="100%" src={item.thumbnail} alt="img" />
                </a>
              ))}
            </S.BannerImage>
          </div>
        ))}
      </S.CarouselCustomBanner>
      {dataCoupon && dataCoupon.length > 0 && (
        <S.CarouselCustomCoupon
          className="bg-white py-4 px-5 mt-4"
          arrows
          prevArrow={<FontAwesomeIcon icon={faAngleLeft} />}
          nextArrow={<FontAwesomeIcon icon={faAngleRight} />}
          autoplay={false}
          infinite={false}
          dots={false}
          slidesToShow={6}
        >
          {dataCoupon?.map((item: any) => (
            <S.CouponItem key={uuidv4()}>
              <div className="coupon">
                <div className="absolute top-0 left-0 w-full h-full">
                  <CouponStoreBackground />
                  <div className="relative flex h-full flex-col items-center">
                    <div className="w-full h-full flex items-center flex-col">
                      <div className="title">
                        <h4>
                          {`${t("user.seller.discount")}
                          ${formatVNCurrency(item.discount_amount)}${item.type === "by_percent" ? "%" : "" }`}
                        </h4>
                      </div>
                      <p>
                        {t("user.seller.for_order")}
                        {formatVNCurrency(item.min_amount)}
                      </p>
                      {isCopied === true ? (
                        <CouponStoreSaved />
                      ) : (
                        <div className="btn-copy">
                          <CopyToClipboard text={item.coupon_code} onCopy={handleCopy}>
                            <button className="border-0 bg-transparent">{t("user.seller.save")}</button>
                          </CopyToClipboard>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </S.CouponItem>
          ))}
        </S.CarouselCustomCoupon>
      )}
      <Widget />
    </>
  );
};

export default Store;
