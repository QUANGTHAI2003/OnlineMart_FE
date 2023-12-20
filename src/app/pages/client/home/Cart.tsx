import { WarningOutlined } from "@ant-design/icons";
import { useResponsive } from "@app/hooks";
import {
  useDeleteAllMutation,
  useGetCartQuery,
  useUpdateCheckboxAllMutation,
  useUpdateCheckboxMutation,
  useUpdateCheckboxShopMutation,
} from "@app/store/slices/api/user/cartApi";
import { useAppSelector } from "@app/store/store";
import { handleApiError, notifySuccess } from "@app/utils/helper";
import { Checkbox, Modal } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "./Cart.styles";
import CartSkeleton from "./CartSkeleton";
import ShippingAddress from "./components/cart/ShippingAddress";
import ShoppingCartEmpty from "./components/cart/ShoppingCartEmpty";
import ShoppingCartItem from "./components/cart/ShoppingCartItem";
import Total from "./components/cart/Total";

const Cart = () => {
  const { t } = useTranslation();
  const { isDesktop } = useResponsive();

  const [loading, setLoading] = useState<boolean>(true);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectedShops, setSelectedShops] = useState<boolean>(false);
  const [showCouponModal, setShowCouponModal] = useState<boolean>(false);
  const [deleteAll] = useDeleteAllMutation();
  const [updateCheckbox] = useUpdateCheckboxMutation();
  const [updateCheckboxShop] = useUpdateCheckboxShopMutation();
  const [updateCheckboxAll] = useUpdateCheckboxAllMutation();

  const userId = useAppSelector((state) => state.userState.user)?.id;
  const { data: cart = [], isLoading } = useGetCartQuery(userId);

  const getTotalQuantity = () => {
    return cart.reduce((acc, shop) => acc + shop.items.reduce((acc, product) => acc + product.quantity, 0), 0);
  };
  const totalQuantity = getTotalQuantity();

  const handleDeleteAll = async (id: number) => {
    try {
      await deleteAll(id).unwrap();
      notifySuccess(
        t("admin_shop.product.evouncher.successfully"),
        t("user.account_user.account_notification_page.delete_all_success")
      );
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleUpdateCheckboxItem = async (id: number) => {
    try {
      await updateCheckbox(id).unwrap();
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleUpdateCheckboxShop = async (shopId: number) => {
    try {
      await updateCheckboxShop(shopId).unwrap;
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleUpdateCheckboxAll = async (userId: number) => {
    try {
      await updateCheckboxAll(userId).unwrap;
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleSelectAll = () => {
    setShowCouponModal((prevState) => !prevState);
    setSelectAll(!selectAll);
    if (!selectAll) {
      const data: any = {
        userId: userId,
        state: "1",
      };
      handleUpdateCheckboxAll(data);
    } else {
      const data: any = {
        userId: userId,
        state: "0",
      };
      handleUpdateCheckboxAll(data);
    }
  };

  const handleSelectShop = (shopId: number) => {
    setSelectedShops(!selectedShops);
    if (!selectedShops) {
      const data: any = {
        shopId: shopId,
        state: "1",
      };
      handleUpdateCheckboxShop(data);
    } else {
      const data: any = {
        shopId: shopId,
        state: "0",
      };
      handleUpdateCheckboxShop(data);
    }
  };

  const handleSelectProduct = (productId: number) => {
    handleUpdateCheckboxItem(productId);
  };

  const isAllProductsChecked = (shopId: number) => {
    const productsInShop = cart.find((shop) => shop.shop_id === shopId)?.items || [];
    return productsInShop.every((product) => product.is_checked === "1");
  };

  const isAllProductsInCartChecked = () => {
    const allProductsInCart = cart.flatMap((shop) => shop.items);
    return allProductsInCart.every((product) => product.is_checked === "1");
  };

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  const showConfirmDeleteAll = (id: number) => {
    Modal.confirm({
      title: t("user.shopping_cart_page.btn_confirm_title"),
      icon: <WarningOutlined />,
      content: t("user.shopping_cart_page.btn_confirm_all_description"),
      onOk: () => handleDeleteAll(id),
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <section className="max-w-[1280px]">
      <div className="hidden xl:flex items-center">
        <h4 className="text-xl font-medium leading-7 uppercase my-5 basis-[calc(797px)]">
          {t("user.shopping_cart_page.cart")}
        </h4>
      </div>
      {!isLoading && cart && cart?.length === 0 ? (
        <ShoppingCartEmpty />
      ) : (
        <div className="">
          {loading ? (
            <CartSkeleton />
          ) : (
            <S.Cart>
              <div className="flex flex-nowrap justify-between basis-[100%] cart">
                <div className="flex flex-col grow shrink cart-content  xl:mb-0">
                  <S.CartFirst>
                    <div className="cart-label">
                      <Checkbox
                        className="whitespace-nowrap"
                        checked={isAllProductsInCartChecked()}
                        onChange={handleSelectAll}
                      >
                        {`${t("user.shopping_cart_page.selectAll")} (${totalQuantity} ${t(
                          "user.shopping_cart_page.items"
                        )})`}
                      </Checkbox>
                      <span className="hidden xl:block">{t("user.shopping_cart_page.price")}</span>
                      <span className="hidden xl:block">{t("user.shopping_cart_page.quantity")}</span>
                      <span className="hidden xl:block">{t("user.shopping_cart_page.sub_total")}</span>
                      <span className="remove-all">
                        <img
                          src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/trash.svg"
                          alt="deleted"
                          onClick={() => showConfirmDeleteAll(userId)}
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </S.CartFirst>
                  {cart.map((shop, index) => (
                    <ShoppingCartItem
                      key={index}
                      shop={shop}
                      isAllProductsChecked={isAllProductsChecked}
                      handleSelectShop={handleSelectShop}
                      handleSelectProduct={handleSelectProduct}
                      showCouponModal={showCouponModal}
                    />
                  ))}
                </div>
                <div className="flex grow shrink basis-[calc(100%_-_925px)] xl:ml-5 checkout__information">
                  {!isDesktop && (
                    <div className="sticky top-[-270.2px] w-full">
                      <ShippingAddress />
                    </div>
                  )}
                  {isDesktop && (
                    <div className="sticky top-[-270.2px] w-full">
                      <ShippingAddress />
                      <Total />
                    </div>
                  )}
                </div>
              </div>
              {!isDesktop && (
                <S.TotalWithCoupon>
                  <Total />
                </S.TotalWithCoupon>
              )}
            </S.Cart>
          )}
        </div>
      )}
    </section>
  );
};
export default Cart;
