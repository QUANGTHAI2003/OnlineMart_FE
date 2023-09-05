import { useResponsive } from "@app/hooks";
import { formatCurrency } from "@app/utils/helper";
import { useTranslation } from "react-i18next";

import Coupon from "./Coupon";

const Total = () => {
  const { t } = useTranslation();
  const { isDesktop } = useResponsive();

  return (
    <div className="container-checkout">
      <Coupon />
      {isDesktop ? (
        <>
          <div className="bg-white rounded pb-2">
            <ul className="border-b border-solid border-b-gray-200 px-5 py-4 border-t-0 border-l-0 border-r-0">
              <li className="flex items-center justify-between mb-3">
                <span className="font-light">{t("user.shopping_cart_page.sub_total")}</span>
                <span className="font-normal">{formatCurrency(109000)}</span>
              </li>
              <li className="flex items-center justify-between mb-3">
                <span className="font-light">{t("user.shopping_cart_page.discount")}</span>
                <span className="font-normal">{formatCurrency(54000)}</span>
              </li>
            </ul>
            <div className="flex flex-nowrap justify-between px-5 py-4">
              <span className="font-light">{t("user.shopping_cart_page.total_price")}</span>
              <div className="text-right">
                <span className="text-red-600 text-2xl font-normal">{formatCurrency(120000)}</span>
              </div>
            </div>
          </div>
          <button className="w-full bg-[#ff424e] text-center block cursor-pointer xl:mt-[15px] border-none rounded px-[10px] py-[13px] text-white font-normal text-sm">
            {t("user.shopping_cart_page.btn_checkout") + " (1) "}
          </button>
        </>
      ) : (
        <div className="bg-white rounded pb-2">
          <ul className="border-b border-solid border-b-gray-200 px-5 py-4 border-t-0 border-l-0 border-r-0">
            <li className="flex items-center justify-between mb-3">
              <span className="font-light">{t("user.shopping_cart_page.sub_total")}</span>
              <span className="font-normal">{formatCurrency(109000)}</span>
            </li>
            <li className="flex items-center justify-between mb-3">
              <span className="font-light">{t("user.shopping_cart_page.discount")}</span>
              <span className="font-normal">{formatCurrency(54000)}</span>
            </li>
          </ul>
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex flex-nowrap  flex-col justify-between">
              <span className="font-light">{t("user.shopping_cart_page.total_price")}</span>
              <div className="text-right">
                <span className="text-red-600 text-2xl font-normal">{formatCurrency(120000)}</span>
              </div>
            </div>
            <button className="w-[132px] bg-[#ff424e] text-center block cursor-pointer border-none rounded px-[10px] py-[13px] text-white font-normal text-sm">
              {t("user.shopping_cart_page.btn_checkout") + " (1) "}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Total;
