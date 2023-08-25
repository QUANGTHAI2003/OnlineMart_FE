const PriceSkeleton = () => {
  return (
    <div className="price-and-icon animate-pulse h-20 bg-gray-200 rounded-md">
      <div className="product-price has-discount">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-"></div>
        <div className="product-price__list-price"></div>
        <div className="product-price__discount-rate"></div>
      </div>
    </div>
  );
};

export default PriceSkeleton;
