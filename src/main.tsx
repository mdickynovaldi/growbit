import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "@/index.css";

import { App } from "@/routes/app";
import { NotFound } from "@/routes/404";
import { New } from "@/routes/new";
import { Edit } from "@/routes/edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
  },
  {
    path: "/new",
    element: <New />,
    errorElement: <NotFound />,
  },
  {
    path: "/edit/:id",
    element: <Edit />,
    errorElement: <NotFound />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
