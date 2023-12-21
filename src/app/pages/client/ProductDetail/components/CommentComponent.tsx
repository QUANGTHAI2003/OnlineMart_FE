import { CloseOutlined } from "@ant-design/icons";
import { IconCheck } from "@app/app/assets/icons";
import defaultAvatar from "@app/app/assets/images/default_avatar_user.png";
import likeIcon from "@app/app/assets/images/icon-like.png";
import seeMoreIcon from "@app/app/assets/images/icon-see-more.png";
import { RatingText } from "@app/app/pages/admin/products/review/data";
import { useResponsive } from "@app/hooks";
import {
  useAddCommentMutation,
  useGetLikesQuery,
  useGetReviewByProductQuery,
  useUpdateLikeMutation,
} from "@app/store/slices/api/user/reviewApi";
import { useAppSelector } from "@app/store/store";
import { baseImageKitUrl, calculateTimes, handleApiError } from "@app/utils/helper";
import { faComment, faFaceLaughWink, faThumbsUp as faThumbsUpRegular } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as faThumbsUpSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Divider, Image, Pagination, Popover, Rate } from "antd";
import EmojiPicker from "emoji-picker-react";
import { debounce } from "lodash";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import * as S from "../ProductDetail.styles";

import { CommentSkeleton } from ".";

const CommentComponent: React.FC<any> = ({ activeItems }) => {
  const { isTablet } = useResponsive();
  const { t } = useTranslation();

  const { id: productId } = useParams();
  const userId = useAppSelector((state) => state.userState.user)?.id;
  const timeLoadLike = 500;

  const reviewsPerPage = 2;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data: reviewData, isFetching } = useGetReviewByProductQuery(parseInt(productId as string));
  const { data: likeData } = useGetLikesQuery(parseInt(productId as string));

  const orderId = reviewData[0]?.order_id;

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const [updateLike] = useUpdateLikeMutation();
  // const [addComment, { isLoading }] = useAddCommentMutation();
  const [addComment] = useAddCommentMutation();

  const [likeCounts, setLikeCounts] = useState<{ [key: number]: number }>({});

  const [content, setContent] = useState<string>("");
  const [replyComment, setReplyComment] = useState<number[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const onEmojiClick = (emojiObject: any) => {
    setContent(content + emojiObject.emoji);
  };

  const emojiPicker = <EmojiPicker onEmojiClick={onEmojiClick} />;

  const handleExpandCommentItem = () => {
    setIsExpanded(!isExpanded);
  };

  const debouncedHandleLike = debounce(async (commentItemId: number, initialLikeCount: number) => {
    const newLikeCount = (likeCounts[commentItemId] || initialLikeCount) + 1;
    setLikeCounts((prev) => ({ ...prev, [commentItemId]: newLikeCount }));
    await updateLike({
      userId: userId,
      productId: parseInt(productId as string),
      reviewId: commentItemId,
      like_count: 1,
    });
  }, timeLoadLike);

  const debouncedHandleDislike = debounce(async (commentItemId: number, initialLikeCount: number) => {
    const newLikeCount = (likeCounts[commentItemId] || initialLikeCount) - 1;
    setLikeCounts((prev) => ({ ...prev, [commentItemId]: newLikeCount }));
    await updateLike({
      userId: userId,
      productId: parseInt(productId as string),
      reviewId: commentItemId,
      like_count: -1,
    });
  }, timeLoadLike);

  const handleLike = (commentItemId: number, initialLikeCount: number) => {
    debouncedHandleLike(commentItemId, initialLikeCount);
  };

  const handleDislike = (commentItemId: number, initialLikeCount: number) => {
    debouncedHandleDislike(commentItemId, initialLikeCount);
  };

  const handleToggleReplyComment = (commentItemId: number) => {
    setReplyComment((prevReplyComment) => {
      if (prevReplyComment.includes(commentItemId)) {
        return prevReplyComment.filter((item) => item !== commentItemId);
      }
      return [...prevReplyComment, commentItemId];
    });
  };

  const handleAddComment = async (reviewId: number) => {
    try {
      if (content.trim() !== "" && reviewId !== null) {
        const values = {
          content: content.trim(),
          reviewId,
          productId: parseInt(productId || "0"),
          orderId: orderId,
        };

        await addComment(values);
        setContent("");
        setIsExpanded(false);
      }
    } catch (err) {
      handleApiError(err);
    }
  };

  const displayReviewData = useMemo(() => {
    return reviewData?.filter((item: any) => {
      const reviewRating = item.rating as number;

      if (activeItems.length > 0) {
        return activeItems.some((item: number) => {
          return Math.round(reviewRating) === item;
        });
      }
      return reviewData;
    });
  }, [activeItems, reviewData]);

  const currentReviews = displayReviewData.slice(indexOfFirstReview, indexOfLastReview);

  return (
    <S.CommentStyle>
      {isFetching ? (
        <CommentSkeleton />
      ) : (
        <div>
          {currentReviews &&
            currentReviews?.map((item: any) => {
              const likeCount = likeCounts[item.id] || item.like_count;
              const userTimes = calculateTimes(item?.user.created_at);
              const reviewTimes = calculateTimes(item?.created_at);
              const isReplyComment = replyComment.includes(item.id);
              const commentsToShow = isExpanded ? item?.replies : item?.replies.slice(0, 2);

              return (
                <div className="review-comment" key={uuidv4()}>
                  {isTablet && (
                    <div className="review-comment__user">
                      <div className="review-comment__user-inner">
                        <div className="review-comment__user-avatar">
                          <div className="user-avatar">
                            <img
                              src={`${item.user.avatar ? `${baseImageKitUrl}/${item.user.avatar}` : defaultAvatar}`}
                              alt={item.user.avatar}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="review-comment__user-name">{item.user.user_name}</div>
                          <div className="review-comment__user-date">
                            {`${t("user.product_detail.joined_for")} ${userTimes.time_elapsed}`}
                          </div>
                        </div>
                      </div>

                      <div className="review-comment__user-info">
                        <img src={likeIcon} alt="liked-count" />
                        {t("user.product_detail.receive_like")}
                        <span>{`${likeCount} ${t("user.product_detail.received_thanks")}`}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex-grow">
                    <div className="review-comment__rating-title">
                      <div className="review-comment__rating">
                        <Rate disabled allowHalf defaultValue={item.rating} />
                      </div>
                      <div className="review-comment__title">{RatingText(t).status[Math.floor(item.rating)]}</div>
                    </div>

                    <div className="review-comment__seller-name-attributes">
                      <div className="review-comment__seller-name">
                        <span className="review-comment__check-icon"></span>
                        {t("user.product_detail.purchased")}
                      </div>
                    </div>

                    {item.content && item.content.trim() !== "" && (
                      <div className="review-comment__content">{item.content}</div>
                    )}

                    <div className="review-comment__images">
                      <Image.PreviewGroup>
                        {item?.review_media?.map((itemImage: any) => {
                          return (
                            <div key={uuidv4()} className="review-comment__image">
                              <Image
                                className="w-full h-full rounded-md object-cover"
                                src={`${baseImageKitUrl}/${itemImage.media}`}
                                alt={itemImage.media}
                              />
                            </div>
                          );
                        })}
                      </Image.PreviewGroup>
                    </div>

                    {(item.agree?.length > 0 || item.disagree?.length > 0) && (
                      <div className="wrapper-rating-attribute">
                        {item.agree?.length > 0 && (
                          <div className="rating-attribute">
                            <IconCheck />
                            <span className="rating-attribute__attributes">{item.agree}</span>
                          </div>
                        )}

                        {item.disagree?.length > 0 && (
                          <div className="rating-attribute">
                            <CloseOutlined className="text-red-400" />
                            <span className="rating-attribute__attributes">{item.disagree}</span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="review-comment__created-date">
                      <div className="review-comment__attributes">
                        {/* {item.product_attributes.map((itemProAttr: any, index: number) => (
                        <div className="review-comment__attributes--item" key={index}>
                          <span>{itemProAttr}</span>
                        </div>
                      ))} */}
                        <span className="">
                          {item.product?.variants.map((variant: any, index: number) => {
                            const variation_name = variant.variation_name;

                            const value_names = variant.values.map((value: any) => value.variation_value_name);

                            const value_names_string = value_names.join(", ");

                            return (
                              <p key={index}>
                                {variation_name}
                                {": "}
                                {value_names_string}
                              </p>
                            );
                          })}
                        </span>
                      </div>

                      <span>{`${t("user.product_detail.reviewed")} ${reviewTimes.time_elapsed}`}</span>

                      <Divider type="vertical" />

                      {/* <span className="review-comment__time-line text-red-500">
                        {item.product?.variants.map((variant: any, index: number) => {
                          // Lấy ngày nhận hàng (ngày cập nhật cuối cùng của giá trị biến thể đầu tiên)
                          const receivedDate = dayjs(variant.values[0].updated_at);

                          // Lấy ngày đánh giá
                          const reviewDate = dayjs(item.updated_at);

                          // Tính số ngày đã sử dụng
                          const daysUsed = Math.ceil(reviewDate.diff(receivedDate, "day"));

                          return <p key={index}>{daysUsed}</p>;
                        })}
                      </span> */}
                    </div>

                    {userId && (
                      <div className="inline-flex items-center">
                        {likeData?.filter(
                          (itemFilter: any) =>
                            itemFilter?.review_id === item?.id &&
                            itemFilter?.status === 1 &&
                            userId === itemFilter?.user_id
                        ).length > 0 ? (
                          <Button
                            type="link"
                            className="review-comment__thank"
                            onClick={() => handleDislike(item.id, item.like_count)}
                          >
                            <FontAwesomeIcon icon={faThumbsUpSolid} className="text-xl" />
                            <p className="leading-[0px]">{likeCounts[item.id] || item?.like_count}</p>
                          </Button>
                        ) : (
                          <Button
                            type="link"
                            className="review-comment__thank"
                            onClick={() => handleLike(item.id, item.like_count)}
                          >
                            <FontAwesomeIcon icon={faThumbsUpRegular} className="text-xl" />
                            <p className="leading-[0px]">{likeCounts[item.id] || item?.like_count}</p>
                          </Button>
                        )}
                        <span
                          className="review-comment__reply"
                          onClick={() => handleToggleReplyComment(item.id)}
                          onKeyDown={() => handleToggleReplyComment(item.id)}
                          role="button"
                          tabIndex={0}
                        >
                          <FontAwesomeIcon icon={faComment} className="text-xl" />
                          <p className="leading-[0px]">{item.replies.length}</p>
                        </span>
                      </div>
                    )}

                    <div className={`reply-comment ${isReplyComment ? "expanded" : ""}`}>
                      <div className="reply-comment__outer">
                        <div className="reply-comment__avatar">
                          <img
                            src={`${item.user.avatar ? `${baseImageKitUrl}/${item.user.avatar}` : defaultAvatar}`}
                            alt={item.user.user_name}
                          />
                        </div>

                        <div className="reply-comment__wrapper">
                          <div className="flex items-center relative">
                            <textarea
                              placeholder={t("user.product_detail.write_response")}
                              className="reply-comment__input absolute"
                              value={content}
                              onChange={(e) => {
                                setContent(e.target.value);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                  e.preventDefault();
                                  handleAddComment(item.id);
                                }
                              }}
                              spellCheck="false"
                            />

                            <Popover placement="topRight" content={emojiPicker} trigger="click">
                              <Button
                                className="absolute right-1 border-0 flex items-center justify-center"
                                icon={<FontAwesomeIcon icon={faFaceLaughWink} className="text-lg leading-none" />}
                              ></Button>
                            </Popover>
                          </div>

                          {/* <button onClick={() => handleAddComment(item.id)} disabled={isLoading} className="contents">
                            {isLoading ? (
                              <Spin size="small" className="reply-comment__submit" />
                            ) : (
                              <img className="reply-comment__submit" src={arrowSendIcon} alt="send icon" />
                            )}
                          </button> */}
                        </div>
                      </div>
                    </div>

                    <div className="review-comment__sub-comments">
                      {commentsToShow?.map((itemCmt: any) => {
                        return (
                          <div className="review-sub-comment" key={uuidv4()}>
                            <div className="review-sub-comment__inner">
                              <div className="review-sub-comment__avatar-thumb">
                                <div className="user-avatar">
                                  <img
                                    src={`${
                                      itemCmt.user.avatar ? `${baseImageKitUrl}/${itemCmt.user.avatar}` : defaultAvatar
                                    }`}
                                    alt={itemCmt.user.user_name}
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="review-sub-comment__avatar">
                                  <div className="review-sub-comment__avatar-name">{itemCmt.user.user_name}</div>

                                  <Divider type="vertical" />

                                  <div className="review-sub-comment__avatar-date">
                                    {calculateTimes(itemCmt?.created_at).time_elapsed}
                                  </div>
                                </div>
                                <div className="review-sub-comment__content">{itemCmt.content}</div>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {item.replies?.length > 2 && (
                        <div
                          className="review-comment__count"
                          onClick={handleExpandCommentItem}
                          onKeyDown={handleExpandCommentItem}
                          role="button"
                          tabIndex={0}
                        >
                          <img
                            src={seeMoreIcon}
                            className={`review-comment__icon-more ${isExpanded ? "expanded" : ""}`}
                            alt="icon-more"
                          />
                          {isExpanded
                            ? `${t("user.product_detail.collapse")} ${item.replies.length - 2} 
                             ${t(`user.product_detail.${item.replies.length - 2 > 1 ? "responses" : "response"}`)}`
                            : `${t("user.product_detail.view")} ${item.replies.length - 2} 
                             ${t(
                               `user.product_detail.${item.replies.length - 2 > 1 ? "more_responses" : "more_response"}`
                             )}`}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}

      <div className="customer-reviews__pagination">
        {/* <Pagination defaultCurrent={1} defaultPageSize={pageSize} total={commentLength} hideOnSinglePage /> */}
        <Pagination
          current={currentPage}
          pageSize={reviewsPerPage}
          total={displayReviewData ? displayReviewData.length : 0}
          onChange={paginate}
        />
      </div>
    </S.CommentStyle>
  );
};

export default CommentComponent;
