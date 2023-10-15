import { useEffect, useState } from "react";

import { NormalPrice, PriceSkeleton, SalePrice } from ".";

const PriceComponent = ({ isHotDeal }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 0);
  });

  return isLoading ? <PriceSkeleton /> : isHotDeal ? <SalePrice /> : <NormalPrice />;
};

export default PriceComponent;
