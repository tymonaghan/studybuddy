import { Login, Signup } from "./components/AuthForm";
import { Route, Routes } from "react-router-dom";

import DumbDiv from "./components/DumbDiv";
// import Navbar from "./components/Navbar";
import React from "react";

const App = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={<div className={"loginbox"}>{Login}</div>}
      />
      <Route path="/signup" element={Signup} />
    </Routes>
  );
};

export default App;
