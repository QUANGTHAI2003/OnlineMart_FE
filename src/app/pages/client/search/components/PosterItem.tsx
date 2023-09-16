import { useEffect, useState } from "react";

import PosterSkeleton from "../skeletons/PosterSkeleton";
import * as S from "../UserSearch.styles";

interface IPosterItem {
  image_url: string;
}

const PosterItem: React.FC<IPosterItem> = ({ image_url }) => {
  const [loadingSkeletonCount, setLoadingSkeletonCount] = useState<boolean>(false);

  useEffect(() => {
    setLoadingSkeletonCount(true);
    setTimeout(() => {
      setLoadingSkeletonCount(false);
    }, 3000);
  }, []);

  return (
    <div>
      {loadingSkeletonCount ? (
        <PosterSkeleton count={1} />
      ) : (
        <S.PosterItem>
          <img src={image_url} alt="Poster" />
        </S.PosterItem>
      )}
    </div>
  );
};

export default PosterItem;
