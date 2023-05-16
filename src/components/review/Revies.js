import React from "react";
import "./review.css";
import { Rating } from "../rating/Rating";

export const Revies = ({ userName, title, feedback, ratings }) => {
  return (
    <div className="review d-flex justify-content-between gap-4 border rounded p-4 shadow-lg mb-3">
      <div className="avatar">
        <div className="name-log">{userName[0]}</div>
        <div className="name">{userName}</div>
      </div>
      <div className="review-content">
        <h3>{title}</h3>
        <Rating rate={ratings} />
        <p className="mt-3">{feedback}</p>
      </div>
    </div>
  );
};
