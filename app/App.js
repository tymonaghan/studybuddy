import {
  About,
  Home,
  Login,
  NavBar,
  Signup,
  ProjectView,
  ProjectViewWrapper,
  SourceView,
  BreadcrumbBox,
  AlphaWarning,
} from "./components/";
import { Navigate, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import { checkForUserToken } from "../store/authReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(`dispatching checkForUserToken from App.js useEffect`);
    dispatch(checkForUserToken());
  });
  // check for user token every time this page is loaded

  return (
    <Stack>
      <Container className="nav-contain" style={{ padding: "0px" }}>
        <NavBar />
        {/* <BreadcrumbBox /> */}
      </Container>
      <Container className="main-contain">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/alphaWarning" element={<AlphaWarning />} />
          <Route path="/login" element={Login} />
          <Route path="/signup" element={Signup} />{" "}
          <Route path="/about" element={<About />} />
          <Route path="project" element={<ProjectViewWrapper />}>
            <Route
              exact
              path=":projectId"
              element={<ProjectView source={false} />}
            />
            <Route
              path=":projectId/source/:sourceId"
              element={<ProjectView source={true} />}
            />
          </Route>
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Container>
    </Stack>
  );
};

export default App;
