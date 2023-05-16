import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Dashobard from "./pages/dashboard/Dashobard";
import Home from "./pages/home/Home";
import SignIn from "./pages/signup-signin/SignIn";
import SignUp from "./pages/signup-signin/SignUp";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firbease-config";
import { getUserAction } from "./pages/signup-signin/userAction";
import History from "./pages/history/History";
import Profile from "./pages/signup-signin/Profile";
import NewBook from "./pages/book/NewBook";
import Books from "./pages/book/Books";
import Clients from "./pages/clients/Clients";
import BookLanding from "./pages/book/BookLanding";

function App() {
  const dispatch = useDispatch();

  // let firebase to re auth user if they reload the page
  onAuthStateChanged(auth, (userData) => {
    if (userData.uid) {
      dispatch(getUserAction(userData.uid));
    }
  });

  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:bookId" element={<BookLanding />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />

          <Route path="dashboard" element={<Dashobard />} />
          <Route path="books" element={<Books />} />
          <Route path="new-book" element={<NewBook />} />
          <Route path="profile" element={<Profile />} />
          <Route path="history" element={<History />} />
          <Route path="clients" element={<Clients />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
