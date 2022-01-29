import {
  About,
  Home,
  Login,
  NavBar,
  Signup,
  ProjectView,
  ProjectViewWrapper,
  SourceView,
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
      </Container>
      <Container className="main-contain">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={Login} />
          <Route path="/signup" element={Signup} />{" "}
          <Route path="/about" element={<About />} />
          <Route path="project" element={<ProjectViewWrapper />}>
            <Route exact path=":projectId" element={<ProjectView />} />
            <Route
              path=":projectId/source/:sourceId"
              element={<SourceView />}
            />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </Stack>
  );
};

export default App;
