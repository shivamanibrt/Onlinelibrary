import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { GoSignIn, GoSignOut } from "react-icons/go";
import { AiFillDashboard } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firbease-config";
import { setUser } from "../../pages/signup-signin/userSlic";

export const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleOnLogout = () => {
    signOut(auth).then(() => {
      // set user state to empty {}
      dispatch(setUser({}));
    });
  };

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand>
          <Link to="/">DL</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!user?.uid ? (
              <>
                <Link to="/signin" className="nav-link">
                  <GoSignIn className="fs-3" />
                </Link>
                <Link to="/signup" className="nav-link">
                  <FaUserEdit className="fs-3" />
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="nav-link">
                  <AiFillDashboard className="fs-3" />
                </Link>
                <Link to="#" className="nav-link" onClick={handleOnLogout}>
                  <GoSignOut className="fs-3" />
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
