import { Button, Rate, Space } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

interface IUserRatingItem {
  title: string;
  ratingAverage: number;
  comment: string;
  thumbnailUrl: string;
}

const UserRatingItem: React.FC<IUserRatingItem> = ({ title, ratingAverage, comment, thumbnailUrl }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { t } = useTranslation();

  return (
    <div className="flex justify-between items-center my-3">
      <div className="flex">
        <div className="mr-5">
          <img src={thumbnailUrl} alt={thumbnailUrl} className="w-28" />
        </div>
        <div>
          <div>
            <p className="text-lg font-medium line-clamp-1 max-w-xs break-words">{title}</p>
          </div>
          <div>
            {ratingAverage == 0 || (
              <div className="flex items-end mt-1 flex-wrap">
                <div className="rating-star">
                  <Rate className="text-sm" disabled allowHalf defaultValue={ratingAverage} />
                </div>
              </div>
            )}
          </div>
          <div className="my-2">
            <p className="text-sm line-clamp-2 max-w-xs break-words">{comment}</p>
          </div>
        </div>
      </div>

      <div>
        <Space className="site-button-ghost-wrapper" wrap>
          <Button type="primary" ghost>
            {t("user.rating_user_page.delete")}
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default UserRatingItem;
