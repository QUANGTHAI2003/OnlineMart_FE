import { Pagination } from "antd";
import { useEffect, useState } from "react";

import * as S from "../ProductCategory.styles";
import PaginateSkeleton from "../skeletons/PaginateSkeleton";

const PaginateItem = () => {
  const [loadingSkeletonCount, setLoadingSkeletonCount] = useState(false);

  useEffect(() => {
    setLoadingSkeletonCount(true);
    setTimeout(() => {
      setLoadingSkeletonCount(false);
    }, 3000);
  }, []);

  return (
    <S.SortPaginateItem>
      {loadingSkeletonCount ? (
        <PaginateSkeleton count={1} />
      ) : (
        <div>
          <Pagination defaultCurrent={1} total={100} />
        </div>
      )}
    </S.SortPaginateItem>
  );
};

export default PaginateItem;
