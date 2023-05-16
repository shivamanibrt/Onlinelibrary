import React from "react";
import { PrivateRoute } from "../../components/private-route/PrivateRoute";
import { Button, Container } from "react-bootstrap";
import { UserLayout } from "../../components/layout/UserLayout";
import { Link } from "react-router-dom";
import { BookTable } from "../../components/book-table/BookTable";
import { useSelector } from "react-redux";

const Books = () => {
  const { user } = useSelector((state) => state.user);
  if (user.role !== "admin") {
    return (
      <PrivateRoute>
        <UserLayout>
          <h1>Unauthrize access</h1>
        </UserLayout>
      </PrivateRoute>
    );
  }
  return (
    <PrivateRoute>
      <UserLayout>
        <Container>
          <h3>Books</h3>

          <hr />

          <div className="text-end">
            <Link to="/new-book">
              <Button variant="primary">Add New Books</Button>
            </Link>
            <div className="mt-3">
              <BookTable />
            </div>
          </div>
        </Container>
      </UserLayout>
    </PrivateRoute>
  );
};

export default Books;
