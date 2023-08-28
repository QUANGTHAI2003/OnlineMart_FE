import { InputNumber, Button } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import SpreadPriceSkeleton from "../skeletons/SpreadPriceSkeleton";
import * as S from "../SortProductSidebar.styles";

const SpreadPriceItem = () => {
  const { t } = useTranslation();
  const [loadingSkeletonCount, setLoadingSkeletonCount] = useState(false);

  useEffect(() => {
    setLoadingSkeletonCount(true);
    setTimeout(() => {
      setLoadingSkeletonCount(false);
    }, 3000);
  }, []);

  const onChange = (value: number | string) => {
    console.log("changed", value);
  };

  return (
    <div className="input_spread">
      {loadingSkeletonCount ? (
        <SpreadPriceSkeleton count={1} />
      ) : (
        <div>
          <S.SpreadPriceItem className="input_number_space">
            <InputNumber
              defaultValue={0}
              formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              parser={(value) => value?.replace(/\$\s?|(\.*)/g, "").replace(/\./g, "")}
              onChange={onChange}
              className="input_number"
            />

            <span className="dash">-</span>

            <InputNumber
              defaultValue={0}
              formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              parser={(value) => value?.replace(/\$\s?|(\.*)/g, "").replace(/\./g, "")}
              onChange={onChange}
              className="input_number"
            />
          </S.SpreadPriceItem>

          <S.Apply className="apply" wrap>
            <Button className="button" type="primary" ghost>
              {t("user.product_category_sidebar.apply")}
            </Button>
          </S.Apply>
        </div>
      )}
    </div>
  );
};

export default SpreadPriceItem;
