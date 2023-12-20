import { useResponsive } from "@app/hooks";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Radio, RadioChangeEvent } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "./Cart.styles";
import ModalCouponShop from "./components/cart/ModalCouponShop";
import ShippingAddress from "./components/cart/ShippingAddress";
import CheckoutItem from "./components/payment/CheckoutItem";
import PaymentSideBar from "./components/payment/PaymentSideBar";
import PaymentSkeleton from "./components/payment/PaymentSkeleton";

const Payment = () => {
  const { isDesktop } = useResponsive();
  const [value, setValue] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { t } = useTranslation();

  const onChange = (e: RadioChangeEvent): any => {
    setValue(e.target.value);
  };

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const seller_coupons = [
    {
      id: 1,
      title: "Giảm 10k",
      description: "Cho đơn hàng từ 699k",
      expired_date: "31/08/23",
      type: "Shop khuyến mãi",
      condition_apply: true,
    },
    {
      id: 2,
      title: "Giảm 50K",
      description: "Cho đơn hàng từ 2 triệu",
      expired_date: "31/08/23",
      type: "Shop khuyến mãi",
      condition_apply: false,
    },
    {
      id: 3,
      title: "Giảm 150K",
      description: "Cho đơn hàng từ 5 triệu",
      expired_date: "31/08/23",
      type: "Shop khuyến mãi",
      condition_apply: false,
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3 * 1000);
  }, []);

  return (
    <>
      {loading && <PaymentSkeleton />}
      {!loading && (
        <div className="w-full flex flex-wrap xl:flex-row flex-col-reverse">
          <div className="w-full xl:w-[900px] xl:mr-5 left mb-[267px] xl:mb-0">
            <div className="rounded relative p-4 mb-4 bg-white">
              <h3 className="text-black mb-4 font-bold text-lg leading-6 m-0">
                {t("user.payment_page.delivery_method")}
              </h3>
              <div className="relative w-full xl:w-[497px] pb-4 mb-4">
                <div className="bg-[#f0f8ff] border border-solid border-[#c2e1ff] rounded-[10px] p-4 grid gap-y-[10px]">
                  <div>
                    <Radio value={2}>
                      <span className="text-sm leading-5 flex items-center">
                        <div className="cursor-pointer py-1">
                          <div className="py-[2px] flex items-center">
                            <img
                              className="mr-1 border-none w-[31px] h-[10px]"
                              src="https://salt.tikicdn.com/ts/upload/46/1c/a2/f61d2cbe66b1f214f8657237a68db489.png"
                              alt="fast-logo"
                            />
                            <span className="text-sm leading-5 text-black cursor-pointer">Giao tiết kiệm</span>
                            <span className="text-[13px] leading-4 font-medium inline-flex items-center text-[#00ab56] px-1 bg-white ml-1 rounded cursor-pointer">
                              -30k
                            </span>
                          </div>
                        </div>
                      </span>
                    </Radio>
                    <div className="text-xs leading-4 text-gray-500 ml-[26px]">Có 3 sản phẩm hỗ trợ hình thức này</div>
                  </div>
                </div>
                <img
                  className="w-8 z-10 absolute h-3 left-[50%] bottom-[18px] transform translate-x-[-50%] translate-y-[100%]"
                  src="https://salt.tikicdn.com/ts/upload/05/9e/d8/f13e86df128f19d197397e44924f9616.png"
                  alt="arrow-png"
                />
              </div>
              <div className="w-full xl:grid gap-5">
                <CheckoutItem />
              </div>
              <div className="mt-5">
                <div className="flex flex-nowrap items-center cursor-pointer">
                  <span className="text-sm text-[#38383d] inline-block mr-[10px]">
                    {t("user.shopping_cart_page.shop_promotion")}
                  </span>
                  <S.Ticket>
                    <div className="ticket">
                      <img
                        className="w-[15px] h-[15px] absolute right-[-5px] top-[-5px] inline-block max-w-full z-50"
                        src="https://salt.tikicdn.com/ts/upload/5c/50/ce/bab71210dd41a417824c5844420306e2.jpg"
                        alt="apply-coupon"
                      />
                      <i className="semicircle left"></i>
                      <i className="semicircle right"></i>
                      <div className="px-3 flex items-center h-full text-[#0d5cb6] text-[11px] leading-5 font-medium">
                        100K
                      </div>
                    </div>
                  </S.Ticket>
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    className="w-4 h-4 ml-2 text-gray-600"
                    onClick={openModal}
                    aria-hidden={true}
                  />
                </div>
              </div>
              <ModalCouponShop
                title={"OM seller"}
                data={seller_coupons}
                isOpenModal={isOpenModal}
                handleCloseModal={closeModal}
              />
            </div>
            <div className="w-full xl:rounded relative p-4 mb-4 bg-white">
              <h3 className="mb-4 flex items-baseline text-[#38383d] font-bold text-lg leading-6 m-0">
                {t("user.payment_page.payment_method")}
              </h3>
              <div>
                <Radio.Group onChange={onChange} value={value}>
                  <div>
                    <Radio value={"code"}>
                      <span className="text-sm leading-5 flex items-center">
                        <div className="cursor-pointer h-[64px]">
                          <div className="flex h-full items-center">
                            <img
                              className="mr-3 object-contain w-8 h-8"
                              src="https://salt.tikicdn.com/ts/upload/92/b2/78/1b3b9cda5208b323eb9ec56b84c7eb87.png"
                              alt="icon"
                            />
                            <div className="mr-3">
                              <div className="text-sm leading-5 text-black flex items-center">
                                <span className="mr-3 whitespace-nowrap">{t("user.payment_page.cod_method")}</span>
                              </div>
                              <div className="text-sm leading-5 text-[#808089]"></div>
                            </div>
                          </div>
                        </div>
                      </span>
                    </Radio>
                  </div>
                  <div>
                    <Radio value={"momo"}>
                      <span className="text-sm leading-5 flex items-center">
                        <div className="cursor-pointer h-[64px]">
                          <div className="flex h-full items-center">
                            <img
                              className="mr-3 object-contain w-8 h-8"
                              src="https://salt.tikicdn.com/ts/upload/ce/f6/e8/ea880ef285856f744e3ffb5d282d4b2d.jpg"
                              alt="icon"
                            />
                            <div className="mr-3">
                              <div className="text-sm leading-5 text-black flex items-center">
                                <span className="mr-3 whitespace-nowrap">{t("user.payment_page.momo_method")}</span>
                              </div>
                              <div className="text-sm leading-5 text-[#808089]"></div>
                            </div>
                          </div>
                        </div>
                      </span>
                    </Radio>
                  </div>
                  <div>
                    <Radio value={"zalopay"}>
                      <span className="text-sm leading-5 flex items-center">
                        <div className="cursor-pointer h-[64px]">
                          <div className="flex h-full items-center">
                            <img
                              className="mr-3 object-contain w-8 h-8"
                              src="https://salt.tikicdn.com/ts/upload/2f/43/da/dd7ded6d3659036f15f95fe81ac76d93.png"
                              alt="icon"
                            />
                            <div className="mr-3">
                              <div className="text-sm leading-5 text-black flex items-center">
                                <span className="mr-3 whitespace-nowrap">{t("user.payment_page.zalopay_method")}</span>
                              </div>
                              <div className="text-sm leading-5 text-[#808089]"></div>
                            </div>
                          </div>
                        </div>
                      </span>
                    </Radio>
                  </div>
                  <div>
                    <Radio value={"vnpay"}>
                      <span className="text-sm leading-5 flex items-center">
                        <div className="cursor-pointer h-[64px]">
                          <div className="flex h-full items-center">
                            <img
                              className="mr-3 object-contain w-8 h-8"
                              src="https://salt.tikicdn.com/ts/upload/77/6a/df/a35cb9c62b9215dbc6d334a77cda4327.png"
                              alt="icon"
                            />
                            <div className="mr-3">
                              <div className="text-sm leading-5 text-black flex items-center">
                                <span className="mr-3 whitespace-nowrap">{t("user.payment_page.vnpay_method")}</span>
                              </div>
                              <div className="text-sm leading-5 text-[#808089]">
                                {t("user.payment_page.scan_qr_method")}
                              </div>
                            </div>
                          </div>
                        </div>
                      </span>
                    </Radio>
                  </div>
                </Radio.Group>
              </div>
            </div>
          </div>
          <div className="flex-grow flex-shrink basis-0 right">
            {!isDesktop && (
              <div className="w-full">
                <ShippingAddress />
              </div>
            )}
            {isDesktop && (
              <div className="">
                <ShippingAddress />
                <PaymentSideBar />
              </div>
            )}
          </div>
          {!isDesktop && (
            <S.MenuFixed>
              <PaymentSideBar />
            </S.MenuFixed>
          )}
        </div>
      )}
    </>
  );
};

export default Payment;
