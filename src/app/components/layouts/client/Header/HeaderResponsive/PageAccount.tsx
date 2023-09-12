import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import Cart from "../Popups/Cart/PopupCart";

const PageAccount = () => {
  const location = useLocation();
  const history = useNavigate();
  const { t } = useTranslation();
  const [title, setTitle] = useState<string>("");
  const [clickCount, setClickCount] = useState(0);
  const [clickTimeout, setClickTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  const haveCart = location.pathname.startsWith("/account/");
  const backHome = location.pathname === "/account/edit_profile";

  const handleClick = () => {
    setClickCount((prevCount) => prevCount + 1);

    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
      handleDoubleClick();
    } else {
      setClickTimeout(
        setTimeout(() => {
          setClickCount(0);
          handleSingleClick();
        }, 300)
      );
    }
  };

  const handleSingleClick = () => {
    haveCart ? history("/account") : history(-1);
  };

  const handleDoubleClick = () => {
    if (backHome) {
      history("/");
    }
  };

  useEffect(() => {
    const pathMappings: Record<string, string> = {
      "/account/edit_profile": t("user.account_menu.profile"),
      "/account/notifications": t("user.account_user.account_notification"),
      "/account/order": t("user.account_user.account_purchase"),
      "/account/wishlist": t("user.account_user.account_like"),
      "/account/my_rating": t("user.account_user.account_rating"),
      "/account/address": t("user.account_user.account_address"),
      "/account/voucher": t("user.account_user.account_voucher"),
      "/checkout": t("user.shopping_cart_page.cart"),
      "/checkout/payment": t("user.header.payment_title_page"),
    };

    const matchedPath = Object.keys(pathMappings).find((path) => {
      return location.pathname === path;
    });
    if (matchedPath) {
      setTitle(pathMappings[matchedPath]);
    }
  }, [location, t]);

  return (
    <div className="flex items-center justify-between px-2 h-[56px] bg-[#1ba8ff]">
      <button className="min-w-[40px] h-[40px] p-0 border-0 outline-0 text-white flex justify-center items-center z-10 bg-transparent">
        <FontAwesomeIcon onClick={handleClick} icon={faAngleLeft} className="text-lg text-[#fff] cursor-pointer" />
      </button>
      <div className="text-white text-[17px] text-center w-full">{title}</div>
      {haveCart && (
        <div
          className="w-[44px] h-[40px] flex justify-center items-center text-white"
          style={{ color: "white !important" }}
        >
          <Cart
            items={[
              {
                id: 1,
                name: "Sách Đắc Nhân Tâm",
                price: 25000,
                urlImage: "https://source.unsplash.com/random",
              },
            ]}
            isBlue={false}
          />
        </div>
      )}
      {haveCart || <div className="w-[44px] h-[40px] bg-transparent"></div>}
    </div>
  );
};

export default PageAccount;
