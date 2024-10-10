import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import {
  ActionFunction,
  createBrowserRouter,
  LoaderFunction,
  RouterProvider,
} from "react-router-dom";
import { loader as editLoader } from "@/modules/exercise/data";
import { action as destroyAction } from "@/routes/destroy";
import { NotFound } from "@/routes/404";
import { New } from "@/routes/new";
import { Edit, action as editAction } from "@/routes/edit";
import { loader as rootLoader, Root } from "@/routes/root";
import { Home } from "@/routes/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,

    children: [
      {
        path: "/",
        element: <Home />,
        loader: rootLoader,
      },
      {
        path: "new",
        element: <New />,
      },
      {
        path: "edit/:id",
        element: <Edit />,
        loader: editLoader as unknown as LoaderFunction,
        action: editAction as unknown as ActionFunction,
      },
      {
        path: "destroy/:id",
        action: destroyAction as unknown as ActionFunction,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
