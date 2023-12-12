import { StarImage } from "@app/app/assets/icons";
import {
  useGetAllImagesQuery,
  useGetReviewByProductQuery,
  useGetReviewCountQuery,
} from "@app/store/slices/api/user/reviewApi";
import { setRating, setReview } from "@app/store/slices/redux/productDetailSlice";
import { useAppDispatch } from "@app/store/store";
import { baseImageKitUrl } from "@app/utils/helper";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Image, Rate } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import * as S from "../ProductDetail.styles";

import { CommentComponent, CustomerReviewSkeleton } from ".";

const CustomerReview = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { data: reviewData, isFetching } = useGetReviewByProductQuery(parseInt(id as string));
  const { data: reviewImagesData } = useGetAllImagesQuery(parseInt(id as string));
  const { data: reviewCountData } = useGetReviewCountQuery(parseInt(id as string));
  const starData = reviewCountData;

  const [totalScore, setTotalScore] = useState<number>(0);
  const [averageScore, setAverageScore] = useState<number>(0);
  const [activeItems, setActiveItems] = useState<number[]>([]);

  const sortData = [
    {
      id: 5,
      name: `5 ${t("user.product_detail.stars")}`,
      value: 5,
    },
    {
      id: 4,
      name: `4 ${t("user.product_detail.stars")}`,
      value: 4,
    },
    {
      id: 3,
      name: `3 ${t("user.product_detail.stars")}`,
      value: 3,
    },
    {
      id: 2,
      name: `2 ${t("user.product_detail.stars")}`,
      value: 2,
    },
    {
      id: 1,
      name: `1 ${t("user.product_detail.star")}`,
      value: 1,
    },
  ];

  useEffect(() => {
    dispatch(setRating(averageScore));
    dispatch(setReview(reviewData?.length));
  }, [averageScore, dispatch, reviewData?.length]);

  useEffect(() => {
    if (reviewData) {
      const total = reviewData.reduce((total: any, review: any) => total + review.rating, 0);
      setTotalScore(total);

      const average = (totalScore / reviewData?.length).toFixed(1);
      setAverageScore(Number(average));
    }
  }, [reviewData, totalScore]);

  const toggleSort = (itemId: number) => {
    if (activeItems.includes(itemId)) {
      setActiveItems(activeItems.filter((item) => item !== itemId));
    } else {
      setActiveItems([...activeItems, itemId]);
    }
  };

  const limitCustomerImage = 6;
  const newestCustomerImages =
    reviewImagesData?.length > limitCustomerImage ? reviewImagesData?.slice(0, limitCustomerImage) : reviewImagesData;

  return (
    <S.CustomerReview>
      <div id="customer-reviews" className="customer-reviews__heading">
        {t("user.product_detail.review")}
      </div>

      {reviewData && !isNaN(averageScore) ? (
        <div className="customer-reviews__inner">
          {isFetching ? (
            <CustomerReviewSkeleton />
          ) : (
            <div className="customer-reviews__top">
              <div className="review-rating">
                <div className="review-rating__inner">
                  <div className="review-rating__summary">
                    <div className="review-rating__point">{averageScore.toFixed(1)}</div>
                    <div className="review-rating__stars">
                      <Rate disabled value={averageScore} allowHalf />
                      <div className="review-rating__total mt-1">
                        {`(${t("user.product_detail.review_count", { count: reviewData?.length })})`}
                      </div>
                    </div>
                  </div>

                  <div className="review-rating__detail">
                    {starData &&
                      Object.entries(starData)
                        ?.sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
                        ?.map(([key, value]) => {
                          const ratingCount = (value as any)?.count;
                          const ratingPercent = (value as any)?.percent;

                          return (
                            <div className="review-rating__level" key={uuidv4()}>
                              <Rate disabled allowHalf defaultValue={parseInt(key)} />
                              <div className="progress-bar">
                                <div style={{ width: `${ratingPercent}%` }}></div>
                              </div>
                              <div className="review-rating__number">{ratingCount}</div>
                            </div>
                          );
                        })}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-10">
                <div className="flex items-baseline justify-between">
                  <div className="review-images">
                    <div className="review-images__heading">
                      {t("user.product_detail.all_images", { images: `(${reviewImagesData?.length})` })}
                    </div>

                    <div className="flex items-center justify-start gap-4 flex-wrap">
                      <Image.PreviewGroup>
                        {newestCustomerImages?.map((item: any, index: any) => (
                          <div key={index} className="relative">
                            <div className="review-images__item flex-1">
                              <Image
                                className="w-full h-full rounded-md object-cover"
                                src={`${baseImageKitUrl}/${item}`}
                                alt={item}
                              />
                            </div>

                            {index === 5 && reviewImagesData.length > limitCustomerImage && (
                              <div className="mr-0 overlay" role="button">
                                <span>{`+ ${reviewImagesData.length - limitCustomerImage}`}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </Image.PreviewGroup>
                    </div>
                  </div>
                </div>

                <div className="filter-review">
                  <div className="filter-review__label">{t("user.product_detail.sort_by")}</div>
                  <div className="filter-review__inner">
                    {sortData.map((item: any) => {
                      const isActive = activeItems.includes(item?.id);

                      return (
                        <div
                          key={item?.id}
                          onClick={() => toggleSort(item.value)}
                          onKeyDown={() => toggleSort(item.value)}
                          role="button"
                          tabIndex={0}
                          className={`filter-review__item ${isActive ? "active" : ""}`}
                        >
                          <span className="filter-review__check" defaultValue={item?.value}>
                            <FontAwesomeIcon icon={faCheck} className="text-[#1A94FF]" />
                          </span>
                          <span className="filter-review__text">{item.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          <CommentComponent activeItems={activeItems} />
        </div>
      ) : (
        <div className="flex items-center justify-center py-3">
          <div className="flex flex-col items-center w-full gap-3">
            <StarImage />
            <span>{t("user.product_detail.empty")}</span>
          </div>
        </div>
      )}
    </S.CustomerReview>
  );
};

export default CustomerReview;
