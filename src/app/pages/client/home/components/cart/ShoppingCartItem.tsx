import { WarningOutlined } from "@ant-design/icons";
import { useResponsive } from "@app/hooks";
import { useDeleteSingleItemMutation, useUpdateQuantityMutation } from "@app/store/slices/api/user/cartApi";
import { formatCurrency, handleApiError, notifySuccess } from "@app/utils/helper";
import { faAngleDown, faAngleRight, faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, InputNumber, Modal } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "../../Cart.styles";

import { default as ModalCouponShop } from "./ModalCouponShop";

const ShoppingCartItem = ({ shop, index, isAllProductsChecked, handleSelectShop, handleSelectProduct }: any) => {
  const { t } = useTranslation();
  const { isTablet, isDesktop } = useResponsive();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [deleteSingleItem] = useDeleteSingleItemMutation();
  const [updateQuantity] = useUpdateQuantityMutation();
  const baseImage = import.meta.env.VITE_BASE_IMAGE_URL as string;

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  // Delete item in carts
  const handleDeleteSingleItem = async (id: number) => {
    try {
      await deleteSingleItem(id).unwrap();
      notifySuccess(
        t("admin_shop.product.evouncher.successfully"),
        t("user.account_user.account_notification_page.delete_success")
      );
    } catch (err) {
      handleApiError(err);
    }
  };

  // Update quantity item in carts
  const handleUpdateQuantity = async (value: number, id: number) => {
    try {
      if (value < 1) {
        showConfirm(id);
      }
      await updateQuantity({ quantity: value, id }).unwrap();
    } catch (err) {
      handleApiError(err);
    }
  };

  const showConfirm = (id: number) => {
    Modal.confirm({
      title: t("user.shopping_cart_page.btn_confirm_title"),
      icon: <WarningOutlined />,
      content: t("user.shopping_cart_page.btn_confirm_description"),
      onOk: () => handleDeleteSingleItem(id),
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const [shopChecked, setShopChecked] = useState(false);

  const handleCheckboxChange = (shopId: number) => {
    setShopChecked(!shopChecked);
    handleSelectShop(shopId);
  };

  return (
    <div key={index}>
      <div className="h-auto overflow-auto">
        <div key={shop.shop_id} className="bg-white mb-[10px] rounded">
          <div className="px-4 pt-[19px] pb-0">
            <div className="block mb-[10px]">
              <Checkbox
                value={shop.shop_id}
                checked={isAllProductsChecked(shop.shop_id)}
                onChange={() => handleCheckboxChange(shop.shop_id)}
                className="mr-3"
              ></Checkbox>
              <FontAwesomeIcon icon={faStore} className="text-gray-400 text-base inline-block mr-1" />
              <a href={`/store/${shop.shop_id}`} className="inline-block text-[#242424] font-semibold text-[15px]">
                {shop.shop_name}
                <FontAwesomeIcon icon={faAngleRight} className="text-gray-400 text-sm inline-block ml-1" />
              </a>
            </div>
          </div>
          <div className="mt-8 mx-0 bg-white pt-0 px-[16px] pb-[3px]">
            {shop.items.map((product: any, index: number) => (
              <div className="mb-8 " key={index}>
                <S.CartItem className="row">
                  <div className="col-1 flex">
                    <Checkbox
                      value={product.id}
                      className="mr-3"
                      checked={product.is_checked === "1"}
                      onChange={() => handleSelectProduct(product.id, shop.shop_id)}
                    ></Checkbox>
                    <a href="/#">
                      <img
                        src={`${baseImage}/${product.thumbnail_url}`}
                        alt={product.name}
                        className="w-[75px] h-[75px] object-cover "
                      />
                    </a>
                    <div className="relative pl-[10px] w-[calc(100%_-_100px)]">
                      <a href="/#" className="leading-5 mb-1 text-[13px] text-[#242424] line-clamp-2 text-ellipsis">
                        {product.name}
                      </a>
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="p-0 m-0">
                      <span className="font-medium text-sm inline-block mr-[5px] text-[#242424]">
                        {formatCurrency(product.price)}
                      </span>
                      {product.regular_price > 0 && product.regular_price > product.price && (
                        <del className="inline-block text-xs">{formatCurrency(product.regular_price)}</del>
                      )}
                    </div>
                  </div>
                  <div className="col-3 w-[130px] px-[15px]">
                    <div className="quantity text-center">
                      <InputNumber
                        onChange={(value) => handleUpdateQuantity(value, product.id)}
                        min={1}
                        max={50}
                        defaultValue={product.quantity}
                        className="text-center"
                      />
                    </div>
                  </div>
                  <div className="col-4 w-[120px] px-[15px]">
                    <span className="text-[#ff424e] leading-5 block font-medium text-sm">
                      {formatCurrency(product.price * product.quantity)}
                    </span>
                  </div>
                  <div className="col-5 w-12 text-right">
                    {!isTablet || !isDesktop ? (
                      <span
                        className="text-blue-600"
                        onClick={() => showConfirm(product.id)}
                        aria-hidden={true}
                        key={product.product_id}
                      >
                        {t("user.shopping_cart_page.btn_delete")}
                      </span>
                    ) : (
                      <img
                        onClick={() => showConfirm(product.id)}
                        aria-hidden={true}
                        key={product.productId}
                        src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/trash.svg"
                        alt="deleted"
                        className="cursor-pointer"
                      />
                    )}
                  </div>
                </S.CartItem>
              </div>
            ))}
          </div>
          <div className="px-5 py-4 flex items-center border-t border-solid border-gray-200 border-x-0 border-b-0">
            <div className="inline-flex items-center">
              <div className="text-black text-[15px] font-medium leading-6 mr-3 whitespace-nowrap">
                {t("user.shopping_cart_page.shop_promotion")}
              </div>
              <FontAwesomeIcon
                icon={faAngleDown}
                className="text-gray-500 cursor-pointer"
                onClick={openModal}
                aria-hidden={true}
              />
              {/* <S.Ticket>
                <div className="ticket ml-2">
                  <img
                    className="w-[15px] h-[15px] absolute right-[-5px] top-[-5px] inline-block max-w-full"
                    src="https://salt.tikicdn.com/ts/upload/5c/50/ce/bab71210dd41a417824c5844420306e2.jpg"
                    alt="apply-coupon"
                  />
                  <i className="semicircle left"></i>
                  <i className="semicircle right"></i>
                  <div className="px-3 flex items-center h-full text-[#0d5cb6] text-[11px] leading-5 font-medium">
                    Giảm 10k
                  </div>
                </div>
              </S.Ticket> */}
            </div>
          </div>
          <ModalCouponShop
            title={shop.shopName}
            data={shop.coupons}
            isOpenModal={isOpenModal}
            handleCloseModal={closeModal}
          />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartItem;
