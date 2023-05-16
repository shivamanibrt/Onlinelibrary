import React from "react";
import { PrivateRoute } from "../../components/private-route/PrivateRoute";
import { Container } from "react-bootstrap";
import { UserLayout } from "../../components/layout/UserLayout";
import { HistoryTable } from "../../components/history-table/HistoryTable";

const History = () => {
  return (
    <PrivateRoute>
      <UserLayout>
        <Container>
          <h3>History</h3>

          <hr />
          <HistoryTable />
        </Container>
      </UserLayout>
    </PrivateRoute>
  );
};

export default History;
