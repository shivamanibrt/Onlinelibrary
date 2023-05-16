import { MainLayout } from "../../components/layout/MainLayout";
import { Button, Container, Form } from "react-bootstrap";
import { CustomInpute } from "../../components/custom-inpute/CustomInpute";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./userAction";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    user?.uid && navigate("/dashboard");
  }, [user.uid]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    dispatch(loginUser(form));
  };

  const inputs = [
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Samsmith@email.com",
      required: true,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "xxxxxxxxxx",
      required: true,
    },
  ];

  return (
    <MainLayout>
      <Container className="mt-5">
        <Form
          onSubmit={handleOnSubmit}
          className="border p-5 shadow-lg rounded m-auto bg-light  mb-3"
          style={{ width: "400px" }}
        >
          <h3 className="text-primary fw-bolder mb-3">
            Welcome Back to Comunity
          </h3>

          <div className="mt-5">
            {inputs.map((item, i) => (
              <CustomInpute key={i} {...item} onChange={handleOnChange} />
            ))}

            <div className="d-grid">
              <Button variant="primary" type="submit">
                Login Now!
              </Button>
            </div>
          </div>
        </Form>
      </Container>
    </MainLayout>
  );
};

export default SignIn;
