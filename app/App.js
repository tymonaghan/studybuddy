import { About, Home, Login, NavBar, Signup } from "./components/";
// import Navbar from "./components/Navbar";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Container from "react-bootstrap/Container";

const App = () => {
  return (
    <Container className="main-contain">
      <NavBar /> {/*always render navBar*/}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route
          path="/login"
          element={<div className={"loginbox"}>{Login}</div>}
        />
        <Route path="/signup" element={Signup} />{" "}
        {/*this re-used AuthForm is more trouble than it's worth!*/}
        <Route path="/about" element={<About />} />
      </Routes>
    </Container>
  );
};

export default App;
