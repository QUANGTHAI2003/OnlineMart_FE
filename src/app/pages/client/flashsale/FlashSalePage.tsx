import { useLayoutEffect, useState } from "react";

import { CountdownComponent } from "../home/components";

import SaleComponent from "./components/SaleComponent";
import * as S from "./FlashSalePage.styles";

const FlashSalePage = () => {
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);

  useLayoutEffect(() => {
    const handleScroll = () => {
      const productListComponent = document.getElementById("productList");
      if (productListComponent) {
        const productListComponentTop = productListComponent.getBoundingClientRect().top;
        if (productListComponentTop <= 0) {
          setIsHeaderFixed(true);
        }
        if (productListComponentTop > 0) {
          setIsHeaderFixed(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHeaderFixed]);
  return (
    <div>
      <section className="flex items-center justify-center mb-2">
        <S.FlashSaleImg></S.FlashSaleImg>
        <div className="uppercase mx-2 pb-1 text-lg">Kết thúc trong </div>
        <div className="pb-1">
          <CountdownComponent />
        </div>
      </section>
      <section className="px-10">
        <SaleComponent />
      </section>
    </div>
  );
};

export default FlashSalePage;
