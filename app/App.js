import { Login, Signup } from "./components/AuthForm";
import { Navigate, Route, Routes, Switch } from "react-router-dom";
// import Navbar from "./components/Navbar";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Home from "./components/Home";
import { checkForUserToken } from "../store/reducer";

const App = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  // if state.auth.id exists, this user is logged in

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkForUserToken());
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        // <Navigate to="/home" />
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/login"
            element={<div className={"loginbox"}>{Login}</div>}
          />
          <Route path="/signup" element={Signup} />
        </Routes>
      )}{" "}
      {/*end check for login ternary */}
    </div>
  );
};

export default App;
