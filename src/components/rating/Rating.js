import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
const maxtRate = 5;

export const Rating = ({ rate = 5 }) => {
  const hasDecimalValue = rate % 1;

  const fullRateStar = Math.floor(rate);
  const noRate =
    hasDecimalValue > 0 ? maxtRate - fullRateStar - 1 : maxtRate - fullRateStar;

  const fullStar = new Array(fullRateStar).fill("");
  const noRateStar = new Array(noRate).fill("");

  return (
    <div className="text-warning d-flex gap-1">
      {fullStar.map(() => (
        <BsStarFill />
      ))}
      {hasDecimalValue > 0 && <BsStarHalf />}
      {noRateStar.map(() => (
        <BsStar />
      ))}
    </div>
  );
};

// 5 4 3.33
