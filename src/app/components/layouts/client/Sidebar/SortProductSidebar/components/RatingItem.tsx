import { Rate } from "antd";
import React, { useEffect, useState } from "react";

import RatingSkeleton from "../skeletons/RatingSkeleton";

interface IRatingItem {
  content: string;
  value: number;
}

const RatingItem: React.FC<IRatingItem> = ({ content, value }) => {
  const [loadingSkeletonCount, setLoadingSkeletonCount] = useState(false);

  useEffect(() => {
    setLoadingSkeletonCount(true);
    setTimeout(() => {
      setLoadingSkeletonCount(false);
    }, 3000);
  }, []);

  return (
    <div className="rating">
      {loadingSkeletonCount ? (
        <RatingSkeleton count={1} />
      ) : (
        <div>
          <Rate allowHalf defaultValue={value} />
          {content}
        </div>
      )}
    </div>
  );
};

export default RatingItem;
