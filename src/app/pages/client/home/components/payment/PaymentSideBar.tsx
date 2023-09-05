import { useResponsive } from "@app/hooks";
import { formatCurrency } from "@app/utils/helper";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import Coupon from "../cart/Coupon";

import * as S from "./OrderItem.styles";

const PaymentSideBar = () => {
  const [showOrder, setShowOrder] = useState<boolean>(false);
  const { t } = useTranslation();
  const { isDesktop } = useResponsive();

  const toggleExpansion = () => {
    setShowOrder(!showOrder);
  };

  const data = [
    {
      productId: 1,
      productName: "Bộ Cắt Bấm Móng Tay 7 Món Inox Full Box",
      price: 18000,
      quantity: 1,
    },
    {
      productId: 2,
      productName: "Bộ Cắt Bấm Móng Tay 7 Món Inox Full Box",
      price: 250000,
      quantity: 1,
    },
    {
      productId: 3,
      productName: "Giày thời trang nam NIKE AIR MAX EXCEE - SAIL/BLACK-HEMP-STADIUM GREEN - 10 US",
      price: 2350000,
      quantity: 1,
    },
  ];

  return (
    <>
      <Coupon />
      <div className="bg-white rounded xl:mb-3 p-0 relative">
        <div className="hidden xl:block text-sm leading-5 p-4 border-t-0 border-l-0 border-r-0 border-b border-solid border-[#ebebf0]">
          <div className="flex justify-between mb-1">
            <h3 className="font-medium m-0 text-black">{t("user.payment_page.order.title")}</h3>
            <a href="/checkout" className="text-[#0b74e5] bg-transparent">
              {t("user.payment_page.order.btn_change")}
            </a>
          </div>
          <div className="flex items-center">
            <p className="text-gray-500 font-normal mr-1">
              {`${data.length} ` + `${t("user.shopping_cart_page.items")}`}
            </p>
            <S.ListItem>
              <div
                onClick={toggleExpansion}
                aria-hidden="true"
                className="flex items-center text-[#0b74e5] font-normal m-0 cursor-pointer"
              >
                {showOrder && showOrder ? (
                  <p>
                    {t("user.payment_page.order.btn_collapse")}
                    <FontAwesomeIcon icon={faChevronDown} className="text-xs ml-1 arrow-animation" />
                  </p>
                ) : (
                  <p>
                    {t("user.payment_page.order.btn_view_information")}
                    <FontAwesomeIcon icon={faChevronDown} className="text-xs ml-1" />
                  </p>
                )}
              </div>
            </S.ListItem>
          </div>
        </div>
        <S.ListItem>
          <div className={`${showOrder ? "expanded" : "hide"}`}>
            <div className="border-b border-[#ebebf0] px-4 py-3 text-xs leading-4 mb-3 grid gap-1">
              {data &&
                data.map((item, index) => (
                  <div className="flex justify-between" key={index}>
                    <div className="mr-2 flex items-start">
                      <div className="w-[30px] mr-2 font-medium flex-shrink-0">{`${item.quantity}x`}</div>
                      <div className="line-clamp-3 max-w-[156px] font-normal">{item.productName}</div>
                    </div>
                    <div className="font-medium flex-shrink-0">{formatCurrency(item.price)}</div>
                  </div>
                ))}
            </div>
          </div>
        </S.ListItem>
        <div className="grid py-2 px-4 gap-1 text-sm leading-5">
          <div className="flex justify-between">
            <div className="flex items-center text-gray-500">{t("user.payment_page.order.subtotal")}</div>
            <div className="text-[#38383d] ">{formatCurrency(2564900)}</div>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center text-gray-500">{t("user.payment_page.order.shipping_fee")}</div>
            <div className="text-[#38383d] ">{formatCurrency(44000)}</div>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center text-gray-500">{t("user.payment_page.order.shipping_discount")}</div>
            <div className="text-[#00ab56] ">{`-` + `${formatCurrency(33000)}`}</div>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center text-gray-500">{t("user.payment_page.order.discount")}</div>
            <div className="text-[#00ab56] ">{`-` + `${formatCurrency(100000)}`}</div>
          </div>
        </div>
        <div className="w-[calc(100%_-_32px)] h-[1px] bg-[#ebebf0] mx-auto"></div>
        {!isDesktop ? (
          <div className="flex items-center justify-between w-screen h-[90px] pt-[9px] px-4 pb-[34px] flex-wrap">
            <div className="text-sm leading-5 text-black mb-1 flex-shrink basis-full font-semibold">
              <img
                className="w-[81px] mr-[5px] max-w-full"
                src="https://salt.tikicdn.com/ts/upload/70/f9/77/3b172be9ee58c8104fe8a4d40c4f5633.png"
                alt="freeship-logo"
              />
              {t("user.payment_page.order.apply_free_ship")}
            </div>
            <div className="block">
              <div className="text-[13px] leading-5 text-black">{t("user.payment_page.order.amount")}</div>
              <div className="font-medium text-xl leading-8 text-red-500">{formatCurrency(2478900)}</div>
            </div>
            <div className="">
              <button className="w-[136px] h-11 outline-0 cursor-pointer font-semibold text-base leading-6 rounded mx-4 mb-4 text-white bg-red-500 border-none">
                {t("user.payment_page.order.btn_place_order")}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between px-4 py-2">
              <div className="text-sm leading-5 text-black">{t("user.payment_page.order.amount")}</div>
              <div className="flex flex-col items-end">
                <div className="font-medium text-xl leading-8 text-red-500">{formatCurrency(2478900)}</div>
                <div className="text-xs leading-4 text-gray-500">(Đã bao gồm VAT nếu có)</div>
              </div>
            </div>
            <div className="px-4 pb-3 font-semibold">
              <img
                className="w-[81px] mr-[5px] max-w-full"
                src="https://salt.tikicdn.com/ts/upload/70/f9/77/3b172be9ee58c8104fe8a4d40c4f5633.png"
                alt="freeship-logo"
              />
              {t("user.payment_page.order.apply_free_ship")}
            </div>
            <div className="flex justify-between">
              <button className="w-full h-11 outline-0 cursor-pointer font-semibold text-base leading-6 rounded mx-4 mb-4 text-white bg-red-500 border-none">
                {t("user.payment_page.order.btn_place_order")}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PaymentSideBar;
