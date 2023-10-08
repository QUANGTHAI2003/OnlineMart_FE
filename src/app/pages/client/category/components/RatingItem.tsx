import { StarFilled } from "@ant-design/icons";
import { useSyncToURL } from "@app/hooks";
import { Button } from "antd";
import React from "react";

interface IRatingItem {
  apply?: boolean;
  value: number;
}

const RatingItem: React.FC<IRatingItem> = ({ apply, value }) => {
  const syncToURL = useSyncToURL();

  const handleSyncRating = (value: number) => {
    syncToURL({ rating: `${value}` });
  };

  return (
    <div className="rating">
      <Button className="button" onClick={() => handleSyncRating(value)}>
        <StarFilled className="star_icon" />
        <span className="rating_content">{value}</span>
      </Button>
    </div>
  );
};

export default RatingItem;
