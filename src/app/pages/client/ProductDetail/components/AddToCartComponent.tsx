import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { setDataCart } from "@app/store/slices/redux/productDetailSlice";
import { useAppDispatch, useAppSelector } from "@app/store/store";
import { Button, InputNumber } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "../ProductDetail.styles";

type quantityNumber = number | null | undefined;

const AddToCartComponent = () => {
  const [quantityInput, setQuantityInput] = useState<number>(1);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const dataCart = useAppSelector((state) => state.productDetail.dataCart);

  const handleSetCartQuantity = useCallback(
    (value: quantityNumber) => {
      const parsedValue = typeof value === "number" ? value : 1;
      dispatch(
        setDataCart({
          ...dataCart,
          cartQuantity: parsedValue,
        })
      );
    },
    [dataCart, dispatch]
  );

  useEffect(() => {
    if (quantityInput !== dataCart?.cartQuantity) {
      handleSetCartQuantity(quantityInput);
    }
  }, [handleSetCartQuantity, quantityInput, dataCart]);

  const handleIncrease = () => {
    setQuantityInput((prevQuantity) => Math.min(prevQuantity + 1, dataCart?.stock ?? 1));
  };

  const handleDecrease = () => {
    setQuantityInput((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleQuantityChange = (value: quantityNumber) => {
    setQuantityInput(value ?? 1);
    handleSetCartQuantity(value);
  };

  const handleAddToCart = (cartData: any) => {
    const { productName, productVariantValue, productImage, regularPrice, salePrice, cartQuantity } = cartData;
    const currentPrice = salePrice > 0 ? salePrice : regularPrice;

    const cartItem = {
      productName,
      productVariantValue,
      productImage,
      currentPrice,
      cartQuantity,
    };

    console.table({ cartItem });
  };

  return (
    <S.AddToCartStyle>
      <div className="flex items-end">
        <div className="quantity-input-wrapper">
          <p className="label">{t("user.product_detail.quantity")}</p>
          <div className="group-input">
            <Button
              type="primary"
              className="descrease-btn"
              icon={<MinusOutlined />}
              disabled={quantityInput === 1}
              onClick={handleDecrease}
            />
            <InputNumber
              className="quantity-input"
              min={1}
              max={dataCart?.stock}
              value={quantityInput}
              onChange={handleQuantityChange}
            />
            <Button
              type="primary"
              className="increase-btn"
              icon={<PlusOutlined />}
              disabled={quantityInput === dataCart?.stock}
              onClick={handleIncrease}
            />
          </div>
        </div>
      </div>
      <div className="group-button">
        {dataCart?.stock > 0 ? (
          <Button type="primary" className="add-to-cart" onClick={() => handleAddToCart(dataCart)}>
            {t("user.product_detail.purchase")}
          </Button>
        ) : (
          <Button type="primary" className={`add-to-cart ${dataCart?.stock === 0 ? "disabled" : ""}`}>
            Hết hàng
          </Button>
        )}
      </div>
    </S.AddToCartStyle>
  );
};

export default AddToCartComponent;
