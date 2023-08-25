import { IconCheck, IconThank } from "@app/app/assets/icons";
import { useResponsive } from "@app/hooks";
import { formatTimeAgo } from "@app/utils/helper";
import { Pagination, Rate } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { comment } from "../data";
import * as S from "../ProductDetail.styles";

import { CommentSkeleton } from ".";

const CommentComponent = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { isTablet } = useResponsive();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { t } = useTranslation();

  const [expanded, setExpanded] = useState<number[]>([]);
  const [replyComment, setReplyComment] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const commentData: any = comment?.data || [];
  const commentLength = (commentData as string[])?.length || 0;

  const handleExpandCommentItem = (commentItemId: number) => {
    if (expanded.includes(commentItemId)) {
      setExpanded(expanded.filter((item) => item !== commentItemId));
    } else {
      setExpanded([...expanded, commentItemId]);
    }
  };

  const handleToggleReplyComment = (commentItemId: number) => {
    setReplyComment((prevReplyComment) => {
      if (prevReplyComment.includes(commentItemId)) {
        return prevReplyComment.filter((item) => item !== commentItemId);
      }
      return [...prevReplyComment, commentItemId];
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  });

  return (
    <S.CommentStyle>
      {isLoading ? (
        <CommentSkeleton />
      ) : (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {commentData?.map((item: any) => {
            const isExpanded = expanded.includes(item.id);
            const subComment = item.comments?.sort((a: any, b: any) => a.create_at - b.create_at);

            const commentLessItem = isExpanded ? subComment : subComment.slice(0, 1);

            const isReplyComment = replyComment.includes(item.id);

            return (
              <div className="review-comment" key={item.id}>
                {isTablet && (
                  <div className="review-comment__user">
                    <div className="review-comment__user-inner">
                      <div className="review-comment__user-avatar">
                        <div className="user-avatar has-character">
                          <img
                            src="https://salt.tikicdn.com/cache/512x512/ts/avatar/52/b6/1f/40c46b223bccbba9df24126aa157c2f4.png"
                            alt="Nhật Đăng"
                          />
                          <span>NĐ</span>
                        </div>
                      </div>
                      <div>
                        <div className="review-comment__user-name">{item.created_by.name}</div>
                        <div className="review-comment__user-date">
                          {item.created_by.contribute_info.summary.joined_time}
                        </div>
                      </div>
                    </div>
                    <div className="review-comment__user-info">
                      <img
                        src="https://salt.tikicdn.com/ts/upload/c6/67/f1/444fc9e1869b5d4398cdec3682af7f14.png"
                        alt="review-count"
                      />
                      {t("user.product_detail.write_review")}
                      <span>{`${item.created_by.contribute_info.summary.total_review} đánh giá`}</span>
                    </div>
                    <div className="review-comment__user-info">
                      <img
                        src="https://salt.tikicdn.com/ts/upload/cc/86/cd/1d5ac6d4e00abbf6aa4e4636489c9d80.png"
                        alt="liked-count"
                      />
                      {t("user.product_detail.receive_like")}
                      <span>{`${item.created_by.contribute_info.summary.total_thank} Lượt cảm ơn`}</span>
                    </div>
                  </div>
                )}
                <div className="flex-grow">
                  <div className="review-comment__rating-title">
                    <div className="review-comment__rating">
                      <Rate disabled defaultValue={item.rating} />
                    </div>
                    <div className="review-comment__title">{item.title}</div>
                  </div>
                  <div className="review-comment__seller-name-attributes">
                    <div className="review-comment__seller-name">
                      <span className="review-comment__check-icon"></span>
                      {t("user.product_detail.purchased")}
                    </div>
                  </div>
                  <div className="review-comment__content">{item.content}</div>
                  <div className="review-comment__images">
                    {item?.images?.map((itemImage: any) => {
                      return (
                        <div
                          key={itemImage.id}
                          className="review-comment__image"
                          style={{
                            backgroundImage: `url(${itemImage.full_path})`,
                          }}
                        ></div>
                      );
                    })}
                  </div>
                  {item.vote_attributes.agree.length > 0 && (
                    <div className="wrapper-rating-attribute">
                      <div className="rating-attribute">
                        <IconCheck />
                        <span className="rating-attribute__attributes">
                          {item.vote_attributes?.agree.map((itemAgree: any, index: number) => (
                            <React.Fragment key={index}>
                              {index > 0 && ", "}
                              {itemAgree}
                            </React.Fragment>
                          ))}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="review-comment__created-date">
                    <div className="review-comment__attributes">
                      {item.product_attributes.map((itemProAttr: any, index: number) => (
                        <div className="review-comment__attributes--item" key={index}>
                          <span>{itemProAttr}</span>
                        </div>
                      ))}
                    </div>
                    <span>{`Đánh giá vào ${formatTimeAgo(item.created_at)}`}</span>
                    <span className="review-comment__time-line">{item.timeline?.content}</span>
                  </div>
                  <div className="inline-flex items-center">
                    <span className="review-comment__thank">
                      <IconThank />
                      <span>{t("user.product_detail.like")}</span>
                    </span>
                    <span
                      className="review-comment__reply"
                      onClick={() => handleToggleReplyComment(item.id)}
                      onKeyDown={() => handleToggleReplyComment(item.id)}
                      role="button"
                      tabIndex={0}
                    >
                      {t("user.product_detail.comments")}
                    </span>
                  </div>

                  <div className={`reply-comment ${isReplyComment ? "expanded" : ""}`}>
                    <div className="reply-comment__outer">
                      <div
                        className="reply-comment__avatar"
                        style={{ backgroundImage: `url(&quot;//tiki.vn/assets/img/avatar-s.png&quot;)` }}
                      >
                        <img
                          src="https://salt.tikicdn.com/ts/upload/07/d5/94/d7b6a3bd7d57d37ef6e437aa0de4821b.png"
                          alt=""
                        />
                      </div>
                      <div className="reply-comment__wrapper">
                        <div>
                          <textarea
                            placeholder="Viết câu trả lời"
                            className="reply-comment__input"
                            spellCheck="false"
                          ></textarea>
                        </div>
                        <img
                          src="https://salt.tikicdn.com/ts/upload/1e/49/2d/92f01c5a743f7c8c1c7433a0a7090191.png"
                          className="reply-comment__submit"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="review-comment__sub-comments">
                    {commentLessItem.map((itemCmt: any) => {
                      return (
                        <div className="review-sub-comment" key={itemCmt.id}>
                          <div className="review-sub-comment__avatar-thumb">
                            <div
                              className="user-avatar"
                              style={{
                                backgroundImage: `background-image: url(${itemCmt.avatar_url})`,
                              }}
                            >
                              <img src={itemCmt.avatar_url} alt={itemCmt.fullname} />
                            </div>
                          </div>
                          <div className="review-sub-comment__inner">
                            <div className="review-sub-comment__avatar">
                              <div className="review-sub-comment__avatar-name">{itemCmt.fullname}</div>
                              {itemCmt.commentator === "seller" && (
                                <span className="review-sub-comment__check-icon"></span>
                              )}
                              <div className="review-sub-comment__avatar-date">{formatTimeAgo(itemCmt.create_at)}</div>
                            </div>
                            <div className="review-sub-comment__content">{itemCmt.content}</div>
                          </div>
                        </div>
                      );
                    })}

                    {item.comments.length > 1 && (
                      <div
                        className="review-comment__count"
                        onClick={() => handleExpandCommentItem(item.id)}
                        onKeyDown={() => handleExpandCommentItem(item.id)}
                        role="button"
                        tabIndex={0}
                      >
                        <img
                          src="https://salt.tikicdn.com/ts/upload/d4/d0/90/6356a7cae463100ee88538511318c5fb.png"
                          className={`review-comment__icon-more ${isExpanded ? "expanded" : ""}`}
                          alt="icon-more"
                        />
                        {isExpanded
                          ? `Thu gọn ${item.comments.length - 1} câu trả lời`
                          : `Xem thêm ${item.comments.length - 1} câu trả lời`}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
      <div className="customer-reviews__pagination">
        <Pagination defaultCurrent={1} defaultPageSize={3} total={commentLength} />
      </div>
    </S.CommentStyle>
  );
};

export default CommentComponent;
