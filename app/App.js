import { Login, Signup } from "./components/AuthForm";
import { Navigate, Route, Routes, Switch } from "react-router-dom";
// import Navbar from "./components/Navbar";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Home from "./components/Home";
import { checkForUserToken } from "../store/reducer";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route
          path="/login"
          element={<div className={"loginbox"}>{Login}</div>}
        />
        <Route path="/signup" element={Signup} />
      </Routes>
    </div>
  );
};

export default App;
