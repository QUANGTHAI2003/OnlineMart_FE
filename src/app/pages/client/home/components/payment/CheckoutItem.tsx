import { formatCurrency } from "@app/utils/helper";
import { faInfoCircle, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

interface IItem {
  productId: number;
  productName: string;
  thumbnail: string;
  price: number;
  quantity: number;
}

interface IOrder {
  shopId: number;
  shopName: string;
  expected_delivery: string;
  items: IItem[];
}

const CheckoutItem = () => {
  const { t } = useTranslation();

  const data: IOrder[] = [
    {
      shopId: 1,
      shopName: "Thời trang công sở SB",
      expected_delivery: "Thứ Tư, ngày 06/09",
      items: [
        {
          productId: 1,
          productName: "Bộ Cắt Bấm Móng Tay 7 Món Inox Full Box",
          thumbnail: "https://source.unsplash.com/random",
          price: 18000,
          quantity: 1,
        },
        {
          productId: 2,
          productName: "Bộ Cắt Bấm Móng Tay 7 Món Inox Full Box",
          thumbnail: "https://source.unsplash.com/random",
          price: 250000,
          quantity: 1,
        },
      ],
    },
    {
      shopId: 2,
      shopName: "Tiki Trading",
      expected_delivery: "Thứ Bảy, ngày 02/09",
      items: [
        {
          productId: 1,
          productName: "Giày thời trang nam NIKE AIR MAX EXCEE - SAIL/BLACK-HEMP-STADIUM GREEN - 10 US",
          thumbnail: "https://source.unsplash.com/random",
          price: 2350000,
          quantity: 1,
        },
      ],
    },
  ];

  return (
    <div>
      {data &&
        data.map((itemsCart, index) => (
          <div
            key={index}
            className="w-full rounded-xl border-solid border border-[#dddde3] mt-5 px-4 pt-5 pb-4 relative flex xl:flex-row flex-col z-0"
          >
            <div className="flex items-center text-sm leading-5 text-[#079449] px-1 bg-white absolute top-0 left-3 transform translate-y-[-50%]">
              <div className="flex items-center mr-2 ">
                <img
                  className="w-6 h-6 max-w-full border-none"
                  src="https://salt.tikicdn.com/ts/upload/ad/b7/93/7094a85d0b6d299f30ed89b03511deb9.png"
                  alt=""
                />
                {`Gói 1: Giao ${itemsCart.expected_delivery}`}
              </div>
            </div>
            <div className="left-content w-full mr-[46px] xl:max-w-[482px]">
              <div className="mt-2 w-full xl:w-[482px] flex justify-between">
                <div className="flex items-center">
                  <img
                    className="w-[31px] h-[10px] max-w-full mr-1 border-none"
                    src="https://salt.tikicdn.com/ts/upload/46/1c/a2/f61d2cbe66b1f214f8657237a68db489.png"
                    alt="method-shipping-logo"
                  />
                  <span className="text-xs leading-4 uppercase">Giao tiết kiệm</span>
                </div>
                <div className="text-sm leading-5 flex items-center">
                  <span className="text-gray-500 mr-1 line-through">{formatCurrency(22000)}</span>
                  <span className="font-medium text-black">{formatCurrency(7000)}</span>
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    className="w-[14px] h-[14px] ml-1 text-gray-500 cursor-pointer"
                  />
                </div>
              </div>
              {itemsCart.items.map((item, index) => (
                <div className="block" key={index}>
                  <div>
                    <div className="flex py-3 items-center">
                      <div className="mr-2 flex-shrink max-h-12">
                        <img className="w-12 h-12 max-w-full border-none" src={item.thumbnail} alt="thumbnail" />
                      </div>
                      <div className="text-sm leading-4 text-gray-600 flex-grow flex-shrink basis-0">
                        <div className="flex mb-1 pr-4">
                          <span className="line-clamp-1 ">{item.productName}</span>
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
                    {`${t("user.payment_page.delivery_by")} ${itemsCart.shopName}`}
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
