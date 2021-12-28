// magically inject CSS into the entire app:
import "../public/index.css";

import App from "./App";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import store from "../store/store";

ReactDOM.render(
  <Provider store={store}>
    <p>what up familyyyy</p>
    <App />
  </Provider>,
  document.getElementById("app")
);
