import Mascot from "@app/app/assets/images/mascot.png";
import { useGetWishlistRootQuery } from "@app/store/slices/api/user/wishlistApi";
import { useAppSelector } from "@app/store/store";
import { IWishlist } from "@app/types/wishlist.types";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";

import * as S from "./UserWishlist.style";
import WishlistItem from "./WishlistItem";

const UserWishlist = () => {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.userState.user);
  const { data: dataWishlist } = useGetWishlistRootQuery(user?.id);
  return (
    <>
      <div className="text-xl mb-3">{t("user.account_user.account_wishlist.title")}</div>
      {dataWishlist && dataWishlist?.length > 0 ? (
        <div>
          {dataWishlist?.map((item: IWishlist) => {
            return (
              <WishlistItem
                key={uuidv4()}
                is_sale={item.is_sale}
                id={item.id}
                product_id={item.product_id}
                slug={item.slug}
                name={item.name}
                regular_price={item.regular_price}
                thumbnail_url={item.thumbnail_url}
                current_price={item.current_price}
                discount_rate={item.discount_rate}
                rating={item.rating}
              />
            );
          })}
        </div>
      ) : (
        <div className="mt-4 py-8 w-full text-center text-[14px] rounded-md bg-white">
          <div className="py-8">
            <img src={Mascot} alt="IMG" width={160} className="object-cover" />
            <p className="my-5">{t("user.account_user.account_wishlist.text_empty")}</p>
            <S.UserWishListShopping href="#/">
              {t("user.account_user.account_wishlist.button_shopping")}
            </S.UserWishListShopping>
          </div>
        </div>
      )}
    </>
  );
};

export default UserWishlist;
