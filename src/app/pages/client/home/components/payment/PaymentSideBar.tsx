import { useResponsive } from "@app/hooks";
import { usePreOrderMutation } from "@app/store/slices/api/user/cartApi";
import { useCreateOrderMutation } from "@app/store/slices/api/user/checkoutApi";
import { useAppSelector } from "@app/store/store";
import { formatCurrency, handleApiError } from "@app/utils/helper";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Coupon from "../cart/Coupon";

import * as S from "./OrderItem.styles";

const PaymentSideBar = () => {
  const [showOrder, setShowOrder] = useState<boolean>(false);
  const { t } = useTranslation();
  const { isDesktop } = useResponsive();
  const [createOrder] = useCreateOrderMutation();
  const [preOrder] = usePreOrderMutation();
  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.userState.user)?.id;

  const checkoutItem = useAppSelector((state) => state.cartCheckout.cart) || [];
  const itemsArray: any = [];
  let totalCheckout = 0;
  let totalBill = 0;

  checkoutItem.forEach((shop: any) => {
    shop.items.forEach((item: any) => {
      itemsArray.push(item);
    });
  });

  itemsArray.forEach((item: any) => {
    totalCheckout += item.price * item.quantity;
  });

  const toggleExpansion = () => {
    setShowOrder(!showOrder);
  };

  const serviceFee = useAppSelector((state) => state.shippingFee.fee) || {};
  const shippingAddress = useAppSelector((state) => state.shippingAddress.address) || {};
  const paymentMethod = useAppSelector((state) => state.shippingAddress.method) || null;

  if (typeof serviceFee.total_fee === "number") {
    totalBill = totalCheckout + serviceFee.total_fee;
  } else {
    totalBill = totalCheckout;
  }

  const orderItems: any = [];
  checkoutItem.forEach((obj: any) => {
    const { shop_id, items } = obj;
    items.forEach((item: any) => {
      orderItems.push({
        shop_id,
        ...item,
      });
    });
  });

  const dataOrder = {
    delivery_date: serviceFee?.expected_delivery_time,
    total_price: totalBill,
    code: serviceFee?.order_code,
    shipping_fee: serviceFee?.total_fee,
    shipping_unit: "GHN",
    user_id: userId,
    name: shippingAddress?.name,
    phone: shippingAddress?.phone,
    street: shippingAddress?.address_home,
    ward: shippingAddress?.ward,
    district: shippingAddress?.district,
    city: shippingAddress?.city,
    transaction_type: paymentMethod === "cod" ? "0" : "1",
    transaction_status: "0",
    payment_method: paymentMethod === "cod" ? 1 : 2,
    items: orderItems,
  };

  const handlePayment = async () => {
    try {
      if (Object.entries(serviceFee).length === 0) {
        Modal.info({
          title: t("user.payment_page.delivery_method"),
          onOk: () => console.log("Vui lòng hình thức giao hàng"),
        });
      } else if (paymentMethod === null) {
        Modal.info({
          title: t("user.payment_page.payment_method"),
          onOk: () => console.log("Vui lòng chọn phương thức thanh toán"),
        });
      } else {
        if (paymentMethod === "cod") {
          await preOrder(dataOrder).unwrap();
          navigate(`/thank?code=${dataOrder.code}`);
        } else {
          await preOrder(dataOrder).unwrap();
          const data: any = {
            order_code: serviceFee?.order_code,
            total: totalBill,
          };
          const response = await createOrder(data).unwrap();
          const dataPayment = response.data;
          window.location.href = dataPayment.url + "?" + dataPayment.query + dataPayment.hash;
        }
      }
    } catch (err) {
      handleApiError(err);
    }
  };

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
              {`${itemsArray.length} ` + `${t("user.shopping_cart_page.items")}`}
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
              {itemsArray.map((item: any, index: number) => (
                <div className="flex justify-between" key={index}>
                  <div className="mr-2 flex items-start">
                    <div className="w-[30px] mr-2 font-medium flex-shrink-0">{`${item.quantity}x`}</div>
                    <div className="line-clamp-3 max-w-[156px] font-normal">{item.name}</div>
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
            <div className="text-[#38383d] ">{formatCurrency(totalCheckout)}</div>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center text-gray-500">{t("user.payment_page.order.shipping_fee")}</div>
            <div className="text-[#38383d] ">{serviceFee && formatCurrency(serviceFee?.total_fee)}</div>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center text-gray-500">{t("user.payment_page.order.shipping_discount")}</div>
            <div className="text-[#00ab56] ">{`-` + `${formatCurrency(0)}`}</div>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center text-gray-500">{t("user.payment_page.order.discount")}</div>
            <div className="text-[#00ab56] ">{`-` + `${formatCurrency(0)}`}</div>
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
              <div className="font-medium text-xl leading-8 text-red-500">{formatCurrency(totalBill)}</div>
            </div>
            <div className="">
              <button
                onClick={handlePayment}
                className="w-[136px] h-11 outline-0 cursor-pointer font-semibold text-base leading-6 rounded mx-4 mb-4 text-white bg-red-500 border-none"
              >
                {t("user.payment_page.order.btn_place_order")}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between px-4 py-2">
              <div className="text-sm leading-5 text-black">{t("user.payment_page.order.amount")}</div>
              <div className="flex flex-col items-end">
                <div className="font-medium text-xl leading-8 text-red-500">{formatCurrency(totalBill)}</div>
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
              <button
                onClick={handlePayment}
                className="w-full h-11 outline-0 cursor-pointer font-semibold text-base leading-6 rounded mx-4 mb-4 text-white bg-red-500 border-none"
              >
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
