import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap/";
import { useDispatch, useSelector } from "react-redux";

import React from "react";
import { logout } from "../../store/reducer";

const NavBar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const dispatch = useDispatch();

  return (
    <Navbar variant="dark" bg="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/home">StudyBuddy</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
          {isLoggedIn
            ? ({
                /*if logged in, dropdown has account info and options*/
              },
              (
                <Nav className="justify-content-end">
                  <NavDropdown title="Account" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      Edit account details
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      placeholder{" "}
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      another placeholder
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => dispatch(logout())}>
                      Log out
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              ))
            : ({
                /*if not logged in, dropdown just has login/signup options*/
              },
              (
                <Nav className="justify-content-end">
                  <NavDropdown title="Login" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/login">Log in</NavDropdown.Item>
                    <NavDropdown.Item href="/signup">
                      Create Account
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              ))}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
