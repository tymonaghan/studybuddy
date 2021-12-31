import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap/";

import React from "react";
import { useSelector } from "react-redux";

const NavBar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/home">StudyBuddy</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>

            {isLoggedIn
              ? ({
                  /*if logged in, dropdown has account info and options*/
                },
                (
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
                    <NavDropdown.Item href="#action/3.4">
                      Log out
                    </NavDropdown.Item>
                  </NavDropdown>
                ))
              : ({
                  /*if not logged in, dropdown just has login/signup options*/
                },
                (
                  <NavDropdown title="Login" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/login">Log in</NavDropdown.Item>
                    <NavDropdown.Item href="/signup">
                      Create Account
                    </NavDropdown.Item>
                  </NavDropdown>
                ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
