/* eslint-disable react-hooks/exhaustive-deps */
import Mascot from "@app/app/assets/images/mascot.png";
import { formatCurrency } from "@app/utils/helper";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row } from "antd";
import { useTranslation } from "react-i18next";

import * as S from "./UserWishlist.style";
const data: any[] = [
  {
    id: 156712149,
    name: "Giày chạy thể thao nam nữ Running Shoes Anta svs c sf  svsf s vf sfd s  sfs vdsvs s sf 812245588",
    thumbnail_url: "https://salt.tikicdn.com/cache/280x280/ts/product/b6/f9/06/94f1b614e3f36dd4cc532718598a776d.jpg",
    price: 659500,
    list_price: 1319000,
    original_price: 1319000,
    discount_rate: 50,
    discount: 659500,
    rating_average: 5,
    review_count: 54,
  },
  {
    id: 216173180,
    name: "Điện thoại Samsung Galaxy S23 5G (8GB/256GB) - Hàng chính hãng",
    thumbnail_url: "https://salt.tikicdn.com/cache/280x280/ts/product/e7/95/a5/3d8980f5fe6a483b65a6da03247a1708.png",
    price: 23491000,
    list_price: 23491000,
    original_price: 23491000,
    discount: 0,
    discount_rate: 0,
    rating_average: 4.5,
    review_count: 54,
  },
];
const UserWishlist = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="text-xl mb-3">{t("user.account_user.account_wishlist.title")}</div>
      {/* Content */}
      {data.length > 0 ? (
        <>
          {data.map((item) => {
            return (
              <S.UserWishListProduct key={item.id}>
                <Row className="py-6 px-8">
                  <Col className="px-3" span={5}>
                    <div className="flex justify-end">
                      <img src={item.thumbnail_url} alt={item.name} width={150} className="object-cover" />
                    </div>
                  </Col>
                  <Col className="pl-4 pr-10" span={10}>
                    <S.ProductName>
                      <a href="#/">{item.name}</a>
                      <div className="mt-1 flex items-center">
                        <S.UserWishListRate allowHalf={true} disabled defaultValue={item.rating_average} />
                        <span className="text-[12px] font-[400] text-black leading-3">
                          {t("user.account_user.account_wishlist.comment", { rating: item.review_count })}
                        </span>
                      </div>
                    </S.ProductName>
                  </Col>
                  <Col span={4}></Col>
                  <Col span={5}>
                    <div className="flex justify-end">
                      <div className="flex flex-col items-end mr-12">
                        <S.UserWishListPrice className={`${item.discount !== 0 ? "text-[#ff424e]" : "text-black"}`}>
                          {formatCurrency(item.price)}
                        </S.UserWishListPrice>
                        {item.discount !== 0 && (
                          <div className="flex items-center">
                            <S.UserWishListPriceSale>{formatCurrency(item.original_price)}</S.UserWishListPriceSale>
                            <span className="mx-1">|</span>
                            <S.UserWishListPriceSalePercent>{`-${item.discount_rate}%`}</S.UserWishListPriceSalePercent>
                          </div>
                        )}
                      </div>
                      <Button type="link" className="p-0 h-fit" danger>
                        <FontAwesomeIcon icon={faXmark} className="text-[#808098] text-xl" />
                      </Button>
                    </div>
                  </Col>
                </Row>
              </S.UserWishListProduct>
            );
          })}
        </>
      ) : (
        <div className="mt-4 py-8 w-full text-center text-[14px] rounded-md bg-white">
          <div className="py-8">
            <img src={Mascot} alt="IMG" width={160} className="object-cover" />
            <p className="my-5">{t("user.account_user.account_wishlist.text_empty")}</p>
            <S.UserWishListShopping href="#/">
              {t("user.account_user.account_wishlist.button_shopping")}
            </S.UserWishListShopping>
          </div>
        </div>
      )}
    </>
  );
};

export default UserWishlist;
