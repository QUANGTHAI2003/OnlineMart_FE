import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, InputNumber } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "../ProductDetail.styles";

type quantityNumber = number | null | undefined;

interface IQuantity {
  quantity: number;
}

const AddToCartComponent = ({ quantity }: IQuantity) => {
  const [quantityInput, setQuantityInput] = useState<number>(3);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { t } = useTranslation();

  const handleIncrease = () => {
    setQuantityInput((prevQuantity) => Math.min(prevQuantity + 1, quantity ?? 1));
  };

  const handleDecrease = () => {
    setQuantityInput((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleQuantityChange = (value: quantityNumber) => {
    setQuantityInput(value ?? 1);
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
              max={quantity}
              value={quantityInput}
              onChange={handleQuantityChange}
            />
            <Button
              type="primary"
              className="increase-btn"
              icon={<PlusOutlined />}
              disabled={quantityInput === quantity}
              onClick={handleIncrease}
            />
          </div>
        </div>
      </div>
      <div className="group-button">
        <Button type="primary" className="add-to-cart">
          {t("user.product_detail.purchase")}
        </Button>
      </div>
    </S.AddToCartStyle>
  );
};

export default AddToCartComponent;
