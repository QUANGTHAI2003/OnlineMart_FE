import Mascot from "@app/app/assets/images/mascot.png";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import * as S from "./UserWishlist.style";
import WishlistItem from "./WishlistItem";
import { data } from "./data";

const UserWishlist = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="text-xl mb-3">{t("user.account_user.account_wishlist.title")}</div>
      {data.length > 0 ? (
        <>
          {data.map((item: any) => {
            return (
              <WishlistItem
                key={uuidv4()}
                id={item.id}
                name={item.name}
                thumbnail_url={item.thumbnail_url}
                price={item.price}
                original_price={item.original_price}
                discount_rate={item.discount_rate}
                discount={item.discount}
                rating_average={item.rating_average}
                review_count={item.review_count}
              />
            );
          })}
        </>
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
