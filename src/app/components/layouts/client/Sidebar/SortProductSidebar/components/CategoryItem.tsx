import React from "react";
import { Link } from "react-router-dom";

interface ICategoryItem {
  id: number;
  name: string;
  slug: string;
}

const CategoryItem: React.FC<ICategoryItem> = ({ id, name, slug }) => {
  // const [loadingSkeletonCount, setLoadingSkeletonCount] = useState(false);

  // useEffect(() => {
  //   setLoadingSkeletonCount(true);
  //   setTimeout(() => {
  //     setLoadingSkeletonCount(false);
  //   }, 3000);
  // }, []);

  return (
    <Link to={`category/${slug}/${id}`} className="category">
      <p>{name}</p>
    </Link>
  );
};

export default CategoryItem;
