const SellerSkeleton = () => {
  return (
    <div className="current-seller animate-pulse">
      <div className="seller-widget">
        <div className="seller-info h-2.5 bg-gray-200 rounded-full mt-4"></div>
        <div className="seller-detail mt-3">
          <div className="item review h-10 bg-gray-200 rounded-md mr-1"></div>
          <div className="item normal h-10 bg-gray-200 rounded-md"></div>
          <div className="item chat h-10 bg-gray-200 rounded-md ml-1"></div>
        </div>
      </div>
      <div className="seller-warranty">
        <div className="warranty-item h-2.5 bg-gray-200 rounded-full mt-2"></div>
        <div className="warranty-item h-2.5 bg-gray-200 rounded-full mt-2"></div>
        <div className="warranty-item h-2.5 bg-gray-200 rounded-full mt-2"></div>
        <div className="warranty-item h-2.5 bg-gray-200 rounded-full mt-2"></div>
      </div>
      <div className="customer-benerfit gap-x-4">
        <div className="benefit-item h-20 bg-gray-200 rounded-md mt-2"></div>
        <div className="benefit-item h-20 bg-gray-200 rounded-md mt-2"></div>
        <div className="benefit-item h-20 bg-gray-200 rounded-md mt-2"></div>
      </div>
    </div>
  );
};

export default SellerSkeleton;
