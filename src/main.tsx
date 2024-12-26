import React from "react";
import { createRoot } from "react-dom/client";
import { createReactRouter } from "@tanstack/router";
// The plugin now creates: src/routes/routes.gen.ts
import { fileRoutes } from "./routes/routes.gen"; 

const router = createReactRouter({
  routeConfig: fileRoutes,
});

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {router.render()}
  </React.StrictMode>
);
