import { useSyncToURL } from "@app/hooks";
import { formatCurrency } from "@app/utils/helper";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Space } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import React, { useEffect, useState } from "react";

import PriceSkeleton from "../skeletons/PriceSkeleton";

interface IPriceItem {
  min: number;
  max: number;
}

const PriceItem: React.FC<IPriceItem> = ({ min, max }) => {
  const [loadingSkeletonCount, setLoadingSkeletonCount] = useState(false);
  const syncToURL = useSyncToURL();

  const handleSyncPrice = (min: number, max: number) => {
    const priceValue = `${min},${max}`;

    syncToURL({ price: priceValue });
  };

  useEffect(() => {
    setLoadingSkeletonCount(true);
    setTimeout(() => {
      setLoadingSkeletonCount(false);
    }, 0);
  }, []);

  const [size] = useState<SizeType>("small");

  return (
    <div className="price">
      {loadingSkeletonCount ? (
        <PriceSkeleton count={1} />
      ) : (
        <div className="price_space">
          <Space direction="vertical">
            <Space wrap>
              <Button size={size} onClick={() => handleSyncPrice(min, max)}>
                {min === 0 ? (
                  `Dưới ${formatCurrency(max)}`
                ) : max === 1000000000000 ? (
                  `Trên ${formatCurrency(min)}`
                ) : (
                  <>
                    {formatCurrency(min)}
                    <FontAwesomeIcon className="arrow" icon={faArrowRight} />
                    {formatCurrency(max)}
                  </>
                )}
              </Button>
            </Space>
          </Space>
        </div>
      )}
    </div>
  );
};

export default PriceItem;
