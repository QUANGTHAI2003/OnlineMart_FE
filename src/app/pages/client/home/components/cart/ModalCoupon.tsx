import couponCondition from "@app/app/assets/images/condition-coupon.svg";
import couponApply from "@app/app/assets/images/coupon-apply.svg";
import couponIcon from "@app/app/assets/images/coupon-main.svg";
import couponInput from "@app/app/assets/images/cp-icon.svg";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "./ModalCoupon.styles";

interface ICoupon {
  id: number;
  title: string;
  description: string;
  expired_date: string;
  type: string;
  condition_apply: boolean;
}

const ModalCoupon = ({ isCartPage, isOpenModal, handleCloseModal }: any) => {
  const data: ICoupon[] = [
    {
      id: 1,
      title: "Giảm 10k",
      description: "Cho đơn hàng từ 699k",
      expired_date: "31/08/23",
      type: "OM Khuyến mãi",
      condition_apply: true,
    },
    {
      id: 2,
      title: "Giảm 50K",
      description: "Cho đơn hàng từ 2 triệu",
      expired_date: "31/08/23",
      type: "OM Khuyến mãi",
      condition_apply: false,
    },
    {
      id: 3,
      title: "Giảm 150K",
      description: "Cho đơn hàng từ 5 triệu",
      expired_date: "31/08/23",
      type: "OM Khuyến mãi",
      condition_apply: false,
    },
    {
      id: 4,
      title: "Giảm 150K",
      description: "Cho đơn hàng từ 5 triệu",
      expired_date: "31/08/23",
      type: "OM Khuyến mãi",
      condition_apply: true,
    },
  ];

  const [statusCoupon, setStatusCoupon] = useState(Array(data.length).fill(false));
  const [couponCode, setCouponCode] = useState("");
  const { t } = useTranslation();

  const handleInputChange = (event: any) => {
    setCouponCode(event.target.value);
  };

  const handleToggleStatus = (index: number) => {
    setStatusCoupon((prevStatus) => {
      const newStatusList = [...prevStatus];
      newStatusList[index] = !newStatusList[index];
      return newStatusList;
    });
  };

  return (
    <Modal
      title={t("user.shopping_cart_page.modal_coupon.title")}
      open={isOpenModal}
      onCancel={handleCloseModal}
      footer={null}
    >
      <div className="h-full flex flex-col">
        {isCartPage && (
          <div className="rounded block">
            <div className="w-[calc(100%_-_97px)] inline-block align-top mr-2 relative">
              <img src={couponInput} alt="icon" className="absolute top-2 left-3" />
              <input
                className="rounded shadow-none border border-solid border-[#c4c4cf] h-9 w-full text-black text-base leading-5 pt-2 pr-3 pb-2 pl-11 outline-0"
                type="text"
                placeholder={t("user.shopping_cart_page.modal_coupon.placeholder")}
                value={couponCode}
                onChange={handleInputChange}
              />
            </div>
            <button
              type="submit"
              className={`text-sm font-medium leading-5  outline-0 ${
                couponCode
                  ? "bg-[#0b74e5] text-white border-none"
                  : "bg-[#ebebf0] border border-solid border-[#dddde3] text-[#c4c4cf]"
              } rounded opacity-100 w-[89px] h-9 inline-flex items-center justify-center align-top cursor-pointer`}
            >
              {t("user.shopping_cart_page.modal_coupon.button_apply")}
            </button>
          </div>
        )}
        <div className="mt-4 bg-white">
          <div className="flex justify-between items-center">
            <div className="text-base font-normal leading-6 text-black">
              {t("user.shopping_cart_page.modal_coupon.title_list")}
            </div>
            <div className="text-xs font-light leading-4 text-gray-400">
              {t("user.shopping_cart_page.modal_coupon.limit")}
            </div>
          </div>
          <div className="overflow-hidden max-h-[294px] overflow-y-scroll grid gap-3 px-[5px] py-2">
            {data.map((coupon, index) => (
              <div className="relative" key={index}>
                <div className="w-full relative z-10">
                  <div className="relative opacity-100 w-full h-[132px]">
                    <S.Coupon>
                      <img src={statusCoupon[index] ? couponApply : couponIcon} alt="coupon-om" />
                    </S.Coupon>
                    <div className="absolute top-0 left-0 w-full h-full flex ">
                      {!coupon.condition_apply && (
                        <img
                          src={couponCondition}
                          alt="condition"
                          className="absolute bottom-1 right-1 w-[82px] h-[64px]"
                        />
                      )}
                      <div className="min-w-[132px] w-[132px] h-[132px] px-2 py-2 flex flex-col items-center self-center justify-center">
                        <div className="relative w-[60px] h-[60px]">
                          <img
                            className={`object-contain rounded-lg absolute top-0 left-0 w-full h-full ${
                              !coupon.condition_apply ? "filter grayscale opacity-40" : ""
                            }`}
                            src="https://salt.tikicdn.com/cache/128x128/ts/upload/b6/c1/66/74ae9fd52a0e96a63551e054c135b53e.png"
                            alt="OM Khuyến mãi"
                          />
                        </div>
                        <div
                          className={`mt-1 line-clamp-2 text-center tracking-normal max-h-8 leading-4 font-normal text-xs text-black ${
                            !coupon.condition_apply ? "filter grayscale opacity-40" : ""
                          }`}
                        >
                          <div>{coupon.type}</div>
                        </div>
                      </div>
                      <div className="flex flex-col p-3 w-[calc(100%_-_132px)]">
                        <button className="absolute top-3 right-3 transform translate-x-2 translate-y-[-8px] border-none p-2 cursor-pointer leading-[0px] block bg-transparent outline-none ">
                          <FontAwesomeIcon
                            icon={faCircleInfo}
                            className={`cursor-pointer w-full text-blue-600 text-lg ${
                              !coupon.condition_apply ? "filter grayscale opacity-40" : ""
                            }`}
                          />
                        </button>
                        <div className="pr-7">
                          <h4
                            className={`line-clamp-1 tracking-normal text-[17px] font-medium leading-6 max-h-6 text-black ${
                              !coupon.condition_apply ? "filter grayscale opacity-40" : ""
                            }`}
                          >
                            {coupon.title}
                          </h4>
                          <p
                            className={`line-clamp-1 tracking-normal text-sm font-normal leading-6 max-h-6 text-gray-500 ${
                              !coupon.condition_apply ? "filter grayscale opacity-40" : ""
                            }`}
                          >
                            {coupon.description}
                          </p>
                        </div>
                        <div className="flex items-end mt-auto">
                          <p
                            className={`line-clamp-1 text-sm font-normal leading-5 max-h-5 text-gray-500 ${
                              !coupon.condition_apply ? "filter grayscale opacity-40" : ""
                            }`}
                          >
                            {`HSD: ` + coupon.expired_date}
                          </p>
                          {coupon.condition_apply && (
                            <button
                              onClick={() => handleToggleStatus(index)}
                              type="submit"
                              className="whitespace-nowrap ml-auto tracking-normal font-medium cursor-pointer text-center rounded outline-none text-[15px] leading-6 px-3 py-[2px] bg-blue-600 text-white border-none"
                            >
                              {statusCoupon[index]
                                ? t("user.shopping_cart_page.modal_coupon.button_cancel")
                                : t("user.shopping_cart_page.modal_coupon.button_apply")}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalCoupon;
