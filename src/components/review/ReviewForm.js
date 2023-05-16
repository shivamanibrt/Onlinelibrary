import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

import { CustomInpute } from "../custom-inpute/CustomInpute";
import { useDispatch } from "react-redux";
import { addNewReviewAction } from "../../pages/book/bookAction";

export const ReviewForm = ({ bookForReview }) => {
  const dispatch = useDispatch();
  const { bookId, userName, userId, id, bookName } = bookForReview;
  const [form, setForm] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const reviewObj = {
      ...form,
      bookId,
      userName,
      userId,
      burrowHistory: id,
      bookName,
    };
    dispatch(addNewReviewAction(reviewObj));
  };

  const inputs = [
    {
      label: "Review title",
      name: "title",
      type: "text",
      required: true,
      placeholder: "very satisfied with quility",
      value: form.title,
    },
    {
      label: "Ratings",
      name: "ratings",
      type: "number",
      min: 1,
      max: 5,
      required: true,
      placeholder: "5",
      value: form.ratings,
    },
    {
      label: "Detail feedback",
      name: "feedback",
      type: "text",
      as: "textarea",
      required: true,
      placeholder: "Write details",
      value: form.feedback,
    },
  ];

  return (
    <Container>
      <Form
        onSubmit={handleOnSubmit}
        className="  m-auto b g-light  mb-3"
        style={{ width: "500px" }}
      >
        <h3>Review for: {bookName}</h3>
        <div className="mt-5">
          {inputs.map((item, i) => (
            <CustomInpute key={i} {...item} onChange={handleOnChange} />
          ))}

          <div className="d-grid">
            <Button variant="primary" type="submit">
              Submit Review
            </Button>
          </div>
        </div>
      </Form>
      <div className="d-grid">
        <Button variant="danger" type="submit">
          Delete Review
        </Button>
      </div>
    </Container>
  );
};
