import { ActionFunctionArgs, redirect } from "react-router-dom";

import { deleteExercise } from "@/modules/exercise/data";

export async function action({ params }: ActionFunctionArgs) {
  const id = params.id;
  if (!id) return new Response("ID Not Found", { status: 404 });

  const isDeleted = await deleteExercise(id);
  if (!isDeleted) return null;

  return redirect("/");
}
