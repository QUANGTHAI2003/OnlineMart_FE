const DeliverySkeleton = () => {
  return (
    <>
      <div className="delivery-inner">
        <div className="shipping-info">
          <div className="shipping-info__inner">
            <div className="shipping-info__item">
              <div className="shipping-info__item__header w-40 bg-gray-200 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
      <span className="inline-flex items-center w-40 h-6 bg-gray-200 rounded-md">
        <span className="plus-content w-40 bg-gray-200 rounded-md"></span>
      </span>
    </>
  );
};

export default DeliverySkeleton;
