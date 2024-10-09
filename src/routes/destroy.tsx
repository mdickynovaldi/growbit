import { deleteExercise } from "@/modules/exercise/data";
import { redirect } from "react-router-dom";

export async function action({ params }: { params: { id: string } }) {
  await deleteExercise(params.id);
  return redirect("/");
}
