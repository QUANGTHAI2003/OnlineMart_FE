import couponIcon from "@app/app/assets/images/coupon.svg";
import { useResponsive } from "@app/hooks";
import { faChevronRight, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import ModalCoupon from "./ModalCoupon";

const TotalWithCoupon = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const { t } = useTranslation();
  const { isDesktop } = useResponsive();

  return (
    <div className="container-checkout">
      <div className="bg-white rounded xl:mb-3 p-4">
        <div className="hidden xl:flex items-center justify-between text-sm leading-5 mb-4">
          <div className="font-medium text-black capitalize">{t("user.shopping_cart_page.promotion")}</div>
          <div className="flex items-center text-[#787878]">
            <span>{t("user.shopping_cart_page.modal_coupon.limit")}</span>
            <FontAwesomeIcon icon={faCircleInfo} className="ml-1 cursor-pointer" />
          </div>
        </div>
        <div></div>
        {isDesktop ? (
          <>
            <div
              className="flex items-center text-[#0b74e5] text-sm leading-5 cursor-pointer"
              onClick={openModal}
              aria-hidden={true}
            >
              <img src={couponIcon} alt="coupon-icon" />
              <span className="ml-2">{t("user.shopping_cart_page.promotion_description")}</span>
            </div>
            <ModalCoupon isCartPage={true} isOpenModal={isOpenModal} handleCloseModal={closeModal} />
          </>
        ) : (
          <>
            <div
              className="flex items-center justify-between border-b border-b-gray-200 border-solid border-t-0 border-l-0 border-r-0 pb-3"
              onClick={openModal}
              aria-hidden={true}
            >
              <div className="flex items-center text-[#0b74e5] text-sm leading-5">
                <img src={couponIcon} alt="coupon-icon" />
                <span className="ml-2">{"OM " + t("user.shopping_cart_page.promotion")}</span>
              </div>
              <div className="flex items-center text-gray-500 text-sm leading-5 cursor-pointer">
                <span className="mr-2">{t("user.shopping_cart_page.promotion_description")}</span>
                <FontAwesomeIcon icon={faChevronRight} className="text-[#595959] text-sm inline-block" />
              </div>
            </div>
            <ModalCoupon isCartPage={true} isOpenModal={isOpenModal} handleCloseModal={closeModal} />
          </>
        )}
      </div>
      {isDesktop ? (
        <>
          <div className="bg-white rounded pb-2">
            <ul className="border-b border-solid border-b-gray-200 px-5 py-4 border-t-0 border-l-0 border-r-0">
              <li className="flex items-center justify-between mb-3">
                <span className="font-light">{t("user.shopping_cart_page.sub_total")}</span>
                <span className="font-normal">109.000đ</span>
              </li>
              <li className="flex items-center justify-between mb-3">
                <span className="font-light">{t("user.shopping_cart_page.discount")}</span>
                <span className="font-normal">109.000đ</span>
              </li>
            </ul>
            <div className="flex flex-nowrap justify-between px-5 py-4">
              <span className="font-light">{t("user.shopping_cart_page.total_price")}</span>
              <div className="text-right">
                <span className="text-red-600 text-2xl font-normal">109.000 ₫</span>
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
              <span className="font-normal">109.000đ</span>
            </li>
            <li className="flex items-center justify-between mb-3">
              <span className="font-light">{t("user.shopping_cart_page.discount")}</span>
              <span className="font-normal">109.000đ</span>
            </li>
          </ul>
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex flex-nowrap  flex-col justify-between">
              <span className="font-light">{t("user.shopping_cart_page.total_price")}</span>
              <div className="text-right">
                <span className="text-red-600 text-2xl font-normal">109.000 ₫</span>
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

export default TotalWithCoupon;
