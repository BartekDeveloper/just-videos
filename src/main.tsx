import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
    routeTree,
    defaultPendingComponent: () => (
      <div className={`p-2 text-2xl`}>
        Loading...
      </div>
    ),
    defaultErrorComponent: ({ error }: {error:any}) => <div>Error! {error}</div>,
    defaultPreload: 'intent',
  })

const rootElement = document.getElementById('app')!;
const root = ReactDOM.createRoot(rootElement);
root.render(
<React.StrictMode>
    <App />
</React.StrictMode>,
)

  