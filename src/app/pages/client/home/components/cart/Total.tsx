import { useResponsive } from "@app/hooks";
import { useGetCheckoutItemQuery } from "@app/store/slices/api/user/cartApi";
import { useAppSelector } from "@app/store/store";
import { formatCurrency } from "@app/utils/helper";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Coupon from "./Coupon";

const Total = () => {
  const { t } = useTranslation();
  const { isDesktop } = useResponsive();
  const navigate = useNavigate();

  const userId = useAppSelector((state) => state.userState.user)?.id;
  const { data: checkoutItem = [] } = useGetCheckoutItemQuery(userId);

  const hasCheckoutItems = checkoutItem.length > 0;
  const handleCheckout = () => {
    if (!hasCheckoutItems) {
      Modal.info({
        title: t("user.shopping_cart_page.error_select_item"),
        onOk: () => console.log("Vui lòng chọn sản phẩm"),
      });
    } else {
      navigate("/checkout/payment");
    }
  };

  let totalPrice = 0;
  if (hasCheckoutItems) {
    for (const shop of checkoutItem) {
      for (const item of shop.items) {
        totalPrice += item.price * item.quantity;
      }
    }
  }

  const getTotalQuantity = () => {
    return checkoutItem.reduce((acc, shop) => acc + shop.items.reduce((acc, product) => acc + product.quantity, 0), 0);
  };
  const totalQuantity = getTotalQuantity();

  return (
    <div className="container-checkout">
      <Coupon />
      {isDesktop ? (
        <>
          <div className="bg-white rounded pb-2">
            <ul className="border-b border-solid border-b-gray-200 px-5 py-4 border-t-0 border-l-0 border-r-0">
              <li className="flex items-center justify-between mb-3">
                <span className="font-light">{t("user.shopping_cart_page.sub_total")}</span>
                <span className="font-normal">{formatCurrency(totalPrice)}</span>
              </li>
              <li className="flex items-center justify-between mb-3">
                <span className="font-light">{t("user.shopping_cart_page.discount")}</span>
                <span className="font-normal">{formatCurrency(0)}</span>
              </li>
            </ul>
            <div className="flex flex-nowrap justify-between px-5 py-4">
              <span className="font-light">{t("user.shopping_cart_page.total_price")}</span>
              <div className="text-right">
                <span className="text-red-600 text-2xl font-normal">{formatCurrency(totalPrice)}</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-[#ff424e] text-center block cursor-pointer xl:mt-[15px] border-none rounded px-[10px] py-[13px] text-white font-normal text-sm"
          >
            {`${t("user.shopping_cart_page.btn_checkout")} (${totalQuantity})`}
          </button>
        </>
      ) : (
        <div className="bg-white rounded pb-2">
          <ul className="border-b border-solid border-b-gray-200 px-5 py-4 border-t-0 border-l-0 border-r-0">
            <li className="flex items-center justify-between mb-3">
              <span className="font-light">{t("user.shopping_cart_page.sub_total")}</span>
              <span className="font-normal">{formatCurrency(totalPrice)}</span>
            </li>
            <li className="flex items-center justify-between mb-3">
              <span className="font-light">{t("user.shopping_cart_page.discount")}</span>
              <span className="font-normal">{formatCurrency(0)}</span>
            </li>
          </ul>
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex flex-nowrap  flex-col justify-between">
              <span className="font-light">{t("user.shopping_cart_page.total_price")}</span>
              <div className="text-right">
                <span className="text-red-600 text-2xl font-normal">{formatCurrency(totalPrice)}</span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="w-[132px] bg-[#ff424e] text-center block cursor-pointer border-none rounded px-[10px] py-[13px] text-white font-normal text-sm"
            >
              {`${t("user.shopping_cart_page.btn_checkout")} (${totalQuantity})`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Total;
