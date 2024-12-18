import React from "react";
import App from "./components/App";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
import "./index.css";

const router = createBrowserRouter(routes);

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

console.log("before App router");

root.render(<App router={router} />);
root.render(
  <>
    <RouterProvider router={router} />
  </>
);
