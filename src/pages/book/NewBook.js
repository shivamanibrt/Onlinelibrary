import React, { useState } from "react";
import { PrivateRoute } from "../../components/private-route/PrivateRoute";
import { Button, Container, Form } from "react-bootstrap";
import { UserLayout } from "../../components/layout/UserLayout";
import { Link } from "react-router-dom";
import { CustomInpute } from "../../components/custom-inpute/CustomInpute";
import { useDispatch } from "react-redux";
import { addNewBookAction } from "./bookAction";

const NewBook = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    dispatch(addNewBookAction(form));
  };

  const inputs = [
    {
      label: "Book Title",
      name: "title",
      type: "text",
      placeholder: "Clean code",
      required: true,
    },
    {
      label: "Auther Name",
      name: "name",
      type: "text",
      placeholder: "Sam smith",
      required: true,
    },
    {
      label: "Published Year",
      name: "year",
      type: "number",
      required: true,
      placeholder: "2020",
    },

    {
      label: "Image Url",
      name: "url",
      type: "url",
      placeholder: "http://imge-url.com",
      required: true,
    },
    {
      label: "Summary",
      name: "summary",
      type: "text",
      as: "textarea",
      rows: "5",
      required: true,
    },
  ];

  return (
    <PrivateRoute>
      <UserLayout>
        <Container>
          <h3>New Book</h3>

          <Link to="/books">
            <Button variant="secondary">&lt; Back</Button>
          </Link>

          <hr />

          <Form
            onSubmit={handleOnSubmit}
            className="border p-5 shadow-lg rounded m-auto bg-light  mb-3"
            style={{ width: "500px" }}
          >
            <h3 className="text-primary fw-bolder mb-3">Add new book</h3>

            <div className="mt-5">
              {inputs.map((item, i) => (
                <CustomInpute key={i} {...item} onChange={handleOnChange} />
              ))}

              <div className="d-grid">
                <Button variant="primary" type="submit">
                  Add Book
                </Button>
              </div>
            </div>
          </Form>
        </Container>
      </UserLayout>
    </PrivateRoute>
  );
};

export default NewBook;
