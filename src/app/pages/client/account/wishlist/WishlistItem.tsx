import { ExclamationCircleFilled } from "@ant-design/icons";
import { useDeleteWishlistMutation } from "@app/store/slices/api/user/wishlistApi";
import { IWishlist } from "@app/types/wishlist.types";
import { formatCurrency, notifyError, notifySuccess } from "@app/utils/helper";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import * as S from "./UserWishlist.style";

const WishlistItem = ({
  id,
  product_id,
  slug,
  regular_price,
  name,
  thumbnail_url,
  current_price,
  discount_rate,
  rating,
  is_sale,
}: IWishlist) => {
  const { t } = useTranslation();
  const { confirm } = Modal;
  const [deleteWishlist] = useDeleteWishlistMutation();
  const handleDeleteWishlist = async (id: number) => {
    try {
      await deleteWishlist(id).unwrap();
      notifySuccess("Successfully", "Delete Wishlist successfully");
    } catch (err) {
      notifyError("Error", "Delete Wishlist failed");
    }
  };
  const showConfirm = (id: number) => {
    confirm({
      title: t("user.account_user.account_wishlist.confirm_title"),
      icon: <ExclamationCircleFilled />,
      onOk() {
        handleDeleteWishlist(id);
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
              <Link to={`/product/${slug}/${product_id}`} target="_blank">
                {name}
              </Link>
              <div className="mt-1 flex items-center">
                <S.UserWishListRate allowHalf={true} disabled defaultValue={rating} />
                <span className="text-[12px] font-[400] text-black leading-3">
                  {t("user.account_user.account_wishlist.comment", { rating: rating })}
                </span>
              </div>
            </S.ProductName>
          </div>
        </div>
        <div className="flex justify-end right">
          <div className="flex flex-col items-end mr-12">
            <S.UserWishListPrice className={`${is_sale !== false ? "text-[#ff424e]" : "text-black"}`}>
              {formatCurrency(current_price)}
            </S.UserWishListPrice>
            {is_sale && (
              <div className="flex items-center">
                <S.UserWishListPriceSale>{formatCurrency(regular_price)}</S.UserWishListPriceSale>
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
