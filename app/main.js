// magically inject CSS into the entire app:
import "../public/index.css";
import "bootstrap/dist/css/bootstrap.min.css"; //bootstrap CSS

import App from "./App";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../store/store";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("app")
);
