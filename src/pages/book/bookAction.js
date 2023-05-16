import {
  QuerySnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "../../config/firbease-config";
import { setBook, setBurrowHistory, setReviews } from "./BookSlic";
import { setModalShow } from "../../system/systemSlice";

export const getAllBooksActions = () => async (dispatch) => {
  try {
    //define search query
    const q = query(collection(db, "books"));

    // run query to get data
    let books = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      books.push({
        ...doc.data(),
        id: doc.id,
      });
    });

    console.log(books);

    dispatch(setBook(books));
  } catch (error) {
    console.log(error);
  }
};

export const addNewBookAction = (bookObj) => async (dispatch) => {
  try {
    const docRef = await addDoc(collection(db, "books"), bookObj);
    console.log(docRef);

    if (docRef?.id) {
      toast.success("New book has been added.");
      // now fetch all the book from database and mount to our redux
      dispatch(getAllBooksActions());
      return;
    }
    toast.error("Error, unable to add the book.");
  } catch (error) {
    //log the error
    toast.error(
      "Something went wrong, we could not process your request at the moment, please try again later."
    );
  }
};

export const updateBookAction =
  ({ id, ...rest }) =>
  async (dispatch) => {
    try {
      console.log(id, rest);
      await setDoc(doc(db, "books", id), rest, { merge: true });

      toast.success("New book has been added.");
      dispatch(getAllBooksActions());
      dispatch(setModalShow(false));
    } catch (error) {
      //log the error

      toast.error(
        "Something went wrong, we could not process your request at the moment, please try again later."
      );
    }
  };

export const deleteBookAction = (id) => async (dispatch) => {
  try {
    await deleteDoc(doc(db, "books", id));

    toast.success("New book has been added.");
    dispatch(getAllBooksActions());
    dispatch(setModalShow(false));
  } catch (error) {
    //log the error
    console.log(error);
    toast.error(
      "Something went wrong, we could not process your request at the moment, please try again later."
    );
  }
};

// ======= burrowing section

export const createNewBurrowBookAction = (obj) => async (dispatch) => {
  try {
    const docRef = await addDoc(collection(db, "burrow_history"), obj);
    if (docRef?.id) {
      toast.success("New burrowing item has been added.");

      //update the books {isAvailable: false, availableFrom: Date}
      const updateObj = {
        isAvailable: false,
        availableFrom: obj.returnAt,
        id: obj.bookId,
      };
      // now fetch all the book from database and mount to our redux
      dispatch(updateBookAction(updateObj));
      return;
    }
    toast.error("Error, unable to add the book.");
  } catch (error) {
    console.log(error);

    toast.error(error.message);
  }
};

//obh ={reviewId and ratings}
export const updateBurrowBookAction =
  ({ id, userId, ...obj }) =>
  async (dispatch) => {
    try {
      await setDoc(doc(db, "burrow_history", id), obj, { merge: true });

      //fetcing all the burrow history of the specific user only
      dispatch(getBurrowBookAction(userId));
      return;
    } catch (error) {
      toast.error(error.message);
    }
  };

export const getBurrowBookAction = (userId) => async (dispatch) => {
  try {
    const q = query(
      collection(db, "burrow_history"),
      where("userId", "==", userId)
    );
    const docSnapshot = await getDocs(q);

    let burrow = [];

    docSnapshot.forEach((doc) => {
      const id = doc.id;
      const data = doc.data();

      console.log(data);

      burrow.push({
        ...data,
        id,
      });
    });

    console.log(burrow);
    dispatch(setBurrowHistory(burrow));
  } catch (error) {
    console.log(error);

    toast.error(error.message);
  }
};

// return book
export const returnBookAction = (bookId, bhId, userId) => async (dispatch) => {
  try {
    // update burrow_history table

    const updateBHObj = {
      returnAt: Date.now(),
      hasReturned: true,
    };

    await setDoc(doc(db, "burrow_history", bhId), updateBHObj, { merge: true });

    // upate book table
    const updateBookObj = {
      availableFrom: null,
      isAvailable: true,
    };
    await setDoc(doc(db, "books", bookId), updateBookObj, { merge: true });

    toast.success("You have return the book");

    dispatch(getAllBooksActions());
    dispatch(getBurrowBookAction(userId));
  } catch (error) {
    toast.success(error.message);
    console.log(error);
  }
};

// Review =====

export const addNewReviewAction = (reviewObj) => async (dispatch) => {
  try {
    const { bookId, userId, burrowHistory, ratings } = reviewObj;
    const docRef = await addDoc(collection(db, "reviews"), reviewObj);

    if (docRef?.id) {
      toast.success("New review has been added.");
      //update burrow transaction table, add review id an score
      const obj = {
        id: burrowHistory,
        userId,
        reviewId: docRef.id,
        ratings,
      };
      console.log(obj);
      dispatch(updateBurrowBookAction(obj));
      // now fetch all the review from database and mount to our redux
      // dispatch(getAllReviewsActions());
      return;
    }
    toast.error("Error, unable to add the review.");
  } catch (error) {
    //log the error
    toast.error(
      "Something went wrong, we could not process your request at the moment, please try again later."
    );
  }
};

export const getSelectedBookReview = (bookId) => async (dispatch) => {
  try {
    const q = query(collection(db, "reviews"), where("bookId", "==", bookId));

    const { docs } = await getDocs(q);

    console.log(docs);

    if (docs.length) {
      let reviews = [];
      docs.forEach((doc) => {
        const reviewObj = { id: doc.id, ...doc.data() };
        reviews.push(reviewObj);
      });

      dispatch(setReviews(reviews));
    }
  } catch (error) {
    //log the error
    console.log(error);
    toast.error(
      "Something went wrong, we could not process your request at the moment, please try again later."
    );
  }
};
