import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { CustomProvider } from "./customProvider";
import "./styles.css";

ReactDOM.render(
  <CustomProvider>
    <App />
  </CustomProvider>,
  document.getElementById("app")
);
