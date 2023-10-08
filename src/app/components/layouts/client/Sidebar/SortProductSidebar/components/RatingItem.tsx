import { useSyncToURL } from "@app/hooks";
import { Rate } from "antd";
import React, { useEffect, useState } from "react";

import RatingSkeleton from "../skeletons/RatingSkeleton";

interface IRatingItem {
  value: number;
}

const RatingItem: React.FC<IRatingItem> = ({ value }) => {
  const [loadingSkeletonCount, setLoadingSkeletonCount] = useState(false);
  const syncToURL = useSyncToURL();

  useEffect(() => {
    setLoadingSkeletonCount(true);
    setTimeout(() => {
      setLoadingSkeletonCount(false);
    }, 0);
  }, []);

  const handleSyncRating = (value: number) => {
    syncToURL({ rating: `${value}` });
  };

  return (
    <div className="rating">
      {loadingSkeletonCount ? (
        <RatingSkeleton count={1} />
      ) : (
        <div
          className="cursor-pointer"
          role="button"
          tabIndex={0}
          onClick={() => handleSyncRating(value)}
          onKeyDown={() => handleSyncRating(value)}
        >
          <Rate allowHalf disabled defaultValue={value} />
          {`Từ ${value} sao`}
        </div>
      )}
    </div>
  );
};

export default RatingItem;
