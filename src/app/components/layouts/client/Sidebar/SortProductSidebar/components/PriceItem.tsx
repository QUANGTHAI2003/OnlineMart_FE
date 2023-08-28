import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Space } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import React, { useEffect, useState } from "react";

import PriceSkeleton from "../skeletons/PriceSkeleton";

interface IPriceItem {
  lowest: string;
  best: string;
}

const PriceItem: React.FC<IPriceItem> = ({ lowest, best }) => {
  const [loadingSkeletonCount, setLoadingSkeletonCount] = useState(false);

  useEffect(() => {
    setLoadingSkeletonCount(true);
    setTimeout(() => {
      setLoadingSkeletonCount(false);
    }, 3000);
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
              <Button size={size}>
                {lowest}
                <FontAwesomeIcon className="arrow" icon={faArrowRight} />
                {best}
              </Button>
            </Space>
          </Space>
        </div>
      )}
    </div>
  );
};

export default PriceItem;
