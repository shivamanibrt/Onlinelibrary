import React, { useEffect, useState } from "react";
import { PrivateRoute } from "../../components/private-route/PrivateRoute";
import { Button, Container, Form } from "react-bootstrap";
import { UserLayout } from "../../components/layout/UserLayout";
import { CustomInpute } from "../../components/custom-inpute/CustomInpute";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileAction } from "./userAction";
import { toast } from "react-toastify";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../config/firbease-config";

const Profile = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({});
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    setForm(user);
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to update your porfile?"))
      return;
    const { email, role, uid, ...rest } = form;
    const obj = {
      id: uid,
      ...rest,
    };

    dispatch(updateProfileAction(obj));
  };

  const handleOnPasswordReset = () => {
    try {
      if (
        window.confirm(
          "Are you sure you want to send password update linke to your email? "
        )
      ) {
        //firebase sends email with password reset form's linke

        sendPasswordResetEmail(auth, form.email)
          .then((resp) => {
            console.log(resp);

            toast.success("Password rest email has been sent");
          })
          .catch((error) => {
            console.log(error);
            toast.error(error.message);
          });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const inputs = [
    {
      label: "Your current role",
      name: "role",
      type: "text",
      value: form.role,
      required: true,
      disabled: true,
    },
    {
      label: "First Name",
      name: "fName",
      type: "text",
      placeholder: "Sam smith",
      required: true,
      value: form.fName,
    },
    {
      label: "Last Name",
      name: "lName",
      type: "text",
      placeholder: "Sam smith",
      required: true,
      value: form.lName,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Samsmith@email.com",
      required: true,
      value: form.email,
      disabled: true,
    },
  ];

  return (
    <PrivateRoute>
      <UserLayout>
        <Container>
          <h3>Profile</h3>

          <hr />
          <Form className="mt-3 gap-3" onSubmit={handleOnSubmit}>
            {inputs.map((item, i) => (
              <CustomInpute key={i} {...item} onChange={handleOnChange} />
            ))}

            <div className="d-grid">
              <Button variant="primary" type="submit">
                Update Profile!
              </Button>
            </div>
          </Form>
          <hr />
          <div className="d-grid mt-4">
            <Button variant="danger" onClick={handleOnPasswordReset}>
              Request password reset email
            </Button>
          </div>
        </Container>
      </UserLayout>
    </PrivateRoute>
  );
};

export default Profile;

// Dillan Leuschke
// Username	dillan.leuschke@ethereal.email (also works as a real inbound email address)
// Password	W4HbPyvxnfK94CaThy
