import {
  Container,
  Nav,
  NavDropdown,
  Navbar,
  Breadcrumb,
  NavItem,
} from "react-bootstrap/";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, NavLink } from "react-router-dom";

import React from "react";
import { logout } from "../../store/authReducer";

const NavBar = () => {
  const params = useParams();
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.auth);
  // const { projects } = useSelector((state) => state);
  // const { currentProjectId } = useSelector((state) => state);
  // const currentProject = projects.find(
  //   (project) => +project.id === +currentProjectId
  // );

  // console.log(`currentProjectId: ${currentProjectId}`);
  // console.log(`projects: ${projects}`);
  // console.dir(projects);
  // console.dir(currentProject);
  return (
    <Navbar variant="dark" bg="dark" expand="sm">
      <Container fluid>
        <Link to="/home" className="navlink">
          <Navbar.Brand>StudyBuddy</Navbar.Brand>
        </Link>
        {/* <Nav className="me-auto">
          {" "}
          <Nav.Link className="">
            {currentProject ? currentProject.name : ""}
          </Nav.Link>
        </Nav> */}

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={"div"}>
              <NavLink
                to="/home"
                className="navlink"
                style={({ isActive }) =>
                  isActive ? { color: "white" } : { color: "gray" }
                }
              >
                Projects
              </NavLink>
            </Nav.Link>
            <Nav.Link as={"div"}>
              <NavLink
                to="/about"
                className="navlink"
                style={({ isActive }) =>
                  isActive ? { color: "white" } : { color: "gray" }
                }
              >
                About
              </NavLink>
            </Nav.Link>
          </Nav>
          {isLoggedIn
            ? ({
                /*if logged in, dropdown has account info and options*/
              },
              (
                <Nav className="justify-content-end">
                  <NavDropdown
                    title={username}
                    id="basic-nav-dropdown"
                    style={{ marginRight: "5rem" }}
                  >
                    <NavDropdown.Item disabled href="#action/3.1">
                      Edit account details
                    </NavDropdown.Item>
                    <NavDropdown.Item disabled href="#action/3.2">
                      placeholder{" "}
                    </NavDropdown.Item>
                    <NavDropdown.Item disabled href="#action/3.3">
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
