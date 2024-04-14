import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { IoMdPerson } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "./Auth";

const Header = () => {
  const { user } = useAuth();
  if (user) {
    return (
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <NavLink to="/">
                <Nav.Link as="span">Students</Nav.Link>
              </NavLink>
              <NavLink to="/dashboard">
                <Nav.Link as="span">Posts</Nav.Link>
              </NavLink>
              <NavLink to="/about">
                <Nav.Link as="span">About</Nav.Link>
              </NavLink>
              <NavLink to="/contact">
                <Nav.Link as="span">Contact</Nav.Link>
              </NavLink>
              {user ? (
                <NavLink to="/profile">
                  <Nav.Link as="span">
                    <IoMdPerson />
                  </Nav.Link>
                </NavLink>
              ) : (
                <NavLink to="/login">
                  <Nav.Link as="span">Login</Nav.Link>
                </NavLink>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
};

export default Header;
