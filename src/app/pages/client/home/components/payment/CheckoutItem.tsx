import { setCart } from "@app/store/slices/redux/cartCheckoutSlice";
import { useAppDispatch } from "@app/store/store";
import { formatCurrency } from "@app/utils/helper";
import { faInfoCircle, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const CheckoutItem = ({ checkoutItem }: any) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const baseImage = import.meta.env.VITE_BASE_IMAGE_URL as string;

  useEffect(() => {
    if (checkoutItem) {
      dispatch(setCart(checkoutItem));
    }
  }, [checkoutItem, dispatch]);

  return (
    <div>
      {checkoutItem.map((shop: any, index: number) => (
        <div
          key={index}
          className="w-full rounded-xl border-solid border border-[#dddde3] mt-5 px-4 pt-5 pb-4 relative flex xl:flex-row flex-col z-0"
        >
          <div className="flex items-center text-sm font-bold leading-5 text-orange-500 px-1 bg-white absolute top-0 left-3 transform translate-y-[-50%]">
            <div className="flex items-center mr-2 ">
              <img
                className="w-6 h-6 max-w-full border-none"
                src="https://salt.tikicdn.com/ts/upload/ad/b7/93/7094a85d0b6d299f30ed89b03511deb9.png"
                alt=""
              />
              {`Gói 1: Giao GHN`}
            </div>
          </div>
          <div className="left-content w-full mr-[46px] xl:max-w-[482px]">
            <div className="mt-2 w-full xl:w-[482px] flex justify-between">
              <div className="flex items-center">
                <img
                  className="w-[31px] h-[10px] max-w-full mr-1 border-none"
                  src="https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-GHN-Slogan-En.png"
                  alt="method-shipping-logo"
                />
                <span className="text-xs leading-4 uppercase">Giao tiết kiệm</span>
              </div>
              <div className="text-sm leading-5 flex items-center">
                <FontAwesomeIcon icon={faInfoCircle} className="w-[14px] h-[14px] ml-1 text-gray-500 cursor-pointer" />
              </div>
            </div>
            {shop.items.map((item: any, index: number) => (
              <div className="block" key={index}>
                <div>
                  <div className="flex py-3 items-center">
                    <div className="mr-2 flex-shrink max-h-12">
                      <img
                        className="w-12 h-12 max-w-full border-none"
                        src={`${baseImage}/${item.thumbnail_url}`}
                        alt="thumbnail"
                      />
                    </div>
                    <div className="text-sm leading-4 text-gray-600 flex-grow flex-shrink basis-0">
                      <div className="flex mb-1 pr-4">
                        <span className="line-clamp-1 ">{item.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <div className="">{`${t("user.payment_page.quantity")} : x${item.quantity}`}</div>
                        <div className="font-medium text-black">{`${formatCurrency(item.price)}`}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="right-content flex-grow flex-shrink basis-0">
            <div className="flex w-full items-start bg-[#f5f5fa] rounded-lg px-4 py-2">
              <FontAwesomeIcon icon={faTruckFast} className="w-5 h-5 flex-shrink mr-2 text-gray-600" />
              <div>
                <p className="m-0 text-sm leading-4 text-gray-400">
                  {`${t("user.payment_page.delivery_by")} ${shop.shop_name}`}
                </p>
                <p className="italic m-0 text-sm leading-4 text-gray-400"></p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CheckoutItem;
