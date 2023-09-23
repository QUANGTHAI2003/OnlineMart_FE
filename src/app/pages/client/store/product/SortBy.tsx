import { Radio } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as S from "./Product.styles";
const SortBy = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState(1);
  const onChange = (e: any) => {
    setValue(e.target.value);
  };
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <S.SortBy>
      <Radio.Group onChange={onChange} value={value}>
        <Radio value={1}>{t("user.seller.all_products.common")}</Radio>
        <Radio value={2}>{t("user.seller.all_products.hot_selling")}</Radio>
        <Radio value={3}>{t("user.seller.all_products.new_arrivals")}</Radio>
        {windowWidth > 1024 ? (
          <>
            <Radio value={4}>{t("user.seller.all_products.low_to_high_priecs")}</Radio>
            <Radio value={5}>{t("user.seller.all_products.high_to_low_priecs")}</Radio>
          </>
        ) : (
          <Radio value={6}>Giá</Radio>
        )}
      </Radio.Group>
    </S.SortBy>
  );
};

export default SortBy;
