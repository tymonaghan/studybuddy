import { About, Home, Login, NavBar, Signup } from "./components/";
import { Navigate, Route, Routes } from "react-router-dom";

import Container from "react-bootstrap/Container";
import React from "react";
import Stack from "react-bootstrap/Stack";

const App = () => {
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
          {/*this re-used AuthForm is more trouble than it's worth!*/}
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </Stack>
  );
};

export default App;
