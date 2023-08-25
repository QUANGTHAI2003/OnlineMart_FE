import { AvatarImage, ImageLoadingSkeleton } from "@app/app/assets/icons";
import { useResponsive } from "@app/hooks";

const CommentSkeleton = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { isTablet } = useResponsive();

  return (
    <>
      {[...Array(3)].map((_, index: any) => (
        <div className="review-comment gap-x-6" key={index}>
          {isTablet && (
            <div className="review-comment__user">
              <div className="review-comment__user-inner">
                <div className="review-comment__user-avatar">
                  <div className="user-avatar has-character">
                    <AvatarImage />
                    <span className="bg-gray-200 rounded-full "></span>
                  </div>
                </div>
                <div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                </div>
              </div>
              <div className="review-comment__user-info h-2.5 bg-gray-200 rounded-full"></div>
              <div className="review-comment__user-info h-2.5 bg-gray-200 rounded-full"></div>
            </div>
          )}
          <div className="flex-grow">
            <div className="review-comment__rating-title">
              <div className="review-comment__rating h-2.5 bg-gray-200 rounded-full"></div>
              <div className="review-comment__title h-2.5 bg-gray-200 rounded-full"></div>
            </div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="review-comment__content"></div>
            <div className="review-comment__images flex-nowrap gap-x-4">
              {[...Array(6)].map((_, index: any) => (
                <div key={index} className="flex items-center justify-center w-full h-32 bg-gray-300 rounded">
                  <ImageLoadingSkeleton />
                </div>
              ))}
            </div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 mt-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CommentSkeleton;
