import React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const UserLayout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="use-layout">
      <div className="left bg-dark p-2 pt-5">
        <div className="title mt-3 fs-2">user Name</div>

        <hr />
        <div className="sidbar fw-bolder ">
          <ul>
            <li>
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
            {user.role === "admin" && (
              <>
                <li>
                  <Link className="nav-link" to="/books">
                    Books
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="/clients">
                    Clients
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link className="nav-link" to="/history">
                History
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="right">
        <Header />

        {/* main content area */}
        <div className="main pt-3">{children}</div>

        {/* footer sectio */}
        <Footer />
      </div>
      {/* Header section */}
    </div>
  );
};
