import { useResponsive } from "@app/hooks";
import { useGetAddressRootQuery } from "@app/store/slices/api/user/addressApi";
import { useGetCheckoutItemQuery } from "@app/store/slices/api/user/cartApi";
import { useShippingFeeMutation, useUpdateCodAmountMutation } from "@app/store/slices/api/user/shippingApi";
import { setShippingFee } from "@app/store/slices/redux/user/apiGHNSlice";
import { setPaymentMethod } from "@app/store/slices/redux/user/shippingAddressSlice";
import { useAppDispatch, useAppSelector } from "@app/store/store";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, Radio } from "antd";
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
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [shippingFeeState, setShippingFeeState] = useState<boolean>(false);
  const userId = useAppSelector((state) => state.userState.user)?.id;
  const { data: checkoutItem = [], isLoading } = useGetCheckoutItemQuery(userId);
  const { data: shippingAddress } = useGetAddressRootQuery(userId);
  const selectAddress = shippingAddress?.find((address) => address.is_select === "1");
  const [shippingFee] = useShippingFeeMutation();
  const [updateCodAmount] = useUpdateCodAmountMutation();
  const dispatch = useAppDispatch();

  const itemsArray: any = [];
  let totalCheckout = 0;

  checkoutItem.forEach((shop: any) => {
    shop.items.forEach((item: any) => {
      itemsArray.push(item);
    });
  });

  itemsArray.forEach((item: any) => {
    totalCheckout += item.price * item.quantity;
  });

  const handleShippingFee = async () => {
    setShippingFeeState(!shippingFeeState);
    if (!shippingFeeState) {
      const items = itemsArray.map((item: any) => {
        return {
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          length: 12,
          width: 12,
          weight: 1200,
          height: 12,
        };
      });

      const orderData = {
        payment_type_id: 2,
        note: "Shipping OnlineMart Officical",
        required_note: "CHOXEMHANGKHONGTHU",
        return_phone: "0961518977",
        return_address: "",
        return_district_id: null,
        return_ward_code: "",
        client_order_code: "",
        from_name: "OnlineMart",
        from_phone: "0987654321",
        from_address: "Hẻm tổ 7",
        from_ward_name: "Phường An Khánh",
        from_district_name: "Quận Ninh Kiều",
        from_province_name: "Cần Thơ",
        to_name: selectAddress && selectAddress?.name,
        to_phone: selectAddress && selectAddress?.phone,
        to_address: selectAddress && selectAddress?.address_home,
        to_ward_name: selectAddress && selectAddress?.ward,
        to_district_name: selectAddress && selectAddress?.district,
        to_province_name: selectAddress && selectAddress?.city,
        content: "Shipping Online Mart",
        weight: 200,
        length: 1,
        width: 19,
        height: 10,
        cod_failed_amount: 5000,
        pick_station_id: 1444,
        deliver_station_id: null,
        insurance_value: totalCheckout,
        service_id: 0,
        service_type_id: 2,
        coupon: null,
        items: items,
      };

      const response = await shippingFee(orderData).unwrap();
      dispatch(setShippingFee(response.data));
    } else {
      dispatch(setShippingFee({}));
    }
  };

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const serviceFee = useAppSelector((state) => state.shippingFee.fee) || {};
  const onChange = async (e: any) => {
    try {
      dispatch(setPaymentMethod(e.target.value));
      const data = {
        cod_amount: e.target.value === "cod" ? totalCheckout : 0,
        order_code: serviceFee?.order_code,
      };
      await updateCodAmount(data).unwrap();
    } catch (error: any) {
      console.error(error.message);
    }
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
    setLoading(isLoading);
  }, [isLoading]);

  return (
    <section>
      {loading ? (
        <PaymentSkeleton />
      ) : (
        <div className="w-full flex flex-wrap xl:flex-row flex-col-reverse">
          <div className="w-full xl:w-[900px] xl:mr-5 left xl:mb-0">
            <div className="rounded relative p-4 mb-4 bg-white">
              <h3 className="text-black mb-4 font-bold text-lg leading-6 m-0">
                {t("user.payment_page.delivery_method")}
              </h3>
              <div className="relative w-full xl:w-[497px] pb-4 mb-4">
                <div className="bg-[#f0f8ff] border border-solid border-[#c2e1ff] rounded-[10px] p-4 grid gap-y-[10px]">
                  <div>
                    <Checkbox onChange={handleShippingFee}>
                      <span className="text-sm leading-5 flex items-center">
                        <div className="cursor-pointer py-1">
                          <div className="py-[2px] flex items-center">
                            <img
                              className="mr-1 border-none w-[31px] h-[10px]"
                              src="https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-GHN-Slogan-En.png"
                              alt="fast-logo"
                            />
                            <span className="text-sm leading-5 text-black cursor-pointer">Giao tiết kiệm</span>
                          </div>
                        </div>
                      </span>
                    </Checkbox>
                    <div className="text-xs leading-4 text-gray-500 ml-[26px]">{`Có ${itemsArray.length} sản phẩm hỗ trợ hình thức này`}</div>
                  </div>
                </div>
                <img
                  className="w-8 z-10 absolute h-3 left-[50%] bottom-[18px] transform translate-x-[-50%] translate-y-[100%]"
                  src="https://salt.tikicdn.com/ts/upload/05/9e/d8/f13e86df128f19d197397e44924f9616.png"
                  alt="arrow-png"
                />
              </div>
              <div className="w-full xl:grid gap-5">
                <CheckoutItem checkoutItem={checkoutItem} />
              </div>
              <div className="mt-5">
                <div className="flex flex-nowrap items-center cursor-pointer">
                  <span className="text-sm text-[#38383d] inline-block mr-[10px]">
                    {t("user.shopping_cart_page.shop_promotion")}
                  </span>
                  {/* <S.Ticket>
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
                  </S.Ticket> */}
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
                <Radio.Group onChange={onChange} name="radiogroup">
                  <div>
                    <Radio value={"cod"}>
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
                  {/* <div>
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
                  </div> */}
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
    </section>
  );
};

export default Payment;
