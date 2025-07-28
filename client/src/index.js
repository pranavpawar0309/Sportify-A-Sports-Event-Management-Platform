import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import DarkWrapper from "./DarkWrapper";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DarkWrapper>
      <App />
    </DarkWrapper>
  </React.StrictMode>
);
