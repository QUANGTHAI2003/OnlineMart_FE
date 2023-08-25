import { ImageLoadingSkeleton } from "@app/app/assets/icons";

const CustomerReviewSkeleton = () => {
  return (
    <div className="customer-reviews__top">
      <div className="review-rating">
        <div className="review-rating__inner">
          <div className="review-rating__summary">
            <div className="review-rating__stars">
              <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-64 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-64"></div>
            </div>
          </div>
          <div className="review-rating__detail">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-64 mb-2"></div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-64 mb-2"></div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-64 mb-2"></div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-64 mb-2"></div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-64 mb-2"></div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-baseline justify-between">
          <div className="review-images">
            <div className="review-images__heading">Tất cả hình ảnh (34)</div>
            <div className="flex items-center justify-start gap-4 flex-wrap">
              {[...Array(6)].map((_, index: any) => (
                <div key={index} className="relative">
                  <div className="review-images__item flex-1 bg-gray-300 inline-flex items-center justify-center rounded-md">
                    <ImageLoadingSkeleton />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="filter-review">
          <div className="filter-review__label">Lọc xem theo :</div>
          <div className="filter-review__inner">
            {[...Array(6)].map((_, index: any) => (
              <div key={index} role="button" tabIndex={0} className="filter-review__item w-24 rounded-md">
                <span className="filter-review__check">
                  <img src="https://salt.tikicdn.com/ts/upload/68/59/32/9589577c7e094d3dccbe57dd0af2bbb8.png" alt="" />
                </span>
                <span className="filter-review__text"></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviewSkeleton;
