import React from "react";
import { PrivateRoute } from "../../components/private-route/PrivateRoute";
import { Container } from "react-bootstrap";
import { UserLayout } from "../../components/layout/UserLayout";
import { useSelector } from "react-redux";

const Clients = () => {
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
          <h3>Clients</h3>

          <hr />
        </Container>
      </UserLayout>
    </PrivateRoute>
  );
};

export default Clients;
