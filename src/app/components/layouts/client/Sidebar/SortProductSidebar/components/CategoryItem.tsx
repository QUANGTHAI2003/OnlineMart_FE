import React, { useEffect, useState } from "react";

import CategorySkeleton from "../skeletons/CategorySkeleton";

interface ICategoryItem {
  content: string;
}

const CategoryItem: React.FC<ICategoryItem> = ({ content }) => {
  const [loadingSkeletonCount, setLoadingSkeletonCount] = useState(false);

  useEffect(() => {
    setLoadingSkeletonCount(true);
    setTimeout(() => {
      setLoadingSkeletonCount(false);
    }, 3000);
  }, []);

  return (
    <div className="category">
      {loadingSkeletonCount ? (
        <CategorySkeleton count={1} />
      ) : (
        <div>
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};

export default CategoryItem;
