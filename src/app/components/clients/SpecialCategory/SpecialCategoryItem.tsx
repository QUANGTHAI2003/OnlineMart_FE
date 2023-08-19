import { Link } from "react-router-dom";

import SpecialCategorySkeleton from "./SpecialCategorySkeleton";

interface ISpecialCategoryItem {
  id: number;
  image: string;
  name: string;
  url: string;
}

const SpecialCategoryItem = ({ image, name, url }: ISpecialCategoryItem) => {
  return (
    <Link to={url}>
      <div className="rounded-lg">
        <div className="border rounded-lg border-gray-200 border-solid">
          <div className=" rounded-t-lg bg-[#f5f9ff]">
            <img src={image} alt={name} className="w-full h-full object-cover overflow-hidden p-2" />
          </div>
          <div className="rounded-b-lg bg-[#ffffff]">
            <div className="text-center mt-[-3px] w-full text-sm text-[#27272a] items-start p-2 leading-[18px] font-semibold ">
              {name}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
const LoadingSkeleton = () => {
  return <SpecialCategorySkeleton />;
};
SpecialCategoryItem.LoadingSkeleton = LoadingSkeleton;
export default SpecialCategoryItem;
