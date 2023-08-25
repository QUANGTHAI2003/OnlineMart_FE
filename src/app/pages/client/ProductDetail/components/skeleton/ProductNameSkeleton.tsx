const ProductNameSkeleton = () => {
  return (
    <>
      <div className="brand">
        <span className="brand-and-author flex items-baseline">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
        </span>
      </div>
      <div className="title w-80 h-4 bg-gray-200 rounded-full dark:bg-gray-700 mt-2"></div>
      <div className="below-title h-2.5 w-40  bg-gray-200 rounded-full">
        <div className="flex flex-wrap">
          <div className="quantity-sold"></div>
        </div>
      </div>
    </>
  );
};

export default ProductNameSkeleton;
