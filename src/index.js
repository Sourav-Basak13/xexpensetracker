import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SnackbarProvider } from "notistack";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SnackbarProvider
      anchorOrigin={{
        horizontal: "center",
        vertical: "top",
      }}
    />
    <App />
  </React.StrictMode>
);
