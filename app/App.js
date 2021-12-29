import { Route, Routes } from "react-router-dom";

import DumbDiv from "./components/DumbDiv";
import { Login } from "./components/AuthForm";
// import Navbar from "./components/Navbar";
import React from "react";

const App = () => {
  return (
    <Routes>
      <Route path="/brains" element={Login} />
    </Routes>
  );
};

export default App;
