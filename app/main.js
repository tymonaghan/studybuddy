import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import store from "../store/store";

ReactDOM.render(
  <Provider store={store}>
    <div>put components here!</div>
  </Provider>,
  document.getElementById("app")
);
