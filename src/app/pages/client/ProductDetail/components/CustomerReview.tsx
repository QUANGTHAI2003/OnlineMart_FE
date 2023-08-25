import { StarImage } from "@app/app/assets/icons";
import { Rate } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { comment } from "../data";
import * as S from "../ProductDetail.styles";

import { CommentComponent, CustomerReviewSkeleton } from ".";

const sortData = [
  {
    id: 1,
    name: "Mới nhất",
  },
  {
    id: 2,
    name: "Đã mua hàng",
  },
  {
    id: 3,
    name: "5 sao",
  },
  {
    id: 4,
    name: "4 sao",
  },
  {
    id: 5,
    name: "3 sao",
  },
  {
    id: 6,
    name: "2 sao",
  },
  {
    id: 7,
    name: "1 sao",
  },
];

const customerImages = [
  {
    id: 1,
    url: "https://source.unsplash.com/random/?shoe",
  },
  {
    id: 2,
    url: "https://source.unsplash.com/random/?shoe",
  },
  {
    id: 3,
    url: "https://source.unsplash.com/random/?shoe",
  },
  {
    id: 4,
    url: "https://source.unsplash.com/random/?shoe",
  },
  {
    id: 5,
    url: "https://source.unsplash.com/random/?shoe",
  },
  {
    id: 6,
    url: "https://source.unsplash.com/random/?shoe",
  },
  {
    id: 7,
    url: "https://source.unsplash.com/random/?shoe",
  },
  {
    id: 8,
    url: "https://source.unsplash.com/random/?shoe",
  },
  {
    id: 9,
    url: "https://source.unsplash.com/random/?shoe",
  },
];

const CustomerReview = () => {
  const starData = comment.stars;
  const [activeItems, setActiveItems] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { t } = useTranslation();

  const toggleSort = (itemId: number) => {
    if (activeItems.includes(itemId)) {
      setActiveItems(activeItems.filter((item) => item !== itemId));
    } else {
      setActiveItems([...activeItems, itemId]);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  });

  const limitCustomerImage = 6;
  const newestCustomerImages =
    customerImages.length > limitCustomerImage ? customerImages.slice(0, limitCustomerImage) : customerImages;

  return (
    <S.CustomerReview>
      <div id="customer-reviews" className="customer-reviews__heading">
        {t("user.product_detail.review")}
      </div>
      {comment.data ? (
        <div className="customer-reviews__inner">
          {isLoading ? (
            <CustomerReviewSkeleton />
          ) : (
            <div className="customer-reviews__top">
              <div className="review-rating">
                <div className="review-rating__inner">
                  <div className="review-rating__summary">
                    <div className="review-rating__point">{comment.rating_average}</div>
                    <div className="review-rating__stars">
                      <Rate disabled defaultValue={5} />
                      <div className="review-rating__total">
                        {t("user.product_detail.review_count", { count: comment.reviews_count })}
                      </div>
                    </div>
                  </div>
                  <div className="review-rating__detail">
                    {Object.entries(starData)
                      .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
                      .map(([key, value]) => {
                        const ratingCount = value.count;
                        const ratingPercent = value.percent;

                        return (
                          <div className="review-rating__level" key={key}>
                            <Rate disabled defaultValue={parseInt(key)} />
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
              <div>
                <div className="flex items-baseline justify-between">
                  <div className="review-images">
                    <div className="review-images__heading">
                      {t("user.product_detail.all_images", { images: customerImages.length })}
                    </div>
                    <div className="flex items-center justify-start gap-4 flex-wrap">
                      {newestCustomerImages.map((item: any, index: any) => (
                        <div key={item.id} className="relative">
                          <div className="review-images__item flex-1">
                            <img src={`${item.url}&${item.id}`} alt={item.url} />
                          </div>
                          {index === 5 && customerImages.length > limitCustomerImage && (
                            <div className="mr-0 overlay" role="button">
                              <span>{`+ ${customerImages.length - limitCustomerImage}`}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="filter-review">
                  <div className="filter-review__label">{t("user.product_detail.sort_by")}</div>
                  <div className="filter-review__inner">
                    {sortData.map((item: any) => {
                      const isActive = activeItems.includes(item.id);
                      return (
                        <div
                          key={item.id}
                          onClick={() => toggleSort(item.id)}
                          onKeyDown={() => toggleSort(item.id)}
                          role="button"
                          tabIndex={0}
                          className={`filter-review__item ${isActive ? "active" : ""}`}
                        >
                          <span className="filter-review__check">
                            <img
                              src="https://salt.tikicdn.com/ts/upload/68/59/32/9589577c7e094d3dccbe57dd0af2bbb8.png"
                              alt=""
                            />
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
          <div></div>
          <CommentComponent />
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center w-full">
            <StarImage />
            <span>{t("user.product_detail.empty")}</span>
          </div>
        </div>
      )}
    </S.CustomerReview>
  );
};

export default CustomerReview;
