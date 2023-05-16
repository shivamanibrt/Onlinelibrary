import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getBurrowBookAction,
  returnBookAction,
} from "../../pages/book/bookAction";
import { ReviewForm } from "../review/ReviewForm";
import { setModalShow } from "../../system/systemSlice";
import { CustomModal } from "../custom-modal/CustomModal";
import { Rating } from "../rating/Rating";

export const HistoryTable = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { burrowHistory } = useSelector((state) => state.books);
  const [bookForReview, setBookForReview] = useState({});

  useEffect(() => {
    dispatch(getBurrowBookAction(user?.uid));
  }, [user?.uid, dispatch]);

  const handleOnReturn = ({ id, bookId, userId }) => {
    if (window.confirm("Are you sure you want to return this book")) {
      dispatch(returnBookAction(bookId, id, userId));
    }
  };

  const handleOnGiveReview = (item) => {
    setBookForReview(item);
    dispatch(setModalShow(true));
  };
  return (
    <div>
      <CustomModal heading="Give Review">
        <ReviewForm bookForReview={bookForReview} />
      </CustomModal>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Burrow At</th>
            <th>Return At</th>
            <th>Action </th>
          </tr>
        </thead>
        <tbody>
          {burrowHistory.map((item) => (
            <tr key={item.id}>
              <td>{item.bookName}</td>
              <td>{new Date(item.burrowingAt).toLocaleDateString()}</td>
              <td>{new Date(item.returnAt).toLocaleDateString()}</td>
              <td>
                {item.hasReturned ? (
                  item.reviewId ? (
                    <>
                      <Rating rate={item.ratings} />
                      <br />
                      <Button variant="outline-danger">Delete review</Button>
                    </>
                  ) : (
                    <Button
                      variant="warning"
                      onClick={() => handleOnGiveReview(item)}
                    >
                      Give Review
                    </Button>
                  )
                ) : (
                  <Button
                    variant="primary"
                    onClick={() => handleOnReturn(item)}
                  >
                    Return Book
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
