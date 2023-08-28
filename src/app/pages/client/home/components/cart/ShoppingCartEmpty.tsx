import emptyIcon from "@app/app/assets/images/emptyCart.png";
import { useTranslation } from "react-i18next";

const ShoppingCartEmpty = () => {
  const { t } = useTranslation();

  return (
    <div className="relative">
      <div className="bg-white py-10 px-5 text-center w-full">
        <img src={emptyIcon} alt="empty-icon" className="w-[190px]" />
        <p className="my-3">{t("user.shopping_cart_page.empty_cart")}</p>
        <a href="/#" className="rounded py-3 px-[50px] inline-block font-medium bg-yellow-300 text-black">
          {t("user.shopping_cart_page.empty_description")}
        </a>
      </div>
    </div>
  );
};

export default ShoppingCartEmpty;
