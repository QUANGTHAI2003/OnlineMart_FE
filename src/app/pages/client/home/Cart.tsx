import { WarningOutlined } from "@ant-design/icons";
import { useResponsive } from "@app/hooks";
import { Checkbox, Modal } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "./Cart.styles";
import CartSkeleton from "./CartSkeleton";
import ShippingAddress from "./components/cart/ShippingAddress";
import ShoppingCartEmpty from "./components/cart/ShoppingCartEmpty";
import ShoppingCartItem from "./components/cart/ShoppingCartItem";
import TotalWithCoupon from "./components/cart/TotalWithCoupon";

interface IProduct {
  productId: number;
  productName: string;
  thumbnail: string;
  price: number;
  quantity: number;
}
interface IShop {
  shopId: number;
  shopName: string;
  products: IProduct[];
}
interface ICart {
  cart: {
    shops: IShop[];
  };
}

const Cart = () => {
  const { t } = useTranslation();
  const { isDesktop } = useResponsive();

  const [loading, setLoading] = useState(true);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedShops, setSelectedShops] = useState<number[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [showCouponModal, setshowCouponModal] = useState<boolean>(false);

  const cartData: ICart = useMemo(() => {
    return {
      cart: {
        shops: [
          {
            shopId: 1,
            shopName: "Cửa hàng Phương Phương",
            products: [
              {
                productId: 1,
                productName: "Máy Xay Thịt 4 Lưỡi - Dung Tích 2 Lít - Công Suất 300W",
                thumbnail: "https://source.unsplash.com/random",
                price: 329000,
                quantity: 2,
              },
              {
                productId: 2,
                productName: "Dầu Gội Dược Liệu Thái Dương 3 (500ml, Hương Hoa Đào)",
                thumbnail: "https://source.unsplash.com/random",
                price: 329000,
                quantity: 1,
              },
            ],
            coupons: [
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
            ],
          },
          {
            shopId: 2,
            shopName: "Tiki Trading",
            products: [
              {
                productId: 3,
                productName:
                  "Tã/bỉm quần HUGGIES SKINCARE gói SUPER JUMBO size M 76+8 miếngTã/bỉm quần HUGGIES SKINCARE gói SUPER JUMBO size M 76+8 miếng",
                thumbnail: "https://source.unsplash.com/random",
                price: 329000,
                quantity: 3,
              },
            ],
            coupons: [],
          },
        ],
      },
    };
  }, []);

  const getTotalQuantity = () => {
    return cartData.cart.shops.reduce(
      (acc, shop) => acc + shop.products.reduce((acc, product) => acc + product.quantity, 0),
      0
    );
  };
  const totalQuantity = getTotalQuantity();

  const showConfirm = () => {
    Modal.confirm({
      title: t("user.shopping_cart_page.btn_confirm_title"),
      icon: <WarningOutlined />,
      content: t("user.shopping_cart_page.btn_confirm_description"),
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleSelectAll = () => {
    setshowCouponModal((prevStatus: any) => !prevStatus);
    setSelectAll(!selectAll);
    if (!selectAll) {
      // Chọn tất cả các sản phẩm
      const allProductIds = cartData.cart.shops.flatMap((shop) => shop.products.map((product) => product.productId));
      setSelectedProducts(allProductIds);
      // Chọn tất cả các shop
      const allShopIds = cartData.cart.shops.map((shop) => shop.shopId);
      setSelectedShops(allShopIds);
    } else {
      // Bỏ chọn tất cả các sản phẩm
      setSelectedProducts([]);
      // Bỏ chọn tất cả các shop
      setSelectedShops([]);
    }
  };

  const handleSelectShop = (shopId: number) => {
    setshowCouponModal((prevStatus: any) => !prevStatus);
    setSelectedShops((prevSelectedShops) => {
      if (prevSelectedShops.includes(shopId)) {
        // Unselect the shop
        const updatedSelectedShops = prevSelectedShops.filter((id) => id !== shopId);
        setSelectedProducts((prevSelectedProducts) =>
          prevSelectedProducts.filter((productId) => {
            const productShopId = cartData.cart.shops.find((shop) =>
              shop.products.some((product) => product.productId === productId)
            )?.shopId;
            return productShopId !== shopId || updatedSelectedShops.includes(productShopId);
          })
        );
        return updatedSelectedShops;
      }
      // Select the shop and all its products
      const shopProductIds =
        cartData.cart.shops.find((shop) => shop.shopId === shopId)?.products.map((product) => product.productId) || [];

      setSelectedProducts((prevSelectedProducts) => [...prevSelectedProducts, ...shopProductIds]);

      return [...prevSelectedShops, shopId];
    });
  };

  const handleSelectProduct = (productId: number, shopId: number) => {
    setSelectedProducts((prevSelectedProducts) => {
      setshowCouponModal((prevStatus: any) => !prevStatus);

      const isProductSelected = prevSelectedProducts.includes(productId);
      const updatedSelectedProducts = isProductSelected
        ? prevSelectedProducts.filter((id) => id !== productId)
        : [...prevSelectedProducts, productId];

      const productsInShop =
        cartData.cart.shops.find((shop) => shop.shopId === shopId)?.products.map((product) => product.productId) || [];

      const isAllProductsSelected = productsInShop.every((id) => updatedSelectedProducts.includes(id));

      setSelectedShops((prevSelectedShops) => {
        if (showCouponModal) {
          setshowCouponModal((prevStatus: any) => !prevStatus);
        }
        if (isAllProductsSelected) {
          return [...prevSelectedShops, shopId];
        }
        return prevSelectedShops.filter((id) => id !== shopId);
      });

      return updatedSelectedProducts;
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3 * 1000);
  }, []);

  useEffect(() => {
    const allProductIds = cartData.cart.shops.flatMap((shop) => shop.products.map((product) => product.productId));
    const allShopIds = cartData.cart.shops.map((shop) => shop.shopId);

    const isAllProductsSelected = selectedProducts.length === allProductIds.length;
    const isAllShopsSelected = selectedShops.length === allShopIds.length;

    setSelectAll(isAllProductsSelected && isAllShopsSelected);
  }, [selectedProducts, selectedShops, cartData]);

  return (
    <>
      <div className="hidden xl:flex items-center">
        <h4 className="text-xl font-medium leading-7 uppercase my-5 basis-[calc(797px)]">
          {t("user.shopping_cart_page.cart")}
        </h4>
      </div>
      {cartData.cart.shops.length === 0 ? (
        <ShoppingCartEmpty />
      ) : (
        <div>
          {loading && <CartSkeleton />}
          {!loading && (
            <S.Cart>
              <div className="flex flex-nowrap justify-between basis-[100%] cart">
                <div className="flex flex-col grow shrink cart-content">
                  <S.CartFirst>
                    <div className="cart-label">
                      <Checkbox className="whitespace-nowrap" checked={selectAll} onChange={handleSelectAll}>
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
                          onClick={showConfirm}
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </S.CartFirst>
                  {cartData &&
                    cartData.cart.shops.map((shop, index) => (
                      <ShoppingCartItem
                        key={index}
                        shop={shop}
                        selectedShops={selectedShops}
                        handleSelectShop={handleSelectShop}
                        selectedProducts={selectedProducts}
                        handleSelectProduct={handleSelectProduct}
                        showCouponModal={showCouponModal}
                        showConfirm={showConfirm}
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
                      <TotalWithCoupon />
                    </div>
                  )}
                </div>
              </div>
              {!isDesktop && (
                <S.TotalWithCoupon>
                  <TotalWithCoupon />
                </S.TotalWithCoupon>
              )}
            </S.Cart>
          )}
        </div>
      )}
    </>
  );
};
export default Cart;
