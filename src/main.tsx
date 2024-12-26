import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createReactRouter } from "@tanstack/router";
import { fileRoutes } from "./routes/routes.gen";

const router = createReactRouter({
  routeConfig: fileRoutes,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
