import React from "react";
import { PrivateRoute } from "../../components/private-route/PrivateRoute";
import { Container } from "react-bootstrap";
import { UserLayout } from "../../components/layout/UserLayout";

const Dashobard = () => {
  return (
    <PrivateRoute>
      <UserLayout>
        <Container>
          <h3>Dashboard</h3>

          <hr />
        </Container>
      </UserLayout>
    </PrivateRoute>
  );
};

export default Dashobard;
