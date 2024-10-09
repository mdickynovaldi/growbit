import { Outlet } from "react-router-dom";
import { getCalories, getExercises } from "@/modules/exercise/data";

export async function loader() {
  const exercises = await getExercises();
  const totalCalories = await getCalories();
  return { exercises, totalCalories };
}
export function Root() {
  return (
    <main className="w-1/2 mx-auto">
      <Outlet />
    </main>
  );
}
