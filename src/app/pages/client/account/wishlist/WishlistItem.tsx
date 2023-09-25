import { formatCurrency } from "@app/utils/helper";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "antd";
import { useTranslation } from "react-i18next";
import * as S from "./UserWishlist.style";
// import { useState } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";

interface IWishlistItem {
  id: number;
  name: string;
  thumbnail_url: string;
  price: number;
  original_price: number;
  discount_rate: number;
  discount: number;
  rating_average: number;
  review_count: number;
}

const WishlistItem = ({
  id,
  name,
  thumbnail_url,
  price,
  discount,
  original_price,
  discount_rate,
  rating_average,
  review_count,
}: IWishlistItem) => {
  const { t } = useTranslation();
  const { confirm } = Modal;
  const showConfirm = (id: number) => {
    confirm({
      title: t("user.account_user.account_wishlist.confirm_title"),
      icon: <ExclamationCircleFilled />,
      onOk() {
        console.log("ok", id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
    console.log(Object.values({ id }).toString());
  };
  return (
    <S.UserWishListProduct>
      <div className="flex w-full justify-between">
        <div className="flex left">
          <div className="flex justify-center relative">
            <img src={thumbnail_url} alt={name} width={150} className="object-cover" />
            <S.BoxShadow></S.BoxShadow>
          </div>
          <div className="ml-4">
            <S.ProductName>
              <a href="#/">{name}</a>
              <div className="mt-1 flex items-center">
                <S.UserWishListRate allowHalf={true} disabled defaultValue={rating_average} />
                <span className="text-[12px] font-[400] text-black leading-3">
                  {t("user.account_user.account_wishlist.comment", { rating: review_count })}
                </span>
              </div>
            </S.ProductName>
          </div>
        </div>
        <div className="flex justify-end right">
          <div className="flex flex-col items-end mr-12">
            <S.UserWishListPrice className={`${discount !== 0 ? "text-[#ff424e]" : "text-black"}`}>
              {formatCurrency(price)}
            </S.UserWishListPrice>
            {discount !== 0 && (
              <div className="flex items-center">
                <S.UserWishListPriceSale>{formatCurrency(original_price)}</S.UserWishListPriceSale>
                <span className="line block"></span>
                <S.UserWishListPriceSalePercent>{`-${discount_rate}%`}</S.UserWishListPriceSalePercent>
              </div>
            )}
          </div>
          <Button type="link" onClick={() => showConfirm(id)} className="p-0 h-fit" danger>
            <FontAwesomeIcon icon={faXmark} className="text-[#808098] text-xl" />
          </Button>
        </div>
      </div>
    </S.UserWishListProduct>
  );
};

export default WishlistItem;
