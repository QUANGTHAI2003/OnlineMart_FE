import { StarFilled } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

interface IRatingItem {
  content: string;
}

const RatingItem: React.FC<IRatingItem> = ({ content }) => {
  return (
    <div className="rating">
      <Button className="button">
        <StarFilled className="star_icon" />
        <span className="rating_content">{content}</span>
      </Button>
    </div>
  );
};

export default RatingItem;
