import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { RootRoute } from "@/routes/root";
import { NotFound } from "@/routes/404";
import { HomeRoute, loader as homeLoader } from "@/routes/home";
import { NewExercise, action as newExerciseAction } from "@/routes/new";
import {
  EditExercise,
  loader as editLoader,
  action as editAction,
} from "@/routes/edit";
import { action as destroyAction } from "@/routes/destroy";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <HomeRoute />,
        loader: homeLoader,
      },
      {
        path: "/new",
        element: <NewExercise />,
        action: newExerciseAction,
      },
      // TODO
      // {
      //   path: "/exercises/:id",
      //   element: <ViewExercise />,
      // },
      {
        path: "/edit/:id",
        element: <EditExercise />,
        loader: editLoader,
        action: editAction,
      },
      {
        // ALTERNATIVE: path: "/exercises/:id/destroy",
        path: "/destroy/:id",
        action: destroyAction,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
