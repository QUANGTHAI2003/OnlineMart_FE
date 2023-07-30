import {StarIcon} from "@app/app/assets/icons";
import React, {useEffect, useState} from "react";

const StarRating: React.FC<{ value: number }> = ({ value }) => {
  const [rating, setRating] = useState(0);
  const maxRating = 5;

  useEffect(() => {
    setRating(value);
  }, [value]);

  return (
    <div>
      {[...Array(maxRating)].map((_, index) => (
        <StarIcon key={index} filled={index < rating} />
      ))}
    </div>
  );
};

export default StarRating;
